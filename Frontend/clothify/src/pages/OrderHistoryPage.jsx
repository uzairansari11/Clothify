import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from '@chakra-ui/react';

const OrderHistoryPage = () => {
  const orders = [
    // {
    //   id: '12345',
    //   date: '2023-06-12',
    //   total: 129.99,
    //   items: [
    //     { name: 'Product 1', price: 39.99, quantity: 1 },
    //     { name: 'Product 2', price: 25.99, quantity: 2 },
    //     { name: 'Product 3', price: 19.99, quantity: 1 },
    //   ],
    // },
    // Add more order objects here
  ];

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.800')} py={8}>
      <Container maxW="container.lg">
        <Heading as="h1" size="xl" mb={4}>
          Order History
        </Heading>
        {orders.length > 0 ? (
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Order ID</Th>
                <Th>Date</Th>
                <Th>Total</Th>
                <Th>Items</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order.id}>
                  <Td>{order.id}</Td>
                  <Td>{order.date}</Td>
                  <Td>${order.total}</Td>
                  <Td>
                    <Stack spacing={1}>
                      {order.items.map((item) => (
                        <Text key={item.name}>
                          {item.name} x {item.quantity}
                        </Text>
                      ))}
                    </Stack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text>No orders found.</Text>
        )}
      </Container>
    </Box>
  );
};

export default OrderHistoryPage;
