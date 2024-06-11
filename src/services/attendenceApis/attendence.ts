import attendanceAPI from "../axios";

import { User, AttendanceRecord, Filters,FilterParams } from "../../components/types";

export const CheckInApi = async () => {
  try {
    const response = await attendanceAPI.post(`${process.env.REACT_APP_API_URL}/attendance/check-in`, {});
    return response.data;
  } catch (error) {
    console.error("Check-in error", error);
    throw error; 
  }
};
export const CheckOutApi = async () => {
  try {
    const response = await attendanceAPI.post(
      `${process.env.REACT_APP_API_URL}/attendance/check-out`,
      {}
    );
    return response.data;
  } catch (error) {
    console.error("checkout error", error);
  }
};
export const fetchUserAttendance = async () => {
  try {
    const response = await attendanceAPI.get(
      `${process.env.REACT_APP_API_URL}/userattendance`,
      {}
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("checkin error", error);
  }
};
export const fetchAllUserAttendance = async (filters: FilterParams) => {
  try {
    let url = `${process.env.REACT_APP_API_URL}/allusersattendance`;
    if (Object.keys(filters).length > 0) {
      url += '?'; 
      for (const key in filters) {
        url += `${key}=${filters[key]}&`;
      }
      url = url.slice(0, -1); 
    }
    const response = await attendanceAPI.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("checkin error", error);
  }
};
export const deleteAttendance = async (attendanceID: string): Promise<void> => {
  try {
    await attendanceAPI.delete(`${process.env.REACT_APP_API_URL}/attendance/delete`, {
      params: { attendanceID }
    });
  } catch (error) {
    console.error("Error deleting attendance:", error);
    throw error;
  }
};