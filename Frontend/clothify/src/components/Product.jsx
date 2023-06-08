import React, { useState, useEffect } from "react";
import CardItem from "./card/CardItem";
import { Box, Grid } from "@chakra-ui/react";
import FilterComponent from "./Filter";
import LoadingSpinner from "./spinner/Spinner";
import NotFound from "./NotFound";

const Product = ({ data }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

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
        {data.length > 0 ? (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={5}
            justifyContent="center"
          >
            {data.length > 0 &&
              data.map((ele) => {
                return <CardItem key={ele.id} {...ele} />;
              })}
          </Grid>
        ) : (
          <NotFound />
        )}
      </Box>
    </Box>
  );
};

export default Product;
