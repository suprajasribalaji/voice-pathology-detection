import React, { useState } from "react";
import { ReactMic } from "react-mic";
import { Typography, Row, Col, Button, Space, Upload, message } from "antd";
import { UploadOutlined, LogoutOutlined } from '@ant-design/icons';
import { AiFillAudio, AiFillExperiment } from "react-icons/ai";
import { app } from '../../firebase-config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication";
import test from "../../images/TestPage.jpg";
import { FaUserDoctor } from "react-icons/fa6"

const { Title, Text } = Typography;

const UserTest = () => {
  const authenticate = useAuth();
  const username = authenticate.user.userName;
  const storage = getStorage(app);
  const storageRef = ref(storage, 'VoicesDB');

  const nav = useNavigate();

  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioURL, setRecordedAudioURL] = useState(null);

  const toggleRecording = () => {
    setIsRecording(prevRecordingState => !prevRecordingState);
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
    <div style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
      <div style={{ marginLeft: '2%', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ marginBottom: '1%' }}>
          <div>
            <Title level={4}>
              VOICE PATHOLOGY DETECTION
              <br />
              <Text>Test your pathology</Text>
            </Title>
          </div>
        </div>
        <div style={{ marginTop: '3%', paddingRight: '2%' }}>
          <Space>
            <Text style={{ fontSize: '16px' }}>Welcome {username}</Text>
            <Button onClick={handlePageSwitch} style={{ marginLeft: '5%' }}>
              <FaUserDoctor />
            </Button>
            <Button icon={<LogoutOutlined />} onClick={handleLogout} style={{ marginLeft: '10%' }}></Button>
          </Space>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%', height: '65vh', padding: '5%', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${test})` }}>
          <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '20px' }}>
            <div style={{ marginRight: '48%', marginLeft: '10%', marginBottom: '5%', color: 'white' }}>
              <Row>
                <Col span={24}>
                  <div>
                    <Title level={3} style={{ color: 'white' }}>Discovering voice pathology begins with precise diagnosis. Our advanced tools and expert analysis offer comprehensive insights for tailored treatment plans, guiding you towards vocal wellness.</Title>
                    <Text style={{ color: 'white' }}>Please record your voice here</Text>
                  </div>

                  <div style={{ marginBottom: '2%', marginTop: '2%' }} >
                    <Space>
                      <ReactMic
                        record={isRecording}
                        onStop={onStop}
                        onData={onData}
                        mimeType="audio/wav"
                        echoCancellation={true}
                      />
                      <Button type="primary" onClick={toggleRecording} style={{ borderRadius: '20px' }}>
                        <AiFillAudio />
                      </Button>
                    </Space>
                  </div>

                  <div>
                    <Space>
                      <div style={{ marginTop: '2%' }}>
                        {recordedAudioURL && (
                          <audio controls>
                            <source src={recordedAudioURL} type="audio/wav" />
                            Your browser does not support the audio element.
                          </audio>
                        )}
                      </div>
                      <Upload customRequest={customRequest} onChange={onFileChange}>
                        <Button icon={<UploadOutlined />}></Button>
                      </Upload>
                      <Button onClick={handleTestButtonClick}>
                        <AiFillExperiment />
                      </Button>
                    </Space>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTest;
