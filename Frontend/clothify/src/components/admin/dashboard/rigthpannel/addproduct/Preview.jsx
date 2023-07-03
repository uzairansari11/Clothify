import { Badge, Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const Preview = ({ productData }) => {
  return (
    <Box width={{ base: "100%", md: "100%", lg: "30%" }}>
      <Box
        borderRadius="md"
        p={4}
        height="500px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex direction="column" align="center" justify="center">
          <Text fontWeight="bold" fontSize="2xl" mb={2} textAlign="center">
            {productData.title}
          </Text>
          {productData.images.length > 0 && (
            <Box
              width="100%"
              height="300px"
              mb={4}
              borderRadius="md"
              overflow="hidden"
            >
              <Image
                src={productData.images[0]}
                alt="Product Image"
                objectFit="cover"
                width="100%"
                height="100%"
              />
            </Box>
          )}
          <Text fontWeight="semibold" fontSize="lg" mb={2}>
            Category: {productData.category}
          </Text>
          <Text fontWeight="semibold" fontSize="lg" mb={2}>
            Subcategory: {productData.subcategory}
          </Text>
          <Text fontWeight="semibold" fontSize="lg" mb={2}>
            Brand: {productData.brand}
          </Text>
          <Text fontWeight="semibold" fontSize="lg" mb={2}>
            Price: ${productData.price}
          </Text>
          <Text fontWeight="semibold" fontSize="lg" mb={2}>
            Discount: {productData.discount}%
          </Text>
          <Text fontWeight="semibold" fontSize="lg" mb={2}>
            Quantity: {productData.quantity}
          </Text>
          <Text fontWeight="semibold" fontSize="lg" mb={2}>
            Rating: {productData.rating}
          </Text>
          <Text fontWeight="semibold" fontSize="lg" mb={2}>
            Total Rating: {productData.total_rating}
          </Text>
          <Text fontWeight="semibold" fontSize="lg" mb={2}>
            Sizes:
          </Text>
          <Flex mb={4}>
            {productData.sizes.map((size) => (
              <Badge
                key={size}
                variant="solid"
                colorScheme="teal"
                borderRadius="md"
                px={2}
                py={1}
                mx={1}
              >
                {size}
              </Badge>
            ))}
          </Flex>
        </Flex>
        <Box>
          <Text fontWeight="semibold" fontSize="lg" mb={2} textAlign="center">
            Description:
          </Text>
          <Text textAlign="center">{productData.description}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Preview;
