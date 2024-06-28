import React, { useEffect, useState } from "react";
import { Table, Row, Col, Spin } from "antd";
import { LeaveModal } from "./LeaveModal";
import { fetchAllLeaveApplicationsUser } from "../../../services/leaveApplication/leaveApplication";
import { format } from "date-fns";
import "./leaveApp.css"

const getStatusColor = (status: string): string => {
  switch (status) {
    case "Approved":
      return "green";
    case "Rejected":
      return "red";
    case "Pending":
      return "gray";
    default:
      return "gray";
  }
};

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date: string) => (date ? format(new Date(date), "PPP") : "N/A"),
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
    render: (date: string) => (date ? format(new Date(date), "PPP") : "N/A"),
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
    render: (date: string) => (date ? format(new Date(date), "PPP") : "N/A"),
  },
  {
    title: "Leave Type",
    dataIndex: "leaveType",
    key: "leaveType",
  },
  {
    title: "Application Status",
    dataIndex: ["leaveStatus"],
    key: "leaveStatus",
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
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    className: "reason", 
  },
];

export const LeaApp: React.FC = () => {
  const [leaveApplicationData, setLeaveApplicationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      const response = await fetchAllLeaveApplicationsUser();
      console.log("response:", response);
      if (response && response.content) {
        setLeaveApplicationData(response.content);
        console.log("setLeaveApplicationData:", response.content);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching leave applications data:", error);
      setError(
        "Failed to fetch leave applications. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const refreshData = () => {
    getData();
  };

  if (loading) {
    return (
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    );
  }

  return (
    <div>
      <LeaveModal onModalClose={refreshData} getData={getData} />
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: 16 }}
      ></Row>
      <Table
        dataSource={leaveApplicationData}
        columns={columns}
        rowKey="_id"
        tableLayout="fixed" 
      />
    </div>
  );
};
