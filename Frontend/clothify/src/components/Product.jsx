import axios from "axios";
import React, { useEffect, useState } from "react";
import CardItem from "./card/CardItem";
import data from "../db.json";
import { Box, Grid } from "@chakra-ui/react";
import FilterComponent from "./Filter";

const Product = () => {
  let finaldata = data.product

  return (
    <Box display="flex" flexDirection={{ base: "column", md: "row" }}>
      <Box
        width={{ base: "100%", md: "20%" }}
        position={{ base: "static", md: "fixed" }}
        height={{ base: "auto", md: "100vh" }}
        overflowY={{ base: "auto", md: "scroll" }}
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
        marginTop={{ base: "70px", md: 0 }}
        paddingBottom="50px"
        marginLeft={{ base: 0, md: "20%" }}
        overflow="auto"
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
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={5}
          justifyContent="center"
        >
          {finaldata.map((ele) => {
            return <CardItem key={ele.id} {...ele} />;
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Product;
