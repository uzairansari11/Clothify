import React, { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../components/admin/authentication/AdminLoginPage";
import AdminSignupPage from "../components/admin/authentication/AdminSignupPage";
import Dashboard from "../components/admin/dashboard/Dashboard";
import AdminPrivateRoute from "../components/hoc/AdminPrivateRoute";
import PrivateRoute from "../components/hoc/PrivateRoute";
import AboutPage from "../pages/About";
import CartPage from "../pages/Cart";
import CheckoutPage from "../pages/CheckoutPage";
import Homepage from "../pages/HomePage";
import KidPage from "../pages/KidPage";
import Login from "../pages/Login";
import MenPage from "../pages/MenPage";
import OrderHistoryPage from "../pages/OrderHistoryPage";
import Signup from "../pages/Signup";
import SingleProduct from "../pages/SingleProduct";
import WishlistPage from "../pages/WishlistPage";
import WomenPage from "../pages/WomenPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/product/:id" element={<SingleProduct />} />
      <Route path="/men" element={<MenPage />} />
      <Route path="/women" element={<WomenPage />} />
      <Route path="/kids" element={<KidPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutPage />} />

      <Route
        path="/cart"
        element={
          <PrivateRoute>
            {" "}
            <CartPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <PrivateRoute>
            <WishlistPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <CheckoutPage />{" "}
          </PrivateRoute>
        }
      />
      <Route
        path="/orderhistory"
        element={
          <PrivateRoute>
            <OrderHistoryPage />{" "}
          </PrivateRoute>
        }
      />

      {/* Admin Route */}
      <Route path="/admin/signup" element={<AdminSignupPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route
        path="/admin/*"
        element={
          <AdminPrivateRoute>
            <Dashboard />
          </AdminPrivateRoute>
        }
      />
    </Routes>
  );
};

export default Routing;
