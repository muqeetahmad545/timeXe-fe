// import React, { useEffect, useState } from "react";
// import { fetchAllUserAttendance, deleteAttendance } from "../../../services/attendenceApis/attendence";
// import { User, AttendanceRecord } from "../../types";
// import { Divider, Table,Row,Col,Spin, Typography, message, DatePicker } from "antd";
// import { fetchUsers } from "../../../services/userApis/userApis";
// import { format } from "date-fns";
// // import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import Search from "antd/es/input/Search";

// const { Title } = Typography;
// type PropUser = {
//   _id: string;
//   firstName: string;
//   user: string;
//   date: string;
//   time_in: string; 
//   time_out: string;
//   working_hours: number;
// };

// type Filters = {
//   startDate?: string;
//   endDate?: string;
// };

// export const AttendanceHistory = () => {
//   const [attendanceData, setAttendanceData] = useState<PropUser[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchName, setSearchName] = useState<string>(""); 
//   const [startDate, setStartDate] = useState<string>("");
// const [endDate, setEndDate] = useState<string>("");
// const [filters, setFilters] = useState<Filters>({}); 

// useEffect(() => {
//   const fetchAttendanceData = async () => {
//     try {
//       if (startDate && endDate) {
//         // Update filters with startDate and endDate
//         setFilters({ startDate, endDate });
//       } else {
//         // If either startDate or endDate is not set, clear the filters
//         setFilters({});
//       }
//       const attendanceResponse = await fetchAllUserAttendance(filters);
//       const usersData = await fetchUsers();
//       setUsers(usersData);
//       setAttendanceData(attendanceResponse.data);
//     } catch (error) {
//       console.error("Error fetching user attendance:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchAttendanceData();
// }, [startDate, endDate]);


  // useEffect(() => {
  //   const fetchAttendanceData = async () => {
  //     try {
  //       const attendanceResponse = await fetchAllUserAttendance();
  //       const usersData = await fetchUsers();
  //       setUsers(usersData);
  //       setAttendanceData(attendanceResponse.data);
  //     } catch (error) {
  //       console.error("Error fetching user attendance:", error);
  //     }
  //     finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAttendanceData();
  // }, []);

//   if (loading) {
//     return (
//       <Row justify="center" align="middle" style={{ height: '100vh' }}>
//         <Col>
//           <Spin size="large" />
//         </Col>
//       </Row>
//     );
//   }

//   const convertToHHMMSS = (decimalHours: number) => {
//     if (isNaN(decimalHours)) {
//       return 'N/A';
//     }
//     const totalSeconds = Math.floor(decimalHours * 3600);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;
//     return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//   };
//   const handleDelete = async (attendanceID: string) => {
//     try {
//       await deleteAttendance(attendanceID);
//       setAttendanceData(attendanceData.filter((attendance) => attendance._id !== attendanceID));
//       message.success("Attendance deleted successfully");
//     } catch (error) {
//       console.error("Error deleting attendance:", error);
//       message.error("Failed to delete attendance");
//     }
//   };

//   const merged = attendanceData.map((attendance) => {
//     const user = users.find((user) => user._id === attendance.user);
    // if (user) {
    //   return { ...user, ...attendance };
    // }
//     return attendance;
//   }).filter((record) => {
//     return record.firstName.toLowerCase().includes(searchName.toLowerCase());
//   });

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "firstName",
//       key: "name",
//       render: (_: any, record: any) => `${record.firstName} ${record.lastName}`,
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//       render: (date: string) => format(new Date(date), 'PPP'),
//     },
//     {
//       title: "CheckedIn",
//       dataIndex: "time_in",
//       key: "time_in",
//       render: (time_in: string) => format(new Date(time_in), 'hh:mm a'),
//     }, 
//     {
//       title: "CheckedOut",
//       dataIndex: "time_out",
//       key: "time_out",
//       render: (time_out: string) => {
//         if (!time_out || isNaN(Date.parse(time_out))) {
//           return 'N/A'; 
//         }
//         return format(new Date(time_out), 'hh:mm a');
//       },
//     },
//     {
//       title: "Designation",
//       dataIndex: "designation",
//       key: "designation",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//     },
//     {
//       title: "Working Hours",
//       dataIndex: "working_hours",
//       key: "working_hours",
//       render: (working_hours: number) => convertToHHMMSS(working_hours),
//     },
//     // {
//     //   title: "Action",
//     //   dataIndex: "action",
//     //   key: "action",
//     //   render: (text: any, record: PropUser) => (
//     //     <span>
//     //       <EditOutlined style={{ marginRight: 8 }} />
//     //       {record._id && (
//     //         <DeleteOutlined onClick={() => handleDelete(record._id)} />
//     //       )}
//     //     </span>
//     //   ),
//     // },
//   ];
//   return (
//     <div>
//       <div className="flex justify-between bg-slate-200 p-1 rounded-md w-full">
//         <div className="border-l-4 border-secondary-color h-9 flex items-center">
//           <Title level={5} className="ml-2">
//             Attendance History
//           </Title>
//         </div>
//         <div className="mr-20">
//         {/* <DatePicker/> */}
//         <DatePicker onChange={(date, dateString) => setStartDate(dateString || "")} />
// <DatePicker onChange={(date, dateString) => setEndDate(dateString || "")} />
//         </div>
//         <Search
//           placeholder="Search by name"
//           allowClear
//           onSearch={(value) => setSearchName(value)}
//           style={{ width: 200, margin: "0 10px" }}
//         />
//       </div>
//       <Divider />
//       <Table dataSource={merged} columns={columns} />
//     </div>
//   );
// };


// import React, { useEffect, useState } from "react";
// import { fetchAllUserAttendance, deleteAttendance } from "../../../services/attendenceApis/attendence";
// import { User, AttendanceRecord, Filters ,FilterParams} from "../../types";
// import { Divider, Table, Row, Col, Spin, Typography, message, DatePicker } from "antd";
// import { fetchUsers } from "../../../services/userApis/userApis";
// import { format } from "date-fns";
// import Search from "antd/es/input/Search";

// const { Title } = Typography;

// export const AttendanceHistory: React.FC = () => {
//   const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchName, setSearchName] = useState<string>(""); 
//   const [startDate, setStartDate] = useState<string>("");
//   const [endDate, setEndDate] = useState<string>("");

//   useEffect(() => {
//     const fetchDefaultAttendanceData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetchAllUserAttendance({});
//         console.log("fetchAllUserAttendance deful", response);
//         const usersData = await fetchUsers();
//         console.log("usersData", usersData);
//         setUsers(usersData);
//         setAttendanceData(response.data);
//       } catch (error) {
//         console.error("Error fetching user attendance:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDefaultAttendanceData();
//   }, []); 

//   useEffect(() => {
//     const fetchDataWithFilter = async () => {
//       setLoading(true);
//       try {
//         const filterParams: FilterParams = {};
//         if (startDate) filterParams.startDate = startDate;
//         if (endDate) filterParams.endDate = endDate;
//         const response = await fetchAllUserAttendance(filterParams);
//         console.log("fetchAllUserAttendance", response);
//         setAttendanceData(response.data);
//       } catch (error) {
//         console.error("Error fetching user attendance:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (startDate || endDate) {
//       fetchDataWithFilter();
//     }
//   }, [startDate, endDate]); 

//   if (loading) {
//     return (
//       <Row justify="center" align="middle" style={{ height: '100vh' }}>
//         <Col>
//           <Spin size="large" />
//         </Col>
//       </Row>
//     );
//   }

//   const convertToHHMMSS = (decimalHours: number): string => {
//     if (isNaN(decimalHours)) {
//       return 'N/A';
//     }
//     const totalSeconds = Math.floor(decimalHours * 3600);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;
//     return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//   };

//   const handleDelete = async (attendanceID: string): Promise<void> => {
//     try {
//       await deleteAttendance(attendanceID);
//       setAttendanceData(attendanceData.filter((attendance) => attendance._id !== attendanceID));
//       message.success("Attendance deleted successfully");
//     } catch (error) {
//       console.error("Error deleting attendance:", error);
//       message.error("Failed to delete attendance");
//     }
//   };

//   const merged = attendanceData.map((attendance) => {
//     const user = users.find((user) => user._id === attendance.userId);
//     if (user) {
//       console.log("Merged data:", attendance);
//       return { ...user, ...attendance };
//     }
//     return attendance;
//   }).filter((record) => {
//     // return record.firstName.toLowerCase().includes(searchName.toLowerCase());
//   });

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "firstName",
//       key: "name",
//       render: (_: any, record: any) => `${record.firstName} ${record.lastName}`,
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//       render: (date: string) => format(new Date(date), 'PPP'),
//     },
//     {
//       title: "CheckedIn",
//       dataIndex: "time_in",
//       key: "time_in",
//       render: (time_in: string) => format(new Date(time_in), 'hh:mm a'),
//     }, 
//     {
//       title: "CheckedOut",
//       dataIndex: "time_out",
//       key: "time_out",
//       render: (time_out: string) => {
//         if (!time_out || isNaN(Date.parse(time_out))) {
//           return 'N/A'; 
//         }
//         return format(new Date(time_out), 'hh:mm a');
//       },
//     },
//     {
//       title: "Designation",
//       dataIndex: "designation",
//       key: "designation",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//     },
//     {
//       title: "Working Hours",
//       dataIndex: "working_hours",
//       key: "working_hours",
//       render: (working_hours: number) => convertToHHMMSS(working_hours),
//     },
//   ];

//   return (
//     <div>
//       <div className="flex justify-between bg-slate-200 p-1 rounded-md w-full">
//         <div className="border-l-4 border-secondary-color h-9 flex items-center">
//           <Title level={5} className="ml-2">
//             Attendance History
//           </Title>
//         </div>
//         <div className="mr-20">
//           <DatePicker 
//             onChange={(date, dateString) => {
//               if (typeof dateString === 'string') {
//                 setStartDate(dateString);
//               }
//             }} 
//           />
//           <DatePicker 
//             onChange={(date, dateString) => {
//               if (typeof dateString === 'string') {
//                 setEndDate(dateString);
//               }
//             }} 
//           />
//         </div>
//         <Search
//           placeholder="Search by name"
//           allowClear
//           onSearch={(value) => setSearchName(value)}
//           style={{ width: 200, margin: "0 10px" }}
//         />
//       </div>

//       <Divider />
//       <Table dataSource={merged} columns={columns} />
//     </div>
//   );
// };


// import React, { useEffect, useState } from "react";
// import { fetchAllUserAttendance, deleteAttendance } from "../../../services/attendenceApis/attendence";
// import { User, AttendanceRecord, Filters ,FilterParams} from "../../types";
// import { Divider, Table, Row, Col, Spin, Typography, message, DatePicker } from "antd";
// import { fetchUsers } from "../../../services/userApis/userApis";
// import { format } from "date-fns";
// import Search from "antd/es/input/Search";

// const { Title } = Typography;
// const { RangePicker } = DatePicker;

// export const AttendanceHistory: React.FC = () => {
//   const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchName, setSearchName] = useState<string>(""); 
//   const [startDate, setStartDate] = useState<string>("");
//   const [endDate, setEndDate] = useState<string>("");

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetchAllUserAttendance({});
//         const usersData = await fetchUsers();
//         setUsers(usersData);
//         setAttendanceData(response.data);
//       } catch (error) {
//         console.error("Error fetching user attendance:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []); 

//   useEffect(() => {
//     const fetchDataWithFilter = async () => {
//       setLoading(true);
//       try {
//         if (startDate && endDate) {
//           const filterParams: FilterParams = {
//             startDate: startDate,
//             endDate: endDate
//           };
//           const response = await fetchAllUserAttendance(filterParams);
//           setAttendanceData(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching user attendance:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (startDate && endDate) {
//       fetchDataWithFilter();
//     }
//   }, [startDate, endDate]);
  
//   useEffect(() => {
//     if (attendanceData) {
//       setStartDate('');
//       setEndDate('');
//     }
//   }, [attendanceData]);

//   if (loading) {
//     return (
//       <Row justify="center" align="middle" style={{ height: '100vh' }}>
//         <Col>
//           <Spin size="large" />
//         </Col>
//       </Row>
//     );
//   }

//   const convertToHHMMSS = (decimalHours: number): string => {
//     if (isNaN(decimalHours)) {
//       return 'N/A';
//     }
//     const totalSeconds = Math.floor(decimalHours * 3600);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;
//     return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//   };

//   const handleDelete = async (attendanceID: string): Promise<void> => {
//     try {
//       await deleteAttendance(attendanceID);
//       setAttendanceData(attendanceData.filter((attendance) => attendance._id !== attendanceID));
//       message.success("Attendance deleted successfully");
//     } catch (error) {
//       console.error("Error deleting attendance:", error);
//       message.error("Failed to delete attendance");
//     }
//   };

//   const filteredData = attendanceData.filter((record) => {
//     const user = users.find((user) => user._id === record.user);
//     console.log("user",user)
//     console.log("user.designation",user?.designation)
//     return user && `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchName.toLowerCase());
//   });

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "user",
//       key: "name",
//       render: (_: any, record: any) => {
//         const user = users.find((user) => user._id === record.user);
//         return user ? `${user.firstName} ${user.lastName}` : '';
//       },
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//       render: (date: string) => format(new Date(date), 'PPP'),
//     },
//     {
//       title: "CheckedIn",
//       dataIndex: "time_in",
//       key: "time_in",
//       render: (time_in: string) => format(new Date(time_in), 'hh:mm a'),
//     }, 
//     {
//       title: "CheckedOut",
//       dataIndex: "time_out",
//       key: "time_out",
//       render: (time_out: string) => {
//         if (!time_out || isNaN(Date.parse(time_out))) {
//           return 'N/A'; 
//         }
//         return format(new Date(time_out), 'hh:mm a');
//       },
//     },
//     {
//       title: "Designation",
//       dataIndex: "designation",
//       key: "designation",
//       render: (_: any, record: any) => {
//         const user = users.find((user) => user._id === record.user);
//         return user ? `${user.designation}` : '';
//       }, 
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//     },
//     {
//       title: "Working Hours",
//       dataIndex: "working_hours",
//       key: "working_hours",
//       render: (working_hours: number) => convertToHHMMSS(working_hours),
//     },
//   ];

//   return (
//     <div>
//   <div className="flex justify-between bg-slate-200 p-1 rounded-md w-full">
//     <div className="border-l-4 border-secondary-color h-9 flex items-center">
//       <Title level={5} className="ml-2">
//         Attendance History
//       </Title>
//     </div>
//     <div style={{ display: "flex", alignItems: "center" }}>
//     <span style={{ marginRight: "10px"}}>Please select date range: </span>
//       <RangePicker
//     onChange={(dates, dateStrings) => {
//       if (dates && dates.length === 2) {
//         const [startDate, endDate] = dateStrings;
//         setStartDate(startDate);
//         setEndDate(endDate);
//       }
//     }}
//     style={{ marginRight: "10px" }}
//   />
//       {/* <DatePicker
//         onChange={(date, dateString) => {
//           if (typeof dateString === "string") {
//             setStartDate(dateString);
//           }
//         }}
//         style={{ marginRight: "10px" }}
//       />
//       <span style={{ marginRight: "10px" }}>Please select end date: </span>
//       <DatePicker
//         onChange={(date, dateString) => {
//           if (typeof dateString === "string") {
//             setEndDate(dateString);
//           }
//         }}
//         style={{ marginRight: "10px" }}
//       /> */}
//       <Search
//         placeholder="Search by name"
//         allowClear
//         onSearch={(value) => setSearchName(value)}
//         style={{ width: 200, margin: "0" }}
//       />
//     </div>
//   </div>

//   <Divider />
//   <Table dataSource={filteredData} columns={columns} />
// </div>

//   );
// };


import React, { useEffect, useState } from "react";
import { fetchAllUserAttendance, deleteAttendance } from "../../../services/attendenceApis/attendence";
import { User, AttendanceRecord, FilterParams } from "../../types";
import { Divider, Table, Row, Col, Spin, Typography, message, DatePicker } from "antd";
import { fetchUsers } from "../../../services/userApis/userApis";
import { format } from "date-fns";
import Search from "antd/es/input/Search";

const { Title } = Typography;
const { RangePicker } = DatePicker;

export const AttendanceHistory: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState<string>(""); 
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

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
    const fetchDataWithFilter = async () => {
      setLoading(true);
      try {
        const filterParams: FilterParams = {
          startDate,
          endDate,
        };
        const response = await fetchAllUserAttendance(filterParams);
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching user attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    if (startDate && endDate) {
      fetchDataWithFilter();
    }
  }, [startDate, endDate]);

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

  const handleDelete = async (attendanceID: string): Promise<void> => {
    try {
      await deleteAttendance(attendanceID);
      setAttendanceData(attendanceData.filter((attendance) => attendance._id !== attendanceID));
      message.success("Attendance deleted successfully");
    } catch (error) {
      console.error("Error deleting attendance:", error);
      message.error("Failed to delete attendance");
    }
  };

  const filteredData = attendanceData.filter((record) => {
    const user = users.find((user) => user._id === record.user);
    return user && `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchName.toLowerCase());
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
    },
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

  return (
    <div>
      <div className="flex justify-between bg-slate-200 p-1 rounded-md w-full">
        <div className="border-l-4 border-secondary-color h-9 flex items-center">
          <Title level={5} className="ml-2">
            Attendance History
          </Title>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "10px"}}>Please select date range: </span>
          <RangePicker
            onChange={(dates, dateStrings) => {
              if (dates && dates.length === 2) {
                const [startDate, endDate] = dateStrings;
                setStartDate(startDate);
                setEndDate(endDate);
              }
            }}
            style={{ marginRight: "10px" }}
          />
          <Search
            placeholder="Search by name"
            allowClear
            onSearch={(value) => setSearchName(value)}
            style={{ width: 200, margin: "0" }}
          />
        </div>
      </div>
      <Divider />
      {loading ? (
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
          <Col>
            <Spin size="large" />
          </Col>
        </Row>
      ) : (
        <Table dataSource={filteredData} columns={columns} />
      )}
    </div>
  );
};
