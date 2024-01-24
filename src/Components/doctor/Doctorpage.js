import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Table, message } from 'antd';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, where, query, updateDoc } from 'firebase/firestore';
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
                            min: 1,
                            max: 3,
                            message: 'Please input the patient age!',
                        },
                    ]}
                >
                    <Input />
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
    const doctorname = authenticate.doctor.name;
    const doctormail = authenticate.doctor.email;
    const navigate = useNavigate();
    const [casesDetails, setCasesDetails] = useState([]);
    const [open, setOpen] = useState(false);

    const Generate = async (values) => {
        try {

            const emailResponse = await axios.post('http://localhost:3001/send-email-report', {
                to: values.Email,
                subject: 'Evaluation Report',
                text: `Patient Name: ${values.patientName}\nPatient Age: ${values.patientage}\nCase History: ${values.caseHistory}\nAssessment Findings: ${values.assessmentFindings}\nVoice Evaluation: ${values.voiceEvaluation}\nFluency Evaluation: ${values.fluencyEvaluation}\nDiagnosis Impression: ${values.diagnosisImpression}\nPrognosis: ${values.prognosis}`,
            });

            if (emailResponse.status === 200) {
                message.success('Email Sent successfully');
            }

            const smsResponse = await axios.post('http://localhost:3001/send-sms', {
                to: values.Contact,
                text: 'Your Report has been Generated. Kindly check the Mail Now ',
            });

            if (smsResponse.status === 201) {
                message.success("Message Sent Succesfully")
            }
            message.success("Case Completed Successfully")
            const caseRef = doc(firestore, 'CasesDB', values.Study_ID);
            await updateDoc(caseRef, { caseStatus: `Completed By DR.${doctorname}`});
            setOpen(false);
        } catch (error) {
            console.error('Error sending email and SMS:', error);
        }
    };





    const handleLogout = () => {
        navigate('/');
    };

    const fetchData = async (collectionName) => {
        try {
            const collectionRef = collection(firestore, collectionName);
            const querySnapshot = await getDocs(
                query(
                    collectionRef,
                    where('Assigned_to', '==', doctormail),
                     where('caseStatus', '==', 'Not Completed')
                )
            );
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCasesDetails(data);
        } catch (error) {
            console.error(`Error fetching ${collectionName} data:`, error);
        }
    };
    
    useEffect(() => {
        fetchData('CasesDB');
    }, [Generate]);


    const handlePick = (caseId) => {
        const selectedPatient = casesDetails.find(patient => patient.id === caseId);
        formInstance.setFieldsValue({
            reportDate: moment(),
            patientName: selectedPatient.Name || '',
            patientage: selectedPatient.Age || '',
            Email: selectedPatient.Email || '',
            Contact: `+91 ${selectedPatient.Contact || ''}`,
            Study_ID: selectedPatient.id || ' '
        });
        setOpen(true);
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Welcome {doctorname}!</h2>
                <h2>Assigned Cases</h2>
                <Button type="primary" onClick={handleLogout}>Logout</Button>
            </div>
            <div>
                <h3>Cases details</h3>
                <Table columns={casesColumns} dataSource={casesDetails} />
            </div>

        </div>
    );
};

export default DoctorPage;
