import React, { useState } from 'react';
import { app, firestore } from '../../firebase-config';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
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
    console.log(collectionRef);
  
    try {
    console.log(email,password);
      const querySnapshot = await getDocs(
        query(collectionRef, where('Email', '==', email), where('Password', '==', password))
      );
  
      if (!querySnapshot.empty) {
        message.success('User logged in successfully');
        const admin = querySnapshot.docs[0].data();
        const {name} = admin;
        console.log(name)
        authenticate.adminLogin(name);
        console.log('Admin logged in successfully',name);
        navigate('/usertest');
        console.log('User logged in successfully');
      } else {
        message.error('Invalid email or password');
        console.log('Invalid email or password');
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
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input Email id!',
            },
          ]}
          onChange={(e) => setEmail(e.target.value)}
        >
          <Input  />
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
        >
          <Input.Password 
            onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" onClick={handleLogin}>Login</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminLogin;
