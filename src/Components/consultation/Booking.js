import React from 'react';
import { Button, Form, Input, DatePicker, message, Typography, Select, Space } from 'antd';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { firestore } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication';
import axios from 'axios';
const { Title, Text } = Typography;
const { Option } = Select;

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const Booking = () => {
  const authenticate = useAuth();
  const user = authenticate.user.userName;
  const doctormail = authenticate.current_doctor.email;
  const doctorname = authenticate.current_doctor.name;
  const [form] = Form.useForm();
  const nav = useNavigate();

  const OnBookAppointment = async (values) => {
    const slotTimestamp = Timestamp.fromDate(values.slot.toDate());
    let status = 'Not Completed'
     const dataToStore = {
      Name: values.name,
      Email: values.email,
      Contact: values.contactnumber,
      Age: values.age,
      Gender: values.gender,
      slot: slotTimestamp,
      Assigned_to:doctormail,
      caseStatus:status,
    };

    try {
      const collectionRef = collection(firestore, 'CasesDB');
      await addDoc(collectionRef, dataToStore);

      const bookresponse = await axios.post("http://localhost:3001/send-email-newcase-doctor",{
        to:doctormail,
        subject:`Hi Dr.${doctorname} You Have A New Case`,
        text:`Patient Name:${values.name} \nPatient Email:${values.email}\nPatient Contact Number:${values.contactnumber}\nPatient Gender:${values.gender}\nTime Slot:${values.slot}`
      })

      if(bookresponse.status===200)
      {
      message.success('Appointment Booked Successfully!');
      nav('/userpage')
      form.resetFields();
      }
    } catch (error) {
      console.error('Error adding Case:', error);
      message.error('Failed to add Case. Please try again.');
    }
  };

  const OnBookAppointmentFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleLogout = () => {
    nav('/');
  };

  return (
    <div>
      <div style={{ marginLeft: '2%', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div>
            <Title level={5}>
              VOICE PATHOLOGY DETECTION
              <br />
              <Text>Test your pathology</Text>
            </Title>
          </div>
        </div>
        <div style={{marginTop: '2%', paddingRight: '2%'}}>
          <Space>
            <Text type="primary" >Welcome {user}</Text>
            <Button type="primary" onClick={handleLogout} style={{marginLeft: '10%'}}>
              Logout
            </Button>
          </Space>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4%' }}>
        <div>
          <Title level={3} style={{ textAlign: 'center' }}>
            Book Your Appointment Here
          </Title>
          <br/>
          <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={OnBookAppointment}
                onFinishFailed={OnBookAppointmentFailed}
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
                    <Input/>
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
                    label="Time slot"
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
    </div>
  );
};

export default Booking;

