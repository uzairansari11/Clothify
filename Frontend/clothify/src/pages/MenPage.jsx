import { useEffect } from "react";
import Product from "../components/user/product/Product"
import { data } from "../utils/data";
const MenPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Product
        category={"Men"}
        subcategory={data.subcategories.men}
        brands={data.brands.men}
      />
    </div>
  );
};

export default MenPage;
