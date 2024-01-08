import React, { useState } from 'react';
import { Button, Form, Flex, Input, Modal, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="Details of Doctor"
      okText="Create"
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
            layout="vertical"
            name="form_in_modal"
            initialValues={{
            modifier: 'public',
            }}
      >
        <Form.Item
            name="fullname"
            label="Full Name"
            rules={[
                {
                required: true,
                message: 'Please input your name!',
                },
            ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
            name="age"
            label="Age"
            rules={[
                {
                required: true,
                message: 'Please input your age!',
                },
            ]}
        >
          <Input type='number'/>
        </Form.Item>

        <Form.Item
            name="experience"
            label="Years of Experience"
            rules={[
                {
                required: true,
                message: 'Please input your experience!',
                },
            ]}
        >
          <Input type='number'/>
        </Form.Item>

        <Form.Item 
            name="specialization" 
            label="Specialization" 
            rules={[
                {
                required: true,
                message: 'Please input your name!',
                },
            ]}
        >
          <Input type="textarea" />
        </Form.Item>

        <Form.Item
            name="clinic-name"
            label="Clinic Name"
            rules={[
                {
                required: true,
                message: 'Please input your name!',
                },
            ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
            name="contact-number"
            label="Contact Number"
            rules={[
                {
                required: true,
                message: 'Please input your clinic number!',
                },
            ]}
        >
          <Input type='number'/>
        </Form.Item>

        <Form.Item 
            name="clinic-details" 
            label="Address of Clinic" 
            rules={[
                {
                required: true,
                message: 'Please input your clinic details!',
                },
            ]}
        >
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AdminPage = () => {
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);
  const [isListDoctors, setListDoctors] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState([]);
  
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
    const doctorInfo = {
      name: values.fullname,
      age: values.age,
      exp: values.experience,
      spec: values.specialization,
      'clinic-name': values['clinic-name'],
      phno: values['contact-number'],
      address: values['clinic-details'],
    };
    setDoctorDetails([doctorInfo, ...doctorDetails]);
  };

  console.log(doctorDetails);
 
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Years of Experience',
      dataIndex: 'exp',
      key: 'exp',
    },
    {
      title: 'Specialization',
      dataIndex: 'spec',
      key: 'spec',
    },
    {
      title: 'Clinic Name',
      dataIndex: 'clinic-name',
      key: 'clinic-name',
    },
    {
      title: 'Contact Number',
      dataIndex: 'phno',
      key: 'phno',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const listDoctors = () => {
    setListDoctors(true);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={{marginLeft: '2%', marginRight: '2%', marginTop: '2%'}}>
        <div>
          <Flex>
            <Space>
              <h3>Admin Page</h3>
              <Button onClick={handleLogout}>Logout</Button>
            </Space>
          </Flex>
        </div>
        <div>
          <Space>
            <Button type="primary" onClick={ () => { setOpen(true) } }>Add Doctors</Button>
            <Button type="primary" onClick={() => listDoctors()}>List Doctors</Button>
          </Space>
          <CollectionCreateForm
              open={open}
              onCreate={onCreate}
              onCancel={() => {
              setOpen(false);
              }}
          />
        </div>
          { isListDoctors && (
            <div>
              <h3>Doctor's details</h3> 
              <Table columns={columns} dataSource={doctorDetails} />
            </div>
          )}
        <div>          
        </div>
    </div>
  );
};

export default AdminPage;