import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };  

    return (
        <div>
            <div>
                Welcome Doctor!
                <Button type="primary" onClick={handleLogout} style={{marginLeft: '3%'}}>Logout</Button>
            </div>
        </div>
    );
};

export default DoctorPage;