import React, { useState } from 'react';
import { Button, Space, Typography } from 'antd';
import AdminLogin from './admin/AdminLogin';
import UserLogin from './user/UserLogin';
import DoctorLogin from './doctor/DoctorLogin';
import loginImage from '../images/login2.jpg';

const { Title, Text } = Typography;

const Dashboard = () => {
  const [currentAccess, setCurrentAccess] = useState('User');

  const handleAccessChange = (access) => {
    setCurrentAccess(access);
  };

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', backgroundColor: 'white', backgroundImage: `url(${loginImage})`, backgroundSize: 'cover', backgroundPosition: 'center', alignItems: 'center', justifyContent: 'center' }}>
      <div className='divContainer' style={{ display: 'flex', width: '60%', height: '56%', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.12)' }}>
        <div style={{ paddingLeft: '8%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
          <div>
            <Title level={2}>
              VOICE PATHOLOGY DETECTION
              <br />
              <Text>Test your pathology</Text>
            </Title>
          </div>
        </div>
        <div style={{ flex: 1, paddingTop: '3%', marginRight: '12%' }}>
          <Space>
            <Button
              type='link'
              style={{ color: 'black', fontSize: '16px', border: 'none', borderBottom: currentAccess === 'User' ? '2px solid #1890ff' : 'none' }}
              onClick={() => handleAccessChange('User')}
              onMouseEnter={() => handleAccessChange('User')}
            >
              USER
            </Button>
            <Button
              type='link'
              style={{ color: 'black', fontSize: '16px', border: 'none', borderBottom: currentAccess === 'Doctor' ? '2px solid #1890ff' : 'none' }}
              onClick={() => handleAccessChange('Doctor')}
              onMouseEnter={() => handleAccessChange('Doctor')}
            >
              DOCTOR
            </Button>
            <Button
              type='link'
              style={{ color: 'black', fontSize: '16px', border: 'none', borderBottom: currentAccess === 'Admin' ? '2px solid #1890ff' : 'none' }}
              onClick={() => handleAccessChange('Admin')}
              onMouseEnter={() => handleAccessChange('Admin')}
            >
              ADMIN
            </Button>
          </Space>
          <div style={{ borderRadius: '20px', height: '80%', width: '120%', paddingTop: '2%', paddingLeft: '3%', marginTop: '4%', background: 'rgba(255, 255, 255, 0.7)', fontWeight: 'bold'}}>
            <div style={{ marginTop: '4%', marginLeft: '18%' }}>
              <Text style={{ fontSize: '18px' }}>Welcome {currentAccess}!!</Text>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', alignItems: 'center', paddingTop: '4%', marginTop: '2%' }}>
              {currentAccess === 'Admin' ? <AdminLogin /> : currentAccess === 'Doctor' ? <DoctorLogin /> : <UserLogin />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
