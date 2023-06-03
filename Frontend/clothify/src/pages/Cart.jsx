import React from "react";
import {
  Box,
  Heading,
  Text,
  Divider,
  Flex,
  Image,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const CartPage = () => {
  const cartItems = [
    // Sample cart items
    // ...
  ];

  const handleIncreaseQuantity = (itemId) => {
    // Handle logic to increase item quantity
  };

  const handleDecreaseQuantity = (itemId) => {
    // Handle logic to decrease item quantity
  };

  const handleRemoveItem = (itemId) => {
    // Handle logic to remove item from cart
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Your Cart
      </Heading>
      {cartItems.map((item) => (
        <Box
          key={item.id}
          mb={4}
          p={4}
          bg="white"
          borderRadius="md"
          display={{ md: "flex" }}
          alignItems={{ md: "center" }}
        >
          <Image
            src={item.image}
            alt={item.name}
            width={{ base: "80px", md: "100px" }}
            mr={{ md: 4 }}
          />
          <Flex direction="column" flex="1">
            <Text fontWeight="bold" mb={2}>
              {item.name}
            </Text>
            <Text mb={2}>{item.price}</Text>
            <Flex alignItems="center">
              <IconButton
                aria-label="Decrease Quantity"
                icon={<FaMinus />}
                onClick={() => handleDecreaseQuantity(item.id)}
                mr={2}
              />
              <Text mx={2}>{item.quantity}</Text>
              <IconButton
                aria-label="Increase Quantity"
                icon={<FaPlus />}
                onClick={() => handleIncreaseQuantity(item.id)}
                mr={2}
              />
              <IconButton
                aria-label="Remove Item"
                icon={<FaTrash />}
                onClick={() => handleRemoveItem(item.id)}
              />
            </Flex>
          </Flex>
        </Box>
      ))}
      <Divider my={4} />
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold">Total:</Text>
        <Text fontWeight="bold">$44.98</Text>{" "}
        {/* Calculate the total price dynamically */}
      </Flex>
      <Button colorScheme="teal" size="lg" mt={4} width="100%">
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default CartPage;
