import React from "react";
import Product from "../components/product/Product";

const KidPage = () => {
  const subcategory = ["T-Shirts", "Shirts", "Jeans"];
  const brands = [
    "Adidas",
    "GapKids",
    "Levi's Kids",
    "Nike Kids",
    "H&M Kids",
    "Old Navy Kids",
    "Puma Kids",
    "Carter's",
    "GAP Kids",
    "Tommy Hilfiger Kids",
    "Polo Ralph Lauren Kids",
  ];
  return (
    <div>
      <Product category={"Kids"} brands={brands} subcategory={subcategory} />
    </div>
  );
};

export default KidPage;
