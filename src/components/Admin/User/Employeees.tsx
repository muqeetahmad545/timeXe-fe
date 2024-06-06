// import React, { useEffect, useState } from "react";
// import { Divider, Table, Typography, message } from "antd";
// import { User } from "../../types";
// import { fetchUsers , deleteUser , updateUser } from "../../../services/userApis/userApis";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import moment from "moment";
// // import  AddUser  from "./AddUser";

// const { Title } = Typography;

// export const Employees: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsersData = async () => {
//       const usersData = await fetchUsers();
//       setUsers(usersData);
//     };
//     fetchUsersData();
//   }, []);

//   const handleDelete = async (userId: string) => {
//     try {
//       await deleteUser(userId);
//       setUsers(users.filter(user => user._id !== userId));
//       message.success("User deleted successfully");
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       message.error("Failed to delete user");
//     }
//   };


//   const handleEdit = (user: User) => {
//     const userId =user._id;
//     console.log("userId??",userId);
//     navigate(`/dashboard/edit-employee/${userId}`, { state: { user } });
//     console.log("User><><><",user)
//   };

//   // const handleUpdate = async (userId: string, updateData: Partial<User>) => {
//   //   try {
//   //     await updateUser(userId, updateData);
//   //     const updatedUsers = users.map(user => user._id === userId ? { ...user, ...updateData } : user);
//   //     setUsers(updatedUsers);
//   //     message.success("User updated successfully");
//   //   } catch (error) {
//   //     console.error("Error updating user:", error);
//   //     message.error("Failed to update user");
//   //   }
//   // };

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "firstName",
//       key: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Role",
//       dataIndex: "role",
//       key: "role",
//     },
//     {
//       title: "Designation",
//       dataIndex: "designation",
//       key: "designation",
//     },
//     {
//       title: "CNIC",
//       dataIndex: "cnic",
//       key: "cnic",
//     },
//     {
//       title: "Joining Date",
//       dataIndex: "joiningDate",
//       key: "joiningDate",
//       render: (text: string) => moment(text).format('MMMM Do YYYY'),
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       key: "action",
//       render: (text: any, record: User) => (
//         <span>
//           <EditOutlined style={{ marginRight: 8 }} onClick={() => handleEdit(record)} />
//           <DeleteOutlined onClick={() => handleDelete(record._id)} />
//         </span>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <div className="flex justify-between bg-slate-200 p-1 rounded-md w-full">
//         <div className="border-l-4 border-secondary-color h-9 flex items-center">
//           <Title level={5} className="ml-2">
//             Employee Details
//           </Title>
//         </div>
//       </div>
//       <Divider />
//       <Table dataSource={users} columns={columns} />;
//     </div>
//   );
// };


import React, { useEffect, useState } from "react";
import { Divider, Table,Row,Col,Spin, Typography, message } from "antd";
import { User } from "../../types";
import { fetchUsers, deleteUser } from "../../../services/userApis/userApis";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Search from "antd/es/input/Search";

const { Title } = Typography;

export const Employees: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState<string>(""); 

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const usersData = await fetchUsers();
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
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    );
  }

  const filteredUsers = users.filter((record) => {
    // Filter the records based on the concatenated name
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

  const handleEdit = (user: User) => {
    navigate(`/dashboard/edit-employee/${user._id}`, { state: { user } });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "name",
      render: (_: any, record: any) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "CNIC",
      dataIndex: "cnic",
      key: "cnic",
    },
    {
      title: "Joining Date",
      dataIndex: "joiningDate",
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
            Employee Details
          </Title>
        </div>
        <Search
          placeholder="Search by name"
          allowClear
          onSearch={(value) => setSearchName(value)}
          style={{ width: 200, margin: "0 10px" }}
        />
      </div>
      <Divider />
      <Table dataSource={filteredUsers} columns={columns} />
    </div>
  );
};
