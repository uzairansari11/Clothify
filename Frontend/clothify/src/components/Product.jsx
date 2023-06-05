import React, { useState, useEffect } from "react";
import CardItem from "./card/CardItem";
import data from "../db.json";
import { Box, Grid, Spinner } from "@chakra-ui/react";
import FilterComponent from "./Filter";
import LoadingSpinner from "./spinner/Spinner";

const Product = ({ filterData }) => {
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setLoading(true);
    const filteredProducts = data.product.filter(
      (ele) => ele.category === filterData
    );
    setTimeout(() => {
      setFilteredData(filteredProducts);
      setLoading(false);
    }, 2000); // Simulating a delay of 2 seconds for demonstration purposes
  }, [filterData]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box display="flex" flexDirection={{ base: "column", md: "row" }}>
      <Box
        width={{ base: "100%", md: "20%" }}
        position={{ base: "fixed", md: "fixed" }}
        height={{ base: "auto", md: "100vh" }}
        overflowY={{ base: "auto", md: "scroll" }}
        zIndex={100}
        // Hide scrollbar
        sx={{
          "&::-webkit-scrollbar": {
            width: "0.4em",
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "transparent",
          },
        }}
      >
        <FilterComponent />
      </Box>

      <Box
        width="100%"
        paddingLeft={{ base: 0, md: "20px" }}
        marginTop={{ base: "100px", md: 0 }}
        paddingBottom="50px"
        marginLeft={{ base: 0, md: "20%" }}
        overflow="auto"
        sx={{
          "&::-webkit-scrollbar": {
            width: "0.4em",
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "transparent",
          },
        }}
      >
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={5}
          justifyContent="center"
        >
          {filteredData.map((ele) => {
            return <CardItem key={ele.id} {...ele} />;
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Product;
