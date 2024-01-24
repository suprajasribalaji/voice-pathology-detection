import React, { useState } from 'react';
import { Cascader, Button, Typography } from 'antd';
import AdminLogin from './admin/AdminLogin';
import UserLogin from './user/UserLogin';
import DoctorLogin from './doctor/DoctorLogin';
import loginImage from '../images/login2.jpg';  // Import the image

const { Title, Text } = Typography;

const Dashboard = () => {
  const [currentAccess, setCurrentAccess] = useState("");

  const onChange = (value) => {
    setCurrentAccess(value[0]);
  };

  const options = [
    {
      label: 'User',
      value: 'user',
    },
    {
      label: 'Admin',
      value: 'admin',
    },
    {
      label: 'Doctor',
      value: 'doctor',
    },
  ];

  const displayRender = (labels) => labels[labels.length - 1];

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', backgroundColor: 'white', backgroundImage: `url(${loginImage})`, backgroundSize: 'cover', backgroundPosition: 'center', alignItems: 'center', justifyContent: 'center' }}>
  <div className='divContainer' style={{ display: 'flex', width: '60%', height: '56%', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.8)' }}>
    <div style={{ paddingLeft: '8%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <Title level={2}>
          VOICE PATHOLOGY DETECTION
          <br />
          <Text>Test your pathology</Text>
        </Title>
      </div>
      <div style={{ marginLeft:'46%' }}>
        <Cascader
          options={options}
          expandTrigger="hover"
          displayRender={displayRender}
          onChange={onChange}
        >
          <Button type="link" style={{ fontSize: '20px', color: 'black', }}>LOGIN</Button>
        </Cascader>
      </div>
    </div>
    <div style={{ flex: 1, padding: '8%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        {currentAccess === 'admin' ? <AdminLogin /> : (currentAccess === 'doctor' ? <DoctorLogin /> : <UserLogin />)}
      </div>
    </div>
  </div>
</div>

  );
};

export default Dashboard;
