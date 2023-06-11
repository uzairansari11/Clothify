import React, { useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Divider,
  Flex,
  Button,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import CartItemCard from "../components/cart/CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteToCartData,
  handleGetCartData,
} from "../redux/cart/action";
import LoadingSpinner from "../components/spinner/Spinner";

const CartPage = () => {
  const { cartData, isLoading } = useSelector((store) => store.cartReducer);
  const dispatch = useDispatch();
  const toast = useToast();
  console.log(cartData)
  const handleIncreaseQuantity = (itemId) => {
    // Handle logic to increase item quantity
  };

  const handleDecreaseQuantity = (itemId) => {
    // Handle logic to decrease item quantity
  };

  const handleRemoveItem = (itemId) => {
    dispatch(handleDeleteToCartData(itemId));

  };

  useEffect(() => {
    dispatch(handleGetCartData());
  }, [dispatch]);

  return (
    <Box p={4}>
      <Heading
        as="h1"
        mb={4}
        size="xl"
        textAlign="center"
        color="teal.500"
        fontFamily={"cursive"}
        fontSize={"xl"}
        fontWeight={"extrabold"}
      >
        Your Cart
      </Heading>
      <Divider my={4} />

      <Flex flexDirection={{ base: "column-reverse", md: "row" }}>
        <Flex
          flexDirection="column"
          flex={{ base: "none", md: "3" }}
          pr={{ base: "0", md: "4" }}
          css={{
            overflowY: "auto",
            msOverflowStyle: "none", // Hide scrollbar on IE and Edge
            scrollbarWidth: "none", // Hide scrollbar on Firefox
            "&::-webkit-scrollbar": {
              display: "none", // Hide scrollbar on Chrome, Safari, and Opera
            },
          }}
        >
          {isLoading ? (
            <Flex justifyContent="center" alignItems="center" minHeight="200px">
              <LoadingSpinner />
            </Flex>
          ) : cartData.length ? (
            cartData.map((ele) => (
              <CartItemCard
                key={ele._id}
                {...ele}
                handleRemoveItem={handleRemoveItem}
                handleIncreaseQuantity={handleIncreaseQuantity}
              />
            ))
          ) : (
            <Text mb={4}>Your cart is empty.</Text>
          )}
        </Flex>

        <Flex
          flexDirection="column"
          flex={{ base: "none", md: "1" }}
          pl={{ base: "0", md: "4" }}
          position="sticky"
          top={0}
          alignSelf="flex-start"
          background={"white"}
          margin={{ base: "auto", md: "0" }}
        >
          <Flex justifyContent="space-between" alignItems="center" mt={4}>
            <Text fontWeight="bold">Total:</Text>
            <Tooltip label="Total Price" placement="top">
              <Text fontWeight="bold">$44.98</Text>
            </Tooltip>
          </Flex>
          <Flex justifyContent="flex-end" alignItems="center" mt={4}>
            <Button
              colorScheme="teal"
              size="lg"
              width={{ base: "100%", md: "100%" }}
              rightIcon={<FaShoppingCart />}
              onClick={() =>
                toast({
                  title: "Proceed to Checkout",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                })
              }
            >
              Proceed to Checkout
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CartPage;
