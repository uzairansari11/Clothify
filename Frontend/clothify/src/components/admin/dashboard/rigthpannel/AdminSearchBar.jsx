import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React from "react";

const AdminSearchBar = () => {
  return (
    <Box width={["100%", "300px"]} margin="auto">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="teal.500" />}
        />
        <Input
          type="text"
          placeholder="Search"
          focusBorderColor="teal.500"
          borderRadius="md"
          _placeholder={{ color: "gray.500" }}
          bg="white"
          border="1px"
          borderColor="teal.300"
          boxShadow="sm"
          _hover={{
            borderColor: "teal.500",
          }}
          _focus={{
            borderColor: "teal.500",
            boxShadow: "outline",
          }}
        />
      </InputGroup>
    </Box>
  );
};

export default AdminSearchBar;
