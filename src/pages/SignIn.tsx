import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import AuthContext from '@/context/AuthContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/firebas/firebase.init';  // adjust path to your Firebase config
import { useLocation } from 'react-router';

const SignIn: React.FC = () => {
  const { loginUser } = useContext(AuthContext);
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const { email, password } = values;
  
    try {
      const result = await loginUser(email, password);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log("User data from Firestore:", userData);
  
        toast.success("Successfully signed in!");
        form.resetFields();
  
        setTimeout(() => {
          if (userData.role?.toLowerCase() === "admin") {
            navigate("/admin");
          } else if (userData.role?.toLowerCase() === "customer") {
            const from = location.state?.from?.pathname || "/user";
            navigate(from);
          } else {
            navigate("/");
          }
        }, 1500);
      } else {
        toast.error("User role not found.");
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error("Invalid email or password.");
    }
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
          Or <Link to="/signUp">Register Now Bro!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
