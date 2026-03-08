import { useEffect } from "react";
import Product from "../components/user/product/Product";

const MenPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Product category={"Men"} />
    </div>
  );
};

export default MenPage;
