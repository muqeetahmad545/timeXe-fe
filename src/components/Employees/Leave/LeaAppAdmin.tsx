import React, { useEffect, useState } from "react";
import { Table, Typography, Row, Col, Spin, Alert, Select } from "antd";
import { format } from "date-fns";
import { fetchAllLeaveApplications, updateLeaveApplication } from "../../../services/leaveApplication/leaveApplication";
import { Option } from "antd/es/mentions";
import { ApplicationData } from "../../types";
const { Title } = Typography;

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date: string) => date ? format(new Date(date), 'PPP') : 'N/A',
  }, 
  {
    title: "Name",
    dataIndex: "userName",
    key: "userName",
  },   
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
    render: (date: string) => (date ? format(new Date(date), 'PPP') : 'N/A'),
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
    render: (date: string) => (date ? format(new Date(date), 'PPP') : 'N/A'),
  },
  {
    title: "Leave Type",
    dataIndex: "leaveType",
    key: "leaveType",
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    width: 200,
  },
  {
    title: "Application Status",
    dataIndex: "leaveStatus",
    key: "leaveStatus",
    render: (status: string, record: any) => (
      <Select defaultValue={status} onChange={(value) => handleStatusChange(record._id, value)}>
        <Option value="Pending">Pending</Option>
        <Option value="Approved">Approved</Option>
        <Option value="Rejected">Rejected</Option>
      </Select>
    ),
  }, 
];

const handleStatusChange = async (applicationID: string, status: string) => {
  try {
    await updateLeaveApplication(applicationID, { leaveStatus: status } as Partial<ApplicationData>);
  } catch (error) {
    console.error("Error updating leave application:", error);
  }
};
export const LeaAppAdmin: React.FC = () => {
  const [leaveApplicationData, setLeaveApplicationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



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

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div>
      <div className="flex justify-between bg-slate-200 p-1 rounded-md w-full">
        <div className="border-l-4 border-secondary-color h-9 flex items-center">
          <Title level={5} className="ml-2">
            Leave Application
          </Title>
        </div>
      </div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col></Col>
      </Row>
      <Table dataSource={leaveApplicationData} columns={columns} rowKey="_id" />
    </div>
  );
};
