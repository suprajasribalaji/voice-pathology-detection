import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Table, InputNumber, message } from 'antd';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { collection, getDocs ,doc,deleteDoc} from 'firebase/firestore';
import { firestore } from '../../firebase-config';
import axios from 'axios';
import { useAuth } from "../Authentication";

let formInstance;

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    formInstance = form;

    useEffect(() => {
        form.setFieldsValue({
            reportDate: moment(),
        });
    }, [open]);

    return (
        <Modal
            visible={open}
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
                            type: 'date',
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
                    initialValue={''}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="patientage"
                    label="Patient Age"
                    rules={[
                        {
                            
                            required: true,
                            min:1,
                            max:3, 
                            message: 'Please input the patient age!',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    name="Email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: 'Please Enter your Mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="Study_ID"
                    label="Study_ID"
                    rules={[
                        {
                            required: true,
                            message: 'Please Enter your Study_ID!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="Contact"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please Enter Your Phone Number!',
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="caseHistory"
                    label="Case History"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the case history!',
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="assessmentFindings"
                    label="Assessment Findings"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the assessment findings!',
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="voiceEvaluation"
                    label="Voice Evaluation"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the voice evaluation!',
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="fluencyEvaluation"
                    label="Fluency Evaluation"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the fluency evaluation!',
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="diagnosisImpression"
                    label="Diagnosis Impression"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the diagnosis impression!',
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="prognosis"
                    label="Prognosis"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the prognosis!',
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const DoctorPage = () => {

    const authenticate = useAuth();
    const doctorname = authenticate.doctor;
    const navigate = useNavigate();
    const [isListCases, setListCases] = useState(false);
    const [casesDetails, setCasesDetails] = useState([]);
    const [open, setOpen] = useState(false);

    const Generate = async (values) => {
        console.log('Received values of form: ', values);
        
    
        try {
            
            const emailResponse = await axios.post('http://localhost:3001/send-email', {
                to: values.Email,
                subject: 'Evaluation Report',
                text: `Patient Name: ${values.patientName}\nPatient Age: ${values.patientage}\nCase History: ${values.caseHistory}\nAssessment Findings: ${values.assessmentFindings}\nVoice Evaluation: ${values.voiceEvaluation}\nFluency Evaluation: ${values.fluencyEvaluation}\nDiagnosis Impression: ${values.diagnosisImpression}\nPrognosis: ${values.prognosis}`,
            });
    
            console.log('Email Response:', emailResponse.data);
            if (emailResponse.status === 200) {
                message.success('Email Sent successfully');
            }
    
            
            const smsResponse = await axios.post('http://localhost:3001/send-sms', {
                to: values.Contact, 
                text: 'Your Report has been Generated. Check the Mail Now ',
            });
            
            console.log('SMS Response:', smsResponse.data);
            if(smsResponse.status===201)
            {
                message.success("Message Sent Succesfully")
            }
            message.success("Case Completed Successfully")

            const caseRef = doc(firestore, 'CasesDB', values.Study_ID);
        console.log('Case Reference: ', caseRef);

        await deleteDoc(caseRef);

        console.log('Case deleted successfully.');

        message.success('Case deleted successfully.');



    
            setOpen(false);
        } catch (error) {
            console.error('Error sending email and SMS:', error);
        }
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

    const handlePick = (caseId) => {
        console.log(`Picked case with ID: ${caseId}`);

        const selectedPatient = casesDetails.find(patient => patient.id === caseId);

        formInstance.setFieldsValue({
            reportDate: moment(),
            patientName: selectedPatient.Name || '',
            patientage: selectedPatient.Age || '',
            Email: selectedPatient.Email || '',
            Contact:selectedPatient.Contact || '',  
            Study_ID:selectedPatient.id||' '
        });

        setOpen(true);
    };

    const listCases = () => {
        setListCases(true);
        fetchData('CasesDB');
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
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div>
                    <Button type="primary" onClick={() => handlePick(record.id)}>Pick</Button>
                    <CollectionCreateForm
                        open={open}
                        onCreate={Generate}
                        onCancel={() => {
                            setOpen(false);
                        }}
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            <div>
                Welcome {doctorname}.!!
                <Button type="primary" onClick={handleLogout} style={{ marginLeft: '3%' }}>Logout</Button>
            </div>

            <Button type="primary" onClick={listCases}>
                List Cases
            </Button>

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
