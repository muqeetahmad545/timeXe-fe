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
    path: "/employee",
  },
  {
    key: "2",
    icon: VideoCameraOutlined,
    label: "Profile",
    path: "profile",
  },
  {
    key: "3",
    icon: UploadOutlined,
    label: "Leave Applications",
    path: "leave-applications",
  },
   {
    key: "4",
    icon: LogoutOutlined,
    label: "Logout",
    path: "/",
    onClick: () => {

 
    
    }
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
      path: "add-employee",
    },
    {
      key: "3",
      icon: UsergroupAddOutlined,
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
      icon: UploadOutlined,
      label: "Leave Applications",
      path: "leave-applications",
    },  
    {
      key: "6",
      icon: LogoutOutlined,
      label: "Logout",
      path: "/",
      onClick: () => {
  }
      },
  ]