import { Typography } from "@mui/material";
import { Button, Form, Input, Divider, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../../../services/authLogin";
import { fetchUserData } from "../../../services/userApis/userApis";
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import  "./Login.css";

export const Login = () => {
  type FieldType = {
    email?: string;
    password?: string;
    firstName?: string;
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
    const role = localStorage.getItem("role");
if (role) {
  if (role === "admin") {
    navigate("/dashboard");
  } else {
    navigate("/employee");
  }
}
  }, []);

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setLoading(true); 
      const token = await authLogin(values);
      localStorage.setItem("token", token);
      message.success("Login successful");
      const response = await fetchUserData();
      localStorage.setItem("role", response?.role || '');
      console.log(token);
      if (response?.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/employee");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Invalid credentials");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-slate-200">
      <div className="p-8 flex rounded-xl">
        <div className="w-1/2 p-8 bg-white rounded-l-lg text-center">
          <Typography variant="h4">Welcome to X-Time</Typography>
          <div className="mt-8">
            <Divider />
          </div>
          <div>
            <Typography variant="h6">Login</Typography>
          </div>
          <div className="loginForm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
            <Form
              name="basic"
              labelCol={{ offset:2,span: 4 }}
              wrapperCol={{ span: 14 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              className=""
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your Email !" },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password !" },
                ]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>
              <div className="mr-20 mt-8">
                <Form.Item wrapperCol={{ offset: 12, span: 8 }}>
                  <Spin spinning={loading} indicator={<Spin style={{ fontSize: 24 }}/>} size="large">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-full !bg-secondary-color"
                      style={{ display: loading ? 'none' : 'block' }} 
                    >
                      Sign In
                    </Button>
                  </Spin>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
        <div className="w-1/2 bg-secondary-color flex flex-col items-center justify-center px-4 text-white rounded-r-lg">
          <Typography variant="h5" className="lg:!font-bold  lg:!text-2xl lg:!mb-5">
          Welcome to WorkTrack: Your Productivity Companion
          </Typography>
          <Typography>
          Embark on a seamless journey with WorkTrack, your all-in-one productivity companion. Log in to our innovative attendance management system and unlock a world of efficiency. Seamlessly track your daily office attendance, manage tasks effortlessly, and foster collaboration with your team. With WorkTrack, streamline your workflow, boost productivity, and make every moment count.
          </Typography>
          {/* <Typography>Learn More &#8594;</Typography> */}
        </div>
      </div>
    </div>
  );
};
