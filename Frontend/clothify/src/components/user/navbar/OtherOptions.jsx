import { Flex, Tooltip, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FiHeart, FiPackage, FiShoppingBag } from "react-icons/fi";
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
  const totalCartQuantity = getQuantity(cartData);
  const totalWishlistQuantity = getQuantity(wishlistData);

  const iconColor = useColorModeValue("gray.600", "gray.300");
  const hoverColor = "accent.text";
  const badgeBg = "accent.solid";
  const hoverBg = "accent.bg";

  useEffect(() => {
    if (isAuth) {
      dispatch(handleGetCartData());
      dispatch(handleWishlistCartData());
      dispatch(handleGetOrderData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  const navItems = [
    { label: "Cart", to: "/cart", icon: FiShoppingBag, count: isAuth ? totalCartQuantity : 0 },
    { label: "Wishlist", to: "/wishlist", icon: FiHeart, count: isAuth ? totalWishlistQuantity : 0 },
    { label: "Orders", to: "/orderhistory", icon: FiPackage, count: isAuth && orderData?.length ? orderData.length : 0 },
  ];

  return (
    <Flex align="center" gap={1} width="100%" justify="center">
      {navItems.map((item) => (
        <Tooltip key={item.label} label={item.label} hasArrow placement="bottom">
          <Link to={item.to}>
            <Flex
              position="relative"
              align="center"
              justify="center"
              w="36px"
              h="36px"
              borderRadius="lg"
              color={iconColor}
              _hover={{ color: hoverColor, bg: hoverBg }}
              transition="all 0.2s"
            >
              <item.icon size={18} />
              {item.count > 0 && (
                <Flex
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  bg={badgeBg}
                  borderRadius="full"
                  w="16px"
                  h="16px"
                  align="center"
                  justify="center"
                  fontSize="9px"
                  fontWeight="700"
                  color="white"
                >
                  {item.count}
                </Flex>
              )}
            </Flex>
          </Link>
        </Tooltip>
      ))}
    </Flex>
  );
};

export default OtherOptions;
