import { Layout, Menu, Button, Form, Input, notification, Modal } from 'antd';
import { UserOutlined, ProfileOutlined, ContainerOutlined } from '@ant-design/icons';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from 'firebase/auth';

// Firebase Authentication setup (assuming Firebase is initialized in your project)
const auth = getAuth();

const menuItems = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Dashboard',
    link: '/user/',
  },
  {
    key: '2',
    icon: <ContainerOutlined />,
    label: 'Orders',
    link: '/user/orders',
  },
  {
    key: '3',
    icon: <ProfileOutlined />,
    label: 'Profile Settings',
    link: '/user/',
  },
];

const UserDashBoard = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); // Ant Design form instance for resetting the form

  // Function to handle password update
  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      notification.error({
        message: 'Password Mismatch',
        description: 'The new password and confirmation password do not match.',
      });
      return;
    }

    try {
      const user = auth.currentUser;
      if (user && user.email) {
        // Re-authenticate the user with their current password
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        // Now, update the password
        await updatePassword(user, newPassword);

        // Show success modal
        setIsModalVisible(true);

        // Reset form fields after success
        form.resetFields();
        setIsPasswordUpdated(true);
      }
    } catch (error: any) {
      notification.error({
        message: 'Error Updating Password',
        description: error.message,
      });
    }
  };

  // Close the modal
  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="mt-1 h-[500px]">
      <Layout className="h-full">
        <Sider width={200} className="site-layout-background">
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 16, display: 'flex', justifyContent: 'space-between' }}>
            <h2>User Dashboard</h2>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <h3>Manage Profile and Orders</h3>
            <div>
              <h4>Update Password</h4>
              <Form form={form} layout="vertical" onFinish={handlePasswordUpdate}>
                <Form.Item
                  label="Current Password"
                  name="currentPassword"
                  rules={[{ required: true, message: 'Please input your current password!' }]}
                >
                  <Input.Password
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[{ required: true, message: 'Please input your new password!' }]}
                >
                  <Input.Password
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Confirm New Password"
                  name="confirmPassword"
                  rules={[{ required: true, message: 'Please confirm your new password!' }]}
                >
                  <Input.Password
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Update Password
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div>
              <h4>Your Orders</h4>
              {/* Display user orders here */}
              <Button type="primary" onClick={() => alert('View Orders')}>
                View Orders
              </Button>
            </div>
          </Content>
        </Layout>
      </Layout>

      {/* Modal to show success message */}
      <Modal
        title="Password Update Successful"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        okText="OK"
      >
        <p>Your password has been updated successfully!</p>
      </Modal>
    </div>
  );
};

export default UserDashBoard;
