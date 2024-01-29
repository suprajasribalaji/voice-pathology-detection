import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Space, message, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Authentication"
import { firestore } from '../../firebase-config';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const Medisync = () => {
    const navigate = useNavigate();
    const authenticate = useAuth();
    const useremail = authenticate.user.userEmail;
    const [isViewCart, setViewCart] = useState(false);
    const collectionRef = collection(firestore, 'MedicinesDB');
    const [mycart, setMycart] = useState([]);
    const handleAddToCart = async (medicine_name) => {
        try {
            await addDoc(collectionRef, {
                MedicineName: medicine_name,
                User_Mail: useremail,
            });
            message.success('Added to cart');
        } catch (error) {
            console.log(error);
        }
    };

    const cart_columns = [
        {
            title: 'Medicine Name',
            dataIndex: 'MedicineName',
            key: 'MedicineName'
        }
    ];

    const handleMycart = async () => {
        try {
            const  querySnapshot =  await getDocs(query(collectionRef, where('User_Mail', '==', useremail)));
            const cartItems = [];
            
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                cartItems.push({
                    key: doc.id,
                    MedicineName: data.MedicineName,
                });
            });
            
            setMycart(cartItems);
            setViewCart(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect (()=>{
        if (isViewCart) {
            handleMycart();
          }
    },[isViewCart,mycart])

    const handleBuy = () => {
        navigate('/payment');
    };

    return (
        <div>
            <div>
                <Button type="primary" onClick={handleMycart}>
                    My Cart
                </Button>
            </div>
            <Row gutter={16}>
                <Col span={8} style={{ paddingBottom: '2%' }}>
                    <Card title="Medicine 1" bordered={false}>
                        <Space>
                            <h1>Medicine 1</h1>
                            <Button type='primary' onClick={handleBuy}>
                                Buy
                            </Button>
                            <Button type='primary' onClick={() => handleAddToCart('Medicine Added')}>
                                Add to Cart
                            </Button>
                        </Space>
                    </Card>
                    <Card title="Medicine 2" bordered={false}>
                        <Space>
                            <h1>Medicine 2</h1>
                            <Button type='primary' onClick={handleBuy}>
                                Buy
                            </Button>
                            <Button type='primary' onClick={handleAddToCart}>
                                Add to Cart
                            </Button>
                        </Space>
                    </Card>
                    <Card title="Medicine 3" bordered={false}>
                        <Space>
                            <h1>Medicine 3</h1>
                            <Button type='primary' onClick={handleBuy}>
                                Buy
                            </Button>
                            <Button type='primary' onClick={() => handleAddToCart('Medicine Name')}>
                                Add to Cart
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Row>

            <div>
                {isViewCart && (
                    <Table dataSource={mycart} columns={cart_columns} />
                )}
            </div>
        </div>
    );
};

export default Medisync;
