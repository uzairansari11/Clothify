import { Box, Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import React from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      p={4}
      height={"100vh"}
      mt={10}
    >
      <Heading as="h1" size="lg" mb={4}>
        Oops! Product Not Found
      </Heading>
      <Text>We couldn't find the product you're looking for.</Text>
      <Text>
        Please check the URL or contact our support team for assistance.
      </Text>
      <Flex mt={4}>
        <Link
          href="tel:7271880500"
          target="_blank"
          rel="noopener noreferrer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={3}
          py={2}
          color="white"
          bg="teal.500"
          borderRadius="md"
          _hover={{ bg: "teal.600" }}
          mr={2}
        >
          <Icon as={FaPhone} mr={2} />
          Call Support
        </Link>
        <Link
          href="https://api.whatsapp.com/send?phone=7271880500"
          target="_blank"
          rel="noopener noreferrer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={3}
          py={2}
          color="white"
          bg="green.500"
          borderRadius="md"
          _hover={{ bg: "green.600" }}
        >
          <Icon as={FaWhatsapp} mr={2} />
          WhatsApp Support
        </Link>
      </Flex>
    </Box>
  );
};

export default NotFound;
