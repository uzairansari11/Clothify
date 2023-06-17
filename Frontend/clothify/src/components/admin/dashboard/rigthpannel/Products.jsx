import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleProductData } from "../../../../redux/Admin_Redux/admin_products/action";
import { useSearchParams } from "react-router-dom";
import { Box, Grid } from "@chakra-ui/react";
import Pagination from "./Pagination";
import Card from "./Card";

export const Products = () => {
    const [searchParams, setSetParams] = useSearchParams();
    const initialLimit = searchParams.get("limit");
    const initialPage = searchParams.get("page");
    const [page, setPage] = useState(Number(initialPage) || 1); // Convert initialPage to a number
    const [limit] = useState(Number(initialLimit) || 6); // Convert initialLimit to a number
    const { products, totalCount } = useSelector(
        (store) => store.adminProductReducer
    );
    const dispatch = useDispatch();
    const handlePageChange = (data) => {
        setPage(data);
    };

    useEffect(() => {
        const params = {
            limit: limit,
            page: page,
        };

        setSetParams(params);
        dispatch(handleProductData(params));
        window.scrollTo(0, 0);
    }, [page, limit]);

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
                    <Card key={ele.id} {...ele} />
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
