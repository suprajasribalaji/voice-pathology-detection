import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs,deleteDoc,doc } from 'firebase/firestore';
import { Button, Form, Input, message, Modal, Space, Table,Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../firebase-config';

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
          name="Password"
          label="Password_For_Doctor"
          rules={[
            {
              required: true,
              message: 'Please Enter Password!',
            },
          ]}
        >
          <Input type="number" />
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
          <Input type="number" />
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
