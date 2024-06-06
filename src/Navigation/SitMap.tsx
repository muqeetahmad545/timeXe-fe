import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AddUser } from "../components/Admin/User/AddUser";
import { AppContent } from "../components/Admin/Dashboard/AppContent";
import { Employees } from "../components/Admin/User/Employeees";
import AppLayout from "../common/AppLayout";
import { AttendanceHistory } from "../components/Admin/Attendance/AttendanceHistory";
import { LeaAppAdmin } from "../components/Employees/Leave/LeaAppAdmin";

export const SitMap = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout>
              <AppContent />
            </AppLayout>
          }
        />
        <Route
          path="/add-employee"
          element={
            <AppLayout>
              <AddUser/>
            </AppLayout>
          }
        />   
        <Route
          path="/dashboard/edit-employee/:userId"
          element={
            <AppLayout>
              <AddUser />
            </AppLayout>
          }
        />
        <Route
          path="/dashboard/employees"
          element={
            <AppLayout>
              <Employees />
            </AppLayout>
          }
        />
        <Route
          path="/dashboard/attendence-report"
          element={
            <AppLayout>
              <AttendanceHistory />
            </AppLayout>
          }
        />  
        <Route
         path= "/dashboard/leave-applications"
          element={
            <AppLayout>
              {/* <LeaveModal /> */}
              <LeaAppAdmin/>
            </AppLayout>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
};
