import { useEffect } from "react";
import Product from "../components/product/Product";
const MenPage = () => {
  let subcategory = ["Shirts", "T-Shirts", "Jeans"];
  let brands = [
    "Brooks Brothers",
    "Nike",
    "Levi's",
    "Ralph Lauren",
    "H&M",
    "Wrangler",
    "Tommy Hilfiger",
    "Gap",
    "Calvin Klein",
    "American Eagle",
    "Zara",
    "Diesel",
    "Topman",
    "Lacoste",
    "GAP",
    "J.Crew",
    "Banana Republic",
    "Hudson",
    "Carhartt",
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Product category={"Men"} subcategory={subcategory} brands={brands} />
    </div>
  );
};

export default MenPage;
