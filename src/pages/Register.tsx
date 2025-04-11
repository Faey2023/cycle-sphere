import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import AuthContext from '@/context/AuthContext'; // AuthContext import
import { db } from '@/firebas/firebase.init'; 


const Register: React.FC = () => {
  const { createUser } = useContext(AuthContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const { name, email, password } = values;

    createUser(email, password)
      .then((result: any) => {
        const user = result.user;

        
        const userRef = doc(db, "users", user.uid); // Use Firestore `doc` to get the reference

        return setDoc(userRef, {
          uid: user.uid,
          name,
          email,
          role: "customer", 
          createdAt: serverTimestamp() 
        });
      })
      .then(() => {
        toast.success("Successfully registered!");
        form.resetFields(); 
        setTimeout(() => navigate('/signIn'), 900); 
      })
      .catch((error: any) => {
        console.error(error.message);
        toast.error(error.message); 
      });
  };

  return (
    <div className='flex justify-center my-16 mx-auto'>
      <Form
        form={form}
        name="register"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { type: 'email', message: 'The input is not a valid E-mail!' },
            { required: true, message: 'Please input your E-mail!' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your Password!' },
            {
              pattern: /^(?=.*[A-Z])/,
              message: 'Password must contain at least one uppercase letter',
            },
            {
              pattern: /^(?=.*\d)/,
              message: 'Password must contain at least one number',
            },
            {
              min: 8,
              message: 'Password must be at least 8 characters long',
            }
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
