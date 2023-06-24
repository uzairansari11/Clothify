import React from "react";
import Product from "../components/user/product/Product";
import { data } from "../utils/data";
const KidPage = () => {
  return (
    <div>
      <Product
        category={"Kids"}
        subcategory={data.subcategories.kids}
        brands={data.brands.kids}
      />
    </div>
  );
};

export default KidPage;
