import React, { useState } from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  IconButton,
  Tooltip,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      width="100%"
      marginBottom={4}
          bg="white"
      maxH="200px"
    >
      <Flex align="center" h="100%">
        <Link to={`/product/${productId}`}>
          <Image
            src={images?.[0]}
            alt={title}
            boxSize="100px"
            objectFit="contain"
            mr={4}
          />
        </Link>
        <Flex flex="1" direction="column">
          <Text fontWeight="bold" fontSize="xl" mb={2}>
            {title}
          </Text>
          {/* <Text mb={2}>Quantity: {quantity}</Text> */}
          <Text mb={2}>Size: {size}</Text>
          <Flex justify="space-between" mt="auto">
            <Tooltip label="Add to Cart" aria-label="Add to Cart">
              <IconButton
                icon={<AiOutlineShoppingCart />}
                colorScheme="teal"
                variant="outline"
                onClick={() => handleAddToCart(payload)}
              />
            </Tooltip>
            <Tooltip
              label="Remove from Wishlist"
              aria-label="Remove from Wishlist"
            >
              <IconButton
                icon={<AiFillHeart />}
                colorScheme="red"
                variant="outline"
                onClick={() => setIsModalOpen(true)}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove from Wishlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to remove this item from your wishlist?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => handleDeleteWishlist(_id)}>
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default WishlistCard;
