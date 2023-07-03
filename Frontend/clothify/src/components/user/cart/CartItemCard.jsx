import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineDollar,
  AiOutlineTag,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const CartItemCard = ({
  images,
  quantity,
  size,
  title,
  price,
  _id,
  productId,
  handleRemoveItem,
  handleQuantityChange,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleQuantity = (e) => {
    const newQuantity = parseInt(e.target.value);
    const payload = { quantity: newQuantity };
    handleQuantityChange(_id, payload);
    setSelectedQuantity(newQuantity);
  };

  const handleDelete = (id) => {
    handleRemoveItem(id);
    setIsModalOpen(false);
  };

  useEffect(() => { }, [selectedQuantity]);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      width="100%"
      marginBottom={4}
      bg="white"
    >
      <Flex flexWrap="wrap" justifyContent="space-between">
        <Link to={`/product/${productId}`}>
          <Image
            src={images?.[0]}
            alt={title}
            boxSize={{ base: "120px", sm: "150px" }}
            objectFit="contain"
            mb={{ base: 4, sm: 0 }}
          />
        </Link>
        <Box ml={4} flex="1">
          <Text fontWeight="bold" fontSize="xl" mb={2} textAlign="left">
            {title}
          </Text>
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <Tooltip label="Price" aria-label="Price">
                <Flex align="center" mr={4}>
                  <AiOutlineDollar size={18} />
                  <Text fontSize="lg" ml={2}>
                    {price}
                  </Text>
                </Flex>
              </Tooltip>
              <Tooltip label="Size" aria-label="Size">
                <Flex align="center">
                  <AiOutlineTag size={18} />
                  <Text fontSize="lg" ml={2}>
                    {size}
                  </Text>
                </Flex>
              </Tooltip>
            </Flex>
            <Flex align="center">
              <Select
                value={selectedQuantity}
                onChange={handleQuantity}
                variant="outline"
                colorScheme="green"
                size="sm"
              >
                {[...Array(10)].map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </Select>
              <Tooltip label="Delete Item" aria-label="Delete Item">
                <Box ml={4}>
                  <AiOutlineDelete
                    size={24}
                    color="red"
                    cursor="pointer"
                    onClick={() => setIsModalOpen(true)}
                  />
                </Box>
              </Tooltip>
            </Flex>
          </Flex>
        </Box>
      </Flex>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this item from your cart?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => handleDelete(_id)}>
              Delete
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CartItemCard;
