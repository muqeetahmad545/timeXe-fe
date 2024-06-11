import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";
import { RightSidebar } from "./RightSidebar";
import { fetchUsers } from "../../../services/userApis/userApis";
import { fetchAllUserAttendance } from "../../../services/attendenceApis/attendence";
import { useEffect, useState } from "react";
import { User, AttendanceData } from "../../types";

export const AppContent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [presentEmployees, setPresentEmployees] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
        const today = new Date().toISOString().slice(0, 10);
        const response = await fetchAllUserAttendance({ startDate: today, endDate: today });
        console.log("response: " + response.data);
        const presentEmployees = response.data.filter((record: AttendanceData) => record.status === "Present").length;
        console.log("presentEmployees", presentEmployees)
        setAttendanceData(response.data);
        setPresentEmployees(presentEmployees);
        setTotalEmployees(usersData.length); 
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
    <div className="flex w-full">
      <div className="w-3/4 flex flex-col justify-center items-center">
        <div className="mt-4">
          <Typography className="border-2 border-slate-300 text-center">
            Total Employees: {totalEmployees}
          </Typography>
          <LineChart
            xAxis={[{ data: Array.from({ length: totalEmployees }, (_, i) => i + 1) }]}
            series={[
              {
                data: Array.from({ length: totalEmployees }, () => totalEmployees),
                area: true,
              },
            ]}
            width={700}
            height={300}
          />
        </div>
      </div>
      <div>
        <RightSidebar />
      </div>
    </div>
  );
};
