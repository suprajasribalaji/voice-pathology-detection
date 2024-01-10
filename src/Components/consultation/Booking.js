import React from 'react';
import { Button, Form, Input, DatePicker, message, Typography, InputNumber, Select } from 'antd';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { firestore } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
];

const Booking = () => {
    const [form] = Form.useForm();
    const nav = useNavigate();

    const onFinish = async (values) => {
        console.log('Received values of form:', values);

        const slotTimestamp = Timestamp.fromDate(values.slot.toDate());

        const dataToStore = {
            Name: values.name,
            Email: values.email,
            Contact: values.contactnumber,
            Age: values.age,
            Gender: values.gender,
            slot: slotTimestamp,
        };

        try {
            const collectionRef = collection(firestore, 'CasesDB');
            await addDoc(collectionRef, dataToStore);

            message.success('Appointment Booked Successfully!');
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ maxWidth: 600 }}>
                <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                    Book Your Appointment Here
                </Title>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
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
                            {
                                pattern: /^[0-9]*$/,
                                message: 'Please enter only numbers',
                            },
                            {
                                len: 10,
                                message: 'Please enter a 10-digit number',
                            },
                        ]}
                    >
                        <Input addonBefore="+91" />
                    </Form.Item>

                    <Form.Item
                        label="Age"
                        name="age"
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Age',
                            },
                        ]}
                    >
                        <InputNumber min={1} max={120} />
                    </Form.Item>

                    <Form.Item
                        label="Gender"
                        name="gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Gender',
                            },
                        ]}
                    >
                        <Select placeholder="Select gender">
                            {genderOptions.map((option) => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
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
                            Book Appointment
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Booking;
