import React, { useState } from "react";
import { ReactMic } from "react-mic";
import { Typography, Row, Col, Button, message, Upload, Space } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const UserTest = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioURL, setRecordedAudioURL] = useState(null);

  const navigate = useNavigate();

  const handlePageSwitch = () => {
    navigate('/userpage');
  };

  const handleLogout = () => {
    navigate('/');
  };

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

  return (
    <div>
      <div style={{marginTop: '1%', marginLeft: '82%'}}>
        <Space>
          <Text type="secondary">Welcome Supraja</Text>
          <Button type="primary" onClick={handleLogout} style={{marginLeft: '25%'}}>Logout</Button>
        </Space>
      </div>
      <div style={{ justifyContent: 'center', marginTop: '3%', padding: '10%', paddingTop: '10%' }}>
        <Row>
          <Col>
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
            <div style={{marginTop: '4%'}}>
              <Space>
                <Upload>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Space>
            </div>
            <div style={{marginTop: '2%'}}>
            <Button type="primary" onClick={startRecording} disabled={isRecording}>Start</Button>
              <ReactMic
                record={isRecording}
                onStop={onStop}
                onData={onData}
               />
              <Button onClick={stopRecording} disabled={!isRecording}>Stop</Button>
            </div>
            <div style={{marginTop:'2%'}}>
            {recordedAudioURL && (
              <audio controls>
                <source src={recordedAudioURL} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            )}
            </div>
            <div style={{marginTop: '4%'}}>
              <Button type="primary" onClick={handlePageSwitch}>Go to Consultation page</Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserTest;
