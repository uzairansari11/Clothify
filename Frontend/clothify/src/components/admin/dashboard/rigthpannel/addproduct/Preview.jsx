import React from "react";
import { Text, Flex, Box } from "@chakra-ui/react";

const Preview = ({ productData }) => {
    return (
        <Box width={["100%", "100%", "30%"]}>
            <Box
                border="1px solid gray"
                borderRadius="md"
                p={2}
                height="500px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <strong>Preview:</strong>
                <Box mt={2} textAlign="center">
                    {/* Display product information */}
                    {productData.images.length > 0 && (
                        <Box width="250px" height="180px" margin="auto">
                            <img
                                src={productData.images[0]}
                                alt="Product Image"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </Box>
                    )}
                    <Flex alignItems="center" mt={4} gap={2} justifyContent="center">
                        <Text fontWeight="bold" fontSize="xl">
                            {productData.title}
                        </Text>
                        <Text>{productData.category}</Text>
                        <Text>{productData.subcategory}</Text>
                    </Flex>
                    <Flex justifyContent="center" mt={4}>
                        <Text>Brand: {productData.brand}</Text>
                        <Text ml={4}>Price: {productData.price}</Text>
                    </Flex>
                    <Flex justifyContent="center" mt={2}>
                        <Text>Discount: {productData.discount}</Text>
                        <Text ml={4}>Quantity: {productData.quantity}</Text>
                    </Flex>
                    <Flex justifyContent="center" mt={2}>
                        <Text>Rating: {productData.rating}</Text>
                        <Text ml={4}>Total Rating: {productData.total_rating}</Text>
                    </Flex>
                    <Flex justifyContent="center" mt={2}>
                        <Text>Sizes: {productData.sizes.join(", ")}</Text>
                    </Flex>
                    <Text >
                        Description: {productData.description.substring(0, 20)}...
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default Preview;
