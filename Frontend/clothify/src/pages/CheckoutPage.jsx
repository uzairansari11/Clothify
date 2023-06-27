import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Text,
  Icon,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { FaArrowRight, FaCheck, FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { cookiesGetter } from '../utils/coockies';


function CheckoutPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { cartData } = useSelector((store) => store.cartReducer);

  useEffect(() => {
    const storedData = localStorage.getItem("checkoutData");
    if (storedData) {
      const { name, email, address } = JSON.parse(storedData);
      setName(name);
      setEmail(email);
      setAddress(address);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate order placement API call
    setIsPlacingOrder(true);
    setTimeout(() => {
      setIsPlacingOrder(false);
      setShowSummary(true);
    }, 2000);
  };

  const handleConfirmOrder = async () => {
    // Handle order confirmation logic here
    console.log("Order placed:", { name, email, address }, cartData);
    const { token } = cookiesGetter("uzair_app_token");

    let res = await axios.post(
      "http://localhost:4500/order",
      {
        name,
        email,
        address,
        items: cartData,
      },
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    console.log(res);
  };

  useEffect(() => {
    localStorage.setItem(
      "checkoutData",
      JSON.stringify({ name, email, address })
    );
  }, [name, email, address]);

  const calculateTotalPrice =
    cartData.length > 0
      ? Math.ceil(
          cartData.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )
        )
      : 0;

  return (
    <ChakraProvider>
      <Box
        maxW="md"
        mx="auto"
        mt={10}
        p={6}
        borderWidth={1}
        borderRadius="md"
        boxShadow="lg"
      >
        <Heading as="h1" size="lg" mb={6}>
          Checkout
        </Heading>
        {!showSummary ? (
          <form onSubmit={handleSubmit}>
            <FormControl id="name" isRequired mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </FormControl>
            <FormControl id="email" isRequired mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl id="address" isRequired mb={4}>
              <FormLabel>Address</FormLabel>

              <Textarea
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
              />
            </FormControl>
            <Button
              colorScheme="blue"
              type="submit"
              rightIcon={
                isPlacingOrder ? (
                  <Spinner size="sm" />
                ) : (
                  <Icon as={FaArrowRight} />
                )
              }
              isLoading={isPlacingOrder}
              loadingText="Placing Order"
            >
              Place Order
            </Button>
          </form>
        ) : (
          <Box mt={6}>
            <Heading as="h2" size="md" mb={2}>
              Order Summary
            </Heading>
            <Box borderWidth={1} borderRadius="md" p={4}>
              <Flex alignItems="center" mb={2}>
                <Icon as={FaCheck} boxSize={6} mr={2} />
                <Text fontWeight="bold">Payment: $ {calculateTotalPrice}</Text>
              </Flex>
              <Flex alignItems="center" mb={2}>
                <Icon as={FaCheck} boxSize={6} mr={2} />
                <Text fontWeight="bold">Name: {name}</Text>
              </Flex>
              <Flex alignItems="center" mb={2}>
                <Icon as={FaCheck} boxSize={6} mr={2} />
                <Text fontWeight="bold">Email: {email}</Text>
              </Flex>
              <Flex alignItems="center">
                <Icon as={FaCheck} boxSize={6} mr={2} />
                <Text fontWeight="bold">Address: {address}</Text>
              </Flex>
            </Box>
            <Button
              mt={4}
              leftIcon={<Icon as={FaChevronLeft} />}
              onClick={() => setShowSummary(false)}
            >
              Go Back
            </Button>
            <Button
              mt={4}
              ml={4}
              colorScheme="blue"
              rightIcon={
                isPlacingOrder ? (
                  <Spinner size="sm" />
                ) : (
                  <Icon as={FaArrowRight} />
                )
              }
              isLoading={isPlacingOrder}
              loadingText="Placing Order"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </Button>
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default CheckoutPage;
