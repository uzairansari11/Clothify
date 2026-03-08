import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

const ProductOptions = () => {
  const textColor = useColorModeValue("gray.600", "gray.300");
  const hoverColor = "accent.text";
  const activeColor = "accent.text";
  const activeBg = "accent.bg";

  const options = [
    { id: 1, title: "Men", route: "/men" },
    { id: 2, title: "Women", route: "/women" },
    { id: 3, title: "Kids", route: "/kids" },
  ];

  return (
    <Flex align="center" gap={1} width="100%">
      {options.map((element) => (
        <NavLink to={element.route} key={element.id}>
          {({ isActive }) => (
            <Text
              px={3}
              py={1.5}
              fontSize="sm"
              fontWeight="600"
              color={isActive ? activeColor : textColor}
              bg={isActive ? activeBg : "transparent"}
              borderRadius="lg"
              cursor="pointer"
              transition="all 0.2s ease"
              _hover={{
                color: hoverColor,
                bg: activeBg,
              }}
              whiteSpace="nowrap"
            >
              {element.title}
            </Text>
          )}
        </NavLink>
      ))}
    </Flex>
  );
};

export default ProductOptions;
