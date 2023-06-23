import { Image, Tooltip } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

const Logo = () => {
  return (
    <ReactLink to="/">
      <Tooltip label="Fashion Redefined" aria-label="Fashion redefined tooltip" hasArrow>
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
