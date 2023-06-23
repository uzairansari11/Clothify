import { Box } from "@chakra-ui/react";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Hamburger = () => {
  return (
    <Box
      as={GiHamburgerMenu}
      w={{ base: 6, md: 8 }}
      h={{ base: 6, md: 8 }}
      color="teal"
      cursor="pointer"
    />
  );
};

export default Hamburger;
