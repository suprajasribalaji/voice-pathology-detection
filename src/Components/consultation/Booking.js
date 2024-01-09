import React from 'react';
import { Button, Form, Input, DatePicker, message } from 'antd';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { firestore } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
    const [form] = Form.useForm();
    const nav = useNavigate();

    const onFinish = async (values) => {
        console.log('Received values of form:', values);

        const slotTimestamp = Timestamp.fromDate(values.slot.toDate());

        const dataToStore = {
            Name: values.name,
            Email:values.email,
            Contact: values.contactnumber,
            Age_Gender: values.age_gender,
            slot: slotTimestamp,
        };

        try {
            const collectionRef = collection(firestore, 'CasesDB');
            await addDoc(collectionRef, dataToStore);

            message.success('Case added successfully!');
            nav('/userpage');
            form.resetFields();
        } catch (error) {
            console.error('Error adding Case:', error);
            message.error('Failed to add Case. Please try again.');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (date, dateString) => {
        console.log(date, dateString);
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
                form={form}  
            >
                <Form.Item
                    label="Full name"
                    name="name" 
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
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please Enter Your Mail',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Contact Number"
                    name="contactnumber"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your contact number!',
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item
                    label="Age/Gender"
                    name="age_gender"
                    rules={[
                        {
                            required: true,
                            message: 'Please Enter Age/Gender',
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
                    <DatePicker showTime onChange={onChange} />
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
