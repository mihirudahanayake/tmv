# NFC / Door API

The API records door access events in the Firebase project's `accessRecords`
collection. The React Access Records page listens to that collection and shows
new events as they are written.

## Configure and run

1. Install the dependencies with `pip install -r requirements.txt`.
2. Copy `.env.example` to `.env`.
3. Set `DOOR_API_KEY` to a long random secret.
4. Set `FIREBASE_PROJECT_ID` and `FIREBASE_DATABASE_URL` to the project values
   from the Firebase web config.
5. Set `GOOGLE_APPLICATION_CREDENTIALS` to the path of a Firebase Admin service
   account JSON file with Firestore access. The web config does not authenticate
   the backend. Keep the JSON file and `.env` private.
6. Connect an NFC reader, then run `./run.sh`.

The backend writes door records to Firestore's `accessRecords` collection. The
Realtime Database URL is included as Firebase app configuration, but does not
change where these records are stored.

Set `VITE_DOOR_API_URL` in the React app's root `.env` to the API's reachable
base URL (for example, `http://localhost:8000`). For a deployed React app, use
the deployed API URL. This URL is not a secret. Never put `DOOR_API_KEY` or the
Firebase Admin service account credentials in a `VITE_` variable.

## Poll the ESP32-CAM

Set `ESP_JSON_URL` in `NFC_API/.env` to the ESP's status JSON endpoint and
`ESP_POLL_INTERVAL_SECONDS=1`. The backend expects a JSON object with a `photos`
array whose entries contain a `name`, such as the sample ESP response. Polling
is disabled when `ESP_JSON_URL` is empty. Restart the backend after changing
these settings.

Each photo filename is treated as one door-unlock record. The backend stores
`imageName`, `authorized`, `action`, and the detection time in `accessRecords`.
It uses a deterministic Firestore document ID derived from the filename, so
polling the same photo repeatedly or restarting the backend does not create
duplicates. This assumes photo filenames are unique for each entry.

Set `VITE_ESP_IMAGE_URL_PREFIX` in the React app's root `.env` to the URL prefix
the browser uses to load a photo, for example
`http://192.168.1.100/image?name=`. The React app URL-encodes and appends the
stored filename. Restart the Vite dev server or rebuild the app after changing
this frontend variable. Keep the ESP reachable from the browser for images to
load.

## Record a door event

Send a JSON request to `POST /door/access-records` with the API key in the
`X-API-Key` header:

```json
{
  "authorized": true,
  "imagePath": "https://example.com/access-photos/entry-001.jpg",
  "timestamp": "2026-11-16T06:44:00Z",
  "userName": "Example User",
  "rfidCardId": "04A1B2C3",
  "action": "door_unlock"
}
```

`imagePath` (also accepted as `imgPath` or `image_path`) or `photoUrl` is
required. The value must be an absolute URL or a path served by the configured
server URL; the API records the path but does not upload or serve local image
files. `timestamp` or `time` is optional and defaults to the API server's current
UTC time. Timestamps without a timezone are treated as UTC. `authorized`
defaults to `true`.

The API responds with HTTP 201 and the new Firestore document ID. It stores
`createdAt` as a Firestore timestamp, plus `imagePath` and `photoUrl` for the
existing React view. The React app continues to read Firebase directly; its
Firestore client rules control who can view the records.

Requests are rejected with HTTP 503 when `DOOR_API_KEY` is not configured and
HTTP 401 when the key is missing or invalid. Firebase Admin uses application
default credentials from `GOOGLE_APPLICATION_CREDENTIALS`.
