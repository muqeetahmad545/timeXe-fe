import axios  from "axios";
const attendanceAPI = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 10000,
});
attendanceAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
attendanceAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default attendanceAPI;
