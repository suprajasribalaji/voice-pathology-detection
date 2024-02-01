import React, { useState } from 'react';
import { Button, Layout, Menu, Typography, theme } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../Authentication';
import DoctorDetails from '../consultation/DoctorDetails';
import Medisync from '../medication/Medisync';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

const sideMenuItems = [
  {
    key: '1',
    label: 'Doctor Consultation',
  },
  {
    key: '2',
    label: 'Medisync',
  },
];

const UserPage = () => {
  const authenticate = useAuth();
  const username = authenticate.user.userName;
  // const useremail = authenticate.user.userEmail
  const navigate = useNavigate();

  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onChange = (value) => {
    setSelectedMenuItem(value.key);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Layout>
      <Header
        style={{
          backgroundColor: '#001529', 
          color: 'white',            
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px 16px',          
        }}
      >
        <div style={{ display: 'flex'}}>
          <div style={{ flexDirection: 'column' }}>
            <Title level={5} style={{color: 'white'}}>
              VOICE PATHOLOGY DETECTION
              <br/>
              <Text style={{color: 'white'}}>Test your pathology</Text>
            </Title>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '1%' }}>
          <div style={{ marginRight: '30px' }}>
            <p><UserOutlined /> Welcome {username}</p>
          </div>
          <div>
              <Button onClick={handleLogout} icon={<LogoutOutlined />} style={{ marginLeft: '8%' }}>Logout</Button>
          </div>
        </div>
      </Header>
      <Content
        style={{
          padding: '1%',
          height: 'calc(100vh - 138px)',
        }}
      >
        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            height: '100%',
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={180}
          >
            <Menu
              mode="inline"
              selectedKeys={[selectedMenuItem]}
              style={{ 
                height: '100%',
              }}
              onClick={onChange}
            >
              {sideMenuItems.map((item) => (
                <Menu.Item key={item.key}>{item.label}</Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
              overflow: 'auto',
            }}
          >
            {selectedMenuItem === '1' ? <DoctorDetails /> : <Medisync />}
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Voice Pathology Detection © 2024 Created by Team 2
      </Footer>
    </Layout>
  );
};

export default UserPage;
