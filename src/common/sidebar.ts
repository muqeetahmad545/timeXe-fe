import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  CalendarOutlined
} from "@ant-design/icons";

export const employeeSidebar = [
  {
    key: "1",
    icon: UserOutlined,
    label: "Dashboard",
    path: "/employee/dashboard",
  },
  {
    key: "2",
    icon: VideoCameraOutlined,
    label: "Profile",
    path: "/employee/profile",
  },
  {
    key: "3",
    icon: UploadOutlined,
    label: "Leave Applications",
    path: "/employee/leave-applications",
  },
   {
    key: "4",
    icon: LogoutOutlined,
    label: "Logout",
    path: "/",
    onClick: () => {
      localStorage.clear();}
  },
];

export const adminSidebar = [
    {
      key: "1",
      icon: UserOutlined,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      key: "2",
      icon: VideoCameraOutlined,
      label: "Add Employee",
      path: "/dashboard/add-employee",
    },
    {
      key: "3",
      icon: UsergroupAddOutlined,
      label: "Employees",
      path: "/dashboard/employees",
    },
    {
      key: "4",
      icon: CalendarOutlined,
      label: "Attendence Report",
      path: "/dashboard/attendence-report",
    },
    {
      key: "5",
      icon: UploadOutlined,
      label: "Leave Applications",
      path: "/dashboard/leave-applications",
    },  
    {
      key: "6",
      icon: LogoutOutlined,
      label: "Logout",
      path: "/",
      onClick: () => {
        localStorage.clear();}
      },
  ]