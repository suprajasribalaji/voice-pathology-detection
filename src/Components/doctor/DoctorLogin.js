import React, { useState } from 'react';
import { app, firestore } from '../../firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

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

  const handleLogin = async () => {
    const collectionRef = collection(firestore, 'DoctorDB');
    console.log(collectionRef);

    try {
      console.log(email, password);
      const querySnapshot = await getDocs(
        query(collectionRef, where('Email', '==', email), where('Password', '==', password))
      );

      if (!querySnapshot.empty) {
        message.success('User logged in successfully');
        console.log('User logged in successfully');
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
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Doctor Mail"
          name="doctorId"
          rules={[
            {
              required: true,
              message: 'Please input your Mail Id!',
            },
          ]}
          onChange={(e) => setEmail(e.target.value)}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          onChange={(e) => setPassword(e.target.value)}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" onClick={handleLogin}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DoctorLogin;
