import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  ScaleFade,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const OrderHistoryPage = () => {
  const { orderData } = useSelector((store) => store.orderReducer);

  return (
    <Box py={8}>
      <Container maxW="container.lg">
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
          Your Order's History
        </Heading>
        <Divider my={4} />
        {orderData.length > 0 ? (
          <Flex direction="column" spacing={6}>
            {orderData.map((order) => (
              <Box
                key={order?._id}
                p={6}
                borderRadius="lg"
                boxShadow="md"
                transition="all 0.3s"
                _hover={{
                  boxShadow: "xl",
                }}
              >
                <Flex justify="space-between" align="center" mb={4}>
                  <Text fontWeight="bold" fontSize="lg">
                    Order ID: {order?._id}
                  </Text>
                  <Text fontSize="lg">Date: {order?.date}</Text>
                </Flex>
                <Box textAlign="left" mb={4}>
                  <Text>
                    <strong>Name:</strong> {order?.name}
                  </Text>
                  <Text>
                    <strong>Time:</strong> {order?.time}
                  </Text>
                  <Text>
                    <strong>Email:</strong> {order?.email}
                  </Text>
                  <Text>
                    <strong>Address:</strong> {order?.address}
                  </Text>
                  <Text mt={2}>
                    <strong>Grand Total:</strong> ${order?.grandTotal}
                  </Text>
                </Box>
                <Flex flexWrap="wrap">
                  {order?.items?.map((item, index) => (
                    <Box
                      key={item?._id}
                      p={4}
                      borderWidth={1}
                      borderRadius="md"
                      flex="0 0 48%" // Adjust this value based on your desired item width
                      mb={4}
                      mr={4}
                      transition="all 0.3s"
                      _hover={{
                        transform: "scale(1.05)",
                      }}
                    >
                      <Flex>
                        <Box flex="1">
                          <Text fontSize="lg" fontWeight="bold" mb={2}>
                            {item.brand}
                          </Text>
                          <Text>Quantity: {item?.quantity}</Text>
                          <Text>Total Price: ${item.totalPrice}</Text>
                        </Box>
                        <Image
                          src={item?.images[0]} // Replace with your image path
                          alt="Item Image"
                          boxSize={20}
                          objectFit="contain"
                        />
                      </Flex>
                    </Box>
                  ))}
                </Flex>
              </Box>
            ))}
          </Flex>
        ) : (
          <Flex
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
            color="gray.500"
          >
            <ScaleFade initialScale={0.9} in>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 150,
                }}
              >
                <Text fontSize="xl" textAlign="center">
                  No orders found.
                </Text>
              </motion.div>
            </ScaleFade>
          </Flex>
        )}
      </Container>
    </Box>
  );
};

export default OrderHistoryPage;
