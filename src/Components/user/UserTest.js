import React, { useState } from "react";
import { ReactMic } from "react-mic";
import { Typography, Row, Col, Button, Space, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { app } from '../../firebase-config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication";


const { Title, Text } = Typography;

const UserTest = () => {
  const authenticate = useAuth();
  const username = authenticate.user;
  const storage = getStorage(app);
  const storageRef = ref(storage, 'VoicesDB');

  const nav = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioURL, setRecordedAudioURL] = useState(null);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = (recordedData) => {
    console.log("Data recorded: ", recordedData);
  };

  const onStop = (recordedData) => {
    console.log("Recording stopped: ", recordedData);
    setRecordedAudioURL(URL.createObjectURL(recordedData.blob));
  };

  const customRequest = async () => {
    const fileName = `audio_${Date.now()}.wav`;
    const fileRef = ref(storageRef, fileName);

    try {
      await uploadBytes(fileRef, recordedAudioURL);
      console.log("File uploaded successfully");
      message.success('Audio Uploaded Successfully');

      const fileUrl = await getDownloadURL(fileRef);

      await addDoc(collection(app.firestore(), 'VoicesDB'), {
        fileUrl,
        timestamp: serverTimestamp(),
      });

      console.log("Metadata saved to Firestore");
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  const onFileChange = (info) => {
    if (info.file.status === 'done') {
      message.success('File Uploaded Successfully');
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      console.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleLogout = () => {
    nav('/');
  };

  const handlePageSwitch = () => {
    nav('/userpage');
  };

  const handleTestButtonClick = () => {
    const recordedData = { blob: 'dummy-audio-blob' };
    const audioBlob = new Blob([recordedData.blob], { type: 'audio/wav' });
    setRecordedAudioURL(URL.createObjectURL(audioBlob));
    customRequest();
  };

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.9)', minHeight: '100vh', display: 'flex', flexDirection: 'column',alignItems:'center' }}>
      <div style={{ marginTop: '1%', alignSelf: 'flex-end', marginRight: '5%' }}>
        <Space>
          <Text type="primary">Welcome {username}</Text>
          <Button type="primary" onClick={handleLogout}>Logout</Button>
        </Space>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '60%', textAlign: 'center', padding: '5%' }}>
          <Row>
            <Col span={24}>
              <div>
                <Title level={2}>
                  VOICE PATHOLOGY DETECTION
                  <br />
                  Test your pathology
                </Title>
              </div>

              <div>
                <Text>Please record your voice here</Text>
              </div>

              <div style={{ marginTop: '4%' }}>
                <Space>
                  <Upload customRequest={customRequest} onChange={onFileChange}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Space>
              </div>

              <div style={{ marginTop: '2%' }}>
                <Button type="primary" onClick={startRecording} disabled={isRecording}>Start</Button>
                <ReactMic
                  record={isRecording}
                  onStop={onStop}
                  onData={onData}
                />
                <Button onClick={stopRecording} disabled={!isRecording}>Stop</Button>
              </div>

              <div style={{ marginTop: '2%' }}>
                {recordedAudioURL && (
                  <audio controls>
                    <source src={recordedAudioURL} type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>

              <div style={{ marginTop: '4%' }}>
                <Button type="primary" onClick={handlePageSwitch}>Go to Consultation page</Button>
              </div>

              <div style={{ marginTop: '4%' }}>
                <Button type="primary" onClick={handleTestButtonClick}>
                  Test
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default UserTest;
