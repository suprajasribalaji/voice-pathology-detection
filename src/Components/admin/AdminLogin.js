import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const AdminLogin = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/admin');
    };

    return(
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
                label="Access ID"
                name="adminId"
                rules={[
                    {
                        required: true,
                        message: 'Please input your id!',
                    },
                ]}
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
            >
                <Input.Password />
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