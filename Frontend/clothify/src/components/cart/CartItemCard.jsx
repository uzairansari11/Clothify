import { Box, Flex, Image, IconButton, Text, Tooltip } from "@chakra-ui/react";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineDelete,
  AiOutlineDollar,
  AiOutlineTag,
} from "react-icons/ai";


const CartItemCard = ({ images, quantity, size, title, price, _id, handleRemoveItem }) => {

  const handleIncreaseQuantity = () => {
    // Logic to increase quantity
  };

  const handleDecreaseQuantity = () => {
    // Logic to decrease quantity
  };

  const handleDelete = (id) => {
    handleRemoveItem(id)
    
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      width="100%"
      marginBottom={4}
      boxShadow="lg"
      _hover={{
        boxShadow: "xl",
        transform: "scale(1.02)",
        transition: "transform 0.3s ease",
      }}
      bg="white"
    >
      <Flex flexWrap="wrap" justifyContent="space-between">
        <Image
          src={images?.[0]}
          alt={title}
          boxSize={{ base: "120px", sm: "150px" }}
          objectFit="cover"
          mb={{ base: 4, sm: 0 }}
          transition="transform 0.3s ease"
          _hover={{ transform: "scale(1.1)" }}
        />
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
              <IconButton
                icon={<AiOutlineMinus />}
                onClick={handleDecreaseQuantity}
                aria-label="Decrease Quantity"
                mr={2}
                colorScheme="teal"
                size="md"
              />
              <Text fontWeight="bold" fontSize="lg">
                {quantity}
              </Text>
              <IconButton
                icon={<AiOutlinePlus />}
                onClick={handleIncreaseQuantity}
                aria-label="Increase Quantity"
                ml={2}
                colorScheme="green"
                size="md"
              />
              <IconButton
                icon={<AiOutlineDelete />}
                onClick={() => handleDelete(_id)}
                aria-label="Delete Item"
                ml={4}
                colorScheme="red"
                size="md"
              />
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default CartItemCard;
