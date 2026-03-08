import {
  Box,
  Flex,
  IconButton,
  Image,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleAddToCartData } from "../../../redux/User_Redux/cart/action";
import { handleAddToWishlistData } from "../../../redux/User_Redux/wishlist/action";

const MotionBox = motion(Box);

const CardItem = ({
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
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || "");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.authReducer);
  // --- All useColorModeValue calls at top level ---
  const cardHoverBg = useColorModeValue("accent.bg", "gray.750");
  const cardBaseBg = useColorModeValue("white", "gray.800");
  const titleColor = useColorModeValue("gray.800", "gray.100");
  const brandColor = "accent.text";
  const priceColor = useColorModeValue("gray.900", "white");
  const strikePriceColor = useColorModeValue("gray.400", "gray.500");
  const ratingColor = useColorModeValue("gray.500", "gray.300");
  const ratingStarColor = useColorModeValue("yellow.500", "yellow.400");
  const iconColor = useColorModeValue("gray.400", "gray.400");
  const iconHoverColor = "accent.text";
  const saleTextColor = useColorModeValue("white", "white");
  const saleBg = useColorModeValue("gray.900", "accent.solid");
  const activeSizeColor = "accent.text";
  const inactiveSizeColor = useColorModeValue("gray.600", "gray.300");
  const separatorColor = useColorModeValue("gray.200", "gray.600");
  const gradientLineStart = useColorModeValue("var(--chakra-colors-accent-solid)", "var(--chakra-colors-accent-solid)");

  // Resolved background for hover tint (used in style prop, not sx)
  const resolvedCardBg = isHovered ? cardHoverBg : cardBaseBg;

  // --- Derived values ---
  const safeDiscount = Math.min(Math.max(discount || 0, 0), 90);
  const originalPrice =
    safeDiscount > 0 ? Math.round(price / (1 - safeDiscount / 100)) : null;

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

  // --- Handlers ---
  const handleAddToCart = () => {
    if (!isAuth) {
      toast.error("Please login first");
      return;
    }
    setIsCartLoading(true);
    dispatch(handleAddToCartData(payload)).then(() => setIsCartLoading(false));
  };

  const handleAddToWishlist = () => {
    if (!isAuth) {
      toast.error("Please login first");
      return;
    }
    setIsWishlistLoading(true);
    dispatch(handleAddToWishlistData(payload)).then(() => {
      setIsWishlistLoading(false);
      setIsWishlisted(true);
    });
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      bg={resolvedCardBg}
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      border="1px solid"
      borderColor={useColorModeValue("gray.100", "gray.700")}
      sx={{ transition: "all 0.3s ease" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      cursor="default"
    >
      {/* ── IMAGE SECTION ── */}
      <Box position="relative" overflow="hidden">
        <Link to={`/product/${_id}`}>
          <Image
            src={images?.[0]}
            alt={title}
            width="100%"
            height={{ base: "220px", md: "260px" }}
            objectFit="cover"
            borderRadius="0"
            style={{
              transform: isHovered ? "scale(1.03)" : "scale(1)",
              transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
              display: "block",
            }}
          />
        </Link>

        {/* SALE text overlay — top-right, minimal */}
        {safeDiscount > 0 && (
          <Box
            position="absolute"
            top={3}
            right={3}
            pointerEvents="none"
          >
            <Text
              fontSize="9px"
              fontWeight="700"
              color={saleTextColor}
              letterSpacing="2.5px"
              textTransform="uppercase"
              bg={saleBg}
              px={2}
              py={1}
              borderRadius="sm"
              lineHeight="1.4"
            >
              SALE
            </Text>
          </Box>
        )}
      </Box>

      {/* ── GRADIENT SEPARATOR LINE ── */}
      <Box
        height="2px"
        style={{
          background: `linear-gradient(to right, ${gradientLineStart}, transparent)`,
        }}
      />

      {/* ── CONTENT SECTION ── */}
      <Box px={3} pt={3} pb={3}>
        {/* Brand — bare uppercase text, no pill */}
        <Text
          fontSize="9px"
          fontWeight="700"
          color={brandColor}
          textTransform="uppercase"
          letterSpacing="2px"
          mb={1}
          lineHeight="1"
        >
          {brand}
        </Text>

        {/* Title */}
        <Link to={`/product/${_id}`}>
          <Text
            fontWeight="500"
            fontSize="sm"
            color={titleColor}
            noOfLines={1}
            lineHeight="1.5"
            mb={2}
            letterSpacing="-0.1px"
          >
            {title}
          </Text>
        </Link>

        {/* Price row */}
        <Flex align="baseline" gap={2} mb={1.5}>
          <Text
            fontWeight="700"
            fontSize="sm"
            color={priceColor}
            letterSpacing="-0.3px"
            lineHeight="1"
          >
            ${price}
          </Text>

          {originalPrice && (
            <Text
              fontSize="xs"
              color={strikePriceColor}
              textDecoration="line-through"
              fontWeight="400"
              lineHeight="1"
            >
              ${originalPrice}
            </Text>
          )}

          {safeDiscount > 0 && (
            <Text
              fontSize="10px"
              fontWeight="500"
              color="green.500"
              lineHeight="1"
            >
              {safeDiscount}% off
            </Text>
          )}
        </Flex>

        {/* Rating */}
        <Flex align="center" gap={1} mb={2.5}>
          <Text fontSize="11px" color={ratingStarColor} lineHeight="1">★</Text>
          <Text fontSize="11px" color={ratingColor} fontWeight="500" lineHeight="1">
            {rating} ({total_rating})
          </Text>
        </Flex>

        {/* Sizes — plain clickable text, no boxes */}
        {sizes?.length > 0 && (
          <Flex gap={3} align="center" mb={3} flexWrap="wrap">
            {sizes.slice(0, 6).map((option, index) => (
              <Text
                key={index}
                as="button"
                onClick={() => setSelectedSize(option)}
                fontSize="11px"
                fontWeight={selectedSize === option ? "600" : "400"}
                color={
                  selectedSize === option ? activeSizeColor : inactiveSizeColor
                }
                letterSpacing="0.5px"
                textDecoration={selectedSize === option ? "underline" : "none"}
                textUnderlineOffset="3px"
                textDecorationThickness="1.5px"
                lineHeight="1"
                transition="color 0.15s ease"
                _hover={{ color: activeSizeColor }}
                cursor="pointer"
                bg="transparent"
                border="none"
                p={0}
              >
                {option}
              </Text>
            ))}
          </Flex>
        )}

        {/* Bottom: two icon buttons separated by a thin vertical line */}
        <Flex align="center" gap={0}>
          <IconButton
            aria-label="Add to cart"
            icon={isCartLoading ? <Spinner size="xs" /> : <FiShoppingBag size={15} />}
            size="sm"
            variant="ghost"
            color={iconColor}
            borderRadius="full"
            _hover={{ color: iconHoverColor, bg: "transparent" }}
            onClick={handleAddToCart}
            isDisabled={isCartLoading}
            p={1}
            minW="32px"
            h="32px"
          />

          {/* Thin vertical separator */}
          <Box
            height="16px"
            width="1px"
            bg={separatorColor}
            mx={1}
            flexShrink={0}
          />

          <IconButton
            aria-label="Add to wishlist"
            icon={
              isWishlistLoading ? (
                <Spinner size="xs" />
              ) : (
                <FiHeart
                  size={15}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              )
            }
            size="sm"
            variant="ghost"
            color={isWishlisted ? "red.400" : iconColor}
            borderRadius="full"
            _hover={{ color: isWishlisted ? "red.500" : iconHoverColor, bg: "transparent" }}
            onClick={handleAddToWishlist}
            isDisabled={isWishlistLoading}
            p={1}
            minW="32px"
            h="32px"
          />
        </Flex>
      </Box>
    </MotionBox>
  );
};

export default React.memo(CardItem);
