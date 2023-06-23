import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const AdminPrivateRoute = ({ children }) => {
  const { isAuth } = useSelector((store) => store.adminAuthReducer);
  const location = useLocation();

  if (!isAuth) {
    return (
      <Navigate to="/admin/login" replace state={{ data: location.pathname }} />
    );
  }
  return children;
};

export default AdminPrivateRoute;
