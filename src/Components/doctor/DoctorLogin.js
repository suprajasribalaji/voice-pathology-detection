import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { firestore } from '../../firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authenticate = useAuth();

  const handleLogin = async () => {
    const collectionRef = collection(firestore, 'DoctorsDB');
    try {
      const querySnapshot = await getDocs(
        query(collectionRef, where('Email', '==', email), where('Password', '==', password))
      );

      if (!querySnapshot.empty) {
        message.success('Doctor logged in successfully');
        const doctor = querySnapshot.docs[0].data();
        const { name, Email } = doctor;
        authenticate.doctorLogin(name, Email);
        navigate('/doctor');
      } else {
        message.error('Invalid email or password');
        console.log('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
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
          <Input prefix={<UserOutlined />} placeholder="Enter Doctor's Mail Id" onChange={(e) => setEmail(e.target.value)} />
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
          <Button type="primary" onClick={handleLogin}>
            Log in
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: 'right' }}>
  <span>Don't have an account?</span>
  <Form.Item type="link" style={{ fontWeight: 'bold', color: 'white' }}>
    Contact Admin!
  </Form.Item>
</Form.Item>

      </Form>
    </div>
  );
};

export default DoctorLogin;
