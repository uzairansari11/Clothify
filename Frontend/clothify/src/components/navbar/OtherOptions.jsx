import React, { useEffect } from "react";
import { Box, Tooltip, Flex, Text } from "@chakra-ui/react";
import { BsCart2, BsBagHeartFill, BsClipboardData } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { handleGetCartData } from '../../redux/cart/action';

const OtherOptions = () => {
  const { cartData } = useSelector((store) => store.cartReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetCartData());
  }, [])
  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      _hover={{
        cursor: "pointer",
      }}
    >
      <Tooltip label="Cart" hasArrow placement="top">
        <Link to="/cart">
          <Flex position="relative" alignItems="center" justifyContent="center">
            <BsCart2 size={30} color="teal" />
            <Box
              position="absolute"
              top="-6px"
              right="-6px"
              bg="red.500"
              borderRadius="full"
              width="18px"
              height="18px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="xs"
              color="white"
            >
              {cartData?.length > 0 ? cartData.length : 0}
            </Box>
          </Flex>
        </Link>
      </Tooltip>
      <Tooltip label="Favorites" hasArrow placement="top">
        <Flex position="relative" alignItems="center" justifyContent="center">
          <BsBagHeartFill size={30} color="teal" />
          <Box
            position="absolute"
            top="-6px"
            right="-6px"
            bg="red.500"
            borderRadius="full"
            width="18px"
            height="18px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xs"
            color="white"
          >
            5
          </Box>
        </Flex>
      </Tooltip>

      <Tooltip label="Orders" hasArrow placement="top">
        <Flex position="relative" alignItems="center" justifyContent="center">
          <BsClipboardData size={30} color="teal" />
          <Box
            position="absolute"
            top="-6px"
            right="-6px"
            bg="red.500"
            borderRadius="full"
            width="18px"
            height="18px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xs"
            color="white"
          >
            1
          </Box>
        </Flex>
      </Tooltip>
    </Box>
  );
};

export default OtherOptions;
