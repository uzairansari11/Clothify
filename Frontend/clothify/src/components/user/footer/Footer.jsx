import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Link,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headingColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.500", "gray.400");
  const linkHoverColor = "accent.text";
  const iconHoverBg = useColorModeValue("accent.bg", "whiteAlpha.100");
  const bottomBarColor = useColorModeValue("gray.400", "gray.500");

  const socialLinks = [
    { icon: FaTwitter, href: "https://twitter.com/uzairansari_11", label: "Twitter" },
    { icon: FaInstagram, href: "https://www.instagram.com/____uzairrrr____/", label: "Instagram" },
    { icon: FaFacebook, href: "https://www.facebook.com/profile.php?id=100052309576182", label: "Facebook" },
    { icon: FaWhatsapp, href: "https://wa.me/7271880500", label: "WhatsApp" },
  ];

  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Men", href: "/men" },
    { label: "Women", href: "/women" },
    { label: "Kids", href: "/kids" },
  ];

  const supportLinks = ["Contact Us", "Terms of Service", "Privacy Policy", "FAQ"];

  return (
    <Box bg={bgColor} borderTop="1px solid" borderColor={borderColor} mt={16}>
      <Box maxW="1280px" mx="auto" px={{ base: 6, md: 10 }} py={{ base: 10, md: 14 }}>
        <Grid
          templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "2.5fr 1fr 1fr 1fr" }}
          gap={{ base: 8, md: 10 }}
          mb={10}
        >
          {/* Brand column - left aligned */}
          <GridItem colSpan={{ base: 1, sm: 2, lg: 1 }}>
            <Flex align="center" gap={2} mb={3}>
              <Text
                fontSize="xl"
                fontWeight="800"
                color={headingColor}
                letterSpacing="-0.5px"
                fontFamily="'Inter', sans-serif"
              >
                Clothify
                <Text as="span" color="accent.solid">.</Text>
              </Text>
            </Flex>
            <Text fontSize="sm" lineHeight="1.85" maxW="280px" color={textColor} mb={5}>
              Your trusted fashion destination where style, comfort, and
              elegance come together for every occasion.
            </Text>
            <Flex gap={1}>
              {socialLinks.map((social) => (
                <Tooltip key={social.label} label={social.label} hasArrow placement="top">
                  <IconButton
                    as="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    icon={<social.icon />}
                    size="sm"
                    variant="ghost"
                    color={textColor}
                    borderRadius="full"
                    _hover={{
                      color: "accent.solid",
                      bg: iconHoverBg,
                      transform: "translateY(-2px)",
                    }}
                    transition="all 0.2s ease"
                  />
                </Tooltip>
              ))}
            </Flex>
          </GridItem>

          {/* Quick Links */}
          <GridItem>
            <Text
              fontSize="xs"
              color={headingColor}
              mb={4}
              textTransform="uppercase"
              letterSpacing="1.5px"
              fontWeight="700"
              fontFamily="'Inter', sans-serif"
            >
              Quick Links
            </Text>
            <Flex direction="column" gap={2.5}>
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  fontSize="sm"
                  color={textColor}
                  _hover={{ color: linkHoverColor, textDecoration: "none", pl: "4px" }}
                  transition="all 0.2s ease"
                  display="inline-block"
                >
                  {link.label}
                </Link>
              ))}
            </Flex>
          </GridItem>

          {/* Support */}
          <GridItem>
            <Text
              fontSize="xs"
              color={headingColor}
              mb={4}
              textTransform="uppercase"
              letterSpacing="1.5px"
              fontWeight="700"
              fontFamily="'Inter', sans-serif"
            >
              Support
            </Text>
            <Flex direction="column" gap={2.5}>
              {supportLinks.map((item) => (
                <Text
                  key={item}
                  fontSize="sm"
                  color={textColor}
                  cursor="pointer"
                  _hover={{ color: linkHoverColor, pl: "4px" }}
                  transition="all 0.2s ease"
                  display="inline-block"
                >
                  {item}
                </Text>
              ))}
            </Flex>
          </GridItem>

          {/* Contact */}
          <GridItem>
            <Text
              fontSize="xs"
              color={headingColor}
              mb={4}
              textTransform="uppercase"
              letterSpacing="1.5px"
              fontWeight="700"
              fontFamily="'Inter', sans-serif"
            >
              Contact
            </Text>
            <Flex direction="column" gap={2.5}>
              <Text fontSize="sm" color={textColor}>hello@clothify.com</Text>
              <Text fontSize="sm" color={textColor}>+91 727-188-0500</Text>
              <Text fontSize="sm" color={textColor}>Mon - Sat, 9am - 6pm</Text>
            </Flex>
          </GridItem>
        </Grid>

        {/* Bottom bar */}
        <Box borderTop="1px solid" borderColor={borderColor} pt={6}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            gap={2}
          >
            <Text fontSize="xs" color={bottomBarColor}>
              &copy; {new Date().getFullYear()} Clothify. All rights reserved.
            </Text>
            <Text fontSize="xs" color={bottomBarColor}>
              Crafted with care by{" "}
              <Text as="span" color="accent.solid" fontWeight="600">
                Uzair Ansari
              </Text>
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
