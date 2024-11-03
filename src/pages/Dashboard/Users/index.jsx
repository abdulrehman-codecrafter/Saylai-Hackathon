
import React, { useEffect, useState } from 'react';
import { Table, Button, message, Modal, Form, Input, Select } from 'antd';

import { collection, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';

const { Option } = Select;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCollection = collection(firestore, 'users'); 
        const userSnapshot = await getDocs(userCollection);
        const userList = userSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users: ", error);
        message.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (record) => {
    setCurrentUser(record);
    setIsEditModalVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      await deleteDoc(doc(firestore, 'users', record.id)); 
      message.success("User deleted successfully");
      setUsers(users.filter(user => user.id !== record.id)); 
    } catch (error) {
      console.error("Error deleting user: ", error);
      message.error("Failed to delete user");
    }
  };

  const handleUpdate = async (values) => {
    try {
      await setDoc(doc(firestore, 'users', currentUser.id), {
        ...currentUser,
        roles: values.roles 
      }, { merge: true });
      message.success("User updated successfully");
      setUsers(users.map(user => user.id === currentUser.id ? { ...user, roles: values.roles } : user));
      setIsEditModalVisible(false);
      setCurrentUser(null); 
    } catch (error) {
      console.error("Error updating user: ", error);
      message.error("Failed to update user");
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'user_uid',
      key: 'user_uid',
    },
    {
      title: 'Image',
      dataIndex: 'imgUrl',
      key: 'imgUrl',
      render: (text) => <img src={text} alt="User" width={70} className="rounded" />,
    },
    {
      title: 'Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles) => roles.join(', '), 
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (timestamp) => new Date(timestamp.seconds * 1000).toLocaleString(), // Format Firestore timestamp
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button style={{marginRight:"4px"}} type="primary" ghost onClick={() => handleEdit(record)}>Edit Roles</Button>
          
        </>
      ),
    },
  ];

  return (
    <div className="container">
      <h1 className="text-center my-5">All Users</h1>
      <Table columns={columns} dataSource={users} rowKey="user_uid" loading={loading} />

      <Modal
        title="Edit User"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={{ roles: currentUser ? currentUser.roles : [] }}
          onFinish={handleUpdate}
        >
          <Form.Item
            label="Roles"
            name="roles"
            rules={[{ required: true, message: 'Please select at least one role!' }]}
          >
            <Select mode="multiple" placeholder="Select roles">
              <Option value="customer">Customer</Option>
              <Option value="admin">Admin</Option>
              <Option value="editor">Editor</Option>
              {/* Add more roles as needed */}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
