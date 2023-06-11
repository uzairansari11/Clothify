import { useState } from "react";
import { Box, Flex, Image, Text, Tooltip, Select } from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineDollar, AiOutlineTag } from "react-icons/ai";
import { Link } from 'react-router-dom';

const CartItemCard = ({ images, quantity, size, title, price, _id, productId, handleRemoveItem }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    console.log(newQuantity)
  
    setSelectedQuantity(newQuantity);
  };

  const handleDelete = (id) => {
    handleRemoveItem(id);
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
        <Link to={`/product/${productId}`}>
          <Image
            src={images?.[0]}
            alt={title}
            boxSize={{ base: "120px", sm: "150px" }}
            objectFit="contain"
            mb={{ base: 4, sm: 0 }}
            transition="transform 0.3s ease"
            _hover={{ transform: "scale(1.1)", cursor: 'pointer' }}
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
                onChange={handleQuantityChange}
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
                    onClick={() => handleDelete(_id)}
                  />
                </Box>
              </Tooltip>
            </Flex>
          </Flex>

        </Box>
      </Flex>
    </Box>
  );
};

export default CartItemCard;
