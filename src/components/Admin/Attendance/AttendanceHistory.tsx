import React, { useEffect, useState } from "react";
import {
  fetchAllUserAttendance,
  deleteAttendance,
} from "../../../services/attendenceApis/attendence";
import { User, AttendanceRecord, FilterParams } from "../../types";
import {
  Divider,
  Table,
  Row,
  Col,
  Spin,
  Typography,
  message,
  DatePicker,
  Select,
} from "antd";
import { fetchUsers } from "../../../services/userApis/userApis";
import {
  format,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
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
  const [filterType, setFilterType] = useState<string>("daily");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetchAllUserAttendance({});
  //       const usersData = await fetchUsers();
  //       setUsers(usersData);
  //       setAttendanceData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user attendance:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchDataWithFilter = async () => {
      setLoading(true);
      try {
        let filterParams: FilterParams = {};

        switch (filterType) {
          case "daily":
            filterParams = {
              startDate: format(startOfDay(new Date()), "yyyy-MM-dd"),
              endDate: format(endOfDay(new Date()), "yyyy-MM-dd"),
            };
            break;
          case "weekly":
            filterParams = {
              startDate: format(startOfWeek(new Date()), "yyyy-MM-dd"),
              endDate: format(endOfWeek(new Date()), "yyyy-MM-dd"),
            };
            break;
          case "monthly":
            filterParams = {
              startDate: format(
                startOfMonth(new Date()),
                "yyyy-MM-dd HH:mm:ss"
              ),
              endDate: format(endOfMonth(new Date()), "yyyy-MM-dd"),
            };
            break;
          case "yearly":
            filterParams = {
              startDate: format(startOfYear(new Date()), "yyyy-MM-dd"),
              endDate: format(endOfYear(new Date()), "yyyy-MM-dd"),
            };
            break;
          default:
            break;
        }

        const response = await fetchAllUserAttendance(filterParams);
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching user attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataWithFilter();
  }, [filterType]);

  const convertToHHMMSS = (decimalHours: number): string => {
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

  const handleDelete = async (attendanceID: string): Promise<void> => {
    try {
      await deleteAttendance(attendanceID);
      setAttendanceData(
        attendanceData.filter((attendance) => attendance._id !== attendanceID)
      );
      message.success("Attendance deleted successfully");
    } catch (error) {
      console.error("Error deleting attendance:", error);
      message.error("Failed to delete attendance");
    }
  };

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
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => format(new Date(date), "PPP"),
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
      <div className="flex justify-between bg-slate-200 p-1 rounded-md w-full">
        <div className="border-l-4 border-secondary-color h-9 flex items-center">
          <Title level={5} className="ml-2">
            Attendance
          </Title>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "10px" }}>Filter by:</span>
          <Select
            defaultValue="daily"
            style={{ width: 120, marginRight: "10px" }}
            onChange={(value) => setFilterType(value)}
          >
            <Select.Option value="daily">Daily</Select.Option>
            <Select.Option value="weekly">Weekly</Select.Option>
            <Select.Option value="monthly">Monthly</Select.Option>
            <Select.Option value="yearly">Yearly</Select.Option>
          </Select>
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
          {/* <Search
            placeholder="Search by name"
            allowClear
            onSearch={(value) => setSearchName(value)}
            style={{ width: 200, margin: "0" }}
          /> */}
        </div>
      </div>
      <Divider />
      {loading ? (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
          <Col>
            <Spin size="large" />
          </Col>
        </Row>
      ) : (
        <Table dataSource={attendanceData} columns={columns} />
      )}
    </div>
  );
};
