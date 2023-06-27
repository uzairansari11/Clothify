import { Image, Tooltip } from "@chakra-ui/react";
import { Link as ReactLink, useLocation } from "react-router-dom";

const Logo = () => {
  const { pathname } = useLocation();
  return (
    <ReactLink
      to={`${
        pathname.startsWith("/admin") &&
        pathname !== "/admin/login" &&
        pathname !== "/admin/signup"
          ? "/admin/dashboard"
          : "/"
      }`}
    >
      <Tooltip
        label="Fashion Redefined"
        aria-label="Fashion redefined tooltip"
        hasArrow
      >
        <Image
          src={"/images/logo.png"}
          alt="Logo"
          width={{ base: "100px", md: "100px", lg: "120px" }}
          cursor={"pointer"}
          margin={"auto"}
        />
      </Tooltip>
    </ReactLink>
  );
};

export default Logo;
