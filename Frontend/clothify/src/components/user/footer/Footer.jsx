import {
  Box,
  Divider,
  Flex,
  IconButton,
  Link,
  Text,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaUserCircle,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const hoverEffect = {
    scale: 1.1,
    transition: { duration: 0.2 },
  };

  // Adjust the flex direction based on screen size
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });

  return (
    <Box
      bg="teal.500"
      color="white"
      py={2}
      px={4}
      textAlign="center"
      fontSize="sm"
      width="100%"
      mt={20}
    >
      <Flex
        direction={flexDirection}
        justifyContent="center"
        alignItems="center"
        mb={4}
        flexWrap="wrap"
      >
        <Text fontWeight="bold" fontSize="lg" mr={2}>
          Clothify
        </Text>
        <Text> | </Text>
        <Text ml={2}>Fashion Redefined</Text>
      </Flex>
      <Flex justifyContent="center" alignItems="center" mb={4} flexWrap="wrap">
        <Tooltip label="Twitter" hasArrow placement="top">
          <IconButton
            as="a"
            href="https://twitter.com/uzairansari_11"
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
            href="https://www.instagram.com/____uzairrrr____/"
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
            href="https://www.facebook.com/profile.php?id=100052309576182"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            icon={<FaFacebook />}
            colorScheme="white"
            variant="ghost"
            fontSize="20px"
            mx={1}
            _hover={hoverEffect}
          />
        </Tooltip>
        <Tooltip label="WhatsApp" hasArrow placement="top">
          <IconButton
            as="a"
            href="https://wa.me/7271880500"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            icon={<FaWhatsapp />}
            colorScheme="white"
            variant="ghost"
            fontSize="20px"
            mx={1}
            _hover={hoverEffect}
          />
        </Tooltip>
      </Flex>
      <Flex
        direction={flexDirection}
        justifyContent="center"
        alignItems="center"
        mb={4}
        flexWrap="wrap"
      >
        <Link href="/about" mx={2} color="white" _hover={{ cursor: "pointer" }}>
          About Us
        </Link>
        <Link href="/contact" mx={2} color="white" _hover={hoverEffect}>
          Contact Us
        </Link>
        <Link href="/terms" mx={2} color="white" _hover={hoverEffect}>
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
              _hover={hoverEffect}
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
              _hover={hoverEffect}
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
