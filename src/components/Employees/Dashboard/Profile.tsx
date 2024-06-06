// import { Typography, Divider, Row, Avatar, Col, Table, Card } from "antd";
// import { FaArrowRightToBracket } from "react-icons/fa6";
// import { FaRegClock } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import { fetchUserData } from "../../../services/userApis/userApis";
// import { UserData } from "../../types";
// import { fetchUserAttendance } from "../../../services/attendenceApis/attendence";
// const { Title } = Typography;

// export const Profile = () => {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       const userData = await fetchUserData();
//       setUserData(userData);
//       console.log(userData);
//     };

//     fetchData();
//   }, []);
//   const [attendanceData, setAttendanceData] = useState([]);

//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         const response = await fetchUserAttendance();
//         console.log("fetched data",response.data);
//         setAttendanceData(response.data);
//       } catch (error) {
//         console.error("Error fetching user attendance:", error);
//       }
//     };

//     fetchAttendanceData();
//   }, []);
//   console.log("attendanceData",attendanceData);
//   const columns = [
//     {
//       title: "Attendance History",
//       dataIndex: "data",
//       key: "data",
//       render: (text: string, record: any) => (
//         <Row gutter={[16, 16]}>
//           <Col span={6}>
//             <Card className="bg-slate-300 rounded-lg">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="flex items-center">
//                   <FaRegClock className="mr-1" />
//                   {record.date.toLocaleString().slice(0, 10)}
//                 </span>
//                 <div className="border-2 border-white bg-white font-semibold text-slate-500 rounded-full p-1">
//                   {record.status}
//                 </div>
//               </div>

//               <div className="flex justify-between items-center mb-2">
//                 <span>Check In Time</span>
//                 <span>Check Out Time</span>
//               </div>
//               <div className="flex justify-between items-center font-bold">
//                 <span>{record.time_in.toLocaleString().slice(11, 19)}</span>
//                 <span>{record.time_out.toLocaleString().slice(11, 19)}</span>
//               </div>
//             </Card>
//           </Col>
//         </Row>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <div className="bg-slate-200 pb-4">
//         <div className="flex justify-between bg-slate-200 p-1 rounded-md w-full">
//           <div className="border-l-4 border-secondary-color h-9 flex items-center">
//             <Title level={5} className="ml-2">
//               Employee Details
//             </Title>
//           </div>
//         </div>
//         <Divider />
//         <div className="flex p-2">
//           <Avatar size={100} className="!text-5xl">
//             {userData?.firstName.slice(0, 1)}
//           </Avatar>
//           <div className="w-2/5 ml-12">
//             <Title level={2}>{userData?.firstName}</Title>
//             <Row className="flex justify-between text-slate-400 font-semibold">
//               <span>ROLE</span>
//               <span>Designation</span>
//               <span>EMAIL ADDRESS</span>
//               <span>SALRAY</span>
//               {/* <span>JOINING DATE</span> */}
//             </Row>
//             <Row className="flex justify-between mt-4 font-semibold">
//               <span>{userData?.role}</span>
//               <span>{userData?.designation}</span>
//               <span>{userData?.email}</span>
//               <span>{userData?.salary}</span>
//               {/* <span>{userData?.joiningDate}</span> */}
//             </Row>
//           </div>
//         </div>
//         <Row className="flex justify-around mt-4">
//           <Col span={5}>
//             <div className="mr-2 bg-slate-300 flex justify-evenly items-center p-5 rounded-lg">
//               <Avatar>
//                 <FaArrowRightToBracket />
//               </Avatar>

//               <div>
//                 <Title level={5}>3</Title>
//                 <span>Total Attendence</span>
//               </div>
//             </div>
//           </Col>
//           <Col span={5}>
//             <div className="mr-2 bg-slate-300 flex justify-evenly  items-center p-5 rounded-lg">
//               <Avatar>
//                 <FaArrowRightToBracket />
//               </Avatar>
//               <div>
//                 <Title level={5}>0</Title>
//                 <span>Pending Leaves Requests</span>
//               </div>
//             </div>
//           </Col>
//           <Col span={5}>
//             <div className="mr-2 bg-slate-300 flex justify-evenly  items-center p-5 rounded-lg">
//               <Avatar>
//                 <FaArrowRightToBracket />
//               </Avatar>

//               <div>
//                 <Title level={5}>...</Title>
//                 <span>Total Leaves</span>
//               </div>
//             </div>
//           </Col>
//           <Col span={5}>
//             <div className="mr-2 bg-slate-300 flex justify-evenly items-center p-5 rounded-lg">
//               <Avatar>
//                 <FaArrowRightToBracket />
//               </Avatar>

//               <div>
//                 <Title level={5}>...</Title>
//                 <span>Totsl Absents</span>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </div>
//       {/* <div className="bg-slate-200 pb-4 mt-2">
//         <div className="flex justify-between bg-slate-200 p-1 rounded-md w-full">
//           <div className="border-l-4 border-secondary-color h-9 flex items-center">
//             <Title level={5} className="ml-2">
//               Attendence History
//             </Title>
//           </div>
//         </div>
//         <Divider /> */}
//         {/* <Row className="flex justify-around">
//           <Col span={6}>
//             <div className="mr-2 bg-slate-300 p-2 rounded-lg">
//               <div className="flex justify-between items-center !w-full mb-4">
//                 <span className="flex items-center">
//                   <FaRegClock className="mr-1" />
//                   28 May 2024
//                 </span>
//                 <div className="border-2 border-white bg-white font-semibold text-slate-500 rounded-full p-1">
//                   Pending
//                 </div>
//               </div>

//               <div className="flex justify-between items-center w-full textslate=500 mb-4">
//                 <span>Check In Time</span>
//                 <span>Check Out Time</span>
//               </div>
//               <div className="flex justify-between items-center !w-full font-bold">
//                 <span>9: 00 A.M</span>
//                 <span>6: 00 P.M</span>
//               </div>
//             </div>
//           </Col>
//           <Col span={6}>
//             <div className="mr-2 bg-slate-300 p-2 rounded-lg">
//               <div className="flex justify-between items-center !w-full mb-4">
//                 <span className="flex items-center">
//                   <FaRegClock className="mr-1" />
//                   28 May 2024
//                 </span>
//                 <div className="border-2 border-white bg-white font-semibold text-slate-500 rounded-full p-1">
//                   Pending
//                 </div>
//               </div>

//               <div className="flex justify-between items-center w-full textslate=500 mb-4">
//                 <span>Check In Time</span>
//                 <span>Check Out Time</span>
//               </div>
//               <div className="flex justify-between items-center !w-full font-bold">
//                 <span>9: 00 A.M</span>
//                 <span>6: 00 P.M</span>
//               </div>
//             </div>
//           </Col>
//           <Col span={6}>
//             <div className="mr-2 bg-slate-300 p-2 rounded-lg">
//               <div className="flex justify-between items-center !w-full mb-4">
//                 <span className="flex items-center">
//                   <FaRegClock className="mr-1" />
//                   28 May 2024
//                 </span>
//                 <div className="border-2 border-white bg-white font-semibold text-slate-500 rounded-full p-1">
//                   Pending
//                 </div>
//               </div>

//               <div className="flex justify-between items-center w-full textslate=500 mb-4">
//                 <span>Check In Time</span>
//                 <span>Check Out Time</span>
//               </div>
//               <div className="flex justify-between items-center !w-full font-bold">
//                 <span>9: 00 A.M</span>
//                 <span>6: 00 P.M</span>
//               </div>
//             </div>
//           </Col>
//         </Row> */}
//         <Table className="mt-4"
//           dataSource={attendanceData}
//           columns={columns}
//           bordered
//         />
//         ;
//       </div>
//     // </div>
//   );
// };



// import { Typography, Divider, Row, Avatar, Col, Table, Card } from "antd";
// import { FaArrowRightToBracket } from "react-icons/fa6";
// import { FaRegClock } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import { fetchUserData } from "../../../services/userApis/userApis";
// import { UserData } from "../../types";
// import { fetchUserAttendance } from "../../../services/attendenceApis/attendence";

// const { Title } = Typography;

// export const Profile = () => {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [attendanceData, setAttendanceData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const userData = await fetchUserData();
//       setUserData(userData);
//       console.log(userData);
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         const response = await fetchUserAttendance();
//         console.log("fetched data", response.data);
//         setAttendanceData(response.data);
//       } catch (error) {
//         console.error("Error fetching user attendance:", error);
//       }
//     };

//     fetchAttendanceData();
//   }, []);

//   const totalAttendance = attendanceData.length;
//   const pendingLeaveRequests = attendanceData.reduce((acc, record) => acc + record.pendingLeave, 0);
//   const totalLeaves = attendanceData.reduce((acc, record) => acc + record.totalLeave, 0);
//   const totalAbsents = attendanceData.reduce((acc, record) => acc + record.totalAbsent, 0);

//   const columns = [
//     {
//       title: "Attendance History",
//       dataIndex: "data",
//       key: "data",
//       render: (text: string, record: any) => (
//         <Row gutter={[16, 16]}>
//           <Col span={6}>
//             <Card className="bg-slate-300 rounded-lg">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="flex items-center">
//                   <FaRegClock className="mr-1" />
//                   {new Date(record.date).toLocaleDateString()}
//                 </span>
//                 <div className="border-2 border-white bg-white font-semibold text-slate-500 rounded-full p-1">
//                   {record.status}
//                 </div>
//               </div>

//               <div className="flex justify-between items-center mb-2">
//                 <span>Check In Time</span>
//                 <span>Check Out Time</span>
//               </div>
//               <div className="flex justify-between items-center font-bold">
//                 <span>{new Date(record.time_in).toLocaleTimeString()}</span>
//                 <span>{record.time_out ? new Date(record.time_out).toLocaleTimeString() : "N/A"}</span>
//               </div>
//             </Card>
//           </Col>
//         </Row>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <div className="bg-slate-200 pb-4">
//         <div className="flex justify-between bg-slate-200 p-1 rounded-md w-full">
//           <div className="border-l-4 border-secondary-color h-9 flex items-center">
//             <Title level={5} className="ml-2">
//               Employee Details
//             </Title>
//           </div>
//         </div>
//         <Divider />
//         <div className="flex p-2">
//           <Avatar size={100} className="!text-5xl">
//             {userData?.firstName.slice(0, 1)}
//           </Avatar>
//           <div className="w-2/5 ml-12">
//             <Title level={2}>{userData?.firstName}</Title>
//             <Row className="flex justify-between text-slate-400 font-semibold">
//               <span>ROLE</span>
//               <span>Designation</span>
//               <span>EMAIL ADDRESS</span>
//               <span>SALARY</span>
//             </Row>
//             <Row className="flex justify-between mt-4 font-semibold">
//               <span>{userData?.role}</span>
//               <span>{userData?.designation}</span>
//               <span>{userData?.email}</span>
//               <span>{userData?.salary}</span>
//             </Row>
//           </div>
//         </div>
//         <Row className="flex justify-around mt-4">
//           <Col span={5}>
//             <div className="mr-2 bg-slate-300 flex justify-evenly items-center p-5 rounded-lg">
//               <Avatar>
//                 <FaArrowRightToBracket />
//               </Avatar>
//               <div>
//                 <Title level={5}>{totalAttendance}</Title>
//                 <span>Total Attendance</span>
//               </div>
//             </div>
//           </Col>
//           <Col span={5}>
//             <div className="mr-2 bg-slate-300 flex justify-evenly items-center p-5 rounded-lg">
//               <Avatar>
//                 <FaArrowRightToBracket />
//               </Avatar>
//               <div>
//                 <Title level={5}>{pendingLeaveRequests}</Title>
//                 <span>Pending Leave Requests</span>
//               </div>
//             </div>
//           </Col>
//           <Col span={5}>
//             <div className="mr-2 bg-slate-300 flex justify-evenly items-center p-5 rounded-lg">
//               <Avatar>
//                 <FaArrowRightToBracket />
//               </Avatar>
//               <div>
//                 <Title level={5}>{totalLeaves}</Title>
//                 <span>Total Leaves</span>
//               </div>
//             </div>
//           </Col>
//           <Col span={5}>
//             <div className="mr-2 bg-slate-300 flex justify-evenly items-center p-5 rounded-lg">
//               <Avatar>
//                 <FaArrowRightToBracket />
//               </Avatar>
//               <div>
//                 <Title level={5}>{totalAbsents}</Title>
//                 <span>Total Absents</span>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </div>
//       <Table className="mt-4" dataSource={attendanceData} columns={columns} bordered />
//     </div>
//   );
// };


// import { Typography, Divider, Row, Avatar, Col, Table, Card } from "antd";
// import { FaArrowRightToBracket } from "react-icons/fa6";
// import { FaRegClock } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import { fetchUserData } from "../../../services/userApis/userApis";
// import { UserData } from "../../types";
// import { fetchUserAttendance } from "../../../services/attendenceApis/attendence";

// const { Title } = Typography;

// export const Profile = () => {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [attendanceData, setAttendanceData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const userData = await fetchUserData();
//       setUserData(userData);
//       console.log(userData);
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         const response = await fetchUserAttendance();
//         console.log("fetched data", response.data);
//         setAttendanceData(response.data);
//       } catch (error) {
//         console.error("Error fetching user attendance:", error);
//       }
//     };

//     fetchAttendanceData();
//   }, []);

//   const totalAttendance = attendanceData.length;
//   const pendingLeaveRequests = attendanceData.reduce((acc, record) => acc + record.pendingLeave, 0);
//   const totalLeaves = attendanceData.reduce((acc, record) => acc + record.totalLeave, 0);
//   const totalAbsents = attendanceData.reduce((acc, record) => acc + record.totalAbsent, 0);

//   const columns = [
//     {
//       title: "Attendance History",
//       dataIndex: "data",
//       key: "data",
//       render: (text: string, record: any) => (
//         <Row gutter={[16, 16]}>
//           <Col span={6}>
//             <Card className="bg-slate-300 rounded-lg">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="flex items-center">
//                   <FaRegClock className="mr-1" />
//                   {new Date(record.date).toLocaleDateString()}
//                 </span>
//                 <div className="border-2 border-white bg-white font-semibold text-slate-500 rounded-full p-1">
//                   {record.status}
//                 </div>
//               </div>

//               <div className="flex justify-between items-center mb-2">
//                 <span>Check In Time</span>
//                 <span>Check Out Time</span>
//               </div>
//               <div className="flex justify-between items-center font-bold">
//                 <span>{new Date(record.time_in).toLocaleTimeString()}</span>
//                 <span>{record.time_out ? new Date(record.time_out).toLocaleTimeString() : "N/A"}</span>
//               </div>
//             </Card>
//           </Col>
//         </Row>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <div className="bg-slate-200 pb-4">
//         <div className="flex justify-between bg-slate-200 p-1 rounded-md w-full">
//           <div className="border-l-4 border-secondary-color h-9 flex items-center">
//             <Title level={5} className="ml-2">
//               Employee Details
//             </Title>
//           </div>
//         </div>
//         <Divider />
//         <div className="flex p-2">
//           <Avatar size={100} className="!text-5xl">
//             {userData?.firstName.slice(0, 1)}
//           </Avatar>
//           <div className="w-2/5 ml-12">
//             <Title level={2}>{userData?.firstName}</Title>
//             <Row className="flex justify-between text-slate-400 font-semibold">
//               <span>ROLE</span>
//               <span>Designation</span>
//               <span>EMAIL ADDRESS</span>
//               <span>SALARY</span>
//             </Row>
//             <Row className="flex justify-between mt-4 font-semibold">
//               <span>{userData?.role}</span>
//               <span>{userData?.designation}</span>
//               <span>{userData?.email}</span>
//               <span>{userData?.salary}</span>
//             </Row>
//           </div>
//         </div>
//         <Row className="flex justify-around mt-4">
//           <Col span={5}>
//             <div className="mr-2 bg-slate-300 flex justify-evenly items-center p-5 rounded-lg">
//               <Avatar>
//                 <FaArrowRightToBracket />
//               </Avatar>
//               <div>
//                 <Title level={5}>{totalAttendance}</Title>
//                 <span>Total Attendance</span>
//               </div>
//             </div>
//           </Col>
//           <Col span={5}>
//             <div className="mr-2 bg-slate-300 flex justify-evenly items-center p-5 rounded-lg">
//               <Avatar>
//                 <FaArrowRightToBracket />
//               </Avatar>
//               <div>
//                 <Title level={5}>{pendingLeaveRequests}</Title>
//                 <span>Pending Leave Requests</span>
//               </div>
//             </div>
//           </Col>
//           <Col span={5}>
//             <div className="mr-2 bg-slate-300 flex justify-evenly items-center p-5 rounded-lg">
//               <Avatar>
//                 <FaArrowRightToBracket />
//               </Avatar>
//               <div>
//                 <Title level={5}>{totalLeaves}</Title>
//                 <span>Total Leaves</span>
//               </div>
//             </div>
//           </Col>
//           <Col span={5}>
//             <div className="mr-2 bg-slate-300 flex justify-evenly items-center p-5 rounded-lg">
//               <Avatar>
//                 <FaArrowRightToBracket />
//               </Avatar>
//               <div>
//                 <Title level={5}>{totalAbsents}</Title>
//                 <span>Total Absents</span>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </div>
//       <Table className="mt-4" dataSource={attendanceData} columns={columns} bordered />
//     </div>
//   );
// };



import { Typography, Divider, Row, Avatar, Col, Table, Spin} from "antd";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../../services/userApis/userApis";
import { UserData , AttendanceData} from "../../types";
import { fetchUserAttendance } from "../../../services/attendenceApis/attendence";
import { format } from "date-fns";
import { fetchAllLeaveApplications } from "../../../services/leaveApplication/leaveApplication";
import { ApplicationData } from "../../types";

const { Title } = Typography;
export const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [leaveApplicationData, setLeaveApplicationData] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData();
      setUserData(userData);
      console.log("userData",userData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetchUserAttendance();
        console.log("fetched data", response.data);
        setAttendanceData(response.data);
        console.log("response.data", response.data)
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
        const response = await fetchAllLeaveApplications();
        if (response && response.content) {
          setLeaveApplicationData(response.content);
          console.log("setLeaveApplicationData:", response.content);
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
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    );
  }

  const convertToHHMMSS = (decimalHours: number) => {
    if (isNaN(decimalHours)) {
      return 'N/A';
    }
    const totalSeconds = Math.floor(decimalHours * 3600);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };


  const totalAttendance = attendanceData.length;
  const totalLeaves = userData && Array.isArray(userData.userLeaveApplication) ? userData.userLeaveApplication.length : 0;
  // const pendingLeaveRequests = attendanceData.reduce((acc, record) => acc + record.pendingLeave, 0);
  // const totalLeaves = attendanceData.reduce((acc, record) => acc + record.totalLeave, 0);
  // const totalAbsents = attendanceData.reduce((acc, record) => acc + record.totalAbsent, 0);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => format(new Date(date), 'PPP'),
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
      }    
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
          <Avatar size={100} className="!text-5xl">
          {userData && userData.firstName && userData.lastName ? userData.firstName.slice(0, 1) + userData.lastName.slice(0,1) : ''}                
          </Avatar>
          <div className="ml-10">
          <Title level={1}>{userData?.firstName && userData?.lastName ? userData?.firstName + ' ' + userData?.lastName : ''}</Title>            
          <Row className="w-full flex text-slate-400 font-semibold space-x-36">
              <div className="grid mx-4">
              <span className="text-black">ROLE</span>
              <span>{userData?.role}</span>
              </div>
              <div className="grid mx-4">
              <span className="text-black">Designation</span>
              <span>{userData?.designation}</span></div>
              <div className="grid mx-4">
              <span className="text-black">EMAIL ADDRESS</span>
              <span>{userData?.email}</span></div>
              <div className="grid mx-4">
              <span className="text-black">SALARY</span>
              <span>{userData?.salary}</span></div>
              <div className="grid mx-4">
              <span className="text-black">CNIC</span>
              <span>{userData?.cnic}</span></div>
              <div className="grid mx-4">
              <span className="text-black">DOB</span>
              <span>{userData?.dob ? format(new Date(userData?.dob), 'PPP') : 'N/A'}</span>
              </div>
              <div className="grid mx-4">
              <span className="text-black">JOINING DATE</span>
              <span>{userData?.joiningDate ? format(new Date(userData?.joiningDate), 'PPP') : 'N/A'}</span>
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
                <Title level={5}>{(leaveApplicationData as ApplicationData[]).filter(item => item.leaveStatus === "Approved").length || 0}</Title>
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
              <Title level={5}>{attendanceData?.filter(item => item.status === "Present").length || 0}</Title>
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
              <Title level={5}>{attendanceData?.filter(item => item.status === "Absent").length || 0}</Title>
              <span>Total Absents</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Table className="mt-4" dataSource={attendanceData} columns={columns} bordered />
    </div>
  );
};
