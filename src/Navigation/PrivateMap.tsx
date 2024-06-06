import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
interface PrivateMapProps {
  children: ReactNode;
}

interface RoutesProps {
  children: ReactNode;
  userRole: string;
}

export const PrivateMap = ({ children }: PrivateMapProps) => {
  const token = localStorage.getItem("token");
  return <div>{token ? children : <Navigate to="/" />}</div>;
};

export const AdminRoutes = ({ children, userRole }: RoutesProps) => {
  return userRole === "admin" ? (
    <>{children}</>
  ) : (
    <Navigate to="/employee/dashboard" />
  );
};


export const EmplyeeRoutes = ({ children, userRole }: RoutesProps) => {
  return userRole === "user" ? (
    <>{children}
    </>
  ) : (
    <Navigate to="/dashboard" />
  );
};
