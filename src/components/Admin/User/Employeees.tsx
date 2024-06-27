// import React, { useEffect, useState } from "react";
// import {
//   Divider,
//   Table,
//   Row,
//   Col,
//   Spin,
//   Typography,
//   message,
//   Modal,
//   Button,
//   Upload,
//   Form,
//   Input,
//   DatePicker,
//   Select,
// } from "antd";
// import { User } from "../../types";
// import {
//   fetchUsers,
//   deleteUser,
//   updateStatus,
// } from "../../../services/userApis/userApis";
// import {
//   DeleteOutlined,
//   EditOutlined,
//   UploadOutlined,
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import moment from "moment";
// import Search from "antd/es/input/Search";
// import { AddUserModal } from "./AddUserModal";
// import { FaUserAltSlash } from "react-icons/fa";
// import Dropzone from "react-dropzone";

// const { Title } = Typography;

// export const Employees: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchName, setSearchName] = useState<string>("");
//   const [editingUser, setEditingUser] = useState<User | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isReadOnlyModalOpen, setIsReadOnlyModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);

//   const handleRowClick = (record: User) => {
//     setSelectedUser(record);
//     setIsReadOnlyModalOpen(true);
//   };
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsersData = async () => {
//       setLoading(true);
//       try {
//         const usersData = await fetchUsers();
//         setUsers(usersData);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsersData();
//   }, []);

//   if (loading) {
//     return (
//       <Row justify="center" align="middle" style={{ height: "100vh" }}>
//         <Col>
//           <Spin size="large" />
//         </Col>
//       </Row>
//     );
//   }

//   const handleDelete = async (userId: string) => {
//     try {
//       await deleteUser(userId);
//       setUsers(users.filter((user) => user._id !== userId));
//       message.success("User deleted successfully");
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       message.error("Failed to delete user");
//     }
//   };

//   const handleStatusUpdate = async (userId: string) => {
//     try {
//       const userToUpdate = users.find((user) => user._id === userId);
//       if (!userToUpdate) {
//         throw new Error(`User with ID ${userId} not found`);
//       }
//       const newStatus =
//         userToUpdate.jobDetail.status === "Active" ? "Inactive" : "Active";

//       Modal.confirm({
//         title: "Confirm Status Change",
//         content: `Are you sure you want to set user status to "${newStatus}"?`,
//         centered: true,
//         onOk: async () => {
//           const updatedJobDetail = {
//             ...userToUpdate.jobDetail,
//             status: newStatus,
//           };
//           const updatedUser: User = {
//             ...userToUpdate,
//             jobDetail: updatedJobDetail,
//           };
//           await updateStatus(userId, updatedUser);
//           setUsers((users) =>
//             users.map((user) => (user._id === userId ? updatedUser : user))
//           );
//           console.log("updatedUser", updatedUser);
//           message.success(`User status updated to ${newStatus} successfully`);
//         },
//         onCancel: () => {
//           message.info("Status update canceled");
//         },
//       });
//     } catch (error) {
//       console.error("Error updating user status:", error);
//       message.error("Failed to update user status");
//     }
//   };

//   const handleEdit = (record: User) => {
//     setEditingUser(record);
//     setIsModalOpen(true);
//   };

//   const getStatusColor = (status: string): string => {
//     switch (status) {
//       case "Active":
//         return "green";
//       case "Inactive":
//         return "red";
//       default:
//         return "gray";
//     }
//   };

//   const columns = [
//     {
//       title: "Employee ID",
//       dataIndex: ["jobDetail", "employeeId"],
//       key: "employeeId",
//     },
//     {
//       title: "Name",
//       dataIndex: ["signInDetail", "userName"],
//       key: "fullName",
//     },
//     {
//       title: "Email",
//       dataIndex: ["signInDetail", "signInEmail"],
//       key: "email",
//     },
//     {
//       title: "Role",
//       dataIndex: ["jobDetail", "role"],
//       key: "role",
//     },
//     {
//       title: "Designation",
//       dataIndex: ["jobDetail", "designation"],
//       key: "designation",
//     },
//     {
//       title: "CNIC",
//       dataIndex: ["userDetail", "cnic"],
//       key: "cnic",
//     },
//     {
//       title: "Status",
//       dataIndex: ["jobDetail", "status"],
//       key: "status",
//       render: (status: string) => (
//         <span
//           style={{
//             backgroundColor: getStatusColor(status),
//             color: "white",
//             padding: "4px 8px",
//             borderRadius: "4px",
//             display: "inline-block",
//           }}
//         >
//           {status}
//         </span>
//       ),
//     },
//     {
//       title: "Joining Date",
//       dataIndex: ["jobDetail", "joiningDate"],
//       key: "joiningDate",
//       render: (text: string) => moment(text).format("MMMM Do YYYY"),
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (text: any, record: User) => (
//         <span style={{ display: "flex", alignItems: "center" }}>
//           <FaUserAltSlash
//             style={{ fontSize: 20, color: "red", cursor: "pointer" }}
//             onClick={() => handleStatusUpdate(record._id)}
//           />
//         </span>
//       ),
//     },
//   ];

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchName(event.target.value.trim().toLowerCase());
//   };

//   const filteredUsers = users.filter((user) => {
//     const { jobDetail, signInDetail, userDetail } = user;
//     return (
//       jobDetail.employeeId
//         .toString()
//         .toLowerCase()
//         .includes(searchName.toLowerCase()) ||
//       signInDetail.userName.toLowerCase().includes(searchName) ||
//       signInDetail.signInEmail.toLowerCase().includes(searchName) ||
//       jobDetail.role.toLowerCase().includes(searchName) ||
//       jobDetail.designation.toLowerCase().includes(searchName) ||
//       userDetail.cnic.toLowerCase().includes(searchName) ||
//       jobDetail.status.toLowerCase().includes(searchName) ||
//       moment(jobDetail.joiningDate)
//         .format("MMMM Do YYYY")
//         .toLowerCase()
//         .includes(searchName)
//     );
//   });

//   return (
//     <div>
//       <div className="flex justify-between bg-slate-200 p-1 rounded-md w-full">
//         <div className="border-l-4 border-secondary-color h-9 flex items-center">
//           <Title level={5} className="ml-2">
//             Employees
//           </Title>
//         </div>
//         <Row justify="space-between" align="middle">
//           <Col>
//             <Search
//               placeholder="Search"
//               allowClear
//               onChange={handleSearch}
//               style={{ width: 200 }}
//             />
//           </Col>
//           <Col>
//             <AddUserModal />
//           </Col>
//         </Row>
//       </div>
//       <Divider />
//       <Table
//         dataSource={filteredUsers}
//         columns={columns}
//         onRow={(record) => ({
//           onClick: () => handleRowClick(record),
//         })}
//       />
//       <Modal
//         title="User Details"
//         visible={isReadOnlyModalOpen}
//         onCancel={() => setIsReadOnlyModalOpen(false)}
//         footer={[]}
//       >
//         {selectedUser && (
//           <div>
//             <Col xs={8} lg={6} style={{ marginTop: 20 }}>
//               <Form.Item name="profileImage">
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                   }}
//                 >
//                   <img
//                     // src="https://via.placeholder.com/150"
//                     src="/assets/menIcon.jpg"
//                     alt="Muqeet Profile"
//                     // alt="profile"
//                     style={{
//                       width: 180,
//                       height: 180,
//                       marginTop: 10,
//                       marginBottom: 10,
//                     }}
//                   />
//                   <Upload>
//                     <Button icon={<UploadOutlined />}>
//                       Upload Profile Image
//                     </Button>
//                   </Upload>
//                 </div>
//               </Form.Item>
//             </Col>

//             <Col xs={8} sm={2} md={16} lg={18}>
//               <div
//                 className="modalBody"
//                 style={{
//                   maxHeight: "60vh",
//                   overflowX: "hidden",
//                   scrollbarWidth: "thin",
//                 }}
//               >
//                 <div className="form-container">
//                   <Form
//                     // form={form}
//                     className="mt-4 w-full"
//                     name="basic"
//                     labelCol={{ span: 8 }}
//                     initialValues={{ remember: true }}
//                     // onFinish={onFinish}
//                     // onFinishFailed={onFinishFailed}
//                     autoComplete="off"
//                     layout="vertical"
//                   >
//                     <Col xs={24} sm={12} md={12} lg={8} xl={8}></Col>
//                     <div className="border-l-4 border-secondary-color h-7 flex items-center mb-1">
//                       <Title level={5} className="ml-2">
//                         User Details
//                       </Title>
//                     </div>

//                     <Row gutter={[16, 0]}>
//                       {" "}
//                       <Col xs={24} sm={12}>
//                         <Form.Item
//                           label="Full Name"
//                           name="fullName"
//                           rules={[
//                             {
//                               required: true,
//                               message: "Please Enter Full Name",
//                             },
//                           ]}
//                         >
//                           <Input
//                             placeholder="Enter full name"
//                             // readOnly={!isEditing}
//                           />
//                         </Form.Item>
//                       </Col>
//                       <Col xs={24} sm={12}>
//                         <Form.Item label="Father Name" name="fatherName">
//                           <Input placeholder="Enter father name" />
//                         </Form.Item>
//                       </Col>
//                     </Row>

//                     <Row gutter={[16, 0]}>
//                       <Col xs={24} sm={12}>
//                         <Form.Item
//                           label="Email"
//                           name="email"
//                           rules={[
//                             { required: true, message: "Please Enter Email" },
//                           ]}
//                         >
//                           <Input type="email" placeholder="Enter  email" />
//                         </Form.Item>
//                       </Col>
//                       <Col xs={24} sm={12}>
//                         <Form.Item label="Address" name="address">
//                           <Input placeholder="Enter address" />
//                         </Form.Item>
//                       </Col>
//                     </Row>

//                     <Row gutter={[16, 0]}>
//                       <Col xs={24} sm={12}>
//                         <Form.Item
//                           label="Phone Number"
//                           labelCol={{ span: 10 }}
//                           name="phone"
//                           rules={[
//                             {
//                               required: true,
//                               message: "Please Enter Phone Number",
//                             },
//                           ]}
//                         >
//                           <Input placeholder="Enter phone number" />
//                         </Form.Item>
//                       </Col>
//                       <Col xs={24} sm={12}>
//                         <Form.Item
//                           label="CNIC"
//                           name="cnic"
//                           // rules={[
//                           //   { required: true, message: "Please Enter CNIC!" },
//                           //   {
//                           //     validator: (_, value) =>
//                           //       value && validateCNIC(value)
//                           //         ? Promise.resolve()
//                           //         : Promise.reject(
//                           //             "CNIC should be in the format 12345-1234567-1"
//                           //           ),
//                           //   },
//                           // ]}
//                         >
//                           <Input placeholder="12345-1234567-1" />
//                         </Form.Item>
//                       </Col>
//                     </Row>

//                     <Row gutter={[16, 0]}>
//                       <Col xs={24} sm={12}>
//                         <Form.Item
//                           label="Select Gender"
//                           labelCol={{ span: 12 }}
//                           name="gender"
//                           rules={[
//                             {
//                               required: true,
//                               message: "Please Select one of the values!",
//                             },
//                           ]}
//                         >
//                           <Select
//                             defaultValue="Select Gender"
//                             // onChange={handleChange}
//                             options={[
//                               { value: "Male", label: "Male" },
//                               { value: "Female", label: "Female" },
//                             ]}
//                           />
//                         </Form.Item>
//                       </Col>

//                       <Col xs={24} sm={12}>
//                         <Form.Item label="DOB" name="dob">
//                           <DatePicker style={{ width: "100%" }} />
//                         </Form.Item>
//                       </Col>
//                     </Row>
//                     <div className="border-l-4 border-secondary-color h-7 flex items-center mb-1">
//                       <Title level={5} className="ml-2">
//                         Jobs Details
//                       </Title>
//                     </div>

//                     <Row gutter={[16, 0]}>
//                       <Col xs={24} sm={12}>
//                         <Form.Item
//                           label="Company Name"
//                           labelCol={{ span: 10 }}
//                           name="companyName"
//                           rules={[
//                             {
//                               required: true,
//                               message: "Please Enter Company Name",
//                             },
//                           ]}
//                         >
//                           <Input placeholder="Enter company name" />
//                         </Form.Item>
//                       </Col>
//                       <Col xs={24} sm={12}>
//                         <Form.Item label="Department" name="department">
//                           <Input placeholder="Enter department" />
//                         </Form.Item>
//                       </Col>
//                     </Row>
//                     <Row gutter={[16, 0]}>
//                       <Col xs={24} sm={12}>
//                         <Form.Item label="Job Position" name="jobPosition">
//                           <Select
//                             defaultValue="Select Gender"
//                             // onChange={handleChange}
//                             options={[
//                               { value: "Full Time", label: "Full Time" },
//                               { value: "Part Time", label: "Part Time" },
//                               { value: "Remote", label: "Remote" },
//                             ]}
//                           />
//                         </Form.Item>
//                       </Col>
//                       <Col xs={24} sm={12}>
//                         <Form.Item label="Manager" name="manager">
//                           <Input placeholder="Enter manager name" />
//                         </Form.Item>
//                       </Col>
//                     </Row>

//                     <Row gutter={[16, 0]}>
//                       <Col xs={24} sm={12}>
//                         <Form.Item
//                           label="Select Designation"
//                           labelCol={{ span: 12 }}
//                           name="designation"
//                           rules={[
//                             {
//                               required: true,
//                               message: "Please Select one of the values!",
//                             },
//                           ]}
//                         >
//                           <Select
//                             defaultValue="Select Designation"
//                             // onChange={handleChange}
//                             options={[
//                               { value: "Intern", label: "Intern" },
//                               {
//                                 value: "Associate Software Engineer",
//                                 label: "Associate Software Engineer",
//                               },
//                               {
//                                 value: "Software Engineer",
//                                 label: "Software Engineer",
//                               },
//                               {
//                                 value: "Senior Software Engineer",
//                                 label: "Senior Software Engineer",
//                               },
//                               { value: "Principal", label: "Principal" },
//                               { value: "COO", label: "COO" },
//                               { value: "CTO", label: "CTO" },
//                             ]}
//                           />
//                         </Form.Item>
//                       </Col>

//                       <Col xs={24} sm={12}>
//                         <Form.Item
//                           label="Select role"
//                           name="role"
//                           rules={[
//                             {
//                               required: true,
//                               message: "Please select one of the roles!",
//                             },
//                           ]}
//                         >
//                           <Select
//                             defaultValue="Select role"
//                             // onChange={handleChange}
//                             options={[
//                               { value: "admin", label: "Admin" },
//                               { value: "user", label: "User" },
//                             ]}
//                           />
//                         </Form.Item>
//                       </Col>
//                     </Row>

//                     <Row gutter={[16, 0]}>
//                       <Col xs={24} sm={12}>
//                         <Form.Item label="Salary" name="salary">
//                           <Input placeholder="Enter Salary " />
//                         </Form.Item>
//                       </Col>
//                       <Col xs={24} sm={12}>
//                         <Form.Item
//                           label="Joining Date"
//                           name="joiningDate"
//                           rules={[
//                             {
//                               required: true,
//                               message: "Please Enter user Joining Date",
//                             },
//                           ]}
//                         >
//                           <DatePicker style={{ width: "100%" }} />
//                         </Form.Item>
//                       </Col>
//                     </Row>
//                     {/* <Row gutter={[16, 0]}>
//                   <Col xs={24} sm={12}>
//                   <Form.Item label="File" name="dropZone">
//                       <Input placeholder="Upload File " />
//                     </Form.Item>
//                   </Col>
//                   </Row> */}

//                     <Row gutter={[20, 0]}>
//                       {/* Optionally, uncomment and modify other columns as needed */}
//                       {/* <Col xs={24} sm={12}>
//         <Form.Item label="Skills" name="skills">
//           <Input placeholder="Enter skills" />
//         </Form.Item>
//       </Col> */}
//                       <Col xs={24} sm={12}>
//                         <Form.Item label="Files" name="dropZone">
//                           {/* <Dropzone onDrop={handleDrop}>
//                             {({
//                               getRootProps,
//                               getInputProps,
//                             }: DropzoneState) => (
//                               <div
//                                 {...getRootProps()}
//                                 style={{
//                                   border: "2px dashed #0087F7",
//                                   borderRadius: "5px",
//                                   padding: "20px",
//                                   cursor: "pointer",
//                                   height: "150px",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   justifyContent: "center",
//                                 }}
//                               >
//                                 <input {...getInputProps()} />
//                                 {file ? (
//                                   <p>
//                                     File name: {file.name} ({file.size} bytes)
//                                   </p>
//                                 ) : (
//                                   <p>
//                                     Drag & drop files here, or click to select
//                                     files
//                                   </p>
//                                 )}
//                               </div>
//                             )}
//                           </Dropzone> */}
//                         </Form.Item>
//                       </Col>
//                     </Row>
//                     <Row gutter={[16, 0]}>
//                       <Col xs={24} sm={12}></Col>
//                     </Row>
//                     <div className="border-l-4 border-secondary-color h-7 flex items-center mb-1">
//                       <Title level={5} className="ml-2">
//                         SignIn Details
//                       </Title>
//                     </div>
//                     <Row gutter={[16, 0]}>
//                       {" "}
//                       <Col xs={24} sm={12}>
//                         <Form.Item
//                           label="User Name"
//                           name="userName"
//                           rules={[
//                             {
//                               required: true,
//                               message: "Please Enter Full Name",
//                             },
//                           ]}
//                         >
//                           <Input placeholder="Enter full name" />
//                         </Form.Item>
//                       </Col>
//                       <Col xs={24} sm={12}>
//                         <Form.Item label="SignIn Email" name="signInEmail">
//                           <Input
//                             type="email"
//                             placeholder="Enter SignIn Email"
//                           />
//                         </Form.Item>
//                       </Col>
//                     </Row>
//                     <Row gutter={[16, 0]}>
//                       <Col xs={24} sm={12}>
//                         <Form.Item
//                           label="Password"
//                           name="password"
//                           // rules={
//                           //   isEditing
//                           //     ? []
//                           //     : [
//                           //         {
//                           //           required: true,
//                           //           message: "Please Enter Password!",
//                           //         },
//                           //       ]
//                           // }
//                         >
//                           <Input.Password
//                           // placeholder={
//                           //   isEditing
//                           //     ? "Leave blank to keep unchanged"
//                           //     : "Enter password"
//                           // }
//                           />
//                         </Form.Item>
//                       </Col>
//                       <Col xs={24} sm={12}>
//                         <Form.Item
//                           label="Confirm Password"
//                           labelCol={{ span: 10 }}
//                           name="confirmPassword"
//                           // rules={
//                           //   isEditing
//                           //     ? []
//                           //     : [
//                           //         {
//                           //           required: true,
//                           //           message:
//                           //             "Confirm Password must be matched with Password!",
//                           //         },
//                           //       ]
//                           // }
//                         >
//                           {/* <Input.Password
//                             placeholder={
//                               isEditing
//                                 ? "Leave blank to keep unchanged"
//                                 : "Confirm password"
//                             }
//                           /> */}
//                         </Form.Item>
//                       </Col>
//                     </Row>
//                   </Form>
//                 </div>
//               </div>
//             </Col>
//           </div>
//           // <div>
//           //   <p>
//           //     <strong>Employee ID:</strong> {selectedUser.jobDetail.employeeId}
//           //   </p>
//           //   <p>
//           //     <strong>Name:</strong> {selectedUser.signInDetail.userName}
//           //   </p>
//           //   <p>
//           //     <strong>Email:</strong> {selectedUser.signInDetail.signInEmail}
//           //   </p>
//           //   <p>
//           //     <strong>Role:</strong> {selectedUser.jobDetail.role}
//           //   </p>
//           //   <p>
//           //     <strong>Designation:</strong> {selectedUser.jobDetail.designation}
//           //   </p>
//           //   <p>
//           //     <strong>CNIC:</strong> {selectedUser.userDetail.cnic}
//           //   </p>
//           //   <p>
//           //     <strong>Status:</strong> {selectedUser.jobDetail.status}
//           //   </p>
//           //   <p>
//           //     <strong>Joining Date:</strong>{" "}
//           //     {moment(selectedUser.jobDetail.joiningDate).format(
//           //       "MMMM Do YYYY"
//           //     )}
//           //   </p>
//           // </div>
//         )}
//       </Modal>
//       {/* {editingUser && (
//         <AddUserModal
//           visible={isModalOpen}
//           onCancel={() => setIsModalOpen(false)}
//           user={editingUser}
//         />
//       )} */}
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import {
  Divider,
  Table,
  Row,
  Col,
  Spin,
  Typography,
  message,
  Modal,
  Button,
  Upload,
  Input,
  Form,
  DatePicker,
  Select,
  Avatar,

} from "antd";
import { User, UserData } from "../../types";
import {
  fetchUsers,
  deleteUser,
  updateStatus,
} from "../../../services/userApis/userApis";
import { FaUserAltSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Search from "antd/es/input/Search";
import { AddUserModal } from "./AddUserModal";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
import attendanceAPI from "../../../services/axios";

const { Title } = Typography;
export const Employees: React.FC = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isReadOnlyModalOpen, setIsReadOnlyModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  const handleEditUser = (user:any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false); 
  };

  const handleRowClick = (record: User, columnIndex: number) => {
    if (columns[columnIndex].key !== "action") {
      setSelectedUser(record);
      setIsReadOnlyModalOpen(true);
    } else {
      setIsReadOnlyModalOpen(false);
    }
  };
  
  // useEffect(() => {
  //   const fetchUsersData = async () => {
  //     setLoading(true);
  //     try {
  //       const usersData = await fetchUsers();
  //       setUsers(usersData);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsersData();
  // }, []);

  const fetchUsersData = async () => {
    try {
      const usersData = await fetchUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const refreshData = () => {
    fetchUsersData(); 
  };
 
  if (loading) {
    return (
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    );
  }

  const handleStatusUpdate = async (userId: string) => {
    try {
      const userToUpdate = users.find((user) => user._id === userId);
      if (!userToUpdate) {
        throw new Error(`User with ID ${userId} not found`);
      }
      const newStatus =
        userToUpdate.jobDetail.status === "Active" ? "Inactive" : "Active";

      Modal.confirm({
        title: "Confirm Status Change",
        content: `Are you sure you want to set user status to "${newStatus}"?`,
        centered: true,
        onOk: async () => {
          const updatedJobDetail = {
            ...userToUpdate.jobDetail,
            status: newStatus,
          };
          const updatedUser: User = {
            ...userToUpdate,
            jobDetail: updatedJobDetail,
          };
          await updateStatus(userId, updatedUser);
          setUsers((users) =>
            users.map((user) => (user._id === userId ? updatedUser : user))
          );
          message.success(`User status updated to ${newStatus} successfully`);
        },
        onCancel: () => {
          message.info("Status update canceled");
        },
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      message.error("Failed to update user status");
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Active":
        return "green";
      case "Inactive":
        return "red";
      default:
        return "gray";
    }
  };
  
  const showModal = async (userData?: UserData, userId?: string) => {
    console.log("userData", userData);
    if (userData) {
    console.log("inside");

      setUser(userData);
      setIsEditing(true);
      form.setFieldsValue({
        ...userData.userDetail,
        ...userData.jobDetail,
        ...userData.signInDetail,
        password: '',
        confirmPassword: '',
      });
    } else {
      setUser(null);
      setIsEditing(false);
      form.resetFields();
    }
    setIsModalOpen(true);

  };
  const columns = [
    {
      title: "Profile Image",
      dataIndex: ["userDetail", "profileImage"],
      key: "profileImage",
      render: (profileImage: string) => (
        <Avatar src={profileImage|| "/assets/menIcon.jpg"}/>
      ),
    }, 
       {
      title: "Employee ID",
      dataIndex: ["jobDetail", "employeeId"],
      key: "employeeId",
    },
    {
      title: "Name",
      dataIndex: ["signInDetail", "userName"],
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: ["signInDetail", "signInEmail"],
      key: "email",
    },
    {
      title: "Role",
      dataIndex: ["jobDetail", "role"],
      key: "role",
    },
    {
      title: "Designation",
      dataIndex: ["jobDetail", "designation"],
      key: "designation",
    },
    {
      title: "CNIC",
      dataIndex: ["userDetail", "cnic"],
      key: "cnic",
    },
    {
      title: "Status",
      dataIndex: ["jobDetail", "status"],
      key: "status",
      render: (status: string) => (
        <span
          style={{
            backgroundColor: getStatusColor(status),
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            display: "inline-block",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Joining Date",
      dataIndex: ["jobDetail", "joiningDate"],
      key: "joiningDate",
      render: (text: string) => moment(text).format("MMMM Do YYYY"),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: User) => (
       <div style={{ display: "flex", alignItems: "center" }}>
       <span style={{ marginRight: 8 }}>
        <EditOutlined
          style={{ fontSize: 20, cursor: "pointer" }}
          onClick={() => showModal(record, record._id)}
        />
      </span>
      <span>
          <FaUserAltSlash
            style={{ fontSize: 20, color: "red", cursor: "pointer" }}
            onClick={() => handleStatusUpdate(record._id)}
          />
        </span>
     </div>
      ),
    },
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value.trim().toLowerCase());
  };

  const filteredUsers = users.filter((user) => {
    const { jobDetail, signInDetail, userDetail } = user;
    return (
      jobDetail.employeeId
        .toString()
        .toLowerCase()
        .includes(searchName.toLowerCase()) ||
      signInDetail.userName.toLowerCase().includes(searchName) ||
      signInDetail.signInEmail.toLowerCase().includes(searchName) ||
      jobDetail.role.toLowerCase().includes(searchName) ||
      jobDetail.designation.toLowerCase().includes(searchName) ||
      userDetail.cnic.toLowerCase().includes(searchName) ||
      jobDetail.status.toLowerCase().includes(searchName) ||
      moment(jobDetail.joiningDate)
        .format("MMMM Do YYYY")
        .toLowerCase()
        .includes(searchName)
    );
  });

  return (
    <div>
      <div className="flex justify-between bg-slate-200 p-1 rounded-md w-full">

     
      { isModalOpen && <AddUserModal openModal = {isModalOpen} closeModal={closeModal}  userData = {user} onModalClose={refreshData} fetchUsersData={fetchUsersData}/>}

        <div className="border-l-4 border-secondary-color h-9 flex items-center">
          <Title level={5} className="ml-2">
            Employees
          </Title>
        </div>
        <Row justify="space-between" align="middle">
          <Col>
            <Search
              placeholder="Search"
              allowClear
              onChange={handleSearch}
              style={{ width: 200 }}
            />
          </Col>
          <Col>
{  <AddUserModal   onModalClose={refreshData} fetchUsersData={fetchUsersData} />} </Col>
        </Row>
      </div>
      <Divider />
      <Table
        dataSource={filteredUsers}
        columns={columns.map((col, index) => ({
          ...col,
          onCell: (record: User) => ({
            onClick: () => handleRowClick(record, index),
          }),
        }))}
      />
      <Modal
        title="Employee Details"
        visible={isReadOnlyModalOpen}
        className="!w-[50%]"
        onCancel={() => setIsReadOnlyModalOpen(false)}
        footer={null}
      >
        {selectedUser && (
        
          <div>


                
            {/* <Col xs={8} lg={20} style={{ marginTop: 20 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src="/assets/menIcon.jpg"
                  alt="Profile"
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
            </Col> */}

{/* <Col xs={24} sm={12}>
  <Form.Item label="Profile Image">
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Avatar
        alt="User Avatar"
        src={selectedUser.userDetail.profileImage}
        style={{ width: 150, height: 150 }}
      />
    </div>
  </Form.Item>
</Col> */}


            <Col xs={8} sm={2} md={16} lg={24}>
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
                  className="mt-4 w-full"
                  name="basic"
                  labelCol={{ span: 8 }}
                  initialValues={{ remember: true }}
               
                  autoComplete="off"
                  layout="vertical"
                >
                  <div className="mt-4 w-full">
                    <div className="border-l-4 border-secondary-color h-7 flex items-center mb-1">
                      <Title level={5} className="ml-2">
                        User Details
                      </Title>
                    </div>
                    <Row gutter={[16, 0]}>
                    {" "}
                      <Col xs={24} sm={12}>
                        <Form.Item label="Full Name" name="fullName">
                          <Input
                            placeholder="Enter full name"
                            defaultValue={selectedUser.signInDetail.userName}
                            readOnly
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item label="Father Name" name="fatherName">
                          <Input
                            placeholder="Enter father's name"
                            defaultValue={selectedUser.userDetail.fatherName}
                            readOnly
                          />
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
                          <Input
                            placeholder="Enter full name"
                            defaultValue={selectedUser.signInDetail.signInEmail}
                            readOnly
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item label="Address" name="address">
                          <Input
                            placeholder="Enter address"
                            defaultValue={selectedUser.userDetail.address}
                            readOnly
                          />
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
                          <Input
                            placeholder="Enter phone number"
                            defaultValue={selectedUser.userDetail.phone}
                            readOnly
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item label="CNIC" name="cnic">
                          <Input
                            placeholder="12345-1234567-1"
                            defaultValue={selectedUser.userDetail.cnic}
                            readOnly
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[16, 0]}>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="Select Gender"
                          labelCol={{ span: 10 }}
                          name="gender"
                        >
                          <Input
                            defaultValue={selectedUser.userDetail.gender}
                            readOnly
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={12}>
                        <Form.Item label="DOB" name="dob">
                          <Input
                            defaultValue={moment(
                              selectedUser.userDetail.dob
                            ).format("MMMM Do YYYY")}
                            readOnly
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <div className="border-l-4 border-secondary-color h-7 flex items-center mb-1 mt-2">
                      <Title level={5} className="ml-2">
                        Job Details
                      </Title>
                    </div>
                    <Row gutter={[16, 0]}>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="Company Name"
                          labelCol={{ span: 10 }}
                          name="companyName"
                        >
                          <Input
                            placeholder="Enter company name"
                            defaultValue={selectedUser.jobDetail.companyName}
                            readOnly
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item label="Department" name="department">
                          <Input
                            placeholder="Enter department"
                            defaultValue={selectedUser.jobDetail.department}
                            readOnly
                          />
                        </Form.Item>
                        {/* <p>
                          <strong>Role:</strong> {selectedUser.jobDetail.role}
                        </p> */}
                      </Col>
                    </Row>
                    <Row gutter={[16, 0]}>
                      <Col xs={24} sm={12}>
                        <Form.Item label="Job Position" name="jobPosition">
                          <Input
                            defaultValue={selectedUser.jobDetail.jobPosition}
                            readOnly
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item label="Manager" name="manager">
                          <Input
                            placeholder="Enter manager name"
                            defaultValue={selectedUser.jobDetail.manager}
                            readOnly
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
                          <Input
                            defaultValue={selectedUser.jobDetail.designation}
                            readOnly
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={12}>
                        <Form.Item label="Select role" name="role">
                          <Input
                            defaultValue={selectedUser.jobDetail.role}
                            readOnly
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[16, 0]}>
                      <Col xs={24} sm={12}>
                        <Form.Item label="Salary" name="salary">
                          <Input
                            placeholder="Enter Salary "
                            defaultValue={selectedUser.jobDetail.salary}
                            readOnly
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item label="Joining Date" name="joiningDate">
                          <Input
                            defaultValue={moment(
                              selectedUser.jobDetail.joiningDate
                            ).format("MMMM Do YYYY")}
                            readOnly
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    {/* <Row gutter={[20, 0]}>
                      <Col xs={24} sm={12}> */}
                        {/* <Form.Item label="Files" name="dropZone"> */}
                          {/* <Dropzone onDrop={handleDrop}>
                            {({
                              getRootProps,
                              getInputProps,
                            }: DropzoneState) => (
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
                                    Drag & drop files here, or click to select
                                    files
                                  </p>
                                )}
                              </div>
                            )}
                          </Dropzone> */}
                        {/* </Form.Item> */}
                      {/* </Col> */}
                    {/* </Row> */}
                    {/* <Row gutter={[16, 0]}>
                      <Col xs={24} sm={12}>
                        <p>
                          <strong>Joining Date:</strong>{" "}
                          {moment(selectedUser.jobDetail.joiningDate).format(
                            "MMMM Do YYYY"
                          )}
                        </p>
                      </Col>
                      <Col xs={24} sm={12}>
                        <p>
                          <strong>Status:</strong>{" "}
                          {selectedUser.jobDetail.status}
                        </p>
                      </Col>
                    </Row> */}

                    {/* <Row gutter={[16, 0]}>
                      <Col xs={24} sm={12}>
                        <p>
                          <strong>Designation:</strong>{" "}
                          {selectedUser.jobDetail.designation}
                        </p>
                      </Col>
                    </Row> */}
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
                        <Form.Item label="User Name" name="userName">
                          <Input
                            placeholder="Enter full name"
                            defaultValue={selectedUser.signInDetail.userName}
                            readOnly
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item label="SignIn Email" name="signInEmail">
                          <Input
                            type="email"
                            placeholder="Enter SignIn Email"
                            defaultValue={selectedUser.signInDetail.signInEmail}
                            readOnly
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[16, 0]}>
                      <Col xs={24} sm={12}>
                        <Form.Item label="Password" name="password">
                          <Input.Password
                            defaultValue={selectedUser.signInDetail.password}
                            readOnly
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="Confirm Password"
                          labelCol={{ span: 10 }}
                          name="confirmPassword"
                        >
                          <Input.Password
                            defaultValue={
                              selectedUser.signInDetail.confirmPassword
                            }
                            readOnly
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                  </Form>
                </div>
              </div>
            </Col>
          </div>
          
        )}
      </Modal>
    </div>
  );
};
