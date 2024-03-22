import React from 'react';
import { Button, Card, Col, Row, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Medisync = () => {
    const navigate = useNavigate();

    const handleAddToCart = () => {
        message.success('Added to cart');
    };

    const handleBuy = () => {
        navigate('/payment');
    }

    return(
        <div>
        <Row gutter={16}>
            <Col span={8} style={{paddingBottom: '2%'}}>
                <Card title="Medicine 1" bordered={false}>
                    <Space>
                        <Button type='primary' onClick={handleBuy}>Buy</Button>
                        <Button type='primary' onClick={handleAddToCart}>Add to Cart</Button>
                    </Space>
                </Card>
            </Col>
        </Row>
    </div>
    );
};

export default Medisync;