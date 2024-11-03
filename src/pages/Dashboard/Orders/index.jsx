
import React, { useEffect, useState } from 'react';
import { Table, Button, message, Modal, Form, Select } from 'antd';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import dayjs from 'dayjs'; // Import dayjs

const { Option } = Select;

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderCollection = collection(firestore, 'orders');
        const orderSnapshot = await getDocs(orderCollection);
        const orderList = orderSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders: ", error);
        message.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleEdit = (record) => {
    setCurrentOrder(record);
    setIsEditModalVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      await updateDoc(doc(firestore, 'orders', currentOrder.id), {
        status: values.status,
      });
      message.success("Order status updated successfully");
      setOrders(orders.map(order => order.id === currentOrder.id ? { ...order, status: values.status } : order));
      setIsEditModalVisible(false);
      setCurrentOrder(null);
    } catch (error) {
      console.error("Error updating order: ", error);
      message.error("Failed to update order");
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items) => items.map(item => item.name).join(', '),
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="primary" ghost onClick={() => handleEdit(record)}>
          Change Status
        </Button>
      ),
    },
  ];

  return (
    <div className="container">
      <h1 className="text-center my-5">All Orders</h1>
      <Table columns={columns} dataSource={orders} rowKey="id" loading={loading} />

      <Modal
        title="Edit Order Status"
        open={isEditModalVisible} // Updated 'visible' to 'open'
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={{ status: currentOrder ? currentOrder.status : '' }}
          onFinish={handleUpdate}
        >
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select a status!' }]}
          >
            <Select placeholder="Select status">
              <Option value="pending">Pending</Option>
              <Option value="processing">Processing</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Status
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
