import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, message, Select } from 'antd';

import { useNavigate } from 'react-router-dom';
 
const { Option } = Select;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
      <Option value="91">+91</Option>
    </Select>
  </Form.Item>
);

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
      <Form
        form={form}
        name="register"
        initialValues={{
          prefix: '91',
        }}
      >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
          />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: 'Please select gender!',
            },
          ]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Not Interested to Disclose</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const UserLogin = () => {
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);
  
  const onCreate = (values) => {
    if(values){
      // console.log('Received values of form: ', values);
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