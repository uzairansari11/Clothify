import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineDollar,
  AiOutlineTag,
} from "react-icons/ai";
import { FiMinus, FiPlus } from "react-icons/fi";
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
  // Color mode values
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = "accent.subtle";
  const cardShadow = useColorModeValue(
    "0 2px 12px rgba(128, 90, 213, 0.08)",
    "0 2px 12px rgba(0,0,0,0.4)"
  );
  const titleColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const metaColor = useColorModeValue("gray.500", "gray.400");
  const priceColor = "accent.text";
  const qtyBg = "accent.bg";
  const qtyBorder = "accent.subtle";
  const qtyText = useColorModeValue("accent.text", "accent.bg");
  const modalBg = useColorModeValue("white", "gray.800");
  const modalHeaderColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const modalBodyColor = useColorModeValue("gray.600", "gray.300");
  const imageBg = useColorModeValue("gray.50", "gray.700");

  const handleQuantityDecrement = () => {
    if (selectedQuantity <= 1) return;
    const newQuantity = selectedQuantity - 1;
    const payload = { quantity: newQuantity };
    handleQuantityChange(_id, payload);
    setSelectedQuantity(newQuantity);
  };

  const handleQuantityIncrement = () => {
    if (selectedQuantity >= 10) return;
    const newQuantity = selectedQuantity + 1;
    const payload = { quantity: newQuantity };
    handleQuantityChange(_id, payload);
    setSelectedQuantity(newQuantity);
  };

  const handleDelete = (id) => {
    handleRemoveItem(id);
    setIsModalOpen(false);
  };

  useEffect(() => {}, [selectedQuantity]);

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
        <Flex flex="1" direction="column" gap={2} minW={0}>
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

          {/* Price + Size row */}
          <HStack spacing={3} flexWrap="wrap">
            <Flex align="center" gap={1}>
              <Box color={metaColor} fontSize="sm">
                <AiOutlineDollar />
              </Box>
              <Text
                fontWeight="800"
                fontSize={{ base: "md", sm: "lg" }}
                color={priceColor}
                letterSpacing="-0.5px"
              >
                ₹{Number(price).toLocaleString("en-IN")}
              </Text>
            </Flex>

            <Flex align="center" gap={1}>
              <Box color={metaColor} fontSize="sm">
                <AiOutlineTag />
              </Box>
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
            </Flex>
          </HStack>

          {/* Quantity controls + Delete */}
          <Flex
            align="center"
            justify="space-between"
            mt={{ base: 1, sm: 2 }}
            flexWrap="wrap"
            gap={2}
          >
            {/* +/- Quantity Selector */}
            <HStack
              spacing={0}
              bg={qtyBg}
              borderWidth="1px"
              borderColor={qtyBorder}
              borderRadius="lg"
              overflow="hidden"
            >
              <IconButton
                icon={<FiMinus size={12} />}
                size="sm"
                variant="ghost"
                                borderRadius="none"
                onClick={handleQuantityDecrement}
                isDisabled={selectedQuantity <= 1}
                aria-label="Decrease quantity"
                _hover={{ bg: "accent.subtle" }}
                h="32px"
                minW="32px"
              />
              <Box
                px={3}
                py={1}
                borderX="1px"
                borderColor={qtyBorder}
              >
                <Text
                  fontSize="sm"
                  fontWeight="700"
                  color={qtyText}
                  minW="16px"
                  textAlign="center"
                >
                  {selectedQuantity}
                </Text>
              </Box>
              <IconButton
                icon={<FiPlus size={12} />}
                size="sm"
                variant="ghost"
                                borderRadius="none"
                onClick={handleQuantityIncrement}
                isDisabled={selectedQuantity >= 10}
                aria-label="Increase quantity"
                _hover={{ bg: "accent.subtle" }}
                h="32px"
                minW="32px"
              />
            </HStack>

            {/* Delete button */}
            <Tooltip label="Remove item" placement="top" hasArrow>
              <IconButton
                icon={<AiOutlineDelete size={17} />}
                size="sm"
                variant="ghost"
                colorScheme="red"
                borderRadius="lg"
                onClick={() => setIsModalOpen(true)}
                aria-label="Delete item"
                _hover={{ bg: "red.50", color: "red.600" }}
              />
            </Tooltip>
          </Flex>
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
            Remove from Cart?
          </ModalHeader>
          <ModalBody color={modalBodyColor} fontSize="sm" pb={4}>
            Are you sure you want to remove{" "}
            <Text as="span" fontWeight="600" color={titleColor}>
              {title}
            </Text>{" "}
            from your cart? This action cannot be undone.
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
              onClick={() => handleDelete(_id)}
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

export default CartItemCard;
