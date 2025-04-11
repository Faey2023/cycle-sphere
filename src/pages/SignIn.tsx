import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import AuthContext from '@/context/AuthContext';

const SignIn: React.FC = () => {
  const { loginUser } = useContext(AuthContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const { email, password } = values;

    loginUser(email, password)
      .then((result: any) => {
        console.log(result.user);
        toast.success("Successfully signed in!");
        form.resetFields();
        setTimeout(() => navigate('/'), 1500); 
      })
      .catch((error: any) => {
        console.error(error.message);
        toast.error("Invalid email or password.");
      });
  };

  return (
    <div className='flex justify-center my-16 mx-auto'>
      <Form
        form={form}
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
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
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          Or <Link to="/signUp">Register Now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
