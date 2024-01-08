import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, message } from 'antd';

import UserSignup from './UserSignup';
import { useNavigate } from 'react-router-dom';

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create a new account"
      okText="Register"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <br/>
      <UserSignup/>
    </Modal>
  );
};

const UserLogin = () => {
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);
  
  const onCreate = (values) => {
    if(values){
      console.log('Received values of form: ', values);
      message.success('Account created successfully! Please login to continue');
      setOpen(false);
    } else {
      message.error('Account creation failed! Please try again with filling all the fields correctly');
    }
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const handleLogin = () => {
    navigate('/usertest');
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
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
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
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleLogin}>Log in</Button>
        </Form.Item>

        <Form.Item>
          Don't have an account?
          <Button type="link" onClick={() => { setOpen(true) }}>Register Now!</Button>
          <CollectionCreateForm
            open={open}
            onCreate={onCreate}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserLogin; 