import { Typography, Divider, Row, Avatar, Col, Table, Spin } from "antd";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../../services/userApis/userApis";
import { UserData, AttendanceData } from "../../types";
import { fetchUserAttendance } from "../../../services/attendenceApis/attendence";
import { format } from "date-fns";
import { fetchAllLeaveApplicationsUser } from "../../../services/leaveApplication/leaveApplication";
import { ApplicationData } from "../../types";

const { Title } = Typography;
export const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [leaveApplicationData, setLeaveApplicationData] = useState([]);
  const [approved, setApproved] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData();
      setUserData(userData);
      console.log("userData", userData?.signInDetail.userName);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetchUserAttendance();
        console.log("fetched data", response.data);
        setAttendanceData(response.data);
        console.log("response.data", response.data);
      } catch (error) {
        console.error("Error fetching user attendance:", error);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchAttendanceData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchAllLeaveApplicationsUser();
        if (response && response.content) {
          setLeaveApplicationData(response.content);
          const approvedLeaveApplications = response.content.filter(
            (item: { leaveStatus: string }) => item.leaveStatus === "Approved"
          );
          setApproved(approvedLeaveApplications);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        console.error("Error fetching leave applications data:", error);
        setError("Failed to fetch leave applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getData();
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

  const convertToHHMMSS = (decimalHours: number) => {
    if (isNaN(decimalHours)) {
      return "N/A";
    }
    const totalSeconds = Math.floor(decimalHours * 3600);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const totalAttendance = attendanceData.length;
  const totalLeaves = userData && Array.isArray(userData) ? userData : 0;

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Present":
        return "green";
      case "Absent":
        return "red";
      case "Leave":
        return "yellow";
      default:
        return "gray";
    }
  };
  const columns = [
    // {
    //   title: "Employee ID",
    //   dataIndex: ["jobDetail", "employeeId"],
    //   key: "employeeId",
    // },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => format(new Date(date), "PPP"),
    },
    {
      title: "CheckedIn",
      dataIndex: "time_in",
      key: "time_in",
      render: (time_in: string) => format(new Date(time_in), "hh:mm a"),
    },
    {
      title: "CheckedOut",
      dataIndex: "time_out",
      key: "time_out",
      render: (time_out: string) => {
        if (!time_out || isNaN(Date.parse(time_out))) {
          return "N/A";
        }
        return format(new Date(time_out), "hh:mm a");
      },
    },
    {
      title: "Status",
      dataIndex: "status",
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
      title: "Working Hours",
      dataIndex: "working_hours",
      key: "working_hours",
      render: (working_hours: number) => convertToHHMMSS(working_hours),
    },
  ];
  return (
    <div>
      <div className="bg-slate-200 pb-4">
        <div className="flex justify-between bg-slate-200 p-1 rounded-md w-full">
          <div className="border-l-4 border-secondary-color h-9 flex items-center">
            <Title level={5} className="ml-2">
              Employee Details
            </Title>
          </div>
        </div>
        <Divider />
        <div className="flex p-2">
        <Avatar
            alt="User Avatar"
            src={userData?.userDetail?.profileImage || ""}
            style={{ width: 150, height: 150 }}
          />
          <div className="ml-10">
            <Title level={1}>
              {userData?.signInDetail.userName 
                ? userData?.signInDetail.userName
                : ""}
            </Title>
            <Row className="w-full flex text-slate-400 font-semibold space-x-36">
              <div className="grid mx-4">
                <span className="text-black">Role</span>
                <span>{userData?.jobDetail?.role}</span>
              </div>
              <div className="grid mx-4">
                <span className="text-black">Designation</span>
                <span>{userData?.jobDetail?.designation}</span>
              </div>
              <div className="grid mx-4">
                <span className="text-black">Email Address</span>
                <span>{userData?.userDetail?.email}</span>
              </div>
              <div className="grid mx-4">
                <span className="text-black">CNIC</span>
                <span>{userData?.userDetail?.cnic}</span>
              </div>
              <div className="grid mx-4">
                <span className="text-black">DOB</span>
                <span>
                  {userData?.userDetail?.dob
                    ? format(new Date(userData?.userDetail?.dob), "PPP")
                    : "N/A"}
                </span>
              </div>
              <div className="grid mx-4">
                <span className="text-black">Joining Date</span>
                <span>
                  {userData?.jobDetail?.joiningDate
                    ? format(new Date(userData?.jobDetail?.joiningDate), "PPP")
                    : "N/A"}
                </span>
              </div>
            </Row>
          </div>
        </div>
        <Row className="flex justify-around mt-4">
          <Col span={5}>
            <div className="mr-2 bg-slate-300 flex justify-evenly items-center p-5 rounded-lg">
              <Avatar>
                <FaArrowRightToBracket />
              </Avatar>
              <div>
                <Title level={5}>{totalAttendance}</Title>
                <span>Total Attendance</span>
              </div>
            </div>
          </Col>
          <Col span={5}>
            <div className="mr-2 bg-slate-300 flex justify-evenly items-center p-5 rounded-lg">
              <Avatar>
                <FaArrowRightToBracket />
              </Avatar>
              <div>
                <Title level={5}>{}</Title>
                <div>
                  <Title level={5}>{approved.length || 0}</Title>
                  <span>Total Leaves</span>
                </div>
              </div>
            </div>
          </Col>
          <Col span={5}>
            <div className="mr-2 bg-slate-300 flex justify-evenly items-center p-5 rounded-lg">
              <Avatar>
                <FaArrowRightToBracket />
              </Avatar>
              <div>
                <Title level={5}>
                  {attendanceData?.filter((item) => item.status === "Present")
                    .length || 0}
                </Title>
                <span>Total Paresnt</span>
              </div>
            </div>
          </Col>
          <Col span={5}>
            <div className="mr-2 bg-slate-300 flex justify-evenly items-center p-5 rounded-lg">
              <Avatar>
                <FaArrowRightToBracket />
              </Avatar>
              <div>
                <Title level={5}>
                  {attendanceData?.filter((item) => item.status === "Absent")
                    .length || 0}
                </Title>
                <span>Total Absents</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="flex justify-between bg-slate-200 p-1 rounded-md mt-4">
        <div className="border-l-4 border-secondary-color h-9 flex items-center">
          <Title level={5} className="ml-2">
            Attandance Detail
          </Title>
        </div>
      </div>

      <Table
        className="mt-4"
        dataSource={attendanceData}
        columns={columns}
        bordered
      />
    </div>
  );
};
