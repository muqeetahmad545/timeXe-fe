import attendanceAPI from "./axios";

export const authLogin = async (values: {
  signInEmail: string;
  password: string;
}) => {
  try {
    const response = await attendanceAPI.post(
      `${process.env.REACT_APP_API_URL}/login`,
      values
    );
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    return user;
  } catch (error) {
    throw new Error("Login failed");
  }
};
