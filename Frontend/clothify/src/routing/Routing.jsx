import React, { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import SingleProduct from "../pages/SingleProduct";
import AboutPage from "../pages/About";
import CartPage from "../pages/Cart";
import MenPage from "../pages/MenPage";
import WomenPage from "../pages/WomenPage";
import KidPage from "../pages/KidPage";
import WishlistPage from '../pages/WishlistPage';
import Homepage from '../pages/HomePgae';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/product/:id" element={<SingleProduct />} />
      <Route path="/men" element={<MenPage />} />
      <Route path="/women" element={<WomenPage />} />
      <Route path="/kid" element={<KidPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
    </Routes>
  );
};

export default Routing;
