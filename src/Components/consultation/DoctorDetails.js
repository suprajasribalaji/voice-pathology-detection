import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const { Title } = Typography;

const DoctorDetails = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        
        const fetchDoctors = async () => {
            try {
                const collectionRef = collection(firestore, 'DoctorDB');

                
                const querySnapshot = await getDocs(collectionRef);
                const updatedDoctorDetails = querySnapshot.docs.map((doc) => doc.data());

                setDoctors(updatedDoctorDetails);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    const handleConsult = () => {
        navigate('/bookappointment');
    };

    return (
        <div>
            <Title level={4}>AVAILABLE DOCTORS</Title>
            <br />
            {doctors.map((doctor, index) => (
                <div key={index}>
                    <Card type="inner" title={`Dr. ${doctor.name}`}>
                        <div>
                            <p>Years of Experience: {doctor.experience}</p>
                            <p>Specialization: {doctor.specialization}</p>
                            <p>Contact: {doctor.email}</p>
                            <p>Clinic Address: {doctor.clinicAddress}</p>
                            <div style={{ marginTop: '2%' }}>
                                <Button type="primary" onClick={handleConsult}>
                                    Book Appointment
                                </Button>
                            </div>
                        </div>
                    </Card>
                    <Divider />
                </div>
            ))}
        </div>
    );
};

export default DoctorDetails;
