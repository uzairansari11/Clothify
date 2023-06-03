import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  IconButton,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiHeart, FiShoppingBag, FiChevronRight } from "react-icons/fi";

const SingleProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mainImage, setMainImage] = useState(
    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
  );
  const [additionalImages, setAdditionalImages] = useState([
    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
  ]);
  const heartColor = useColorModeValue("red.500", "red.200");
  const [selectedSize, setSelectedSize] = useState("S");

  const handleAddToCart = () => {
    setIsLoading(true);
    // Simulating an API call or asynchronous operation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleImageChange = (image) => {
    setMainImage(image);
  };

  return (
    <Box p="4">
      <Flex flexWrap="wrap" justifyContent="center" alignItems="center" mb="4">
        <Box width={{ base: "100%", md: "50%" }} pr={{ base: "0", md: "4" }}>
          <Image
            src={mainImage}
            alt="Product"
            objectFit="cover"
            height="400px"
            width="100%"
          />
          <Flex mt="2">
            {additionalImages.map((image, index) => (
              <Box
                key={index}
                onClick={() => handleImageChange(image)}
                cursor="pointer"
                mx="1"
              >
                <Image
                  src={image}
                  alt={`Product Image ${index}`}
                  objectFit="cover"
                  height="60px"
                  width="60px"


                  alignSelf="center"
                />
              </Box>
            ))}
          </Flex>
        </Box>
        <Box width={{ base: "100%", md: "50%" }} pl={{ base: "0", md: "4" }}>
          <Text
            fontWeight="bold"
            fontSize="3xl"
            mb="2"
            color="teal.500"
            fontStyle="italic"
          >
            Classic Oxford Shirt
          </Text>
          <Text mb="4" fontStyle="italic">
            Elevate your style with this classic oxford shirt for men. Crafted
            from high-quality cotton fabric, it offers comfort and durability.
            The timeless design features a button-down collar and a single chest
            pocket. Whether for a formal occasion or a smart-casual look, this
            oxford shirt is a versatile choice that pairs well with trousers or
            jeans.
          </Text>
          <Text fontWeight="bold" color="teal.500" mb="2">
            Brand: Brooks Brothers
          </Text>
          <Text fontWeight="bold" fontSize="2xl" mb="2" color="teal.500">
            $89.99
          </Text>
          <Flex alignItems="center" mb="2">
            <Text textDecoration="line-through" mr="2" color="gray.500">
              $104.99
            </Text>
            <Text fontWeight="bold" color="teal.500">
              Save $15.00
            </Text>
          </Flex>
          <Text mb="2" color="gray.500" fontStyle="italic">
            Elevate your style with this classic oxford shirt for men. Crafted from
            high-quality cotton fabric, it offers comfort and durability. The
            timeless design features a button-down collar and a single chest pocket.
            Whether for a formal occasion or a smart-casual look, this oxford shirt
            is a versatile choice that pairs well with trousers or jeans.
          </Text>
          <Flex alignItems="center" justifyContent="space-between" mb="2">
            <Text fontWeight="bold" fontSize="2xl" fontStyle="italic">
              Sizes:
            </Text>
            <Flex alignItems="center">
              {["S", "M", "L", "XL"].map((option, index) => (
                <Box
                  key={index}
                  onClick={() => setSelectedSize(option)}
                  cursor="pointer"
                  mx="1"
                  borderRadius="full"
                  border="1px solid"
                  borderColor="gray.400"
                  px="3"
                  py="1"
                  fontWeight="bold"
                  fontSize="lg"
                  textTransform="uppercase"
                  color={selectedSize === option ? "white" : "gray.500"}
                  bg={selectedSize === option ? "teal.500" : "transparent"}
                  _hover={{ bg: "teal.500", color: "white" }}
                >
                  {option}
                </Box>
              ))}
            </Flex>
            <Button
              colorScheme="teal"
              size="sm"
              leftIcon={<FiShoppingBag />}
              onClick={handleAddToCart}
              isLoading={isLoading}
              loadingText="Adding..."
              _hover={{ opacity: "0.8" }}
              fontStyle="italic"
            >
              Add to Cart
            </Button>
          </Flex>
          <IconButton
            icon={<FiHeart />}
            color={heartColor}
            size="md"
            aria-label="Add to Wishlist"
          />
        </Box>
      </Flex>
      <Box bg="gray.200" p="4" mt="4" borderRadius="md" textAlign="center">
        <Text

 fontSize="sm" color="gray.500" mb="2" fontStyle="italic">
          Delivery within 2-3 business days
        </Text>
        <Text fontSize="sm" color="gray.500" mb="2" fontStyle="italic">
          Free returns within 30 days of purchase
        </Text>
        <Text fontSize="xs" color="gray.500" mb="2" fontStyle="italic">
          Terms and Conditions: Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Fusce maximus blandit massa, vitae tempus neque vulputate sed. Nam
          consequat, ex id semper gravida, leo mauris venenatis sem, id varius turpis
          tortor non turpis.
        </Text>
      </Box>
    </Box>
  );
};

export default SingleProduct;
