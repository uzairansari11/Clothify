import React from "react";
import { Box } from "@chakra-ui/react";
import Logo from "./Logo";
import Container from "../Container";
import Searchbar from "./Searchbar";
import Menuitem from "./Menuitem";
import Options from "./ProductOptions";
import AvatarNavbar from "./AvatarNavbar";
import HamburgerOptions from "./Hamburger";
import OtherOptions from "./OtherOptions";
import { useSelector } from "react-redux";
import DrawerComponent from "./DrawerComponent";
import { getQuantity } from "../../../utils/getquanity";

const Navbar = () => {
  const { cartData } = useSelector((store) => store.cartReducer);
  const { wishlistData } = useSelector((store) => store.wishlistReducer);
  const authDetails = useSelector((store) => store.authReducer);

  const totalCartQunatity = getQuantity(cartData);
  const totalWishlistQunatity = getQuantity(wishlistData);
  return (
    <Box
      backgroundColor={"white"}
      width={"full"}
      boxShadow={"xl"}
      position={"fixed"}
      p={0}
      px={[2, 4]}
      py={[2, 2]}
      zIndex={50}
      top={0}
      left={0}
      mt={0}
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
          <Box width={{ base: "auto", md: "25%" }}>
            <Searchbar />
          </Box>

          <Box
            display={{ base: "none", lg: "flex" }}
            width={{ base: "auto", md: "15%" }}
          >
            <OtherOptions />
          </Box>

          <Box width={{ base: "auto", md: "5%" }}>
            <Menuitem isAuth={authDetails.isAuth}>
              <AvatarNavbar authDetails={authDetails} />
            </Menuitem>
          </Box>
          <Box display={{ base: "flex", lg: "none" }} alignItems={"center"}>
            <DrawerComponent
              totalCartQunatity={totalCartQunatity}
              totalWishlistQunatity={totalWishlistQunatity}
              isAuth={authDetails.isAuth}
            >
              {" "}
              <HamburgerOptions />
            </DrawerComponent>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
