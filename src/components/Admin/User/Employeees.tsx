// import React, { useEffect, useState } from "react";
// import { Divider, Table, Row, Col, Spin, Typography, message } from "antd";
// import { User } from "../../types";
// import {
//   fetchUsers,
//   deleteUser,
//   updateUser,
//   updateStatus,
// } from "../../../services/userApis/userApis";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import moment from "moment";
// import Search from "antd/es/input/Search";
// import { AddUserModal } from "./AddUserModal";
// import { FaUserAltSlash } from "react-icons/fa";
// FaUserAltSlash;
// const { Title } = Typography;

// export const Employees: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchName, setSearchName] = useState<string>("");
//   const [editingUser, setEditingUser] = useState<User | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   interface AddUserModalProps {
//     user: User | null;
//     isEditing: boolean;
//     isModalOpen: boolean;
//     onUpdate: (userId: string, updatedUser: User) => Promise<void>;
//     onClose: () => void;
//     setIsModalOpen: (isOpen: boolean) => void;
//   }

//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchUsersData = async () => {
//       try {
//         const usersData = await fetchUsers();
//         console.log("usersData", usersData);
//         setUsers(usersData);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     setLoading(true);
//     fetchUsersData();
//   }, []);

// if (loading) {
//   return (
//     <Row justify="center" align="middle" style={{ height: "100vh" }}>
//       <Col>
//         <Spin size="large" />
//       </Col>
//     </Row>
//   );
// }

//   // const filteredUsers = users.filter((record) => {
//   //   const fullName = `${record.firstName} ${record.lastName}`.toLowerCase();
//   //   return fullName.includes(searchName.toLowerCase());
//   // });

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

//   const onStatusClick = (userId: string) => {
//     handleStatusUpdate(userId);
//   };

//   const handleStatusUpdate = async (userId: string) => {
//     try {
//       // await updateStatus(userId, { status: "Inactive" });
//       await updateStatus(userId, { jobDetail: { status: "Inactive" } });
//       setUsers((users) =>
//         users.map((user) =>
//           user._id === userId
//             ? { ...user, jobDetail: { ...user.jobDetail, status: "Inactive" } }
//             : user
//         )
//       );
//       message.success("User status updated successfully");
//     } catch (error) {
//       console.error("Error updating user:", error);
//       message.error("Failed to update user status");
//     }
//   };

//   // const handleUpdate = async (userId: string, updatedUser: User) => {
//   //   console.log("Updating user:", userId, updatedUser);
//   //   try {
//   //     await updateUser(userId, updatedUser);
//   //     console.log("User updated successfully");
//   //     setUsers(users.map((user) => (user._id === userId ? updatedUser : user)));
//   //     message.success("User updated successfully");
//   //   } catch (error) {
//   //     console.error("Error updating user:", error);
//   //     message.error("Failed to update user");
//   //   }
//   // };

//   const handleEdit = (record: User) => {
//     setEditingUser(record);
//     setIsModalOpen(true);
//   };

//   const handleAdd = () => {
//     setEditingUser(null);
//     setIsModalOpen(true);
//   };
//   const getStatusColor = (status: string): string => {
//     switch (status) {
//       case "Active":
//         return "green";
//       case "InActive":
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
//       dataIndex: "action",
//       key: "action",
//       render: (text: any, record: User) => (
//         <span>
//           <EditOutlined
//             style={{ marginRight: 8 }}
//             onClick={() => handleEdit(record)}
//           />
//           <DeleteOutlined
//             style={{ marginRight: 8 }}
//             onClick={() => handleStatusUpdate(record)}
//           />
//         </span>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <div className="flex justify-between bg-slate-200 p-1 rounded-md w-full">
//         <div className="border-l-4 border-secondary-color h-9 flex items-center">
//           <Title level={5} className="ml-2">
//             Employee
//           </Title>
//         </div>
//         <Row justify="space-between" align="middle" className="">
//           <Col>
//             <Search
//               placeholder="Search by name"
//               allowClear
//               onSearch={(value) => setSearchName(value)}
//               style={{ width: 200 }}
//             />
//           </Col>
//           <Col>
//             <AddUserModal />
//           </Col>
//         </Row>
//       </div>
//       <Divider />
//       <Table dataSource={filteredUsers} columns={columns} />
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
} from "antd";
import { User } from "../../types";
import {
  fetchUsers,
  deleteUser,
  updateStatus,
} from "../../../services/userApis/userApis";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Search from "antd/es/input/Search";
import { AddUserModal } from "./AddUserModal";
import { FaUserAltSlash } from "react-icons/fa";

const { Title } = Typography;

export const Employees: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState<string>("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUsersData = async () => {
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

  useEffect(() => {
    const fetchUsersData = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Always set loading to false after fetch operation
      }
    };

    fetchUsersData();
  }, []);

  if (loading) {
    return (
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    );
  }

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
      message.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Failed to delete user");
    }
  };

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
  const handleEdit = (record: User) => {
    setEditingUser(record);
    setIsModalOpen(true);
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

  const columns = [
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
        <span style={{ display: "flex", alignItems: "center" }}>
          <EditOutlined
            style={{ fontSize: 20, marginRight: 8, cursor: "pointer" }}
            onClick={() => handleEdit(record)}
          />
          <FaUserAltSlash
            style={{ fontSize: 20, color: "red", cursor: "pointer" }}
            onClick={() => handleStatusUpdate(record._id)}
          />
        </span>
      ),
    },
  ];

  const handleSearch = (value: string) => {
    setSearchName(value.trim().toLowerCase());
  };

  const filteredUsers = users.filter((user) =>
    `${user.userDetail.fullName}`
      .toLowerCase()
      .includes(searchName.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between bg-slate-200 p-1 rounded-md w-full">
        <div className="border-l-4 border-secondary-color h-9 flex items-center">
          <Title level={5} className="ml-2">
            Employees
          </Title>
        </div>
        <Row justify="space-between" align="middle">
          <Col>
            <Search
              placeholder="Search by name"
              allowClear
              onSearch={handleSearch}
              style={{ width: 200 }}
            />
          </Col>
          <Col>
            <AddUserModal />
          </Col>
        </Row>
      </div>
      <Divider />
      <Table dataSource={filteredUsers} columns={columns} />
    </div>
  );
};
