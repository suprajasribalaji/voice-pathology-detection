import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Radio, Table } from 'antd';
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';  
import { firestore } from '../../firebase-config';

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title="Evaluation Report"
        okText="Generate"
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
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: 'public',
          }}
        >
            <Form.Item
            name="reportDate"
            label="Report Date"
            rules={[
              {
                tyoe: 'date',
                required: true,
                message: 'Please input the report date!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="patientName"
            label="Patient Name"
            rules={[
              {
                required: true,
                message: 'Please input the patient name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="patientage"
            label="Patient Age"
            rules={[
              {
                type: 'number',
                required: true,
                message: 'Please input the patient age!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dob"
            label="DOB"
            rules={[
              {
                required: true,
                message: 'Please input the patient date of birth!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="examiner"
            label="Examiner"
            rules={[
              {
                required: true,
                message: 'Please input the examiner!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            name="caseHistory" 
            label="Case History"
            rules={[
                {
                    required: true,
                    message: 'Please input the case history!',
                }
            ]}>
            <Input type="textarea" />
          </Form.Item>

          <Form.Item 
            name="assessmentFindings" 
            label="Assessment Findings"
            rules={[
                {
                    required: true,
                    message: 'Please input the assessment findings!',
                }
            ]}>
            <Input type="textarea" />
          </Form.Item>

          <Form.Item 
            name="voiceEvaluation" 
            label="Voice Evaluation"
            rules={[
                {
                    required: true,
                    message: 'Please input the voice evaluation!',
                }
            ]}>
            <Input type="textarea" />
          </Form.Item>

          <Form.Item 
            name="fluencyEvaluation" 
            label="Fluency Evaluation"
            rules={[
                {
                    required: true,
                    message: 'Please input the fluency evaluation!',
                }
            ]}>
            <Input type="textarea" />
          </Form.Item>

          <Form.Item 
            name="diagnosisImpression" 
            label="Diagnosis Impression"
            rules={[
                {
                    required: true,
                    message: 'Please input the diagnosis impression!',
                }
            ]}>
            <Input type="textarea" />
          </Form.Item>

          <Form.Item 
            name="prognosis" 
            label="Prognosis"
            rules={[
                {
                    required: true,
                    message: 'Please input the prognosis!',
                }
            ]}>
            <Input type="textarea" />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

const DoctorPage = () => {
    const navigate = useNavigate();
    const [isListCases, setListCases] = useState(false);
    const [casesDetails, setCasesDetails] = useState([]);
    const [open, setOpen] = useState(false);
  
    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setOpen(false);
    };

    const handleLogout = () => {
        navigate('/');
    };  

    useEffect(() => {
        fetchData('CasesDB');
    }, [isListCases]);

    const fetchData = async (collectionName) => {
        try {
            const collectionRef = collection(firestore, collectionName);
            const querySnapshot = await getDocs(collectionRef);
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,  
                ...doc.data(),
            }));

            setCasesDetails(data);
        } catch (error) {
            console.error(`Error fetching ${collectionName} data:`, error);
        }
    };

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
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div>  
                    <Button type="primary" onClick={() => handlePick(record.id)}>Pick</Button>
                    <CollectionCreateForm
                        open={open}
                        onCreate={onCreate}
                        onCancel={() => {
                        setOpen(false);
                        }}
                    />
              </div>
            ),
        },
    ];

    const handlePick = (caseId) => {
        console.log(`Picked case with ID: ${caseId}`);
        setOpen(true);
    };

    const listCases = () => {
        setListCases(true);
        fetchData('CasesDB');
    };

    return (
        <div>
            <div>
                Welcome Doctor!
                <Button type="primary" onClick={handleLogout} style={{ marginLeft: '3%' }}>Logout</Button>
            </div>

            <Button type="primary" onClick={listCases}>
                List Cases
            </Button>

            {/* Render the casesDetails in a table */}
            {isListCases && (
                <div>
                    <h3>Cases details</h3>
                    <Table columns={casesColumns} dataSource={casesDetails} />
                </div>
            )}
        </div>
    );
};

export default DoctorPage;
