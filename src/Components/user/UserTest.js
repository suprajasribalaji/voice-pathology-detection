import React, { useState } from "react";
import { ReactMic } from "react-mic";
import { Typography, Row, Col, Button, Space, Upload, message } from "antd";
import { UploadOutlined, LogoutOutlined } from '@ant-design/icons';
import { AiOutlineUser, AiFillExperiment } from "react-icons/ai";
import { MdSettingsVoice } from "react-icons/md";
import { app } from '../../firebase-config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication";
import test from "../../images/TestPage.jpg";
import axios from "axios";

const { Title, Text } = Typography;

const UserTest = () => {
  const authenticate = useAuth();
  const username = authenticate.user.userName;
  const storage = getStorage(app);
  const storageRef = ref(storage, 'VoicesDB');

  const nav = useNavigate();

  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioURL, setRecordedAudioURL] = useState(null);
  const [blobFile, setBlobFile] = useState(null);

  const toggleRecording = () => {
    setIsRecording(prevRecordingState => !prevRecordingState);
  };

  const onData = (recordedData) => {
    console.log("Data recorded: ", recordedData);
  };

  const onStop = async (recordedData) => {
    console.log("Recording stopped: ", recordedData);
    setBlobFile(recordedData.blob);
    setRecordedAudioURL(URL.createObjectURL(recordedData.blob));
  };

  // const customRequest = async () => {
  //   const fileName = `audio_${Date.now()}.wav`;
  //   const fileRef = ref(storageRef, fileName);

  //   try {
  //     await uploadBytes(fileRef, recordedAudioURL);
  //     console.log("File uploaded successfully");
  //     message.success('Audio Uploaded Successfully');

  //     const fileUrl = await getDownloadURL(fileRef);

  //     await addDoc(collection(app.firestore(), 'VoicesDB'), {
  //       fileUrl,
  //       timestamp: serverTimestamp(),
  //     });

  //     console.log("Metadata saved to Firestore");
  //   } catch (error) {
  //     console.error("Error uploading file", error);
  //   }
  // };

  // const onFileChange = (info) => {
  //   if (info.file.status === 'done') {
  //     message.success('File Uploaded Successfully');
  //     console.log(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === 'error') {
  //     console.error(`${info.file.name} file upload failed.`);
  //   }
  // };

  const handleLogout = () => {
    nav('/');
  };

  const handlePageSwitch = () => {
    nav('/userpage');
  };

  const handleTestButtonClick = async () => {
    const recordedData = { blob: 'dummy-audio-blob' };
    const audioBlob = new Blob([recordedData.blob], { type: 'audio/wav' });
    setRecordedAudioURL(URL.createObjectURL(audioBlob));
    try {
      const formData = new FormData()
      formData.append('audio', audioBlob)
      const response = await axios.post('http://127.0.0.1:8000/upload-audio', formData)
      message.success(JSON.stringify(response.data))
      // const test = await axios.get('http://127.0.0.1:8000/test-result')
      // message.success("Result: ", JSON.stringify(test.data))
    } catch (error) {
      message.error('Error while uploading the audio')
    }
  };

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
      <div style={{ marginLeft: '2%', display: 'flex', justifyContent: 'space-between' }}>
        <div>
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
            {/* <Title level={4}>Welcome, {username}</Title> */}
            <Button onClick={handlePageSwitch} icon={<AiOutlineUser />} style={{ marginLeft: '5%' }}>Consultation</Button>
            <Button onClick={handleLogout} icon={<LogoutOutlined />} style={{ marginLeft: '10%' }}>Logout</Button>          
          </Space>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '100%', height: '67vh', padding: '5%', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${test})` }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center'
          , backdropFilter: 'blur(5px)' }}>
            <div style={{ marginRight: '30rem', marginLeft: '4rem', marginBottom: '5%', color: 'white' }}>
              <Row>
                <Col span={24}>
                  <div>
                    <Title level={4} style={{ color: 'white' }}>Hey, have you heard about discovering precise vocal diagnostics through experimental analysis?</Title>
                    <Text style={{fontSize: '16px'}}>That sounds intriguing! Count me in for the journey!</Text>
                  </div>

                  <div style={{ marginBottom: '2%', marginTop: '3%' }} >
                    <Space>
                      <ReactMic
                        record={isRecording}
                        onStop={onStop}
                        onData={onData}
                        mimeType="audio/wav"
                        echoCancellation={true}
                      />
                       <Button 
                       type="primary" 
                       onClick={toggleRecording} 
                       className={isRecording ? 'recording' : ''} 
                       icon={<MdSettingsVoice />}
                       style={{ marginLeft: '10%' }}
                       >
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
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
                      {/* <Upload customRequest={customRequest} onChange={onFileChange}>
                        <Button icon={<UploadOutlined />}>Upload Audio File</Button>
                      </Upload> */}
                      <Button type="primary" onClick={handleTestButtonClick} icon={<AiFillExperiment />}>Start Test</Button>
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