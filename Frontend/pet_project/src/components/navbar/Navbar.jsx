import React from "react";
import { Box } from "@chakra-ui/react";
import Logo from "./Logo";
import Container from "../Container";
import Searchbar from "./Searchbar";
import Menuitem from "./Menuitem";
import Options from "./ProductOptions";
import AvatarNavbar from "./AvatarNavbar";
import HamburgerOptions from "./HamburgerOptions";
import OtherOptions from "./OtherOptions";

const Navbar = () => {
  return (
    <Box
      backgroundColor={"white.200"}
      width={"full"}
      boxShadow={"xl"}
      position={"fixed"}
      px={[2, 4]}
      py={[1, 2]}
      zIndex={50}
    >
      <Container>
        <Box
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
          gap={"4"}
        >
          <Box width={{ base: "40%", lg: "10%" }}>
            <Logo />
          </Box>
          <Box
            display={{ base: "none", lg: "flex" }}
            width={{ base: "auto", md: "30%" }}
           
          >
            <Options />
          </Box>
          <Box width={{ base: "auto", md: "25%" }} >
            <Searchbar />
          </Box>

          <Box
            display={{ base: "none", lg: "flex" }}
            width={{ base: "auto", md: "15%" }}
           
          >
            <OtherOptions />
          </Box>

          <Box width={{ base: "auto", md: "5%" }} >
            <Menuitem>
              <AvatarNavbar />
            </Menuitem>
          </Box>
          <Box display={{ base: "flex", lg: "none" }}  alignItems={'center'}>
            <HamburgerOptions />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
