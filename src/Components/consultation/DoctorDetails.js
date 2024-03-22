import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, Tooltip, Typography } from 'antd';
import { IoCalendar } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../firebase-config';
import { collection,  getDocs } from 'firebase/firestore';
import { useAuth } from '../Authentication';

const { Title } = Typography;

const DoctorDetails = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const authenticate = useAuth();

    useEffect(() => {
        
        const fetchDoctors = async () => {
            try {
                const collectionRef = collection(firestore, 'DoctorsDB');
                const querySnapshot = await getDocs(collectionRef);
                const updatedDoctorDetails = querySnapshot.docs.map((doc) => doc.data());

                setDoctors(updatedDoctorDetails);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    const handleBook = (name,email) => {
        authenticate.setCurrentDoctor(name,email);
        navigate('/bookappointment');
    };

    return (
        <div>
            <Title level={4}>AVAILABLE DOCTORS</Title>
            <br />
                {doctors.map((doctor, index) => (
                    <div key={index}>
                        <Card
                            type="inner"
                            title={
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>{`Dr. ${doctor.name}`}</span>
                                    <Button type="primary" onClick={() => handleBook(doctor.name, doctor.Email)}>
                                        <IoCalendar /> 
                                        <span style={{ marginLeft: '6%' }}>Book Appointment</span>
                                    </Button>
                                </div>
                            }
                        >
                            <div>
                                <p>Years of Experience: {doctor.experience}</p>
                                <p>Specialization: {doctor.specialization}</p>
                                <p>Contact: {doctor.Email}</p>
                                <p>Clinic Address: {doctor.clinicAddress}</p>
                            </div>
                        </Card>
                    <Divider />
                </div>
            ))}
        </div>
    );
};

export default DoctorDetails;
