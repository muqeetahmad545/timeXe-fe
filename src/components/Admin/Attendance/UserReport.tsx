import React, { useEffect, useState } from "react";
import { Table, Typography, Row, Col, Spin, Alert, Select } from "antd";
import { format } from "date-fns";
import { fetchAllUserAttendance } from "../../../services/attendenceApis/attendence";
import { User, AttendanceRecord } from "../../types";
import { fetchUsers } from "../../../services/userApis/userApis";

const { Title } = Typography;

const convertToHHMMSS = (decimalHours: number): string => {
  if (isNaN(decimalHours)) {
    return 'N/A';
  }
  const totalSeconds = Math.floor(decimalHours * 3600);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const UserReport: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("Select a user name");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
        const response = await fetchAllUserAttendance({});
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUserChange = (value: string) => {
    setSelectedUser(value);
  };

  const filteredAttendanceData = selectedUser === "Select a user name" ? attendanceData : attendanceData.filter(record => record.userName === selectedUser);
  const uniqueUserNames = [...new Set(attendanceData.map(record => record.userName))];


  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => format(new Date(date), 'PPP'),
    },
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "CheckedIn",
      dataIndex: "time_in",
      key: "time_in",
      render: (time_in: string) => format(new Date(time_in), 'hh:mm a'),
    },
    {
      title: "CheckedOut",
      dataIndex: "time_out",
      key: "time_out",
      render: (time_out: string) => {
        if (!time_out || isNaN(Date.parse(time_out))) {
          return 'N/A'; 
        }
        return format(new Date(time_out), 'hh:mm a');
      },
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      render: (_: any, record: any) => {
        const user = users.find((user) => user._id === record.user);
        return user ? `${user.designation}` : '';
      }, 
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Working Hours",
      dataIndex: "working_hours",
      key: "working_hours",
      render: (working_hours: number) => convertToHHMMSS(working_hours),
    },
  ];

  if (loading) {
    return (
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div>
      <div className="flex justify-between bg-slate-200 p-1 rounded-md w-full">
        <div className="border-l-4 border-secondary-color h-9 flex items-center">
          <Title level={5} className="ml-2">
            User Report
          </Title>
        </div>
      </div>
      <Row justify="space-between" align="middle" style={{ margin:10 }}>
        <Col span={24}>
        <Select
            value={selectedUser}
            onChange={handleUserChange}
            placeholder="Select User Name"
            style={{ width: '100%' }}
          >
            {uniqueUserNames.map(userName => (
              <Select.Option key={userName} value={userName}>
                {userName}
              </Select.Option>
            ))}
          </Select>

        </Col>
      </Row>
      <Table dataSource={filteredAttendanceData} columns={columns} rowKey="_id" />
    </div>
  );
};
