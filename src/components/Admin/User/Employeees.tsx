import React, { useEffect, useState } from "react";
import { Divider, Table, Row, Col, Spin, Typography, message } from "antd";
import { User } from "../../types";
import { fetchUsers, deleteUser,updateUser } from "../../../services/userApis/userApis";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Search from "antd/es/input/Search";
import { AddUserModal } from "./AddUserModal";

const { Title } = Typography;

export const Employees: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState<string>("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  interface AddUserModalProps {
    user: User | null;
    isEditing: boolean;
    isModalOpen: boolean;
    onUpdate: (userId: string, updatedUser: User) => Promise<void>;
    onClose: () => void; 
    setIsModalOpen: (isOpen: boolean) => void;
  }
  
  


  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const usersData = await fetchUsers();
        console.log("usersData",usersData)
        setUsers(usersData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
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

  const filteredUsers = users.filter((record) => {
    const fullName = `${record.firstName} ${record.lastName}`.toLowerCase();
    return fullName.includes(searchName.toLowerCase());
  });

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
  
  const handleUpdate = async (userId: string, updatedUser: User) => {
    console.log("Updating user:", userId, updatedUser);
    try {
      await updateUser(userId, updatedUser); 
      console.log("User updated successfully");
      setUsers(users.map(user => user._id === userId ? updatedUser : user));
      message.success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      message.error("Failed to update user");
    }
  };
  
  
  const handleEdit = (record: User) => {
    setEditingUser(record);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };
  // const handleEdit = (user: User) => {
  //   setEditingUser(user);
  //   <AddUserModal />;

  //   // navigate(`/dashboard/edit-employee/${user._id}`, { state: { user } });
  // };

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
    },
    {
      title: "Joining Date",
      dataIndex: ["jobDetail", "joiningDate"],
      key: "joiningDate",
      render: (text: string) => moment(text).format("MMMM Do YYYY"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: any, record: User) => (
        <span>
          <EditOutlined
            style={{ marginRight: 8 }}
            onClick={() => handleEdit(record)}
          />
          <DeleteOutlined onClick={() => handleDelete(record._id)} />
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between bg-slate-200 p-1 rounded-md w-full">
        <div className="border-l-4 border-secondary-color h-9 flex items-center">
          <Title level={5} className="ml-2">
            Employee
          </Title>
        </div>
        <Row justify="space-between" align="middle" className="">
          <Col>
            <Search
              placeholder="Search by name"
              allowClear
              onSearch={(value) => setSearchName(value)}
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
