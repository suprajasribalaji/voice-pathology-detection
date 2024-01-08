import React from "react";
import { Typography, Row, Col, Button, message, Upload, Space } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const props = {
  name: 'file',
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const UserTest = () => {
  const navigate = useNavigate();

  const handlePageSwitch = () => {
    navigate('/userpage');
  };

  const handleLogout = () => {
    navigate('/');
  }

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
              <Text>Please record your voice here for 1 second.</Text>
            </div>
            <div style={{marginTop: '4%'}}>
              <Space>
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                <Button type="primary">Record your voice</Button>
              </Space>
            </div>
          </Col>
          <Col offset={4}>
            <Button type="primary" onClick={handlePageSwitch}>Go to Consultation page</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserTest;