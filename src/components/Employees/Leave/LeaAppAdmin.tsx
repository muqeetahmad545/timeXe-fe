import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Row,
  Col,
  Spin,
  Alert,
  Select,
  Form,
  DatePicker,
  Divider,
  Modal,
  Input,
  message,
} from "antd";
import { format } from "date-fns";
import {
  fetchAllLeaveApplications,
  updateLeaveApplication,
} from "../../../services/leaveApplication/leaveApplication";
import { Option } from "antd/es/mentions";
import { ApplicationData } from "../../types";
import "./leaveApp.css";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
const { confirm } = Modal;

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date: string) => (date ? format(new Date(date), "PPP") : "N/A"),
  },
  {
    title: "Name",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "Manager",
    dataIndex: "manager",
    key: "manager",
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
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    className: "reason",
  },
  {
    title: "Application Status",
    dataIndex: "leaveStatus",
    key: "leaveStatus",
    render: (status: string, record: any) => (
      <Select
        style={{ width: 110 }}
        defaultValue={status}
        onChange={(value) => handleStatusChange(record._id, value)}
      >
        <Option value="Pending">Pending</Option>
        <Option value="Approved">Approved</Option>
        <Option value="Rejected">Rejected</Option>
      </Select>
    ),
  },
];

const handleStatusChange = async (applicationID: string, status: string) => {
  try {
    await updateLeaveApplication(applicationID, {
      leaveStatus: status,
    } as Partial<ApplicationData>);
    message.success(
      `Leav Application status updated to ${status} successfully`
    );
  } catch (error) {
    console.error("Error updating leave application:", error);
    message.error("Failed to update user status");
  }
};
export const LeaAppAdmin: React.FC = () => {
  const [leaveApplicationData, setLeaveApplicationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { Title } = Typography;
  const [selectedleaveApplication, setSelectedleaveApplication] =
    useState<ApplicationData | null>(null);
  const [isReadOnlyModalOpen, setIsReadOnlyModalOpen] = useState(false);

  const handleRowClick = (record: ApplicationData, columnIndex: number) => {
    if (columns[columnIndex].key !== "leaveStatus") {
      setSelectedleaveApplication(record);
      setIsReadOnlyModalOpen(true);
    } else {
      setIsReadOnlyModalOpen(false);
    }
  };
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
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
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
      <Table
        dataSource={leaveApplicationData}
        columns={columns.map((col, index) => ({
          ...col,
          onCell: (record: ApplicationData) => ({
            onClick: () => handleRowClick(record, index),
          }),
        }))}
      />
      <Modal
        title="Leave Request"
        visible={isReadOnlyModalOpen}
        onCancel={() => setIsReadOnlyModalOpen(false)}
        footer={null}
        style={{ minWidth: "40vw" }}
        centered
        className="custom-modal"
      >
        <Divider className="!mt-3" />

        {selectedleaveApplication && (
          <Form
            className="mt-4 w-full"
            name="basic"
            labelCol={{ span: 8 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item label="User Name">
                  <Input value={selectedleaveApplication.userName} readOnly />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Manager">
                  <Input value={selectedleaveApplication.manager} readOnly />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item label="Start Date">
                  <Input
                    value={moment(selectedleaveApplication.startDate).format(
                      "MMMM Do YYYY"
                    )}
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="End Date">
                  <Input
                    value={moment(selectedleaveApplication.endDate).format(
                      "MMMM Do YYYY"
                    )}
                    readOnly
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Leave Type">
              <Input value={selectedleaveApplication.leaveType} readOnly />
            </Form.Item>
            <Form.Item label="Reason">
              <Input.TextArea
                rows={4}
                value={selectedleaveApplication.reason}
                readOnly
                autoSize={{ minRows: 1, maxRows: 8 }}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};
