import {
  Badge,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Link,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
  HStack,
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
  totalCartQuantity,
  isAuth,
  totalWishlistQuantity,
  orderData,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLinkClick = () => {
    onClose();
  };

  // Color mode values
  const drawerBg = useColorModeValue("white", "gray.900");
  const accentBar = "linear-gradient(90deg, #805AD5, #B794F4)";
  const categoryLinkColor = useColorModeValue("gray.700", "gray.200");
  const categoryLinkHover = "accent.text";
  const categoryIconColor = "accent.solid";
  const categoryBg = "accent.bg";
  const categoryBgHover = "accent.subtle";
  const dividerColor = "accent.subtle";
  const navItemBg = useColorModeValue("gray.50", "gray.800");
  const navItemBgHover = "accent.bg";
  const navItemBorderHover = "accent.subtle";
  const navIconColor = "accent.solid";
  const navLabelColor = useColorModeValue("gray.700", "gray.200");
  const navCountColor = useColorModeValue("gray.500", "gray.400");
  const sectionLabelColor = useColorModeValue("gray.400", "gray.500");
  const dragHandleBg = useColorModeValue("gray.200", "gray.600");
  const closeBtnColor = useColorModeValue("gray.500", "gray.400");
  const navIconContainerBg = "accent.bg";

  const cartCount = isAuth && totalCartQuantity ? totalCartQuantity : 0;
  const wishlistCount =
    isAuth && totalWishlistQuantity ? totalWishlistQuantity : 0;
  const orderCount = isAuth && orderData?.length ? orderData.length : 0;

  const categoryLinks = [
    { label: "Men", to: "/men", icon: FaMale },
    { label: "Women", to: "/women", icon: FaFemale },
    { label: "Kids", to: "/kids", icon: FaChild },
  ];

  const navLinks = [
    {
      label: "Cart",
      to: "/cart",
      icon: FaShoppingCart,
      count: cartCount,
    },
    {
      label: "Wishlist",
      to: "/wishlist",
      icon: FaHeart,
      count: wishlistCount,
    },
    {
      label: "Orders",
      to: "/orderhistory",
      icon: FaShoppingBag,
      count: orderCount,
    },
  ];

  return (
    <Box width="90%">
      <Box onClick={onOpen} as="span" cursor="pointer">
        {children}
      </Box>

      <Drawer size="xs" placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay bg="blackAlpha.400" backdropFilter="blur(4px)" />
        <DrawerContent
          bg={drawerBg}
          borderTopRadius="2xl"
          overflow="hidden"
          boxShadow="0 -4px 30px rgba(128, 90, 213, 0.15)"
        >
          {/* Top accent bar */}
          <Box h="3px" bg={accentBar} />

          {/* Drag handle indicator */}
          <Flex justify="center" pt={2} pb={1}>
            <Box
              w="36px"
              h="4px"
              bg={dragHandleBg}
              borderRadius="full"
            />
          </Flex>

          <DrawerCloseButton
            top={4}
            right={4}
            color={closeBtnColor}
            _hover={{ color: "accent.solid", bg: "accent.bg" }}
            borderRadius="full"
          />

          <DrawerBody px={4} pt={3} pb={6}>
            {/* Shop Categories section */}
            <Text
              fontSize="10px"
              fontWeight="700"
              color={sectionLabelColor}
              textTransform="uppercase"
              letterSpacing="1.2px"
              mb={2}
            >
              Shop by Category
            </Text>

            <HStack spacing={2} mb={4}>
              {categoryLinks.map(({ label, to, icon }) => (
                <Link
                  key={label}
                  as={ReactLink}
                  to={to}
                  onClick={handleLinkClick}
                  flex="1"
                  _hover={{ textDecoration: "none" }}
                >
                  <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    bg={categoryBg}
                    borderRadius="xl"
                    py={3}
                    gap={1}
                    transition="all 0.15s ease"
                    _hover={{
                      bg: categoryBgHover,
                      transform: "translateY(-1px)",
                    }}
                  >
                    <Icon
                      as={icon}
                      boxSize={5}
                      color={categoryIconColor}
                    />
                    <Text
                      fontSize="xs"
                      fontWeight="700"
                      color={categoryLinkColor}
                      _hover={{ color: categoryLinkHover }}
                    >
                      {label}
                    </Text>
                  </Flex>
                </Link>
              ))}
            </HStack>

            <Divider borderColor={dividerColor} mb={4} />

            {/* My Account section */}
            <Text
              fontSize="10px"
              fontWeight="700"
              color={sectionLabelColor}
              textTransform="uppercase"
              letterSpacing="1.2px"
              mb={2}
            >
              My Account
            </Text>

            <VStack spacing={2} align="stretch">
              {navLinks.map(({ label, to, icon, count }) => (
                <Link
                  key={label}
                  as={ReactLink}
                  to={to}
                  onClick={handleLinkClick}
                  _hover={{ textDecoration: "none" }}
                >
                  <Flex
                    align="center"
                    justify="space-between"
                    bg={navItemBg}
                    borderWidth="1px"
                    borderColor="transparent"
                    borderRadius="xl"
                    px={4}
                    py={3}
                    transition="all 0.15s ease"
                    _hover={{
                      bg: navItemBgHover,
                      borderColor: navItemBorderHover,
                      transform: "translateX(2px)",
                    }}
                  >
                    <HStack spacing={3}>
                      <Flex
                        align="center"
                        justify="center"
                        w="36px"
                        h="36px"
                        bg={navIconContainerBg}
                        borderRadius="lg"
                        flexShrink={0}
                      >
                        <Icon as={icon} boxSize={4} color={navIconColor} />
                      </Flex>
                      <Box>
                        <Text
                          fontSize="sm"
                          fontWeight="600"
                          color={navLabelColor}
                          lineHeight="1.2"
                        >
                          {label}
                        </Text>
                        <Text fontSize="xs" color={navCountColor} mt={0.5}>
                          {count} {count === 1 ? "item" : "items"}
                        </Text>
                      </Box>
                    </HStack>

                    {count > 0 && (
                      <Badge
                                                borderRadius="full"
                        px={2}
                        py={0.5}
                        fontSize="xs"
                        fontWeight="700"
                      >
                        {count}
                      </Badge>
                    )}
                  </Flex>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default DrawerComponent;
