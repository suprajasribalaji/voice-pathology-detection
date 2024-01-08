import React, { useState } from 'react';
import { Cascader, Button, Typography } from 'antd';
import AdminLogin from './admin/AdminLogin';
import UserLogin from './user/UserLogin';
//tamil changing
const { Title, Text } = Typography;

const options = [
      {
        label: 'User',
        value: 'user',
      },
      {
        label: 'Admin',
        value: 'admin',
      },
];

const displayRender = (labels) => labels[labels.length - 1];

const Dashboard = () => {
  const [currentAccess, setCurrentAccess] = useState("");

  const onChange = (value) => {
    // console.log(value);
    setCurrentAccess(value[0]);
  };

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
            <Button type="link" style={{fontSize: '15px'}}>LOGIN</Button>
          </Cascader>
        </div>
      </div>
      <div style={{ marginLeft: '16%' }}>
        <div>
          {currentAccess === 'admin' ? <AdminLogin/> : <UserLogin/> }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
