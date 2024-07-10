import { fetchUsers } from "../../../services/userApis/userApis";
import { fetchAllUserAttendance } from "../../../services/attendenceApis/attendence";
import { useEffect, useState } from "react";
import { User, AttendanceData } from "../../types";
import { Avatar, Card, Col, Row,Typography } from "antd";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { LineChart, PieChart } from "@mui/x-charts";
import './Dashboard.css'
const { Title } = Typography;

export const AppContent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [presentEmployees, setPresentEmployees] = useState(0);
  const [absentEmployees, setAbsentEmployees ] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pieChartData = [
    { id: "Present", value: presentEmployees },
    { id: "Absent", value:  totalEmployees},
  ];

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
        const absentEmployees = response.data.filter((record: AttendanceData) => record.status === "Absent").length;
        console.log("presentEmployees", presentEmployees)
        setAttendanceData(response.data);
        setPresentEmployees(presentEmployees);
        setTotalEmployees(usersData.length); 
        setAbsentEmployees(absentEmployees); 
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
    <>
        <div className="ml-10 mb-8 mt-8">
        <Typography className="font-bold">Today's Attendance</Typography>
        <Typography className="text-slate-400">{new Date().toLocaleDateString()}</Typography>
      </div>
                  <Row gutter={[16, 0]}> 
       <Col xs={24} sm={12} lg={6}>
            <div className="mr-2 bg-slate-300 flex justify-evenly items-center p-5 rounded-lg">
              <Avatar>
                <FaArrowRightToBracket />
              </Avatar>
              <div>
                <Title level={5}>{totalEmployees || 0}</Title>
                <span>Total Employee</span>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
          <div className="mr-2 bg-slate-300 flex justify-evenly items-center p-5 rounded-lg">
              <Avatar>
                <FaArrowRightToBracket />
              </Avatar>
              <div>
                <Title level={5}>{}</Title>
                <div>
                  <Title level={5}>{ presentEmployees||0}</Title>
                  <span>Present Employee</span>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
          <div className="mr-2 bg-slate-300 flex justify-evenly items-center p-5 rounded-lg">
              <Avatar>
                <FaArrowRightToBracket />
              </Avatar>
              <div>
                <Title level={5}>
                  {attendanceData?.filter((item) => item.status === "Present")
                    .length || 0}
                </Title>
                <span>Today's Leaves</span>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
          <div className="mr-2 bg-slate-300 flex justify-evenly items-center p-5 rounded-lg">
              <Avatar>
                <FaArrowRightToBracket />
              </Avatar>
              <div>
                <Title level={5}>
                <Title level={5}>{absentEmployees ||0}</Title>
                </Title>
                <span>Today's Absents</span>
              </div>
            </div>
          </Col>
        </Row>
       <div className="flex w-full">
       <LineChart
  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
  series={[
    {
      data: [2, 5.5, 2, 8.5, 1.5, 5],
    },
  ]}
  height={600}
/>
<Card title="Employee Status" style={{ 
  width: 800, 
  marginTop: "50px", 
  textAlign: "left"
}}>
      <div className="employee-status-content">
        <div className="employee-counts">
        <p style={{ fontWeight: 'bold' }}>Present Employees: {presentEmployees}</p>
        <p style={{ fontWeight: 'bold' }}>Total Employees: {totalEmployees}</p>
        </div>
        
        <div className="pie-chart-container" >
          <PieChart  series={[{ data: pieChartData }]} height={400} />
        </div>
        <p style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>Pie Chart</p>       
         </div>
    </Card>
      <div>
      </div>
    </div>
    </>
  );
};
