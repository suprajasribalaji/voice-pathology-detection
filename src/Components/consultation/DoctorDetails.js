import React from 'react';
import { Button, Card, Divider, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const DoctorDetails = () => {
    const navigate = useNavigate();

    const handleConsult = () => {
        navigate('/bookappointment');
    };

    return(
        <div>
            <Title level={4}>AVAILABLE DOCTORS</Title>
            <br/>
            <Card type="inner" title="Dr. Name">
                <div>
                    Age
                    Years of Experience
                    Specialization
                    <div style={{marginTop: '2%'}}>
                        <Button type="primary" onClick={handleConsult}>Book Appointment</Button>
                    </div>
                </div>
            </Card>
            <Divider/>
            <Card type="inner" title="Dr. Name">
                <div>
                    Age
                    Years of Experience
                    Specialization
                    <div style={{marginTop: '2%'}}>
                        <Button type="primary" onClick={handleConsult}>Book Appointment</Button>
                    </div>
                </div>
            </Card>
            <Divider/>
        </div>
    );
};

export default DoctorDetails;