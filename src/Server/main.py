from fastapi import FastAPI, File, UploadFile
from starlette.middleware.cors import CORSMiddleware
import subprocess

app = FastAPI()

@app.get("/")
async def get_streamlit_app():
    # with open("testAudio.wav", "wb") as temp_audio:
    #     temp_audio.write(audio.file.read())
    result = subprocess.run(["streamlit", "run", "Test.py"], capture_output=True, text=True)
    return {"streamlit_output": result.stdout}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)