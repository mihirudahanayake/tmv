import asyncio
import hashlib
import hmac
import json
import logging
import os
import socket
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import URLError
from urllib.request import Request, urlopen

import firebase_admin
from dotenv import load_dotenv
from fastapi import (
    Depends,
    FastAPI,
    Header,
    HTTPException,
    Query,
    WebSocket,
    WebSocketDisconnect,
)
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin import firestore
from google.api_core.exceptions import AlreadyExists
from google.auth.exceptions import DefaultCredentialsError
from pydantic import AliasChoices, BaseModel, Field, field_validator
from nfc_reader import nfc


load_dotenv(Path(__file__).with_name(".env"))

logger = logging.getLogger(__name__)


def fetch_esp_json(url: str) -> dict:
    request = Request(url, headers={"Accept": "application/json"})
    with urlopen(request, timeout=5) as response:
        payload = json.load(response)
    if not isinstance(payload, dict):
        raise ValueError("ESP response must be a JSON object.")
    return payload


def _as_utc_datetime(value: object) -> datetime | None:
    if not isinstance(value, datetime):
        return None
    if value.tzinfo is None:
        return value.replace(tzinfo=timezone.utc)
    return value.astimezone(timezone.utc)


def _get_active_door_authorization(client, event_time: datetime) -> dict | None:
    snapshot = (
        client.collection("doorAccessState")
        .document("current")
        .get(timeout=20)
    )
    if not snapshot.exists:
        return None

    state = snapshot.to_dict() or {}
    authorized_at = _as_utc_datetime(state.get("authorizedAt"))
    expires_at = _as_utc_datetime(state.get("expiresAt"))
    event_time = _as_utc_datetime(event_time)
    if (
        state.get("authorized") is not True
        or authorized_at is None
        or expires_at is None
        or event_time is None
        or event_time < authorized_at
        or event_time >= expires_at
    ):
        return None
    return state


def save_new_esp_photos(payload: dict) -> int:
    photos = payload.get("photos")
    if not isinstance(photos, list):
        raise ValueError("ESP JSON response must contain a photos array.")

    client = get_firestore_client()
    created_count = 0
    unique_photos = {}
    for photo in photos:
        if not isinstance(photo, dict) or not isinstance(photo.get("name"), str):
            raise ValueError("Each ESP photo must contain a string name.")

        image_name = photo["name"].strip()
        if not image_name:
            raise ValueError("ESP photo name cannot be empty.")

        document_id = hashlib.sha256(image_name.encode("utf-8")).hexdigest()
        unique_photos[document_id] = image_name

    record_collection = client.collection("accessRecords")
    items = list(unique_photos.items())
    event_fields = None
    for offset in range(0, len(items), 400):
        chunk = items[offset : offset + 400]
        document_refs = {
            document_id: record_collection.document(document_id)
            for document_id, _ in chunk
        }
        existing_ids = {
            snapshot.id
            for snapshot in client.get_all(list(document_refs.values()), timeout=20)
            if snapshot.exists
        }
        new_photos = [
            (document_id, image_name)
            for document_id, image_name in chunk
            if document_id not in existing_ids
        ]
        if not new_photos:
            continue

        if event_fields is None:
            detected_at = datetime.now(timezone.utc)
            verification_failed = False
            try:
                authorization = _get_active_door_authorization(client, detected_at)
            except Exception:
                logger.exception(
                    "Could not verify the current cupboard authorization window."
                )
                authorization = None
                verification_failed = True

            event_fields = {
                "authorized": authorization is not None,
                "action": "door_open",
                "doorSensorTriggered": True,
                "createdAt": detected_at,
                "source": "esp32-cam",
            }
            if authorization:
                event_fields.update(
                    {
                        "rfidCardId": authorization.get("cardUid"),
                        "userId": authorization.get("userId"),
                        "userName": authorization.get("userName"),
                        "userEmail": authorization.get("userEmail"),
                        "userRole": authorization.get("userRole"),
                        "accessWindowExpiresAt": authorization.get("expiresAt"),
                    }
                )
            else:
                event_fields["reason"] = (
                    "Authorization state could not be verified; access is denied."
                    if verification_failed
                    else "Door opened without an active authorized NFC scan."
                )

        batch = client.batch()
        batch_count = 0

        for document_id, image_name in new_photos:
            batch.create(
                document_refs[document_id],
                {
                    "imageName": image_name,
                    **event_fields,
                },
            )
            batch_count += 1

        if batch_count:
            try:
                batch.commit(timeout=30)
                created_count += batch_count
            except AlreadyExists:
                logger.info(
                    "Some ESP photo records in this batch were already created."
                )

    return created_count


async def poll_esp_json(url: str, interval_seconds: float) -> None:
    failure_delay = interval_seconds
    while True:
        try:
            payload = await asyncio.to_thread(fetch_esp_json, url)
            created_count = await asyncio.to_thread(save_new_esp_photos, payload)
            if created_count:
                logger.info("Recorded %d new ESP photo event(s).", created_count)
            failure_delay = interval_seconds
        except asyncio.CancelledError:
            raise
        except URLError as exc:
            if isinstance(exc.reason, socket.gaierror):
                logger.warning(
                    "Cannot resolve the ESP_JSON_URL hostname. Check that the "
                    "device is reachable and the URL uses its current IP or a "
                    "hostname this computer can resolve. Retrying in %s seconds.",
                    failure_delay,
                )
            else:
                logger.warning(
                    "ESP JSON request failed (%s). Retrying in %s seconds.",
                    type(exc.reason).__name__,
                    failure_delay,
                )
            await asyncio.sleep(failure_delay)
            failure_delay = min(failure_delay * 2, 60)
            continue
        except Exception:
            logger.exception("ESP JSON poll failed.")
            await asyncio.sleep(failure_delay)
            failure_delay = min(failure_delay * 2, 60)
            continue

        await asyncio.sleep(interval_seconds)


@asynccontextmanager
async def lifespan(_app: FastAPI):
    esp_json_url = os.getenv("ESP_JSON_URL", "").strip()
    poller_task = None
    if esp_json_url:
        await asyncio.to_thread(get_firestore_client)
        try:
            poll_interval = float(os.getenv("ESP_POLL_INTERVAL_SECONDS", "1"))
        except ValueError as exc:
            raise RuntimeError("ESP_POLL_INTERVAL_SECONDS must be a number.") from exc
        if poll_interval <= 0:
            raise RuntimeError("ESP_POLL_INTERVAL_SECONDS must be greater than zero.")
        poller_task = asyncio.create_task(
            poll_esp_json(esp_json_url, poll_interval)
        )
        logger.info("ESP JSON polling started.")
    else:
        logger.info("ESP_JSON_URL is empty; ESP polling is disabled.")

    try:
        yield
    finally:
        if poller_task:
            poller_task.cancel()
            try:
                await poller_task
            except asyncio.CancelledError:
                pass


app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class DoorAccessRecord(BaseModel):
    authorized: bool = False
    imagePath: str | None = Field(
        default=None,
        min_length=1,
        max_length=2048,
        validation_alias=AliasChoices("imagePath", "imgPath", "image_path"),
    )
    photoUrl: str | None = Field(default=None, min_length=1, max_length=2048)
    timestamp: datetime | None = Field(
        default=None,
        validation_alias=AliasChoices("timestamp", "time"),
    )
    userName: str | None = Field(default=None, max_length=200)
    userEmail: str | None = Field(default=None, max_length=320)
    userId: str | None = Field(default=None, max_length=200)
    rfidCardId: str | None = Field(default=None, max_length=200)
    action: str | None = Field(default=None, max_length=200)
    reason: str | None = Field(default=None, max_length=1000)

    @field_validator("timestamp")
    @classmethod
    def normalize_timestamp(cls, value: datetime | None) -> datetime | None:
        if value is not None and value.tzinfo is None:
            return value.replace(tzinfo=timezone.utc)
        return value


def verify_door_api_key(x_api_key: str | None = Header(default=None)) -> None:
    expected_api_key = os.getenv("DOOR_API_KEY")
    if not expected_api_key:
        raise HTTPException(
            status_code=503,
            detail="Door API authentication is not configured.",
        )
    if not x_api_key or not hmac.compare_digest(
        x_api_key.encode("utf-8"),
        expected_api_key.encode("utf-8"),
    ):
        raise HTTPException(status_code=401, detail="Invalid or missing API key.")


def get_firestore_client():
    try:
        firebase_app = firebase_admin.get_app()
    except ValueError:
        credential_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "").strip()
        credential = None
        if credential_path:
            path = Path(credential_path)
            if not path.is_file():
                raise RuntimeError(
                    "GOOGLE_APPLICATION_CREDENTIALS does not point to a file: "
                    f"{path}"
                )
            try:
                credential = firebase_admin.credentials.Certificate(str(path))
            except (ValueError, OSError) as exc:
                raise RuntimeError(
                    "Firebase Admin credentials are invalid. "
                    "GOOGLE_APPLICATION_CREDENTIALS must point to the full "
                    "Firebase service-account JSON downloaded from Firebase "
                    "Console; the React config.js is not a backend credential."
                ) from exc

        app_options = {
            "projectId": os.getenv("FIREBASE_PROJECT_ID", "").strip(),
            "databaseURL": os.getenv("FIREBASE_DATABASE_URL", "").strip(),
        }
        app_options = {
            key: value for key, value in app_options.items() if value
        }
        firebase_app = firebase_admin.initialize_app(
            credential=credential,
            options=app_options,
        )
    return firestore.client(app=firebase_app)


@app.get("/")
def home():
    return {
        "status": "NFC API running"
    }



@app.get("/reader/status")
def status():

    return {
        "reader": str(nfc.reader)
    }



@app.get("/nfc/read")
def read_card():

    uid = nfc.read_uid()

    return {
        "uid": uid
    }
    
    
    
    
@app.post("/nfc/write")
def write_card(id: str = Query(...)):

    result = nfc.write_data(id)

    if result:
        return {
            "success": True,
            "written": id
        }

    return {
        "success": False,
        "message": "Write failed"
    }


@app.post("/door/access-records", status_code=201)
def create_door_access_record(
    payload: DoorAccessRecord,
    _: None = Depends(verify_door_api_key),
):
    received_at = datetime.now(timezone.utc)
    event_time = payload.timestamp or received_at
    photo_url = payload.photoUrl or payload.imagePath
    try:
        client = get_firestore_client()
    except DefaultCredentialsError as exc:
        raise HTTPException(
            status_code=503,
            detail="Firebase Admin credentials are not configured.",
        ) from exc
    verification_failed = False
    try:
        authorization = _get_active_door_authorization(client, event_time)
    except Exception:
        logger.exception("Could not verify the current cupboard authorization window.")
        authorization = None
        verification_failed = True

    record = payload.model_dump(
        exclude={
            "timestamp",
            "imagePath",
            "photoUrl",
            "authorized",
            "userName",
            "userEmail",
            "userId",
            "rfidCardId",
            "action",
            "reason",
        },
        exclude_none=True,
    )
    record.update(
        {
            "authorized": authorization is not None,
            "action": "door_open",
            "doorSensorTriggered": True,
            "source": "door-api",
            "imagePath": payload.imagePath or photo_url,
            "photoUrl": photo_url,
            "createdAt": received_at,
        }
    )
    if payload.timestamp:
        record["sensorTimestamp"] = payload.timestamp
    if authorization:
        record.update(
            {
                "rfidCardId": authorization.get("cardUid"),
                "userId": authorization.get("userId"),
                "userName": authorization.get("userName"),
                "userEmail": authorization.get("userEmail"),
                "userRole": authorization.get("userRole"),
                "accessWindowExpiresAt": authorization.get("expiresAt"),
            }
        )
    else:
        record["reason"] = (
            "Authorization state could not be verified; access is denied."
            if verification_failed
            else "Door opened without an active authorized NFC scan."
        )

    try:
        _, document_ref = (
            client.collection("accessRecords").add(record)
        )
    except DefaultCredentialsError as exc:
        raise HTTPException(
            status_code=503,
            detail="Firebase Admin credentials are not configured.",
        ) from exc

    return {
        "id": document_ref.id,
        "createdAt": received_at.isoformat(),
        "photoUrl": photo_url,
        "authorized": record["authorized"],
        "rfidCardId": record.get("rfidCardId"),
        "userName": record.get("userName"),
        "reason": record.get("reason"),
    }



@app.websocket("/nfc/events")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    last_uid = None
    try:
        while True:
            uid = await asyncio.to_thread(nfc.read_uid)
            if uid != last_uid:
                await websocket.send_json({
                    "event": "card_detected" if uid else "card_removed",
                    "uid": uid,
                })
                last_uid = uid
            await asyncio.sleep(0.1)
    except WebSocketDisconnect:
        pass