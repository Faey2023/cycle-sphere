import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Outlet } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const items = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Dashboard',
    link: '/admin', // Add path for the dashboard
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'Users',
    link: '/admin/users-management', // Link to Users Management
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'Products',
    link: '/admin/products', // Placeholder for products
  },
  {
    key: '4',
    icon: <UserOutlined />,
    label: 'Orders',
    link: '/admin/orders', // Placeholder for orders
  },
];

const AdminDashboard: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="h-full">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['2']} // Set default selected key (Users by default)
        >
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.link}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
