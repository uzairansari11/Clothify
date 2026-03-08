import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { FiMenu } from "react-icons/fi";

const Hamburger = () => {
  const color = useColorModeValue("gray.700", "gray.200");

  return (
    <Box
      as={FiMenu}
      w={5}
      h={5}
      color={color}
      cursor="pointer"
      _hover={{ color: "accent.solid" }}
      transition="color 0.2s"
    />
  );
};

export default Hamburger;
