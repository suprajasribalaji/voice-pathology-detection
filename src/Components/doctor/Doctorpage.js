import { Button, Table } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';  
import { firestore } from '../../firebase-config';

const DoctorPage = () => {
    const navigate = useNavigate();
    const [isListCases, setListCases] = useState(false);
    const [casesDetails, setCasesDetails] = useState([]);

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
                <Button type="primary" onClick={() => handlePick(record.id)}>
                    Pick
                </Button>
            ),
        },
    ];

    const handlePick = (caseId) => {

        console.log(`Picked case with ID: ${caseId}`);
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
