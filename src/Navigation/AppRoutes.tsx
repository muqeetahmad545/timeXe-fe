import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Login } from "../components/Admin/Login/Login";
import { PrivateMap } from "./PrivateMap";
import { SitMap } from "./SitMap";
import { useEffect, useState } from "react";
import { fetchUserData } from "../services/userApis/userApis";
import { UserData } from "../components/types";
import { UserRoutes } from "./UserRoutes";
import AppLayout from "../common/AppLayout";
import { DashContent } from "../components/Employees/Dashboard/DashContent";
import { Profile } from "../components/Employees/Dashboard/Profile";
import { LeaApp } from "../components/Employees/Leave/LeaApp";
import { AppContent } from "../components/Admin/Dashboard/AppContent";
import { AddUser } from "../components/Admin/User/AddUser";
import { Employees } from "../components/Admin/User/Employeees";
import { AttendanceHistory } from "../components/Admin/Attendance/AttendanceHistory";
import { LeaAppAdmin } from "../components/Employees/Leave/LeaAppAdmin";
import { DailyAttendanceHistory } from "../components/Admin/Attendance/DailyAttendanceHistory";
import { UserReport } from "../components/Admin/Attendance/UserReport";
export const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        <Route path="/employee" element={<AppLayout />}>
          <Route index element={<DashContent />} />
          <Route path="profile" element={<Profile />} />
          <Route path="leave-applications" element={<LeaApp />} />
        </Route>


        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<AppContent />} />
          <Route path="add-employee" element={<AddUser />} />
          <Route path="edit-employee/:userId" element={<AddUser />} />
          <Route path="employees" element={<Employees />} />
          <Route path="attendence-report" element={<AttendanceHistory />} />
          <Route path="daily-report" element={<DailyAttendanceHistory />} />
          <Route path="leave-applications" element={<LeaAppAdmin />} />
          <Route path="user-report" element={<UserReport />} />
        </Route>

        </Routes>
      </Router>
    </div>
  );
};
