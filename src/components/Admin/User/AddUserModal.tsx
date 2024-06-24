import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  message,
  Typography,
  Row,
  Col,
  Modal,
  Divider,
  Upload,
  Card,
} from "antd";
import moment from "moment";
import attendanceAPI from "../../../services/axios";
import { createUser, updateUser } from "../../../services/userApis/userApis";
import { User, UserData } from "../../types";
import { EditOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import "./AddUserModel.css";
// import Dropzone from "react-dropzone";
// import Dropzone, { DropzoneState, FileRejection } from 'react-dropzone';
import Dropzone, { DropzoneState, FileRejection, DropEvent } from 'react-dropzone';


const { Title } = Typography;

type FieldType = {
  fullName?: string;
  fatherName?: string;
  email?: string;
  address?: string;
  phone?: Number;
  companyName?: string;
  department?: string;
  jobPosition?: string;
  profileImage?: string;
  manager?: string;
  password?: string;
  confirmPassword?: string;
  cnic?: string;
  designation?: string;
  dob?: Date;
  joiningDate?: Date;
  role?: string;
  gender?: string;
  salary?: string;
  userName?: string;
  signInEmail?: string;
  dropZone?: string;
  Skills?: string;
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



export const AddUserModal: React.FC = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState<File | null>(null);


  const handleDrop = (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    } else {
      console.log('File rejected:', fileRejections);
    }
  };
  // const [isEditing, setIsEditing] = useState(false); 

  const showModal = () => {
    setIsModalOpen(true);
    setIsEditing(true); 
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setLoading(true);
    setIsEditing(false);
  };

  // useEffect(() => {
  //   if (user) {
  //     console.log("user", user);
  //     form.setFieldsValue({
  //       ...user.userDetail,
  //       ...user.jobDetail,
  //       ...user.signInDetail,
  //       password: "",
  //       confirmPassword: "",
  //     });
  //   }
  // }, [user, form]);

  useEffect(() => {
    if (user && isEditing) {
      form.setFieldsValue({
        ...user.userDetail,
        ...user.jobDetail,
        ...user.signInDetail,
        password: "", // Clear password fields when editing
        confirmPassword: "",
      });
    }
  }, [user, form, isEditing]);

  const onFinish = async (values: any) => {
    setLoading(true);
    setError(null);

    const payload = {
      userDetail: {
        fullName: values.fullName,
        fatherName: values.fatherName,
        email: values.email,
        address: values.address,
        phone: values.phone,
        dob: values.dob,
        cnic: values.cnic,
        profileImage: values.profileImage,
        gender: values.gender,
      },
      jobDetail: {
        companyName: values.companyName,
        department: values.department,
        jobPosition: values.jobPosition,
        manager: values.manager,
        designation: values.designation,
        joiningDate: values.joiningDate,
        role: values.role,
        salary: values.salary,
        status: values.status,
        employeeId: values.employeeId,
        dropZone: values.dropZone,
        Skills: values.Skills,
      },
      signInDetail: {
        userName: values.userName,
        signInEmail: values.signInEmail,
        password: values.password,
        confirmPassword: values.confirmPassword,
      },
    };

  

  //   try {
  //     await attendanceAPI.post(
  //       `${process.env.REACT_APP_API_URL}/users`,
  //       payload
  //     );
  //     message.success("User created successfully");
  //     form.resetFields();
  //     setLoading(true);
  //     setIsModalOpen(false);
  //   } catch (error) {
  //     console.error("Failed to create user:", error);
  //     setError("Failed to create user. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  try {
    if (isEditing) {
      // Perform update logic
      // Replace with your update API call
      await updateUser(user?._id!, payload); // Example updateUser function
      message.success("User updated successfully");
    } else {
      // Perform create logic
      await attendanceAPI.post(`${process.env.REACT_APP_API_URL}/users`, payload);
      message.success("User created successfully");
    }
    form.resetFields();
    setIsModalOpen(false);
  } catch (error) {
    console.error("Failed to submit form:", error);
    setError("Failed to submit form. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <div className="flex justify-between bg-slate-200 p-1 rounded-md">
        <div className="border-l-4 r h-9 flex items-center">
          <Title level={5} className="ml-2"></Title>
        </div>
        <Button onClick={showModal}>
          <EditOutlined />
          New Employee
        </Button>
      </div>
      <Modal
        title={isEditing ? "Edit Employee" : "New Employee"}
        visible={isModalOpen}
        onCancel={handleCancel}
        className="!w-[70%]"
        confirmLoading={loading}
        footer={[
          <div className="footerContainer">
            <Button
              key="cancel"
              onClick={handleCancel}
              className="footerButton"
            >
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              onClick={() => form.submit()}
              loading={loading}
              className="footerButton"
            >
              Submit
            </Button>
          </div>,
        ]}
      >
        <Divider className="!mt-3" />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Row gutter={[16, 0]}>
          <Col xs={8} lg={6} style={{ marginTop: 20 }}>
            <Form.Item name="profileImage">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  // src="https://via.placeholder.com/150"
                  src="/assets/menIcon.jpg"
                  alt="Muqeet Profile"
                  // alt="profile"
                  style={{
                    width: 180,
                    height: 180,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                />
                <Upload>
                  <Button icon={<UploadOutlined />}>
                    Upload Profile Image
                  </Button>
                </Upload>
              </div>
            </Form.Item>
          </Col>

          <Col xs={8} sm={2} md={16} lg={18}>
            <div
              className="modalBody"
              style={{
                maxHeight: "60vh",
                overflowX: "hidden",
                scrollbarWidth: "thin",
              }}
            >
              <div className="form-container">
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
                  <Col xs={24} sm={12} md={12} lg={8} xl={8}></Col>
                  <div className="border-l-4 border-secondary-color h-7 flex items-center mb-1">
                    <Title level={5} className="ml-2">
                      User Details
                    </Title>
                  </div>

                  <Row gutter={[16, 0]}>
                    {" "}
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Full Name",
                          },
                        ]}
                      >
                        <Input placeholder="Enter full name" readOnly={!isEditing} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Father Name" name="fatherName"> 
                        <Input placeholder="Enter father name" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          { required: true, message: "Please Enter Email" },
                        ]}
                      >
                        <Input type="email" placeholder="Enter  email" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Address" name="address">
                        <Input placeholder="Enter address" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Phone Number"
                        labelCol={{ span: 10 }}
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Phone Number",
                          },
                        ]}
                      >
                        <Input placeholder="Enter phone number" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="CNIC"
                        name="cnic"
                        // rules={[
                        //   { required: true, message: "Please Enter CNIC!" },
                        //   {
                        //     validator: (_, value) =>
                        //       value && validateCNIC(value)
                        //         ? Promise.resolve()
                        //         : Promise.reject(
                        //             "CNIC should be in the format 12345-1234567-1"
                        //           ),
                        //   },
                        // ]}
                      >
                        <Input placeholder="12345-1234567-1" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Select Gender"
                        labelCol={{ span: 12 }}
                        name="gender"
                        rules={[
                          {
                            required: true,
                            message: "Please Select one of the values!",
                          },
                        ]}
                      >
                        <Select
                          defaultValue="Select Gender"
                          onChange={handleChange}
                          options={[
                            { value: "Male", label: "Male" },
                            { value: "Female", label: "Female" },
                          ]}
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                      <Form.Item label="DOB" name="dob">
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div className="border-l-4 border-secondary-color h-7 flex items-center mb-1">
                    <Title level={5} className="ml-2">
                      Jobs Details
                    </Title>
                  </div>

                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Company Name"
                        labelCol={{ span: 10 }}
                        name="companyName"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Company Name",
                          },
                        ]}
                      >
                        <Input placeholder="Enter company name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Department" name="department">
                        <Input placeholder="Enter department" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Job Position" name="jobPosition">
                        <Select
                          defaultValue="Select Gender"
                          onChange={handleChange}
                          options={[
                            { value: "Full Time", label: "Full Time" },
                            { value: "Part Time", label: "Part Time" },
                            { value: "Remote", label: "Remote" },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Manager" name="manager">
                        <Input placeholder="Enter manager name" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Select Designation"
                        labelCol={{ span: 12 }}
                        name="designation"
                        rules={[
                          {
                            required: true,
                            message: "Please Select one of the values!",
                          },
                        ]}
                      >
                        <Select
                          defaultValue="Select Designation"
                          onChange={handleChange}
                          options={[
                            { value: "Intern", label: "Intern" },
                            {
                              value: "Associate Software Engineer",
                              label: "Associate Software Engineer",
                            },
                            {
                              value: "Software Engineer",
                              label: "Software Engineer",
                            },
                            {
                              value: "Senior Software Engineer",
                              label: "Senior Software Engineer",
                            },
                            { value: "Principal", label: "Principal" },
                            { value: "COO", label: "COO" },
                            { value: "CTO", label: "CTO" },
                          ]}
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Select role"
                        name="role"
                        rules={[
                          {
                            required: true,
                            message: "Please select one of the roles!",
                          },
                        ]}
                      >
                        <Select
                          defaultValue="Select role"
                          onChange={handleChange}
                          options={[
                            { value: "admin", label: "Admin" },
                            { value: "user", label: "User" },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Salary" name="salary">
                        <Input placeholder="Enter Salary " />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Joining Date"
                        name="joiningDate"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter user Joining Date",
                          },
                        ]}
                      >
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* <Row gutter={[16, 0]}>
                  <Col xs={24} sm={12}>
                  <Form.Item label="File" name="dropZone">
                      <Input placeholder="Upload File " />
                    </Form.Item>
                  </Col>
                  </Row> */}

<Row gutter={[20, 0]}>
      {/* Optionally, uncomment and modify other columns as needed */}
      {/* <Col xs={24} sm={12}>
        <Form.Item label="Skills" name="skills">
          <Input placeholder="Enter skills" />
        </Form.Item>
      </Col> */}
      <Col xs={24} sm={12}>
        <Form.Item label="Files" name="dropZone">
        <Dropzone onDrop={handleDrop}>
      {({ getRootProps, getInputProps }: DropzoneState) => (
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #0087F7",
            borderRadius: "5px",
            padding: "20px",
            cursor: "pointer",
            height: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input {...getInputProps()} />
          {file ? (
            <p>
              File name: {file.name} ({file.size} bytes)
            </p>
          ) : (
            <p>
              Drag & drop files here, or click to select files
            </p>
          )}
        </div>
      )}
    </Dropzone>
        </Form.Item>
      </Col>
    </Row>
                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}></Col>
                  </Row>
                  <div className="border-l-4 border-secondary-color h-7 flex items-center mb-1">
                    <Title level={5} className="ml-2">
                      SignIn Details
                    </Title>
                  </div>
                  <Row gutter={[16, 0]}>
                    {" "}
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="User Name"
                        name="userName"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Full Name",
                          },
                        ]}
                      >
                        <Input placeholder="Enter full name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="SignIn Email" name="signInEmail">
                        <Input type="email" placeholder="Enter SignIn Email" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={
                          isEditing
                            ? []
                            : [
                                {
                                  required: true,
                                  message: "Please Enter Password!",
                                },
                              ]
                        }
                      >
                        <Input.Password
                          placeholder={
                            isEditing
                              ? "Leave blank to keep unchanged"
                              : "Enter password"
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Confirm Password"
                        labelCol={{ span: 10 }}
                        name="confirmPassword"
                        rules={
                          isEditing
                            ? []
                            : [
                                {
                                  required: true,
                                  message:
                                    "Confirm Password must be matched with Password!",
                                },
                              ]
                        }
                      >
                        <Input.Password
                          placeholder={
                            isEditing
                              ? "Leave blank to keep unchanged"
                              : "Confirm password"
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
