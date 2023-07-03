import {
  Badge,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Select,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { handleAddToCartData } from "../../../redux/User_Redux/cart/action";
import { handleAddToWishlistData } from "../../../redux/User_Redux/wishlist/action";

const CartItem = ({
  title,
  brand,
  price,
  discount,
  rating,
  total_rating,
  images,
  sizes,
  _id,
  category,
  subcategory,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const heartColor = useColorModeValue("red.500", "red.200");
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.authReducer);
  const toast = useToast();
  const payload = {
    title,
    category,
    subcategory,
    brand,
    price,
    discount,
    images,
    quantity: 1,
    size: selectedSize,
    productId: _id,
  };

  const handleAddToCart = () => {
    if (!isAuth) {
      toast({
        title: `Please Login First`,
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setIsCartLoading(true);
    setTimeout(() => {
      dispatch(handleAddToCartData(payload));
      setIsCartLoading(false);
    }, 300);
  };

  const handleAddToWishlist = () => {
    if (!isAuth) {
      toast({
        title: `Please Login First`,
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setIsWishlistLoading(true);
    setTimeout(() => {
      dispatch(handleAddToWishlistData(payload));
      setIsWishlistLoading(false);
    }, 300);
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      bg={isHovered ? "gray.100" : "white"}
      boxShadow={isHovered ? "md" : "none"}
      transition="background-color 0.3s, box-shadow 0.3s"
    >
      <Link to={`/product/${_id}`}>
        <Image
          src={isHovered ? images[1] : images[0]}
          alt="Product"
          width="100%"
          height="300px"
          objectFit="contain"
        />
      </Link>
      <Box p="4" textAlign="center">
        <Badge colorScheme="teal" fontWeight="semibold" fontSize="sm" mb="2">
          {brand}
        </Badge>
        <Text
          fontWeight="semibold"
          fontSize="lg"
          mb="2"
          color={isHovered ? "teal.500" : "black"}
        >
          {title}
        </Text>
        <Flex alignItems="center" justifyContent="space-between" mb="2">
          <Flex alignItems="center">
            <Text fontWeight="semibold" fontSize="lg" mr="1">
              $ {price}
            </Text>
            <Text fontSize="sm" color="gray.500">
              ({discount}% off)
            </Text>
          </Flex>
          <Flex alignItems="center">
            <Text fontSize="sm" fontWeight="bold" mr="1" color="gray.500">
              Rating:
            </Text>
            <Box as="span" color="yellow.400">
              {rating}
            </Box>
            <Box as="span" color="gray.500" ml="1">
              ({total_rating})
            </Box>
          </Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" mb="2">
          <Flex alignItems="center">
            <Text fontSize="sm" fontWeight="bold" mr="1" color="gray.500">
              Sizes:
            </Text>
            <Select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              size="sm"
              width="auto"
              mr="1"
              variant="outline"
              colorScheme="teal"
              borderRadius="md"
            >
              {sizes.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Flex>
          <Button
            colorScheme="teal"
            size="sm"
            leftIcon={<FiShoppingBag />}
            onClick={handleAddToCart}
            isLoading={isCartLoading}
            loadingText="Adding..."
            _hover={{ opacity: "0.8" }}
          >
            Add to Cart
          </Button>
        </Flex>
        <IconButton
          icon={isWishlistLoading ? <Spinner size="sm" /> : <FiHeart />}
          color={heartColor}
          size="md"
          aria-label="Add to Wishlist"
          position="absolute"
          top="2"
          right="2"
          opacity={isHovered ? "1" : "0"}
          transition="opacity 0.3s"
          onClick={handleAddToWishlist}
          disabled={isWishlistLoading}
        />
      </Box>
    </Box>
  );
};

export default CartItem;
