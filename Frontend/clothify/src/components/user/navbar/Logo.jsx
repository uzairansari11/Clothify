import { Text, useColorModeValue } from "@chakra-ui/react";
import { Link as ReactLink, useLocation } from "react-router-dom";

const Logo = () => {
  const { pathname } = useLocation();
  const color = useColorModeValue("gray.900", "white");

  const to =
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login" &&
    pathname !== "/admin/signup"
      ? "/admin/dashboard"
      : "/";

  return (
    <ReactLink to={to}>
      <Text
        fontSize={{ base: "lg", md: "xl" }}
        fontWeight="800"
        color={color}
        letterSpacing="-0.5px"
        cursor="pointer"
        _hover={{ opacity: 0.8 }}
        transition="opacity 0.2s"
        whiteSpace="nowrap"
      >
        Clothify
        <Text as="span" color="accent.solid">.</Text>
      </Text>
    </ReactLink>
  );
};

export default Logo;
