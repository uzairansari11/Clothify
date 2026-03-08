import React, { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AdminPrivateRoute from "../components/hoc/AdminPrivateRoute";
import PrivateRoute from "../components/hoc/PrivateRoute";
import LoadingScreen from "../components/common/LoadingScreen";
import PageTransition from "../components/common/PageTransition";

// Lazy-loaded pages
const Homepage = lazy(() => import("../pages/HomePage"));
const SingleProduct = lazy(() => import("../pages/SingleProduct"));
const MenPage = lazy(() => import("../pages/MenPage"));
const WomenPage = lazy(() => import("../pages/WomenPage"));
const KidPage = lazy(() => import("../pages/KidPage"));
const Signup = lazy(() => import("../pages/Signup"));
const Login = lazy(() => import("../pages/Login"));
const AboutPage = lazy(() => import("../pages/About"));
const CartPage = lazy(() => import("../pages/Cart"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const WishlistPage = lazy(() => import("../pages/WishlistPage"));
const OrderHistoryPage = lazy(() => import("../pages/OrderHistoryPage"));
const AdminLoginPage = lazy(() => import("../components/admin/authentication/AdminLoginPage"));
const AdminSignupPage = lazy(() => import("../components/admin/authentication/AdminSignupPage"));
const Dashboard = lazy(() => import("../components/admin/dashboard/Dashboard"));

const Routing = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingScreen message="Loading..." height="80vh" />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Homepage /></PageTransition>} />
          <Route path="/product/:id" element={<PageTransition><SingleProduct /></PageTransition>} />
          <Route path="/men" element={<PageTransition><MenPage /></PageTransition>} />
          <Route path="/women" element={<PageTransition><WomenPage /></PageTransition>} />
          <Route path="/kids" element={<PageTransition><KidPage /></PageTransition>} />
          <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />

          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <PageTransition><CartPage /></PageTransition>
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <PageTransition><CheckoutPage /></PageTransition>
              </PrivateRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <PrivateRoute>
                <PageTransition><WishlistPage /></PageTransition>
              </PrivateRoute>
            }
          />
          <Route
            path="/orderhistory"
            element={
              <PrivateRoute>
                <PageTransition><OrderHistoryPage /></PageTransition>
              </PrivateRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/signup" element={<PageTransition><AdminSignupPage /></PageTransition>} />
          <Route path="/admin/login" element={<PageTransition><AdminLoginPage /></PageTransition>} />
          <Route
            path="/admin/*"
            element={
              <AdminPrivateRoute>
                <Dashboard />
              </AdminPrivateRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

export default Routing;
