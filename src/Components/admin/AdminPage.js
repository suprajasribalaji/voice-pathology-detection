import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Button, Form, Input, message, Modal, Space, Table, Popconfirm, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../firebase-config';
import axios from 'axios'

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
          name="contactNumber"
          label="Contact Number"
          rules={[
            {
              required: true,
              message: 'Please input contact number!',
            },
          ]}
        >
          <Input type="telephone"/>
        </Form.Item>

        <Form.Item
          name="Password"
          label="Set Password For Doctor"
          rules={[
            {
              required: true,
              message: 'Please Enter Password!',
            },
          ]}
        >
          <Input type="password" />
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
  const [casesDetails, setCasesDetails] = useState([]);

  const handleCreatenewDoctor = async (values) => {
    try {
      const collectionRef = collection(firestore, 'DoctorDB');
      await addDoc(collectionRef, values);
      const querySnapshot = await getDocs(collectionRef);
      const updatedDoctorDetails = querySnapshot.docs.map((doc) => doc.data());
      setDoctorDetails(updatedDoctorDetails);
      const newaccount_mail = await axios.post("http://localhost:3001/send-mail-newaccount-doctor", {
        to: values.Email,
        subject: `Welcome Dr.${values.name} Your New Account Has Been Created..!!`,
        text: `Note Please Keep your ACCESS CREDIENTIALS in Secure Manner \n Gmail:${values.Email}\n Password:${values.Password}`,
      })
      setOpen(false);
      if (newaccount_mail.status === 200) {
        message.success('Doctor added successfully!');
      }
      else {
        console.error("Errorrrrrrr")
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      message.error('Failed to add doctor. Please try again.');
    }
  };


  const handleDelete = async (record) => {
    try {
      const collectionRef = collection(firestore, 'DoctorDB');
      await deleteDoc(doc(collectionRef, record.id));
      message.success('Doctor deleted successfully!');
      fetchData('DoctorDB');
    } catch (error) {
      console.error('Error deleting doctor:', error);
      message.error('Failed to delete doctor. Please try again.');
    }
  };


  const fetchData = async (collectionName) => {
    try {
      const collectionRef = collection(firestore, collectionName);
      const querySnapshot = await getDocs(collectionRef);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (collectionName === 'DoctorDB') {
        setDoctorDetails(data);
      } else if (collectionName === 'CasesDB') {
        setCasesDetails(data);
      }
    } catch (error) {
      console.error(`Error fetching ${collectionName} data:`, error);
    }
  };

  useEffect(() => {
    fetchData('DoctorDB');
  }, [isListDoctors]);

  useEffect(() => {
    fetchData('CasesDB');
  }, [isListCases]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Password',
      dataIndex: 'Password',
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
      dataIndex: 'Email',
      key: 'Email',
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
      render: (text, record) => (
        <Space size="middle">

          <Popconfirm
            title="Are you sure you want to delete this doctor?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
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
      title: 'Age',
      dataIndex: 'Age',
      key: 'Age',
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
      key: 'Gender',
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
      title: 'Assigned To',
      dataIndex: 'Assigned_to',
      key: 'Assigned_to',
    },
    {
      title: 'Case Status',
      dataIndex: 'caseStatus',
      key: 'caseStatus',
      render: (text, record) => (
        <span style={{ color: record.caseStatus === 'Not Completed' ? 'red' : 'green' }}>
          {text}
        </span>
      ),
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
    <div style={{ margin: '2%' }}>
      <Card title="Admin Page" extra={<Button onClick={handleLogout}>Logout</Button>}>
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
      </Card>

      {isListDoctors && (
        <Card title="Doctor's Details" style={{ marginTop: '2%' }}>
          <Table columns={columns} dataSource={doctorDetails} />
        </Card>
      )}
      {isListCases && (
        <Card title="Cases Details" style={{ marginTop: '2%' }}>
          <Table columns={casesColumns} dataSource={casesDetails} />
        </Card>
      )}

      <CollectionCreateForm
        open={open}
        onCreate={handleCreatenewDoctor}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default AdminPage;
