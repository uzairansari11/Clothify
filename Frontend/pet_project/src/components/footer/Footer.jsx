import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Link,
  Tooltip,
  Divider,
} from "@chakra-ui/react";
import {
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaUserCircle,
} from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";

const Footer = () => {
  return (
    <Box
      bg="teal.500"
      color="white"
      py={2}
      px={4}
      textAlign="center"
      fontSize="sm"
    >
      <Flex justifyContent="center" alignItems="center" mb={4}>
        <Text fontWeight="bold" fontSize="lg" mr={2}>
          Clothify
        </Text>
        <Text>|</Text>
        <Text ml={2}>Fashion Redefined</Text>
      </Flex>
      <Flex justifyContent="center" alignItems="center" mb={4}>
        <Tooltip label="Twitter" hasArrow placement="top">
          <IconButton
            as="a"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            icon={<FaTwitter />}
            colorScheme="white"
            variant="ghost"
            fontSize="20px"
            mx={1}
          />
        </Tooltip>
        <Tooltip label="Instagram" hasArrow placement="top">
          <IconButton
            as="a"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            icon={<FaInstagram />}
            colorScheme="white"
            variant="ghost"
            fontSize="20px"
            mx={1}
          />
        </Tooltip>
        <Tooltip label="Facebook" hasArrow placement="top">
          <IconButton
            as="a"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            icon={<FaFacebook />}
            colorScheme="white"
            variant="ghost"
            fontSize="20px"
            mx={1}
          />
        </Tooltip>
      </Flex>
      <Flex justifyContent="center" alignItems="center" mb={4}>
        <Link href="/about" mx={2} color="white">
          About Us
        </Link>
        <Link href="/contact" mx={2} color="white">
          Contact Us
        </Link>
        <Link href="/terms" mx={2} color="white">
          Terms of Service
        </Link>
        <Divider my={2} borderColor="white" />
        <Flex justifyContent="center" alignItems="center">
          <Tooltip label="Owner: Uzair Ansari" hasArrow placement="top">
            <IconButton
              as="span"
              aria-label="Owner"
              icon={<FaUserCircle />}
              colorScheme="white"
              variant="ghost"
              fontSize="20px"
              mr={2}
            />
          </Tooltip>
          <Text>Owned by Uzair Ansari</Text>
        </Flex>
        <Flex justifyContent="center" alignItems="center" mt={2}>
          <Tooltip label="Secure Website" hasArrow placement="top">
            <IconButton
              as="span"
              aria-label="Secure"
              icon={<AiFillSafetyCertificate />}
              colorScheme="white"
              variant="ghost"
              fontSize="20px"
              mr={2}
            />
          </Tooltip>
          <Text>Secure Online Shopping</Text>
        </Flex>
      </Flex>

      <Text mt={4}>
        &copy; {new Date().getFullYear()} Clothify. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
