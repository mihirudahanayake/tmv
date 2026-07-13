from smartcard.System import readers
from smartcard.util import toHexString
import time


class NFCReader:

    def __init__(self):
        self.reader = None
        self.connect_reader()


    def connect_reader(self):
        r = readers()

        if len(r) == 0:
            raise Exception("No NFC reader found")

        self.reader = r[0]
        print("NFC Reader:", self.reader)


    def read_uid(self):

        try:
            connection = self.reader.createConnection()
            connection.connect()

            # Get UID
            command = [
                0xFF,
                0xCA,
                0x00,
                0x00,
                0x00
            ]

            data, sw1, sw2 = connection.transmit(command)

            if sw1 == 0x90:
                return toHexString(data)

        except Exception:
            return None
        

    def write_data(self, text):

        try:

            connection = self.reader.createConnection()
            connection.connect()

            print("Card connected")


            # Convert text to bytes
            data = list(text.encode("utf-8"))

            # Maximum one page = 4 bytes
            data = data[:16]


            # Split into 4 byte pages
            pages = [
                data[i:i+4]
                for i in range(0, len(data), 4)
            ]


            start_page = 4


            for index, page in enumerate(pages):

                while len(page) < 4:
                    page.append(0x00)


                command = [
                    0xFF,
                    0xD6,
                    0x00,
                    start_page + index,
                    0x04
                ] + page


                response, sw1, sw2 = connection.transmit(command)


                print(
                    "Write page",
                    start_page + index,
                    hex(sw1),
                    hex(sw2)
                )


                if sw1 != 0x90:
                    return False


            return True


        except Exception as e:

            print("WRITE ERROR:", e)
            return False

    


nfc = NFCReader()