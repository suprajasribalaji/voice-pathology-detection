from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# tensorflow for load_model
from tensorflow.keras.models import load_model

import cv2
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
import os
import requests
import librosa
import librosa.display

app = FastAPI()

model = load_model('audio_conv1d.h5')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.post("/upload-audio")
async def upload_audio(audio: UploadFile = File(...)):
    try:
        with open("testAudio.wav", "wb") as temp_audio:
            temp_audio.write(audio.file.read())
    
        # try:
        #     # # Load the audio file using librosa
        #     # y, sr = librosa.load("testAudio.wav")

        #     # # Compute spectrogram
        #     # D = librosa.stft(y)
        #     # spectrogram = librosa.amplitude_to_db(abs(D))
        #     # spectrogram_resized = cv2.resize(spectrogram, (40, 1025)) 

        #     #  # Display spectrogram
        #     # plt.figure(figsize=(10, 5))
        #     # librosa.display.specshow(spectrogram, sr=sr, x_axis='time', y_axis='log')
        #     # plt.colorbar(format='%+2.0f dB')

        #     # # Perform inference with the loaded model
        #     # predictions = model.predict(np.expand_dims(spectrogram_resized, axis=0))
        #     # predicted_class = np.argmax(predictions, axis=1)
        #     # label_encoder_mapping = {0: 'Laryngozele', 1: 'Normal', 2: 'Vox senilis'}
        #     # result = label_encoder_mapping[predicted_class]

        #     # # # Save the plot as JPG
        #     # plt.savefig('librosa.jpg')
        #     # plt.close()
        # except Exception as e:
        #         print("Error loading the audio in librosa and converting into spectogram:", e)

        return JSONResponse(content={"message": "Audio uploaded successfully", "result: ": label_encoder_mapping}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"message": "Error uploading audio", "error": str(e)}, status_code=500)
