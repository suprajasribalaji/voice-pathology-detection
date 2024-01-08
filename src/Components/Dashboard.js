import React, { useState } from 'react';
import { Cascader, Button, Typography } from 'antd';
import AdminLogin from './admin/AdminLogin';
import UserLogin from './user/UserLogin';
import DoctorPage from './doctor/Doctorpage';

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
    <div style={{ display: 'flex', marginTop: '5%', padding: '10%', paddingTop: '10%' }}>
      <div>
        <div>
          <Title level={2}>
            VOICE PATHOLOGY DETECTION
            <br />
            <Text>Test your pathology</Text>
          </Title>
        </div>
        <div>
          <Cascader
            options={options}
            expandTrigger="hover"
            displayRender={displayRender}
            onChange={onChange}
          >
            <Button type="link" style={{ fontSize: '15px' }}>LOGIN</Button>
          </Cascader>
        </div>
      </div>
      <div style={{ marginLeft: '16%' }}>
        <div>
          {currentAccess === 'admin' ? <AdminLogin /> : (currentAccess === 'doctor' ? <DoctorPage /> : <UserLogin />)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
