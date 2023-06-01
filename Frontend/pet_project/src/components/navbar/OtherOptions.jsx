import React from "react";
import { Box, Tooltip } from "@chakra-ui/react";
import { BsCart2, BsBagHeartFill } from "react-icons/bs";
import { MdBookmarkBorder } from "react-icons/md";

const OtherOptions = () => {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-around"}
      _hover={{
        cursor: "pointer",
      }}
      >
          
      <BsCart2 size={30} />
      <BsBagHeartFill size={30} />
      <MdBookmarkBorder size={30} />
    </Box>
  );
};

export default OtherOptions;
