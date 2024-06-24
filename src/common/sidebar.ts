import {
  UserOutlined,
  DashboardOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

export const employeeSidebar = [
  {
    key: "1",
    icon: DashboardOutlined,
    label: "Dashboard",
    path: "/employee",
  },
  {
    key: "2",
    icon: UserOutlined,
    label: "Profile",
    path: "profile",
  },
  {
    key: "3",
    icon: UploadOutlined,
    label: "Leave Applications",
    path: "leave-applications",
  },
];

export const adminSidebar = [
  {
    key: "1",
    icon: DashboardOutlined,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    key: "3",
    icon: UserSwitchOutlined,
    label: "Employees",
    path: "employees",
  },
  {
    key: "4",
    icon: CalendarOutlined,
    label: "Attendence Report",
    path: "attendence-report",
  },
  {
    key: "5",
    icon: FieldTimeOutlined,
    label: "Daily Report",
    path: "daily-report",
  },
  {
    key: "6",
    icon: UserOutlined,
    label: "User Report",
    path: "user-report",
  },
  {
    key: "7",
    icon: UploadOutlined,
    label: "Leave Applications",
    path: "leave-applications",
  },
];
