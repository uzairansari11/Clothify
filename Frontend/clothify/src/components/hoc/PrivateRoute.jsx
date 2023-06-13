import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isAuth } = useSelector((store) => store.authReducer);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" replace state={{ data: location.pathname }} />;
  }
  return children;
};

export default PrivateRoute;
