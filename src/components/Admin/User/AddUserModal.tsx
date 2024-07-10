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
  Spin,
  Avatar,
} from "antd";
import moment, { Moment } from "moment";
import attendanceAPI from "../../../services/axios";
import { createUser, updateUser } from "../../../services/userApis/userApis";
import { User, UserData } from "../../types";
import { EditOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import "./AddUserModel.css";
import { AxiosError } from "axios";
// import Dropzone from "react-dropzone";
// import Dropzone, { DropzoneState, FileRejection } from 'react-dropzone';
import Dropzone, {
  DropzoneState,
  FileRejection,
  DropEvent,
} from "react-dropzone";
import { RcFile, UploadChangeParam } from "antd/es/upload";

const { Title } = Typography;

type FieldType = {
  fullName?: string;
  fatherName?: string;
  email?: string;
  address?: string;
  phone?: Number;
  companyName?: string;
  department?: string;
  jobType?: string;
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
interface AddUserModalProps {
  openModal?: boolean;
  closeModal?: () => void;
  userData?: UserData | null;
  onModalClose: () => void;
  fetchUsersData?: () => void;
}
export const AddUserModal: React.FC<AddUserModalProps> = ({
  openModal,
  closeModal,
  userData,
  fetchUsersData,
}) => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(openModal ? true : false);
  const [user, setUser] = useState<UserData | null>(userData ? userData : null);
  const [isModalOpen, setIsModalOpen] = useState(openModal ? true : false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState("");
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const handleInputClick = () => {
    setIsModalOpen(true); // Open DatePicker when clicking on Input
  };
  useEffect(() => {
    if (user && user.userDetail && user.userDetail.profileImage) {
      setProfileImage(user.userDetail.profileImage);
    } else {
      setProfileImage("/assets/menIcon.jpg");
    }
  }, [user]);

  const handleDrop = (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    } else {
      console.log("File rejected:", fileRejections);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    form.resetFields();
  };

  const handleCancel = () => {
    if (openModal) {
      closeModal && closeModal();
    } else {
      setIsModalOpen(false);
      setLoading(false);
      form.resetFields();
      if (fetchUsersData) {
        fetchUsersData();
      }
    }
  };
  interface UserFormProps {
    attendanceAPI: any;
    form: any;
    setIsModalOpen: (isOpen: boolean) => void;
  }

  const handleFileChange = (info: UploadChangeParam) => {
    const newFile = info.file.originFileObj as File | undefined;
    if (newFile) {
      setFile(newFile);
    }
  };

  const handleUploadSuccess = async (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      setImageUrl(response.url);
      setLoading(false);
    }
  };

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
        profileImage: imageUrl || profileImage,
        gender: values.gender,
      },
      jobDetail: {
        companyName: values.companyName,
        department: values.department,
        jobType: values.jobType,
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
        ...(values.password && { password: values.password }),
        ...(values.confirmPassword && {
          confirmPassword: values.confirmPassword,
        }),
      },
    };

    try {
      let response;
      if (openModal && user) {
        response = await attendanceAPI.patch(
          `${process.env.REACT_APP_API_URL}/update?userId=${user._id}`,
          payload
        );
        message.success("User updated successfully");
        if (fetchUsersData) {
          fetchUsersData();
        }
      } else {
        response = await attendanceAPI.post(
          `${process.env.REACT_APP_API_URL}/users`,
          payload
        );
        message.success("User created successfully");
        if (fetchUsersData) {
          fetchUsersData();
        }
      }
      setUser(response.data);
      form.resetFields();
      setIsModalOpen(false);
      if (openModal) {
        closeModal && closeModal();
      }
    } catch (error) {
      console.error("Failed to save user:", error);
      if (error instanceof AxiosError && error.response) {
        const backendError =
          error.response.data?.error ||
          "Failed to save user. Please try again.";
        setError(backendError);
        message.error(backendError);
      } else {
        const genericError = "Failed to save user. Please try again.";
        setError(genericError);
        message.error(genericError);
      }
    } finally {
      setLoading(false);
    }
  };

  // const onFinish = async (values: any) => {
  //   setLoading(true);
  //   setError(null);
  //   const payload = {
  //     userDetail: {
  //       fullName: values.fullName,
  //       fatherName: values.fatherName,
  //       email: values.email,
  //       address: values.address,
  //       phone: values.phone,
  //       dob: values.dob,
  //       cnic: values.cnic,
  //       profileImage: imageUrl || profileImage,
  //       gender: values.gender,
  //     },
  //     jobDetail: {
  //       companyName: values.companyName,
  //       department: values.department,
  //       jobType: values.jobType,
  //       manager: values.manager,
  //       designation: values.designation,
  //       joiningDate: values.joiningDate,
  //       role: values.role,
  //       salary: values.salary,
  //       status: values.status,
  //       employeeId: values.employeeId,
  //       dropZone: values.dropZone,
  //       Skills: values.Skills,
  //     },
  //     signInDetail: {
  //       userName: values.userName,
  //       signInEmail: values.signInEmail,
  //       ...(values.password && { password: values.password }),
  //       ...(values.confirmPassword && {
  //         confirmPassword: values.confirmPassword,
  //       }),
  //     },
  //   };

  //   try {
  //     let response;
  //     if (openModal && user) {
  //       response = await attendanceAPI.patch(
  //         `${process.env.REACT_APP_API_URL}/update?userId=${user._id}`,
  //         payload
  //       );
  //       message.success("User updated successfully");
  //       if (fetchUsersData) {
  //         fetchUsersData();
  //       }
  //     } else {
  //       response = await attendanceAPI.post(
  //         `${process.env.REACT_APP_API_URL}/users`,
  //         payload
  //       );
  //       message.success("User created successfully");
  //       if (fetchUsersData) {
  //         fetchUsersData();
  //       }
  //     }
  //     setUser(response.data);
  //     form.resetFields();
  //     setIsModalOpen(false);
  //     if (openModal) {
  //       closeModal && closeModal();
  //     }
  //   } catch (error) {
  //     console.error("Failed to save user:", error);
  //     setError(
  //       error.response?.data?.error || "Failed to save user. Please try again."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  //   } catch (error) {
  //     console.error("Failed to save user:", error);
  //     setError("Failed to save user. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (user && isEditing) {
      form.setFieldsValue({
        ...user.userDetail,
        ...user.jobDetail,
        ...user.signInDetail,
        password: "",
        confirmPassword: "",
        dob: user.userDetail.dob
          ? moment(user.userDetail.dob).format("YYYY-MM-DD")
          : null,
        joiningDate: user.jobDetail.joiningDate
          ? moment(user.jobDetail.joiningDate).format("YYYY-MM-DD")
          : null,
      });
    }
  }, [user, form, isEditing]);

  // console.log("user>>>>>>>>>>", user);
  return (
    <div>
      
      {!openModal && (
        <div className="flex justify-between bg-slate-200 p-1 rounded-md">
          <div className="border-l-4 r h-9 flex items-center">
            <Title level={5} className="ml-2"></Title>
          </div>
          <Button onClick={showModal}>
            <EditOutlined />
            New Employee
          </Button>
        </div>
      )}
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
              // loading={loading}
              className="footerButton"
            >
              Submit
            </Button>
          </div>,
        ]}
      >
        <Divider className="!mt-3" />

        {/* {error && <div style={{ color: "red" }}>{error}</div>} */}
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
                <Avatar
                  src={imageUrl || profileImage}
                  alt="Muqeet Profile"
                  style={{
                    width: 140,
                    height: 140,
                    marginTop: 10,
                    marginBottom: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
                <Upload
                  name="file"
                  action={`${process.env.REACT_APP_API_URL}/upload`}
                  method="post"
                  accept="image/*"
                  showUploadList={false}
                  onChange={handleUploadSuccess}
                  beforeUpload={(file) => {
                    return true;
                  }}
                >
                  <Spin
                    spinning={loading}
                    indicator={<Spin style={{ fontSize: 24 }} />}
                    size="large"
                  ></Spin>
                  <Button
                    icon={<UploadOutlined style={{ padding: "5px" }} />}
                    type="primary"
                    htmlType="submit"
                    className="w-full !bg-secondary-color"
                    style={{
                      display: loading ? "none" : "block",
                    }}
                  >
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
                        label={
                          <span style={{ color: "black" }}>
                            <span style={{ color: "red" }}>*</span> Full Name
                          </span>
                        }
                        name="fullName"
                      >
                        <Input placeholder="Enter full name" />
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
                        label={
                          <span style={{ color: "black" }}>
                            <span style={{ color: "red" }}>*</span> Email
                          </span>
                        }
                        name="email"
                      >
                        <Input type="email" placeholder="Enter email" />
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
                        label={
                          <span style={{ color: "black" }}>
                            <span style={{ color: "red" }}>*</span> Phone Number
                          </span>
                        }
                        labelCol={{ span: 10 }}
                        name="phone"
                      >
                        <Input placeholder="Enter phone number" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={
                          <span style={{ color: "black" }}>
                            <span style={{ color: "red" }}>*</span>CNIC
                          </span>
                        }
                        name="cnic"
                      >
                        <Input placeholder="12345-1234567-1" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={
                          <span style={{ color: "black" }}>
                            <span style={{ color: "red" }}>*</span> Gender
                          </span>
                        }
                        labelCol={{ span: 12 }}
                        name="gender"
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
                      <Form.Item
                        label={
                          <span style={{ color: "black" }}>
                            <span style={{ color: "red" }}>*</span> DOB
                          </span>
                        }
                        name="dob"
                      >
                        {user && openModal ? (
                          <Input
                            defaultValue={moment(user.userDetail.dob).format(
                              "YYYY-MM-DD"
                            )}
                          />
                        ) : (
                          <DatePicker style={{ width: "100%" }} />
                        )}
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
                      >
                        <Input placeholder="Enter company name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Department" name="department">
                        {/* <Input placeholder="Enter department" /> */}
                        <Select
                          defaultValue="Select Department"
                          onChange={handleChange}
                          options={[
                            {
                              value: "Administration",
                              label: "Administration",
                            },
                            { value: "Designing", label: "Designing" },
                            { value: "Management", label: "Management" },
                            {
                              value: "Reserch & Development",
                              label: "Reserch & Development",
                            },
                            { value: "Sales", label: "Sales" },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={
                          <span style={{ color: "black" }}>
                            <span style={{ color: "red" }}>*</span>Job Type
                          </span>
                        }
                        name="jobType"
                      >
                        <Select
                          defaultValue="Job Type"
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
                        <Select
                          defaultValue="Select Manager"
                          onChange={handleChange}
                          options={[
                            { value: "Ali", label: "Ali" },
                            { value: "Aqib", label: "Aqib" },
                            { value: "Mushrif", label: "Mushraif" },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Select Designation"
                        labelCol={{ span: 12 }}
                        name="designation"
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
                        label={
                          <span style={{ color: "black" }}>
                            <span style={{ color: "red" }}>*</span> Select role
                          </span>
                        }
                        name="role"
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
                        label={
                          <span style={{ color: "black" }}>
                            <span style={{ color: "red" }}>*</span>Joining Date
                          </span>
                        }
                        name="joiningDate"
                      >
                        {user && openModal ? (
                          <Input
                            defaultValue={moment(
                              user.jobDetail.joiningDate
                            ).format()}
                          />
                        ) : (
                          <DatePicker style={{ width: "100%" }} />
                        )}
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
                        name="userName"
                        label={
                          <span style={{ color: "black" }}>
                            <span style={{ color: "red" }}>*</span>User Name
                          </span>
                        }
                      >
                        <Input placeholder="Enter full name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={
                          <span style={{ color: "black" }}>
                            <span style={{ color: "red" }}>*</span>SignIn Email
                          </span>
                        }
                        name="signInEmail"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please Enter  SignIn Email!",
                        //   },
                        // ]}
                      >
                        <Input type="email" placeholder="Enter SignIn Email" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[16, 0]}>
                    {!isEditing && (
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label={
                            <span style={{ color: "black" }}>
                              <span style={{ color: "red" }}>*</span>Password
                            </span>
                          }
                          name="password"
                          // rules={
                          //   isEditing
                          //     ? []
                          //     : [
                          //         {
                          //           required: true,
                          //           message: "Please Enter Password!",
                          //         },
                          //       ]
                          // }
                        >
                          <Input.Password
                            placeholder={
                              isEditing
                                ? "Leave blank to keep unchanged"
                                : "Enter password"
                            }
                            // readOnly
                          />
                        </Form.Item>
                      </Col>
                    )}

                    {/* <Col xs={24} sm={12}>
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
                          readOnly
                        />
                      </Form.Item>
                    </Col> */}
                    {!isEditing && (
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label={
                            <span style={{ color: "black" }}>
                              <span style={{ color: "red" }}>*</span>Confirm
                              Password
                            </span>
                          }
                          labelCol={{ span: 10 }}
                          name="confirmPassword"
                          // rules={
                          //   isEditing
                          //     ? []
                          //     : [
                          //         {
                          //           required: true,
                          //           message:
                          //             "Confirm Password must be matched with Password!",
                          //         },
                          //       ]
                          // }
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
                    )}
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
