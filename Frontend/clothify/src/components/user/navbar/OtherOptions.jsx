import { Box, Flex, Tooltip } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsBagHeartFill, BsCart2 } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleGetCartData } from "../../../redux/User_Redux/cart/action";
import { handleGetOrderData } from "../../../redux/User_Redux/order/action";
import { handleWishlistCartData } from "../../../redux/User_Redux/wishlist/action";
import { getQuantity } from "../../../utils/getquanity";

const OtherOptions = () => {
  const { cartData } = useSelector((store) => store.cartReducer);
  const { wishlistData } = useSelector((store) => store.wishlistReducer);
  const { orderData } = useSelector((store) => store.orderReducer);
  const { isAuth } = useSelector((store) => store.authReducer);

  const dispatch = useDispatch();
  const totalCartQunatity = getQuantity(cartData);
  const totalWishlistQunatity = getQuantity(wishlistData);
  useEffect(() => {
    if (isAuth) {
      dispatch(handleGetCartData());
      dispatch(handleWishlistCartData());
      dispatch(handleGetOrderData());
    }
  }, [isAuth]);
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
              {isAuth && totalCartQunatity ? totalCartQunatity : 0}
            </Box>
          </Flex>
        </Link>
      </Tooltip>
      <Tooltip label="Wishlist" hasArrow placement="top">
        <Link to={"/wishlist"}>
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
              {isAuth && totalWishlistQunatity ? totalWishlistQunatity : 0}
            </Box>
          </Flex>
        </Link>
      </Tooltip>

      <Tooltip label="Order" hasArrow placement="top">
        <Link to={"/orderhistory"}>
          <Flex position="relative" alignItems="center" justifyContent="center">
            <FaShoppingBag size={30} color="teal" />
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
              {isAuth && orderData.length ? orderData.length : 0}
            </Box>
          </Flex>
        </Link>
      </Tooltip>
    </Box>
  );
};

export default OtherOptions;
