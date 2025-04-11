import React, { useEffect, useState } from 'react';
import { Layout, Menu, Table, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/firebase.init'; // Ensure Firestore is imported from firebase.init.ts
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth'; // Import signOut from Firebase
import { auth } from '@/firebase/firebase.init'; // Ensure auth is imported
import UpdateRole from './UpdateRole'; //

const { Header, Content, Sider } = Layout;

const menuItems = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Dashboard',
    link: '/admin',
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'Users',
    link: '/admin/users-management',
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'Products',
    link: '/admin/products',
  },
  {
    key: '4',
    icon: <UserOutlined />,
    label: 'Orders',
    link: '/admin/orders',
  },
];

const AdminDashboard: React.FC = () => {
  const { isAdmin, loading } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/');
    }
  }, [loading, isAdmin, navigate]);

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const snapshot = await getDocs(usersCollection);
        const userList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setTableLoading(false);
      }
    };

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => <UpdateRole userId={record.id} currentRole={record.role} />,
    },
  ];

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out
      navigate('/'); // Redirect to the homepage or login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!isAdmin) return null; // If not admin, return null

  return (
    <div className="mt-1">
      <Layout className="h-full">
        <Sider>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 16, display: 'flex', justifyContent: 'space-between' }}>
            <h2>Admin Dashboard</h2>
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{ marginRight: '16px' }}
            >
              Logout
            </Button>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
              <h2>Users Management</h2>
              <Table dataSource={users} columns={columns} rowKey="id" loading={tableLoading} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminDashboard;
