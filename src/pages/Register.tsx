import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Corrected import
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import AuthContext from '@/context/AuthContext'; // Corrected import

const Register: React.FC = () => {
  const { createUser } = useContext(AuthContext);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    const { email, password } = values; // Extract email and password from form values

    createUser(email, password) // Pass email and password to the createUser function
      .then((result: any) => {
        console.log(result.user); // Handle the result (user created)
      })
      .catch((error: any) => {
        console.error(error.message); // Handle any error that occurs
      });
  };

  return (
    <div className="mx-auto my-16 flex justify-center">
      <Form
        name="register"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item name="name" rules={[{ required: true, message: 'Please input your Username!' }]}>
          <Input prefix={<UserOutlined />} placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not a valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
            {
              pattern: /^(?=.*[A-Z])/, // At least one uppercase letter
              message: 'Password must contain at least one uppercase letter',
            },
            {
              pattern: /^(?=.*\d)/, // At least one number
              message: 'Password must contain at least one number',
            },
            {
              min: 8,
              message: 'Password must be at least 8 characters long',
            },
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Register now
          </Button>
          Or <Link to="/signIn">Login Now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
