import { Box, Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
	handleDeleteProductData,
	handleProductData,
	handleUpdateProductData,
} from "../../../../redux/Admin_Redux/admin_products/action";
import Card from "./Card";
import Pagination from "./Pagination";
export const Products = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const initialLimit = Number(searchParams.get("limit")) || 8;
	const initialPage = Number(searchParams.get("page")) || 1;
	const [page, setPage] = useState(initialPage);
	const [limit, setLimit] = useState(initialLimit);
	const { products, totalCount } = useSelector(
		(store) => store.adminProductReducer
	);
	const dispatch = useDispatch();

	const handlePageChange = (data) => {
		setPage(data);
		setSearchParams({ page: data, limit }); // Update both page and limit in the search params
	};

	const handleDelete = (id) => {
		dispatch(handleDeleteProductData(id));
	};

	const handleUpdate = (id, payload) => {
		dispatch(handleUpdateProductData(id, payload));
	};
  useEffect(() => {
    const params = {
      limit: limit,
      page: page,
    };

    setSearchParams(params);
    dispatch(handleProductData(params));
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [page, limit, setSearchParams, dispatch]);
	return (
		<div>
			<Grid
				templateColumns={{
					base: "1fr",
					md: "repeat(2, 1fr)",
					lg: "repeat(4, 1fr)",
				}}
				gap={4}
			>
				{products.map((ele) => (
					<Card
						key={ele._id}
						{...ele}
						handleDelete={handleDelete}
						handleUpdate={handleUpdate}
					/>
				))}
			</Grid>
			<Box mb="4">
				<Pagination
					totalPages={Math.ceil(totalCount / limit)}
					currentPage={page}
					onPageChange={handlePageChange}
				/>
			</Box>
		</div>
	);
};
