import React, { useState } from 'react';
import { Button, Layout, Menu, Typography, theme } from 'antd';
import { useAuth } from '../Authentication';
import DoctorDetails from '../consultation/DoctorDetails';
import Medisync from '../medication/Medisync';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

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
  const username = authenticate.user;

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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          paddingBottom: '10%',
          justifyContent: 'center',
        }}
      >
        <div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Title level={3} style={{ margin: 0 }}>
              VOICE PATHOLOGY DETECTION
            </Title>
            <div>Test your pathology</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '10px' }}>
            <p>Welcome {username}</p>
          </div>
          <div>
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </Header>
      <Content
        style={{
          padding: '1%',
          height: 'calc(100vh - 134px)',
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
            width={200}
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
