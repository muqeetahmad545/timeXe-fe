import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";
import { RightSidebar } from "./RightSidebar";
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

export const AppContent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [attendanceData, setAttendanceData] = useState<PropUser[]>([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [presentEmployees, setPresentEmployees] = useState(0);
  const [loading, setLoading] = useState(true);

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
    <div className="flex w-full">
      <div className="w-3/4 flex flex-col justify-center items-center">
        <div className="mt-4">
          <Typography className="border-2 border-slate-300 text-center ">
         Present Employees {presentEmployees}
          </Typography>
          {/* <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10,12] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                area: true,
              },
            ]}
            width={700}
            height={300}
          /> */}
       
       <LineChart
  xAxis={[{ data: Array.from({ length: totalEmployees }, (_, i) => i + 1) }]}
  series={[
    {
      data: Array.from({ length: totalEmployees }, () => presentEmployees),
      area: true,
    },
  ]}
  width={700}
  height={300}
  // Ensure that the key prop is provided to force re-renders when state changes
  // key={presentEmployees}
/>
        </div>
      </div>
      <div>
        <RightSidebar/>
      </div>
    </div>
  );
};
