import React, { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import SingleProduct from "../pages/SingleProduct";
import AboutPage from "../pages/About";
import CartPage from "../pages/Cart";
import HomePage from "../pages/Home";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>welcom to clothify</h1>} />
      <Route path="/product/:id" element={<SingleProduct />} />
      <Route path="/products/:id" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default Routing;
