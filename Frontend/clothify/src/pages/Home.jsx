import React, { useEffect } from "react";
import Product from "../components/Product";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const path = location.pathname.trim().split("/");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <Product filterData={path[2]} />
    </div>
  );
};

export default HomePage;
