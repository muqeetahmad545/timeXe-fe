import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { DashContent } from "../components/Employees/Dashboard/DashContent";
import { Profile } from "../components/Employees/Dashboard/Profile";
import { LeaApp } from "../components/Employees/Leave/LeaApp";
import AppLayout from "../common/AppLayout";

export const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/employee/dashboard"
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
    </div>
  );
};
