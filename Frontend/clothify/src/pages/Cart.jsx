import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FiArrowRight, FiShield, FiShoppingBag } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import LoadingScreen from "../components/common/LoadingScreen";
import CartItemCard from "../components/user/cart/CartItemCard";
import {
  handleDeleteToCartData,
  handleUpdateToCartData,
} from "../redux/User_Redux/cart/action";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const CartPage = () => {
  const { cartData, isError } = useSelector((store) => store.cartReducer);
  const { isAuth } = useSelector((store) => store.authReducer);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // All color mode values at top level
  const pageBg = useColorModeValue("gray.50", "gray.900");
  const headingColor = useColorModeValue("gray.800", "white");
  const subtextColor = useColorModeValue("gray.500", "gray.400");
  const headerIconBg = "accent.bg";
  const headerIconColor = "accent.text";
  const summaryCardBg = useColorModeValue("white", "gray.800");
  const summaryBorderColor = useColorModeValue("gray.200", "gray.700");
  const summaryHeadingColor = useColorModeValue("gray.800", "white");
  const summaryLabelColor = useColorModeValue("gray.500", "gray.400");
  const summaryValueColor = useColorModeValue("gray.800", "gray.100");
  const summaryTotalColor = "accent.text";
  const dividerColor = useColorModeValue("gray.200", "gray.600");
  const shieldColor = useColorModeValue("gray.400", "gray.500");
  const shieldTextColor = useColorModeValue("gray.400", "gray.500");

  const handleQuantityChange = (itemId, payload) =>
    dispatch(handleUpdateToCartData(itemId, payload));

  const handleRemoveItem = (itemId) =>
    dispatch(handleDeleteToCartData(itemId));

  const calculateTotalPrice =
    cartData?.length &&
    Math.ceil(
      cartData?.reduce((total, item) => total + item.price * item.quantity, 0)
    );

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (!isAuth) {
    return (
      <EmptyState
        icon={FiShoppingBag}
        title="Your Cart"
        message="Please log in to view your cart and continue shopping."
        actionLabel="Log In"
        onAction={() => navigate("/login", { state: { data: "/cart" } })}
      />
    );
  }

  if (loading) {
    return <LoadingScreen message="Loading your cart..." />;
  }

  const itemCount = cartData?.length || 0;

  return (
    <Box
      minH="100vh"
      bg={pageBg}
      pt="80px"
      pb={{ base: 12, md: 20 }}
      fontFamily="Inter, sans-serif"
    >
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>

        {/* Page Header */}
        <MotionBox
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          mb={{ base: 8, md: 10 }}
        >
          <Flex align="center" gap={4}>
            <Box
              bg={headerIconBg}
              p={3}
              borderRadius="xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FiShoppingBag} boxSize={6} color={headerIconColor} />
            </Box>
            <Box>
              <Heading
                as="h1"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="800"
                color={headingColor}
                letterSpacing="-0.5px"
                lineHeight="1.2"
              >
                Shopping Cart
              </Heading>
              <Text
                fontSize="sm"
                color={subtextColor}
                mt={0.5}
                fontWeight="500"
              >
                {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
              </Text>
            </Box>
          </Flex>
        </MotionBox>

        {/* Main Layout */}
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 6, lg: 8 }}
          align="flex-start"
        >

          {/* Cart Items Column */}
          <MotionBox
            flex="1"
            minW={0}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            {itemCount > 0 ? (
              <VStack spacing={0} align="stretch">
                {cartData.map((ele, index) => (
                  <MotionBox
                    key={ele._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      delay: 0.15 + index * 0.07,
                    }}
                  >
                    <CartItemCard
                      {...ele}
                      handleRemoveItem={handleRemoveItem}
                      handleQuantityChange={handleQuantityChange}
                    />
                  </MotionBox>
                ))}
              </VStack>
            ) : (
              <EmptyState
                icon={FiShoppingBag}
                title="Your cart is empty"
                message="Looks like you haven't added anything to your cart yet."
                actionLabel="Start Shopping"
                onAction={() => navigate("/men")}
              />
            )}
          </MotionBox>

          {/* Order Summary Sidebar */}
          {itemCount > 0 && (
            <MotionBox
              w={{ base: "100%", lg: "340px" }}
              flexShrink={0}
              position={{ base: "static", lg: "sticky" }}
              top={{ lg: "100px" }}
              alignSelf="flex-start"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              <Box
                bg={summaryCardBg}
                borderRadius="2xl"
                border="1px solid"
                borderColor={summaryBorderColor}
                p={{ base: 5, md: 6 }}
                boxShadow="0 4px 24px rgba(0,0,0,0.06)"
              >
                {/* Summary Heading */}
                <Heading
                  as="h2"
                  fontSize="lg"
                  fontWeight="700"
                  color={summaryHeadingColor}
                  mb={5}
                  letterSpacing="-0.3px"
                >
                  Order Summary
                </Heading>

                {/* Subtotal Row */}
                <Flex justify="space-between" align="center" mb={3}>
                  <Text
                    fontSize="sm"
                    color={summaryLabelColor}
                    fontWeight="500"
                  >
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </Text>
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color={summaryValueColor}
                  >
                    &#8377;{Number(calculateTotalPrice).toLocaleString("en-IN")}
                  </Text>
                </Flex>

                {/* Shipping Row */}
                <Flex justify="space-between" align="center" mb={5}>
                  <Text
                    fontSize="sm"
                    color={summaryLabelColor}
                    fontWeight="500"
                  >
                    Shipping
                  </Text>
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="green.500"
                  >
                    Free
                  </Text>
                </Flex>

                {/* Divider */}
                <Divider borderColor={dividerColor} mb={5} />

                {/* Total Row */}
                <Flex justify="space-between" align="center" mb={6}>
                  <Text
                    fontSize="md"
                    fontWeight="700"
                    color={summaryHeadingColor}
                  >
                    Total
                  </Text>
                  <Text
                    fontSize="xl"
                    fontWeight="800"
                    color={summaryTotalColor}
                    letterSpacing="-0.5px"
                  >
                    &#8377;{Number(calculateTotalPrice).toLocaleString("en-IN")}
                  </Text>
                </Flex>

                {/* Checkout Button */}
                <Link to="/checkout" style={{ display: "block" }}>
                  <Button
                    width="100%"
                    size="lg"
                    rightIcon={<FiArrowRight />}
                    bg="accent.solid"
                    color="white"
                    borderRadius="xl"
                    fontWeight="700"
                    fontSize="md"
                    letterSpacing="0.2px"
                    _hover={{
                      opacity: 0.9,
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 24px rgba(128, 90, 213, 0.4)",
                    }}
                    _active={{
                      transform: "translateY(0px)",
                      boxShadow: "none",
                    }}
                    transition="all 0.2s ease"
                    py={6}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>

                {/* Security Badge */}
                <Flex
                  align="center"
                  justify="center"
                  gap={1.5}
                  mt={4}
                >
                  <Icon
                    as={FiShield}
                    boxSize={3.5}
                    color={shieldColor}
                  />
                  <Text
                    fontSize="xs"
                    color={shieldTextColor}
                    fontWeight="500"
                  >
                    Secure checkout
                  </Text>
                </Flex>
              </Box>
            </MotionBox>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default CartPage;
