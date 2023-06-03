import { Box, Text } from "@chakra-ui/react";
import React from "react";

const ProductOptions = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"100%"}
      fontFamily={"cursive"}
      fontSize={"xl"}
      fontWeight={"extrabold"}
      _hover={{
        cursor: "pointer",
      }}
    >
      <Text>MEN</Text>
      <Text>WOMEN</Text>
      <Text>KIDS</Text>
    </Box>
  );
};

export default ProductOptions;
