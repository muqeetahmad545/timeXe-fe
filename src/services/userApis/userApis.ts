import { User, UserData } from "../../components/types";
import attendanceAPI from "../axios";

export const fetchUserData = async (): Promise<UserData | null> => {
  try {
    const response = await attendanceAPI.get(
      `${process.env.REACT_APP_API_URL}/userDetails`,
      {}
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const createUser = async (UserData: any) => {
  try {
    const response = await attendanceAPI.post(
      `${process.env.REACT_APP_API_URL}/user`,
      UserData
    );
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.error("Leave application error:", error);
    throw error;
  }
};

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await attendanceAPI.get(
      `${process.env.REACT_APP_API_URL}/fetchusers`,
      {}
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const updateUser = async (
  userId: string,
  updateData: Partial<User>
): Promise<void> => {
  try {
    await attendanceAPI.patch(
      `${process.env.REACT_APP_API_URL}/update`,
      updateData,
      {
        params: { userId },
      }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const updateStatus = async (
  userId: string,
  updateData: Partial<User>
): Promise<void> => {
  try {
    await attendanceAPI.patch(
      `${process.env.REACT_APP_API_URL}/status`,
      updateData,
      {
        params: { userId },
      }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await attendanceAPI.delete(`${process.env.REACT_APP_API_URL}/delete`, {
      params: { userId },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
