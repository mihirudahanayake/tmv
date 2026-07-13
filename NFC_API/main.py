from fastapi import FastAPI, WebSocket
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


clients = []


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

    clients.append(websocket)

    try:

        while True:

            uid = nfc.read_uid()

            if uid:

                data = {
                    "event":"card_detected",
                    "uid":uid
                }


                await websocket.send_json(data)

                await asyncio.sleep(2)


            await asyncio.sleep(0.5)


    except Exception:

        clients.remove(websocket)