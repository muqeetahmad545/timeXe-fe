import attendanceAPI from "./axios";

export const authLogin = async (values: { email: string; password: string }) => {
  try {
    const response = await attendanceAPI.post(
        `${process.env.REACT_APP_API_URL}/login`, values);
    const token = response.data.token;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    throw new Error("Login failed");
  }
};