import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { handlesingleproduct } from "../utils/handlesingleproduct";
import LoadingSpinner from "../components/spinner/Spinner";

const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState(null);
  const heartColor = useColorModeValue("red.500", "red.200");
  const [selectedSize, setSelectedSize] = useState("");

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

  useEffect(() => {
    window.scrollTo(0, 0);
    handlesingleproduct(id).then((res) => {
      setData(res);
      setMainImage(res?.images?.[0] || null);
      setAdditionalImages(res?.images);
      setSelectedSize(res?.sizes?.[0] || "");
    });
  }, [id]);

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <Box p="4">
      <Flex flexWrap="wrap" justifyContent="center" alignItems="center" mb="4">
        <Box width={{ base: "100%", md: "50%" }} pr={{ base: "0", md: "4" }}>
          <Image
            src={mainImage}
            alt="Product"
            objectFit="contain"
            width="50%"
            mx="auto"
            boxShadow="md"
            borderRadius="md"
          />
          <Flex
            mt="2"
            alignItems="center"
            height="80px"
            justifyContent="center"
          >
            {additionalImages.map((image, index) => (
              <Box
                key={index}
                onClick={() => handleImageChange(image)}
                cursor="pointer"
                mx="1"
                borderRadius="full"
                border="1px solid"
                borderColor="gray.400"
                p="1"
                bg="white"
                _hover={{ transform: "scale(1.1)" }}
              >
                <Image
                  src={image}
                  alt={`Product Image ${index}`}
                  objectFit="cover"
                  height="60px"
                  width="60px"
                  borderRadius="full"
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
            {data.title}
          </Text>
          <Text mb="4" fontStyle="italic">
            {data.description}
          </Text>
          <Text fontWeight="bold" color="teal.500" mb="2">
            Brand: {data.brand}
          </Text>
          <Text fontWeight="bold" fontSize="2xl" mb="2" color="teal.500">
            $ {data.price}
          </Text>
          <Flex alignItems="center" mb="2">
            <Text
              textDecoration="line-through"
              mr="2"
              color="gray.500"
              fontWeight="bold"
            >
              $104.99
            </Text>
            <Text fontWeight="bold" color="teal.500">
              Save $15.00
            </Text>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between" mb="2">
            <Text fontWeight="bold" fontSize="2xl" fontStyle="italic">
              Sizes:
            </Text>
            <Flex alignItems="center">
              {data?.sizes?.map((option, index) => (
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
              boxShadow="sm"
              borderRadius="md"
            >
              Add to Cart
            </Button>
          </Flex>
          <IconButton
            icon={<FiHeart />}
            color={heartColor}
            size="md"
            aria-label="Add to Wishlist"
            _hover={{ transform: "scale(1.2)" }}
          />
        </Box>
      </Flex>
      <Box bg="gray.200" p="4" mt="4" borderRadius="md" textAlign="center">
        <Text fontSize="sm" color="gray.500" mb="2" fontStyle="italic">
          Delivery within 2-3 business days
        </Text>
        <Text fontSize="sm" color="gray.500" mb="2" fontStyle="italic">
          Free returns within 30 days of purchase
        </Text>
        <Text fontSize="xs" color="gray.500" mb="2" fontStyle="italic">
          Terms and Conditions: Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Fusce maximus blandit massa, vitae tempus neque
          vulputate sed. Nam consequat, ex id semper gravida, leo mauris
          venenatis sem, id varius turpis tortor non turpis.
        </Text>
      </Box>
    </Box>
  );
};

export default SingleProduct;
