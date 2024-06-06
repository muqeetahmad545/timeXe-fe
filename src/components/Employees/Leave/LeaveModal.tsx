import React, { useState } from "react";
import { Modal, Divider, DatePicker, Typography, Button, Form, Row, Col, Input, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import { createLeaveApplication } from "../../../services/leaveApplication/leaveApplication";
import { ApplicationData } from "../../types";
import moment from "moment";

const { Title } = Typography;

export const LeaveModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm(); 

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<ApplicationData>["onFinish"] = async (values) => {
    setLoading(true);
    setError(null);
    try {
      await createLeaveApplication(values);
      console.log("Leave application created successfully");
      form.resetFields(); 
      setIsModalOpen(false); 
    } catch (error) {
      console.error("Failed to create leave application:", error);
      setError("Failed to create leave application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<ApplicationData>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const disabledDate = (current: moment.Moment | null) => {
    // Disable past dates
    return current && current < moment().startOf('day');
  };
  

  return (
    <div>
      <div className="flex justify-between bg-slate-200 p-1 rounded-md">
        <div className="border-l-4 border-secondary-color h-9 flex items-center">
          <Title level={5} className="ml-2">
            Leave Application
          </Title>
        </div>
        <Button onClick={showModal}>
          <EditOutlined />
          Leave Request
        </Button>
      </div>
      <Modal
        title="Leave Request"
        visible={isModalOpen}
        onCancel={handleCancel}
        className="!w-[70%]"
        confirmLoading={loading}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()} loading={loading}>
            Submit
          </Button>,
        ]}
      >
        <Divider className="!mt-3" />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Form
          form={form} // Pass the form instance to Form component
          className="mt-4 w-full"
          name="basic"
          labelCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<ApplicationData>
            label="Leave Type"
            name="leaveType"
            rules={[{ required: true, message: "Please select one of the values!" }]}
          >
            <Select
              placeholder="Choose Leave Type"
              options={[
                { value: "sick leave", label: "Sick leave" },
                { value: "casual leave", label: "Casual leave" },
                { value: "annual leave", label: "Annual leave" },
              ]}
            />
          </Form.Item>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item<ApplicationData>
                label="Start Date"
                name="startDate"
                rules={[{ required: true, message: "Please input start date" }]}
              >
<DatePicker
  disabledDate={(current) =>
    current && current < moment().startOf('day')
  }
/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<ApplicationData>
                label="End Date"
                name="endDate"
                rules={[{ required: true, message: "Please input end date" }]}
              >
<DatePicker
  disabledDate={(current) =>
    current && current < moment().startOf('day')
  }
/>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item<ApplicationData>
            label="Reason"
            name="reason"
            rules={[{ required: true, message: "Please provide a reason" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
