import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

const orders = [
  {
    id: "1",
    orderedDate: "2023-06-10",
    deliveryDate: "2023-06-15",
    total: 120.99,
    items: [
      { id: "1", name: "Product 1", price: 50.99, quantity: 2 },
      { id: "2", name: "Product 2", price: 70.0, quantity: 1 },
    ],
    address: "123 Main St, City, State",
  },
  // Add more orders as needed
];

const OrderHistoryPage = () => {
  return (
    <Box py={8}>
      <Container maxW="container.md">
        <Heading as="h1" size="xl" mb={4}>
          Order History
        </Heading>
        <VStack spacing={4} align="stretch">
          {orders.map((order) => (
            <Box
              key={order.id}
              borderWidth={1}
              borderRadius="md"
              p={4}
              boxShadow="md"
            >
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Order #{order.id}
              </Text>
              <Text mb={2}>Ordered Date: {order.orderedDate}</Text>
              <Text mb={2}>Delivery Date: {order.deliveryDate}</Text>
              <Text mb={2}>Total: ${order.total.toFixed(2)}</Text>
              <Text fontWeight="bold">Items:</Text>
              <Box display="flex" flexDirection="column" mt={2}>
                {order.items.map((item) => (
                  <Box key={item.id} display="flex" alignItems="center" mb={2}>
                    <MdCheckCircle color="green" size={20} />
                    <Text ml={2}>
                      {item.name} - ${item.price.toFixed(2)} (
                      <Badge variant="solid" colorScheme="blue">
                        {item.quantity}
                      </Badge>{" "}
                      quantity)
                    </Text>
                  </Box>
                ))}
              </Box>
              <Divider my={4} />
              <Text fontWeight="bold">Delivery Address:</Text>
              <Text>{order.address}</Text>
            </Box>
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

export default OrderHistoryPage;
