
import React, { useEffect, useState } from "react";
import { Table, Row, Col, Spin } from "antd";
import { LeaveModal } from "./LeaveModal"; 
import { fetchAllLeaveApplicationsUser } from "../../../services/leaveApplication/leaveApplication";

import { format } from "date-fns";
const columns = [
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
    render: (date: string) => date ? format(new Date(date), 'PPP') : 'N/A',
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
    render: (date: string) => date ? format(new Date(date), 'PPP') : 'N/A',
  },
  {
    title: "Leave Type",
    dataIndex: "leaveType",
    key: "leaveType",
  },
  {
    title: "Application Status",
    dataIndex: "leaveStatus",
    key: "leaveStatus",
  },   
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
  }, 
];

export const LeaApp: React.FC = () => {
  const [leaveApplicationData, setLeaveApplicationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchAllLeaveApplicationsUser();
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
  return (
    <div>
      <LeaveModal />
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
        </Col>
      </Row>
      <Table dataSource={leaveApplicationData} columns={columns} rowKey="_id" />
    </div>
  );
};
