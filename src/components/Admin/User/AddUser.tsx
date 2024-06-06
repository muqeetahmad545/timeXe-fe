
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, DatePicker, message, Typography, Row, Col } from "antd";
import moment from "moment";
import attendanceAPI from "../../../services/axios";
import { updateUser } from "../../../services/userApis/userApis";
import { User } from "../../types";

const { Title } = Typography;

type FieldType = {
  role?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  cnic?: string;
  designation?: string;
  salary?: number;
  dob?: Date;
  joiningDate?: Date;
};

const validateCNIC = (cnic: string): boolean => {
  const cnicPattern = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
  return cnicPattern.test(cnic);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

export const AddUser: React.FC = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (location.state && location.state.user) {
      const userData = location.state.user;
      setUser(userData);
      setIsEditing(true);
      form.setFieldsValue({
        ...userData,
        dob: moment(userData.dob),
        joiningDate: moment(userData.joiningDate),
        password: '',
        confirmPassword: ''
      });
    }
  }, [location.state, form]);

  const onFinish = async (values: FieldType) => {
    try {
      if (isEditing && user) {
        const { password, confirmPassword, ...updateValues } = values;
        const updatedValues = password ? values : updateValues;
        
        await updateUser(user._id, updatedValues);
        message.success("user updated successfully");
      } else {
        const response = await attendanceAPI.post(`${process.env.REACT_APP_API_URL}/users`, values, {});
        console.log("Success:", response.data);
        message.success("User added successfully");
      }
      navigate("/dashboard/employees");
    } catch (error) {
      console.error("Failed:", error);
      message.error("Failed to save user");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between bg-slate-200 p-1 rounded-md">
        <div className="border-l-4 border-secondary-color h-9 flex items-center">
          <Title level={5} className="ml-2">
            {isEditing ? "Edit User" : "Add User"}
          </Title>
        </div>
        <DatePicker />
      </div>

      <Form
        form={form}
        className="mt-4 w-full"
        name="basic"
        labelCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="Select role to Add User"
          name="role"
          rules={[{ required: true, message: "Please Select one of the value!" }]}
        >
          <Select
            defaultValue="Select role to Add User"
            onChange={handleChange}
            options={[
              { value: "admin", label: "Admin" },
              { value: "user", label: "User" },
            ]}
          />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<FieldType>
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Please input your First Name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType> label="Last Name" name="lastName">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<FieldType>
              label="CNIC"
              name="cnic"
              rules={[
                { required: true, message: "Please input CNIC!" },
                {
                  validator: (_, value) =>
                    value && validateCNIC(value)
                      ? Promise.resolve()
                      : Promise.reject("CNIC should be in the format 12345-1234567-1"),
                },
              ]}
            >
              <Input placeholder="12345-1234567-1" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Select User Designation"
              name="designation"
              rules={[{ required: true, message: "Please Select one of the value!" }]}
            >
              <Select
                defaultValue="Select User designation"
                onChange={handleChange}
                options={[
                  { value: "Intern", label: "Intern" },
                  { value: "Associate Software Engineer", label: "Associate Software Engineer" },
                  { value: "Software Engineer", label: "Software Engineer" },
                  { value: "Senior Software Engineer", label: "Senior Software Engineer" },
                  { value: "Principal", label: "Principal" },
                  { value: "COO", label: "COO" },
                  { value: "CTO", label: "CTO" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item<FieldType>
              label="Salary"
              name="salary"
              rules={[{ required: true, message: "Please input User Salary!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FieldType>
              label="DOB"
              name="dob"
              rules={[{ required: true, message: "Please Input user dob" }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FieldType>
              label="Joining Date"
              name="joiningDate"
              rules={[{ required: true, message: "Please Input user Joining Date" }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={isEditing ? [] : [{ required: true, message: "Please input Password!" }]}
            >
              <Input.Password placeholder={isEditing ? "Leave blank to keep unchanged" : "Enter password"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Confirm Password"
              name="confirmPassword"
              rules={isEditing ? [] : [{ required: true, message: "Confirm Password must be matched with Password!" }]}
            >
              <Input.Password placeholder={isEditing ? "Leave blank to keep unchanged" : "Confirm password"} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ offset: 0 }}>
          <Button type="primary" htmlType="submit">
            {isEditing ? "Update User" : "Add User"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
