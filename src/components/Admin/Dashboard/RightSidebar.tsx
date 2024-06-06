import { UserOutlined } from "@ant-design/icons";
import { Typography } from "@mui/material";
import { Avatar, Col, Row, Spin } from "antd";
import { fetchUsers } from "../../../services/userApis/userApis";
import { fetchAllUserAttendance } from "../../../services/attendenceApis/attendence";
import { useEffect, useState } from "react";
import { User } from "../../types";

type PropUser = {
  user: string;
  date: string;
  time_in: string;
  time_out: string;
};

export const RightSidebar = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [attendanceData, setAttendanceData] = useState<PropUser[]>([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [presentEmployees, setPresentEmployees] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchAllUserAttendance({});
        const usersData = await fetchUsers();
        setUsers(usersData);
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching user attendance:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); 



  // useEffect(() => {
  //   const fetchAttendanceData = async () => {
  //     try {
  //       const response = await fetchAllUserAttendance();
  //       const usersData = await fetchUsers();
  //       setUsers(usersData);
  //       setAttendanceData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user attendance:", error);
  //     }
  //   };
  //   fetchAttendanceData();
  // }, []);

  useEffect(() => {
    const fetchUsersData = async () => {
      const todayDate = new Date().toISOString().substring(0, 10);
      const usersData = await fetchUsers();
      setUsers(usersData);
      setTotalEmployees(usersData.length);
      const presentEmployeesToday = attendanceData.filter(
        (att) =>
          att.date.substring(0, 10) === todayDate && 
          att.time_out !== ""
      ).length;
      setPresentEmployees(presentEmployeesToday);
    };
    fetchUsersData();
  }, [attendanceData]); 

  
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
        <Avatar><UserOutlined className="text-secondary-color "/></Avatar>
        <div className="ml-8"> 
          <Typography>Present Employees</Typography>
          <Typography className="text-secondary-color">{presentEmployees}/{totalEmployees}</Typography>
        </div>
      </div>
      {/* <Typography className="!font-bold !mb-2">Recent Attendance</Typography>
      <div className="flex justify-around items-center">
        <Avatar><UserOutlined className="text-slate-500"/></Avatar>
        <div>
          <Typography>Total Employees</Typography>
          <Typography>{totalEmployees}</Typography>
        </div>
      </div>
      <div className="flex justify-around items-center">
        <Avatar><UserOutlined className="text-secondary-color"/></Avatar>
        <div>
          <Typography>Present Employees</Typography>
          <Typography className="text-secondary-color">{presentEmployees}/{totalEmployees}</Typography>
        </div>
      </div> */}
    </div>
  );
};
