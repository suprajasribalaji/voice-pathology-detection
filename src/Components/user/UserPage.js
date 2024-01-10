import React, { useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import { useAuth } from '../Authentication';
import DoctorDetails from '../consultation/DoctorDetails';
import Medisync from '../medication/Medisync';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const sideMenuItems = [
  {
    key: 1,
    label: "Doctor Consultation",
  },
  {
    key: 2,
    label: "Medisync",
  },
];

const UserPage = () => {
  const authenticate = useAuth();
  const username = authenticate.user;
  console.log(username);

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
  }

  return (
    <Layout>
      <Header
        style={{
          color:'white',
          paddingBottom: '10%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div>
              VOICE PATHOLOGY DETECTION
            </div>
            <div>
              Test your pathology
            </div>
          </div>
          <div>
            <p>Welcome S{username}</p>
          </div>
          <div>
            <Button type='primary' onClick={handleLogout}>Logout</Button>
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
                <Menu.Item key={item.key}>
                  {item.label}
                </Menu.Item>
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
