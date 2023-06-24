import React from "react";
import Product from "../components/user/product/Product";
import { data } from "../utils/data";
const WomenPage = () => {
  return (
    <div>
      <Product
        category={"Women"}
        subcategory={data.subcategories.women}
        brands={data.brands.women}
      />
    </div>
  );
};

export default WomenPage;
