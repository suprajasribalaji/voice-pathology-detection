import React from 'react';
import { Button, Form, Input, DatePicker, TimePicker } from 'antd';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const onChange = (date, dateString) => {
    console.log(date, dateString);
};

const Booking = () => {
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
                label="Full name"
                name="fullname"
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
                label="Contact Number"
                name="contactNumber"
                rules={[
                    {
                    required: true,
                    message: 'Please input your contact number!',
                    },
                ]}
                >
                <Input type='number'/>
                </Form.Item>

                <Form.Item
                label="Is this your first consultation?"
                name="newUser"
                rules={[
                    {
                    required: true,
                    message: 'Please input yes or no!',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                    label="Select your time slot"
                    name="slot"
                    rules={[
                        {
                        required: true,
                        message: 'Please pick your slot!',
                        },
                    ]}
                >
                    <DatePicker onChange={onChange} />
                </Form.Item>

                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Button type="primary" htmlType="submit">
                    Book
                </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Booking;

//name
//phone number
//first consultation --> No --->> upload previous reports
//slot (date and time picker)