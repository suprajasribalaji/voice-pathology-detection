import streamlit as st
from audio_recorder_streamlit import audio_recorder
import soundfile as sf
import io
import tempfile
import librosa
import librosa.display
import cv2
import numpy as np
import matplotlib.pyplot as plt
import os
import requests
from tensorflow.keras.models import load_model

# set page config
st.set_page_config(page_title='Voice Pathology Detection', page_icon=':rocket:', layout='wide')

# model
model = load_model('audio_conv1d.h5')

# function for model inference
def model_inference(audio_bytes):
    # Convert audio bytes to temporary WAV file
    with io.BytesIO(audio_bytes) as f:
        f.seek(0)
        y, sr = librosa.load(f, sr=None)
    
    D = librosa.stft(y)
    spectrogram = librosa.amplitude_to_db(abs(D))
    spectrogram_resized = cv2.resize(spectrogram, (40, 1025))
    plt.figure(figsize=(10, 5))
    librosa.display.specshow(spectrogram, sr=sr, x_axis='time', y_axis='log')
    plt.colorbar(format='%+2.0f dB')
    predictions = model.predict(np.expand_dims(spectrogram_resized, axis=0))
    predicted_class = np.argmax(predictions[0], axis=-1)
    label_encoder_mapping = {0: 'Laryngozele', 1: 'Normal', 2: 'Vox senilis'}
    plt.savefig('librosa.jpg')
    plt.close()
    st.write(label_encoder_mapping[predicted_class])
    st.image('librosa.jpg')
    
# Home page sidebar
st.markdown("<h1 style='text-align: center;'>Voice Pathology Detection</h1>", unsafe_allow_html=True)

with st.container():
    st.title('##')
    # Record audio
    audio_bytes = audio_recorder(
        text="Record audio",
        recording_color="#e8b62c",
        neutral_color="#6aa36f",
        icon_name="user",
        icon_size="14x",
    )
    if audio_bytes:
        model_inference(audio_bytes)
        os.remove('librosa.jpg')
