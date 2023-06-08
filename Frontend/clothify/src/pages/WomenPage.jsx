import React from "react";
import Product from "../components/product/Product";

const WomenPage = () => {
  const subcategory = ["Top", "T-Shirts", "Shirts", "Jeans", "Kurti"];
  const brands = [
    "Zara",
    "Nike",
    "Ralph Lauren",
    "Levi's",
    "Sabyasachi",
    "H&M",
    "Adidas",
    "Tommy Hilfiger",
    "Guess",
    "Anita Dongre",
    "Forever 21",
    "Puma",
    "GAP",
    "Wrangler",
    "Biba",
  ];
  return (
    <div>
      {" "}
      <Product category={"Women"} brands={brands} subcategory ={subcategory}/>
    </div>
  );
};

export default WomenPage;
