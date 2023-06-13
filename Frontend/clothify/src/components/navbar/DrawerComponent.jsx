import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Flex,
  Text,
  Icon,
  Link,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import {
  FaShoppingCart,
  FaHeart,
  FaShoppingBag,
  FaMale,
  FaFemale,
  FaChild,
} from "react-icons/fa";
import { Link as ReactLink } from "react-router-dom";
function DrawerComponent({
  children,
  totalCartQunatity,
  isAuth,
  totalWishlistQunatity,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      <Box onClick={onOpen} as="span" cursor="pointer">
        {children}
      </Box>

      <Drawer size="xs" placement={"top"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={"red"} />

          <DrawerBody color={"teal"}>
            <Flex
              alignItems="center"
              direction="row"
              mt={10}
              mb={4}
              gap={4}
              justifyContent={"center"}
            >
              <Flex align="center" mb={2}>
                <Icon as={FaMale} boxSize={6} mr={2} />
                <Link
                  as={ReactLink}
                  to="/men"
                  fontWeight="bold"
                  fontSize="lg"
                  onClick={handleLinkClick}
                >
                  Men
                </Link>
              </Flex>
              <Flex align="center" mb={2}>
                <Icon as={FaFemale} boxSize={6} mr={2} />
                <Link
                  as={ReactLink}
                  to="/women"
                  fontWeight="bold"
                  fontSize="lg"
                  onClick={handleLinkClick}
                >
                  Women
                </Link>
              </Flex>
              <Flex align="center" mb={2}>
                <Icon as={FaChild} boxSize={6} mr={2} />
                <Link
                  as={ReactLink}
                  to="/kids"
                  fontWeight="bold"
                  fontSize="lg"
                  onClick={handleLinkClick}
                >
                  Kids
                </Link>
              </Flex>
            </Flex>
            <Divider m={4} />

            <Flex
              align="center"
              flexDir={"row"}
              gap={4}
              justifyContent={"center"}
            >
              <Link as={ReactLink} to="/cart" mr={4} onClick={handleLinkClick}>
                <Icon as={FaShoppingCart} boxSize={6} mr={2} />
                <Box>
                  <Text fontWeight="bold">Cart</Text>
                  <Text>
                    {" "}
                    {isAuth && totalCartQunatity ? totalCartQunatity : 0}items
                  </Text>
                </Box>
              </Link>
              <Link
                as={ReactLink}
                to="/wishlist"
                mr={4}
                onClick={handleLinkClick}
              >
                <Icon as={FaHeart} boxSize={6} mr={2} />
                <Box>
                  <Text fontWeight="bold">Wishlist</Text>
                  <Text>
                    {" "}
                    {isAuth && totalWishlistQunatity
                      ? totalWishlistQunatity
                      : 0}
                    items
                  </Text>
                </Box>
              </Link>
              <Link as={ReactLink} to="/orderhistory" onClick={handleLinkClick}>
                <Icon as={FaShoppingBag} boxSize={6} mr={2} />
                <Box>
                  <Text fontWeight="bold">Order</Text>
                  <Text>{4} items</Text>
                </Box>
              </Link>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerComponent;