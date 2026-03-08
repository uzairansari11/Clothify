import React, { useState } from "react";
import {
  Box,
  Badge,
  Button,
  Flex,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const WishlistCard = ({
  images,
  title,
  quantity,
  size,
  handleRemoveItem,
  _id,
  productId,
  handleAddToCart,
  brand,
  discount,
  subcategory,
  category,
  price,
}) => {
  const payload = {
    title,
    category,
    subcategory,
    brand,
    price,
    discount,
    images,
    quantity: 1,
    size,
    productId: _id,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteWishlist = (id) => {
    setIsModalOpen(false);
    handleRemoveItem(id);
  };

  // Color mode values
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = "accent.subtle";
  const cardShadow = useColorModeValue(
    "0 2px 12px rgba(128, 90, 213, 0.08)",
    "0 2px 12px rgba(0,0,0,0.4)"
  );
  const imageBg = useColorModeValue("gray.50", "gray.700");
  const titleColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const brandColor = "accent.text";
  const priceColor = "accent.text";
  const metaColor = useColorModeValue("gray.500", "gray.400");
  const modalBg = useColorModeValue("white", "gray.800");
  const modalBodyColor = useColorModeValue("gray.600", "gray.300");
  const modalHeaderColor = useColorModeValue("gray.800", "whiteAlpha.900");

  return (
    <Box
      bg={cardBg}
      borderWidth="1px"
      borderColor={cardBorder}
      borderRadius="2xl"
      p={{ base: 3, sm: 4 }}
      width="100%"
      mb={4}
      boxShadow={cardShadow}
      transition="box-shadow 0.2s ease, transform 0.2s ease"
      _hover={{ boxShadow: "0 4px 20px rgba(128, 90, 213, 0.18)", transform: "translateY(-1px)" }}
    >
      <Flex gap={{ base: 3, sm: 4 }} align="flex-start">
        {/* Product Image */}
        <Link to={`/product/${productId}`}>
          <Box
            bg={imageBg}
            borderRadius="xl"
            overflow="hidden"
            flexShrink={0}
            w={{ base: "90px", sm: "120px" }}
            h={{ base: "90px", sm: "120px" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={images?.[0]}
              alt={title}
              w="100%"
              h="100%"
              objectFit="contain"
              transition="transform 0.25s ease"
              _hover={{ transform: "scale(1.05)" }}
            />
          </Box>
        </Link>

        {/* Details */}
        <Flex flex="1" direction="column" gap={1.5} minW={0}>
          {/* Brand */}
          {brand && (
            <Text
              fontSize="xs"
              fontWeight="600"
              color={brandColor}
              textTransform="uppercase"
              letterSpacing="0.8px"
            >
              {brand}
            </Text>
          )}

          {/* Title */}
          <Link to={`/product/${productId}`}>
            <Text
              fontWeight="700"
              fontSize={{ base: "sm", sm: "md" }}
              color={titleColor}
              noOfLines={2}
              lineHeight="1.4"
              _hover={{ color: "accent.solid" }}
              transition="color 0.15s"
            >
              {title}
            </Text>
          </Link>

          {/* Price row */}
          <Flex align="center" gap={3} flexWrap="wrap" mt={0.5}>
            <Text
              fontWeight="800"
              fontSize={{ base: "md", sm: "lg" }}
              color={priceColor}
              letterSpacing="-0.5px"
            >
              ₹{Number(price).toLocaleString("en-IN")}
            </Text>
            {discount > 0 && (
              <Badge colorScheme="green" borderRadius="md" fontSize="xs" px={2}>
                {discount}% off
              </Badge>
            )}
          </Flex>

          {/* Size */}
          <HStack spacing={2} mt={0.5}>
            <Text fontSize="xs" color={metaColor} fontWeight="500">
              Size:
            </Text>
            <Badge
                            variant="subtle"
              borderRadius="md"
              px={2}
              fontSize="xs"
              fontWeight="600"
              textTransform="uppercase"
              letterSpacing="0.5px"
            >
              {size}
            </Badge>
          </HStack>

          {/* Action buttons */}
          <HStack spacing={2} mt={{ base: 2, sm: 3 }}>
            <Tooltip label="Add to Cart" placement="top" hasArrow>
              <Button
                leftIcon={<AiOutlineShoppingCart size={15} />}
                size="sm"
                borderRadius="lg"
                fontWeight="600"
                onClick={() => handleAddToCart(payload)}
                flex="1"
                maxW="160px"
                _hover={{ transform: "translateY(-1px)", boxShadow: "md" }}
                transition="all 0.2s"
              >
                Add to Cart
              </Button>
            </Tooltip>

            <Tooltip label="Remove from Wishlist" placement="top" hasArrow>
              <IconButton
                icon={<AiFillHeart size={16} />}
                colorScheme="red"
                variant="outline"
                size="sm"
                borderRadius="lg"
                onClick={() => setIsModalOpen(true)}
                aria-label="Remove from wishlist"
                _hover={{ bg: "red.50", transform: "translateY(-1px)" }}
                transition="all 0.2s"
              />
            </Tooltip>
          </HStack>
        </Flex>
      </Flex>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(4px)" />
        <ModalContent
          bg={modalBg}
          borderRadius="2xl"
          mx={4}
          boxShadow="2xl"
          overflow="hidden"
        >
          <Box h="3px" bg="linear-gradient(90deg, #805AD5, #B794F4)" />
          <ModalHeader
            fontSize="lg"
            fontWeight="700"
            color={modalHeaderColor}
            pb={2}
          >
            Remove from Wishlist?
          </ModalHeader>
          <ModalCloseButton top={4} />
          <ModalBody color={modalBodyColor} fontSize="sm" pb={4}>
            Are you sure you want to remove{" "}
            <Text as="span" fontWeight="600" color={titleColor}>
              {title}
            </Text>{" "}
            from your wishlist?
          </ModalBody>
          <ModalFooter gap={2} pt={2}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              borderRadius="lg"
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => handleDeleteWishlist(_id)}
              borderRadius="lg"
              fontWeight="600"
            >
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default WishlistCard;
