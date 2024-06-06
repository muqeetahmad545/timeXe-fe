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
export const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route
            path="/employee/dashboard"
            element={
              <PrivateMap>
                 <UserRoutes /> 
              </PrivateMap>
            }
          >

<Routes>
        <Route
          path="/"
          element={
            <AppLayout>
              <DashContent />
            </AppLayout>
          }
        />
        <Route
          path="/employee/profile"
          element={
            <AppLayout>
              <Profile />
            </AppLayout>
          }
        />
        <Route
          path="/employee/leave-applications"
          element={
            <AppLayout>
              <LeaApp />
            </AppLayout>
          }
        />
        <Route path="*" element={<Navigate to="/employee/dashboard" />} />
      </Routes>
            
            
            </Route>  */}

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
          <Route path="leave-applications" element={<LeaAppAdmin />} />
        </Route>

        </Routes>
      </Router>
    </div>
  );
};
