export interface UserData {
  firstName: string;
  lastName: string;
  role: string;
  designation: string;
  email: string;
  salary:number;
  pendingLeave:number;
  totalLeave:number;
  totalAbsent:number;
  cnic:number;
  dob:number;
  joiningDate:number;
  userLeaveApplication:number;
  // joiningDate:Date;
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
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  cnic: string; 
  employeeCount: number;
  pendingLeave:number;
  totalLeave:number;
  totalAbsent:number;
  designation:string;
}

export interface AttendanceRecord {
  _id: string;
  user:string;
  userId: string;
  userName:string;
  time_in: Date;
  time_out: Date;
  working_hours: Number;
  pendingLeave:number;
  totalLeave:number;
  totalAbsent:number;
}
export interface AttendanceData {
  _id: string;
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
  leaveType: string;
  userName?: string;
  reason?: string;
  email?: string;
  startDate?: Date;
  endDate?: Date;
  leaveStatus?: string;
};