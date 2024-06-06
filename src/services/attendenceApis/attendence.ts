import attendanceAPI from "../axios";

import { User, AttendanceRecord, Filters,FilterParams } from "../../components/types";

// interface FilterParams {
//   startDate?: string;
//   endDate?: string;
//   name?: string;
// }
// export const CheckInApi = async () => {
//   try {
//     const response = await attendanceAPI.post(
//       `${process.env.REACT_APP_API_URL}/attendance/check-in`,
//       {}
//     );
//     return response.data;
//   } catch (error) {
//     console.error("checkin error", error);
//   }
// };




export const CheckInApi = async () => {
  try {
    const response = await attendanceAPI.post(`${process.env.REACT_APP_API_URL}/attendance/check-in`, {});
    return response.data;
  } catch (error) {
    console.error("Check-in error", error);
    throw error; // Rethrow to handle in the component
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

// export const fetchAllUserAttendance = async (filters: FilterParams) => {
//   try {
//     const response = await attendanceAPI.get(`${process.env.REACT_APP_API_URL}/allusersattendance`, {
//       params: filters,
//     });
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("checkin error", error);
//   }
// };

export const fetchAllUserAttendance = async (filters: FilterParams) => {
  try {
    let url = `${process.env.REACT_APP_API_URL}/allusersattendance`;
    if (Object.keys(filters).length > 0) {
      url += '?'; // Append query string if filters exist
      for (const key in filters) {
        url += `${key}=${filters[key]}&`;
      }
      url = url.slice(0, -1); // Remove the last '&' character
    }
    const response = await attendanceAPI.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("checkin error", error);
  }
};


// export const fetchAllUserAttendance = async (filters: Filters): Promise<AttendanceRecord[]> => {
//   try {
//     const response = await attendanceAPI.get<ApiResponse>(
//       `${process.env.REACT_APP_API_URL}/allusersattendance`,
//       { params: filters }
//     );
//     if (response.data.success) {
//       return response.data.data;
//     } else {
//       throw new Error('Failed to fetch attendance records');
//     }
//   } catch (error) {
//     console.error("Error fetching attendance records:", error);
//     throw error;
//   }
// };

// export const fetchUsers = async (): Promise<User[]> => {
//   try {
//     const response = await attendanceAPI.get<ApiResponse>(
//       `${process.env.REACT_APP_API_URL}/users`
//     );
//     if (response.data.success) {
//       return response.data.data;
//     } else {
//       throw new Error('Failed to fetch users');
//     }
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     throw error;
//   }
// };

// export const fetchAllUserAttendance = async () =>{
//   try {
//     const response = await attendanceAPI.get(
//       `${process.env.REACT_APP_API_URL}/allusersattendance`,
//       {}
//     );
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("checkin error", error);
//   }
// }

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