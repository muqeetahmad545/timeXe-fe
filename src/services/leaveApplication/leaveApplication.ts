import { ApplicationData } from "../../components/types";
import attendanceAPI from "../axios";

export const fetchAllLeaveApplications = async () => {
  try {
    const response = await attendanceAPI.get(
      `${process.env.REACT_APP_API_URL}/leaveapplication`
    );
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.error("Leave application error:", error);
    throw error; 
  }
};

export const fetchAllLeaveApplicationsUser = async () => {
  try {
    const response = await attendanceAPI.get(
      `${process.env.REACT_APP_API_URL}/leaveapplication/user`
    );
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.error("Leave application error:", error);
    throw error; 
  }
};

export const createLeaveApplication = async (applicationData: any) => {
  try {
    const response = await attendanceAPI.post(
      `${process.env.REACT_APP_API_URL}/leaveapplication`,
      applicationData
    );
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.error("Leave application error:", error);
    throw error;
  }
};


export const updateLeaveApplication = async (applicationID: string, updateData: Partial<ApplicationData>): Promise<void> => {
  try {
    await attendanceAPI.patch(`${process.env.REACT_APP_API_URL}/leaveapplication`, updateData, {
      params: { applicationID }
    });
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};