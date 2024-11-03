import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Badge, Typography, message, Spin } from 'antd';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import { useAuthContext } from '../../../Contexts/AuthContext';
import dayjs from 'dayjs';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer';
const { Title, Text } = Typography;

export default function Orders() {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const ordersRef = collection(firestore, 'orders');
        const userOrdersQuery = query(ordersRef, where('userId', '==', user?.user_uid));
        const snapshot = await getDocs(userOrdersQuery);

        const ordersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserOrders(ordersList);
      } catch (error) {
        console.error("Error fetching user orders:", error);
        message.error("Could not fetch your orders.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.user_uid) {
      fetchUserOrders();
    }
  }, [user]);

  const getStatusBadge = (status) => {
    let color;
    switch (status) {
      case 'Pending':
        color = 'orange';
        break;
      case 'Processing':
        color = 'blue';
        break;
      case 'Completed':
        color = 'green';
        break;
      default:
        color = 'default';
    }
    return <Badge color={color} text={status} />;
  };

  return (
    <>
      <Header></Header>
    
    <div className="orders-container">
      <Title level={2} className="text-center mb-5">My Orders</Title>
      {loading ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) : userOrders.length === 0 ? (
        <Text type="secondary">You have no confirmed orders yet.</Text>
      ) : (
        <Row gutter={[16, 16]}>
          {userOrders.map((order) => (
            <Col xs={24} sm={12} md={8} lg={6} key={order.id}>
              <Card
                title={`Order ID: ${order.id}`}
                bordered
                hoverable
                style={{ borderRadius: '8px', overflow: 'hidden' }}
              >
                <div className="order-details">
                  <Text strong>Total Amount: </Text>
                  <Text>${order.totalAmount.toFixed(2)}</Text>
                </div>
                {/* <div className="order-details">
                  <Text strong>Order Date: </Text>
                  <Text>{dayjs(order.createdDate.seconds * 1000).format('YYYY-MM-DD HH:mm')}</Text>
                </div> */}
                <div className="order-details">
                  <Text strong>Items: </Text>
                  <Text>{order.items.map((item) => item.name).join(', ')}</Text>
                </div>
                <div className="order-status mt-3">{getStatusBadge(order.status)}</div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
    <Footer> </Footer>
    </>
  );
}
