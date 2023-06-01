import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Options = () => {
	return (
		<Box
			display={{ base: "none", md: "flex" }}
			flexDir={"row"}
			alignItems={"center"}
			justifyContent={"space-between"}
			width={"30%"}
			fontSize={"xl"}
      _hover={{
        cursor: "pointer"
      }}
		>
			<Text>MEN</Text>
			<Text>WOMEN</Text>
			<Text>KIDS</Text>
		</Box>
	);
};

export default Options;
