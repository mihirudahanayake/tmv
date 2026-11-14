from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from nfc_reader import nfc
import asyncio
from fastapi import Query


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


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