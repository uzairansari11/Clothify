import React, { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import SingleProduct from "../pages/SingleProduct";
import AboutPage from "../pages/About";
import CartPage from "../pages/Cart";
import MenPage from "../pages/MenPage";
import WomenPage from "../pages/WomenPage";
import KidPage from "../pages/KidPage";
import WishlistPage from "../pages/WishlistPage";
import Homepage from "../pages/HomePgae";
import OrderHistoryPage from "../pages/OrderHistoryPage";
import CheckoutPage from "../pages/CheckoutPage";
import PrivateRoute from "../components/hoc/PrivateRoute";

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
        path="/orderhistory"
        element={
          <PrivateRoute>
            <OrderHistoryPage />{" "}
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default Routing;
