import { UserOutlined } from "@ant-design/icons";
import { Typography } from "@mui/material";
import { Avatar, Col, Row, Spin } from "antd";
import { fetchUsers } from "../../../services/userApis/userApis";
import { fetchAllUserAttendance } from "../../../services/attendenceApis/attendence";
import { useEffect, useState } from "react";
import { User, AttendanceData } from "../../types";

type PropUser = {
  user: string;
  date: string;
  time_in: string;
  time_out: string;
};

export const RightSidebar = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [presentEmployees, setPresentEmployees] = useState<AttendanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
        setTotalEmployees(usersData.length);
        const today = new Date().toISOString().slice(0, 10); 
        const response = await fetchAllUserAttendance({ startDate: today, endDate: today });
        const presentEmployeesData = response.data.filter((record: AttendanceData) => record.status === "Present");
        setAttendanceData(response.data);
        setPresentEmployees(presentEmployeesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="px-2 py-4">
      <div className="ml-10 mb-8 mt-8">
        <Typography className="!font-bold">Today's Attendance</Typography>
        <Typography className="!text-slate-400">{new Date().toLocaleDateString()}</Typography>
      </div>

      <div className="flex justify-around items-center mb-2 ml-5">
        <Avatar><UserOutlined className="text-slate-500"/></Avatar>
        <div className="">
          <Typography>Total Employees</Typography>
          <Typography className="text-slate-500">{totalEmployees}</Typography>
        </div>
      </div>

      <div className="flex justify-around items-center mb-2 ml-10">
        <Avatar><UserOutlined className="text-secondary-color"/></Avatar>
        <div className="ml-8"> 
          <Typography>Present Employees</Typography>
          <Typography className="text-secondary-color">{presentEmployees.length}/{totalEmployees}</Typography>
        </div>
      </div>

      <div className="flex justify-around items-center mb-2 ml-10">
        <Avatar><UserOutlined className="text-secondary-color"/></Avatar>
        <div className="ml-12"> 
          <Typography>Present Employees</Typography>
          <div className="text-secondary-color">
            {presentEmployees.map((employee, index) => (
              <div className="flex items-center" key={index}>
                <Typography>{index + 1}-{employee.userName}</Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
