import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleProductData } from "../redux/products/action";
import Product from "../components/Product";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = searchParams.get("page");
  const path = location.pathname.trim().split("/");
  const category = path[2];
  const dispatch = useDispatch();

  const { products, totalCount } = useSelector((store) => store.productReducer);

  const [page, setPage] = useState(initialPage || 1);

  const onPageChange = (pagevalue) => {
    setPage(pagevalue);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const params = {
      category: category,
      limit: searchParams.getAll("limit"),
      subcategory: searchParams.getAll("subcategory"),
      brand: searchParams.getAll("brand"),
      sortField: searchParams.get("sortField"),
      sortOrder: searchParams.get("sortOrder"),
      discount: searchParams.get("discount"),
      limit: 6,
      
    };

    dispatch(handleProductData(params));
  }, [category, searchParams, page]);

  return (
    <div>
      <Product data={products} />
      <Pagination
        currentPage={page}
        onPageChange={onPageChange}
        totalPages={Math.ceil(totalCount / 6)}
      />
    </div>
  );
};

export default HomePage;
