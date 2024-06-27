export interface UserData {
  userDetail: {
    fullName: string;
    fatherName: string;
    email: string;
    address: string;
    phone: number;
    dob: Date | string;
    cnic: string;
    profileImage: string;
    gender: string;
  };
  jobDetail: {
    companyName: string;
    department: string;
    jobPosition: string;
    manager: string;
    designation: string;
    joiningDate: Date;
    role: string;
    salary: string;
    status: string;
    employeeId: number;
  };
  signInDetail: {
    userName: string;
    signInEmail: string;
    confirmPassword: string;
    password: string;
  };
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface FilterParams {
  [key: string]: string | undefined;
  startDate?: string;
  endDate?: string;
  name?: string;
}
export interface Filters {
  startDate?: string;
  endDate?: string;
}
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
export interface User {
  userDetail: {
    fullName: string;
    fatherName: string;
    email: string;
    address: string;
    phone: number;
    dob: Date;
    cnic: string;
    profileImage: string;
    gender: string;
  };
  jobDetail: {
    companyName: string;
    department: string;
    jobPosition: string;
    manager: string;
    designation: string;
    joiningDate: Date;
    role: string;
    salary: string;
    status: string;
    employeeId: number;
  };
  signInDetail: {
    userName: string;
    signInEmail: string;
    confirmPassword: string;
    password: string;
  };
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface AttendanceRecord {
  _id: string;
  user: string;
  userId: string;
  userName: string;
  time_in: Date;
  time_out: Date;
  working_hours: Number;
  pendingLeave: number;
  totalLeave: number;
  totalAbsent: number;
}
export interface AttendanceData {
  _id: string;
  manager: string;
  userName: string;
  time_in: string;
  date: string;
  pendingLeave: number;
  totalLeave: number;
  totalAbsent: number;
  status: string;
  __v: number;
  time_out?: string;
  leaveStatus?: string;
}

export interface ApplicationData {
  _id: string;
  manager: string;
  leaveType: string;
  userName?: string;
  reason?: string;
  email?: string;
  startDate?: Date;
  endDate?: Date;
  leaveStatus?: string;
}
