import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Button, Form, Input, message, Modal, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../firebase-config';
import { hover } from '@testing-library/user-event/dist/hover';

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
      <br />

      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="name"
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
          name="Email"
          label="Email ID"
          rules={[
            {
              required: true,
              message: 'Please input Mail ID!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Password"
          label="Password"
          rules={[
            {
              type: 'password',
              required: true,
              message: 'Please Enter Password!',
            },
          ]}
        >
          <Input />
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
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="specialization"
          label="Specialization"
          rules={[
            {
              required: true,
              message: 'Please input your specialization!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="contactNumber"
          label="Contact Number"
          rules={[
            {
              required: true,
              message: 'Please input contact number!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="clinicAddress"
          label="Address of Clinic"
          rules={[
            {
              required: true,
              message: 'Please input clinic address!',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AdminPage = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isListDoctors, setListDoctors] = useState(false);
  const [isListCases, setListCases] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState([]);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const onCreate = async (values) => {
    try {
      const collectionRef = collection(firestore, 'DoctorDB');
      await addDoc(collectionRef, values);

      const querySnapshot = await getDocs(collectionRef);
      const updatedDoctorDetails = querySnapshot.docs.map((doc) => doc.data());

      setDoctorDetails(updatedDoctorDetails);
      setOpen(false);

      message.success('Doctor added successfully!');
    } catch (error) {
      console.error('Error adding doctor:', error);
      message.error('Failed to add doctor. Please try again.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(firestore, 'DoctorDB');
        const querySnapshot = await getDocs(collectionRef);
        const doctorData = querySnapshot.docs.map((doc) => doc.data());

        setDoctorDetails(doctorData);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Password',
      dataIndex: 'Password_for_Doctor',
      key: 'Password',
    },
    {
      title: 'Years of Experience',
      dataIndex: 'experience',
      key: 'experience',
    },
    {
      title: 'Specialization',
      dataIndex: 'specialization',
      key: 'specialization',
    },
    {
      title: 'Email',
      dataIndex: 'Mail',
      key: 'Mail',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
    {
      title: 'Address',
      dataIndex: 'clinicAddress',
      key: 'clinicAddress',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => <Button type='text' onClick={handleDelete} style={{color: isDeleteClicked?'red':'black'}}>Delete</Button>,
    },
  ];

  const casesColumns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Study_ID',
      dataIndex: 'id',
      key: 'Study_id',
    },
    {
      title: 'Age/Gender',
      dataIndex: 'Age_Gender',
      key: 'Age_Gender',
    },
    {
      title: 'Contact',
      dataIndex: 'Contact',
      key: 'Contact',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Status',
      dataIndex: 'Activated',
      key: 'Activated',
    },



  ];

  const listDoctors = () => {
    setListDoctors(true);
    setListCases(false);
  };

  const listCases = () => {
    setListCases(true);
    setListDoctors(false);
    fetchData('CasesDB');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={{ marginLeft: '2%', marginRight: '2%', marginTop: '2%' }}>
      <div>
        <Space>
          <h3>Admin Page</h3>
          <Button onClick={handleLogout}>Logout</Button>
        </Space>
      </div>
      <div>
        <Space>
          <Button type="primary" onClick={() => setOpen(true)}>
            Add Doctors
          </Button>
          <Button type="primary" onClick={listDoctors}>
            List Doctors
          </Button>
          <Button type="primary" onClick={listCases}>
            List Cases
          </Button>
        </Space>
        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </div>
      {isListDoctors && (
        <div>
          <h3>Doctor's details</h3>
          <Table columns={columns} dataSource={doctorDetails} />
        </div>
      )}
      {isListCases && (
        <div>
          <h3>Cases details</h3>
          <Table columns={casesColumns} dataSource={casesDetails} />
        </div>
      )}
    </div>
  );
};

export default AdminPage;