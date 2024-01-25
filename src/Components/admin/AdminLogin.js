import React, { useState } from 'react';
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {  firestore } from '../../firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const authenticate = useAuth();
  const handleLogin = async () => {
    const collectionRef = collection(firestore, 'AdminDB');
    try {
      const querySnapshot = await getDocs(
        query(collectionRef, where('Email', '==', email), where('Password', '==', password))
      );
  
      if (!querySnapshot.empty) {
        message.success('Admin logged in successfully');
        const admin = querySnapshot.docs[0].data();
        const {name} = admin;
        authenticate.adminLogin(name);
      } else {
        message.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }

    navigate('/admin');
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
       <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter Admin's Mail Id"
           onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleLogin}>Log in</Button>
        </Form.Item>
        <Form.Item style={{color:'black'}}>
         Login to Access the Admin Portal
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminLogin;
