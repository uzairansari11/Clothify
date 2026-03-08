import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useToast,
  VStack,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  FiHeart,
  FiShoppingBag,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiStar,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/user/spinner/Spinner";
import { handleAddToCartData } from "../redux/User_Redux/cart/action";
import { handleAddToWishlistData } from "../redux/User_Redux/wishlist/action";
import { handlesingleproduct } from "../utils/handlesingleproduct";

const MotionBox = motion(Box);

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const fadeInLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.075,
    },
  }),
};

// ---------------------------------------------------------------------------
// Sub-component: StarRating
// Receives all colors as props — no useColorModeValue inside.
// ---------------------------------------------------------------------------
const StarRating = ({ rating, totalRating, filledColor, emptyColor, mutedColor }) => {
  const clampedRating = Math.min(5, Math.max(0, Math.round(rating || 0)));
  return (
    <HStack spacing="1" align="center">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          as={FiStar}
          boxSize="15px"
          color={i < clampedRating ? filledColor : emptyColor}
          fill={i < clampedRating ? filledColor : "none"}
          strokeWidth={i < clampedRating ? 0 : 1.5}
        />
      ))}
      {rating != null && (
        <Text fontSize="sm" fontWeight="600" color={filledColor} ml="1">
          {Number(rating).toFixed(1)}
        </Text>
      )}
      {totalRating != null && (
        <Text fontSize="xs" color={mutedColor}>
          ({totalRating} {totalRating === 1 ? "review" : "reviews"})
        </Text>
      )}
    </HStack>
  );
};

// ---------------------------------------------------------------------------
// Sub-component: DeliveryInfoRow
// Receives all colors as props — no useColorModeValue inside.
// ---------------------------------------------------------------------------
const DeliveryInfoRow = ({
  icon,
  label,
  value,
  rowBorderColor,
  iconColor,
  iconBg,
  labelColor,
  valueColor,
}) => (
  <Flex align="center" gap="4">
    <Flex
      align="center"
      justify="center"
      boxSize="40px"
      borderRadius="xl"
      bg={iconBg}
      border="1px solid"
      borderColor={rowBorderColor}
      flexShrink={0}
    >
      <Icon as={icon} color={iconColor} boxSize="16px" />
    </Flex>
    <Box>
      <Text
        fontSize="xs"
        fontWeight="800"
        color={labelColor}
        letterSpacing="widest"
        textTransform="uppercase"
        lineHeight="1.4"
      >
        {label}
      </Text>
      <Text fontSize="sm" color={valueColor} lineHeight="1.5">
        {value}
      </Text>
    </Box>
  </Flex>
);

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.authReducer);
  const toast = useToast();

  // ---------------------------------------------------------------------------
  // All color tokens — light / dark mode (ALL at the top, never inside
  // callbacks or .map())
  // ---------------------------------------------------------------------------
  const pageBg            = useColorModeValue("gray.50",    "gray.900");
  const borderColor       = useColorModeValue("gray.200",   "gray.700");
  const titleColor        = useColorModeValue("gray.900",   "white");
  const textColor         = useColorModeValue("gray.700",   "gray.300");
  const mutedColor        = useColorModeValue("gray.500",   "gray.400");
  const priceColor        = "accent.text";
  const strikeThroughColor = useColorModeValue("gray.400",  "gray.500");
  const accentActive      = "accent.text";
  const accentHover       = "accent.text";
  const sizeDefaultBg     = useColorModeValue("white",      "gray.800");
  const sizeDefaultText   = useColorModeValue("gray.700",   "gray.200");
  const sizeHoverBg       = "accent.bg";
  const thumbBg           = useColorModeValue("gray.100",   "gray.700");
  const imagePanelBg      = useColorModeValue("gray.100",   "gray.800");
  const savingsBadgeBg    = useColorModeValue("green.50",   "green.900");
  const savingsBadgeColor = useColorModeValue("green.700",  "green.300");
  const savingsBorderColor = useColorModeValue("green.200", "green.700");
  const brandBadgeBg      = "accent.bg";
  const brandBadgeColor   = "accent.text";
  const catBadgeBg        = useColorModeValue("gray.100",   "gray.700");
  const catBadgeColor     = useColorModeValue("gray.600",   "gray.300");
  const discountOverlayBg = useColorModeValue("rgba(34,197,94,0.15)", "rgba(34,197,94,0.2)");
  const discountOverlayColor = useColorModeValue("green.700", "green.300");
  const discountOverlayBorder = useColorModeValue("green.300", "green.600");
  const deliveryCardBg    = useColorModeValue("accent.bg",  "gray.800");
  const deliveryCardBorder = useColorModeValue("accent.bg", "gray.700");
  const deliveryIconBg    = useColorModeValue("white",      "gray.700");
  const deliveryHeadingColor = "accent.text";
  const starEmptyColor    = useColorModeValue("gray.300",   "gray.600");
  const breadcrumbColor   = useColorModeValue("gray.500",   "gray.400");
  const breadcrumbHighlight = "accent.text";
  const sizeGuideLinkColor = "accent.text";
  const wishlistBorderColor = useColorModeValue("gray.300", "gray.600");
  const taxNoteColor      = useColorModeValue("gray.400",   "gray.500");
  const descLabelColor    = useColorModeValue("gray.400",   "gray.500");
  const cartBtnShadow     = useColorModeValue(
    "0 6px 20px rgba(128,90,213,0.4)",
    "0 6px 20px rgba(167,139,250,0.35)"
  );
  const cartBtnHoverShadow = useColorModeValue(
    "0 10px 30px rgba(128,90,213,0.55)",
    "0 10px 30px rgba(167,139,250,0.45)"
  );

  // ---------------------------------------------------------------------------
  // Handlers — business logic is unchanged
  // ---------------------------------------------------------------------------
  const payload = {
    title:       data?.title,
    category:    data?.category,
    subcategory: data?.subcategory,
    brand:       data?.brand,
    price:       data?.price,
    discount:    data?.discount,
    images:      data?.images,
    quantity:    1,
    size:        selectedSize,
    productId:   data?._id,
  };

  const handleAddToCart = () => {
    if (!isAuth) {
      toast({
        title: "Please Login First",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setIsLoading(true);
    dispatch(handleAddToCartData(payload)).then(() => {
      setTimeout(() => setIsLoading(false), 500);
    });
  };

  const handleAddToWishlist = () => {
    if (!isAuth) {
      toast({
        title: "Please Login First",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setTimeout(() => dispatch(handleAddToWishlistData(payload)), 300);
  };

  const handleImageChange = (image) => {
    setMainImage(image);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    handlesingleproduct(id).then((res) => {
      setData(res);
      setMainImage(res?.images?.[0] || null);
      setAdditionalImages(res?.images);
      setSelectedSize(res?.sizes?.[0] || "");
    });
  }, [id]);

  if (!data) {
    return <LoadingSpinner />;
  }

  // ---------------------------------------------------------------------------
  // Derived display values
  // ---------------------------------------------------------------------------
  const discountPercent = data?.discount ? Math.round(data.discount) : 0;
  const currentPrice    = Number(data?.price || 0);
  const originalPrice   =
    discountPercent > 0
      ? (currentPrice / (1 - discountPercent / 100)).toFixed(2)
      : null;
  const savings =
    originalPrice
      ? (parseFloat(originalPrice) - currentPrice).toFixed(2)
      : null;

  return (
    <Box minH="100vh" bg={pageBg} pt={{ base: "80px", md: "100px" }} pb="20">
      <Box maxW="1280px" mx="auto" px={{ base: "4", md: "8", lg: "12" }}>

        {/* ================================================================ */}
        {/* Main two-column grid                                              */}
        {/* ================================================================ */}
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: "10", lg: "14" }}
          align="flex-start"
        >

          {/* ============================================================== */}
          {/* LEFT — Image gallery                                             */}
          {/* ============================================================== */}
          <MotionBox
            flex="1"
            maxW={{ lg: "520px" }}
            w="100%"
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
          >
            {/* Main image container */}
            <Box
              position="relative"
              bg={imagePanelBg}
              borderRadius="2xl"
              overflow="hidden"
              border="1px solid"
              borderColor={borderColor}
              boxShadow="xl"
            >
              {/* Discount badge — glassmorphism overlay */}
              {discountPercent > 0 && (
                <Box
                  position="absolute"
                  top="4"
                  left="4"
                  zIndex={2}
                  bg={discountOverlayBg}
                  backdropFilter="blur(8px)"
                  border="1px solid"
                  borderColor={discountOverlayBorder}
                  color={discountOverlayColor}
                  fontWeight="800"
                  fontSize="xs"
                  px="3"
                  py="1.5"
                  borderRadius="full"
                  letterSpacing="tight"
                  lineHeight="1"
                >
                  -{discountPercent}% OFF
                </Box>
              )}

              <Image
                src={mainImage}
                alt={data.title}
                objectFit="contain"
                w="100%"
                h={{ base: "340px", md: "500px", lg: "540px" }}
                transition="opacity 0.3s ease"
              />
            </Box>

            {/* Thumbnail strip */}
            {additionalImages && additionalImages.length > 1 && (
              <Flex
                mt="4"
                gap="3"
                overflowX="auto"
                pb="2"
                sx={{ "&::-webkit-scrollbar": { display: "none" } }}
              >
                {additionalImages.map((img, index) => {
                  const isActive = img === mainImage;
                  return (
                    <Box
                      key={index}
                      onClick={() => handleImageChange(img)}
                      cursor="pointer"
                      flexShrink={0}
                      w="72px"
                      h="72px"
                      borderRadius="xl"
                      overflow="hidden"
                      border="2px solid"
                      borderColor={isActive ? accentActive : borderColor}
                      bg={thumbBg}
                      boxShadow={
                        isActive
                          ? "0 0 0 3px rgba(128,90,213,0.25)"
                          : "sm"
                      }
                      transition="all 0.2s ease"
                      _hover={{
                        borderColor: accentHover,
                        transform: "translateY(-2px)",
                        boxShadow: "md",
                      }}
                    >
                      <Image
                        src={img}
                        alt={`Product view ${index + 1}`}
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                    </Box>
                  );
                })}
              </Flex>
            )}
          </MotionBox>

          {/* ============================================================== */}
          {/* RIGHT — Product details                                          */}
          {/* ============================================================== */}
          <MotionBox
            flex="1"
            w="100%"
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
          >
            <VStack align="flex-start" spacing="5" w="100%">

              {/* ---------------------------------------------------------- */}
              {/* Breadcrumb-style path: Category > Subcategory > Brand       */}
              {/* ---------------------------------------------------------- */}
              <MotionBox custom={0} variants={fadeInUp} initial="hidden" animate="visible">
                <HStack
                  spacing="1"
                  fontSize="xs"
                  fontWeight="500"
                  color={breadcrumbColor}
                  flexWrap="wrap"
                >
                  {data?.category && (
                    <>
                      <Text
                        cursor="pointer"
                        textTransform="capitalize"
                        _hover={{ color: breadcrumbHighlight, textDecoration: "underline" }}
                        transition="color 0.15s ease"
                      >
                        {data.category}
                      </Text>
                    </>
                  )}
                  {data?.subcategory && (
                    <>
                      <Text color={mutedColor}>/</Text>
                      <Text
                        cursor="pointer"
                        textTransform="capitalize"
                        _hover={{ color: breadcrumbHighlight, textDecoration: "underline" }}
                        transition="color 0.15s ease"
                      >
                        {data.subcategory}
                      </Text>
                    </>
                  )}
                  {data?.brand && (
                    <>
                      <Text color={mutedColor}>/</Text>
                      <Text
                        fontWeight="700"
                        color={breadcrumbHighlight}
                        textTransform="capitalize"
                      >
                        {data.brand}
                      </Text>
                    </>
                  )}
                </HStack>
              </MotionBox>

              {/* ---------------------------------------------------------- */}
              {/* Product title                                                */}
              {/* ---------------------------------------------------------- */}
              <MotionBox custom={1} variants={fadeInUp} initial="hidden" animate="visible" w="100%">
                <Text
                  as="h1"
                  fontSize={{ base: "2xl", md: "3xl", lg: "3xl" }}
                  fontWeight="800"
                  color={titleColor}
                  lineHeight="1.2"
                  letterSpacing="-0.025em"
                >
                  {data.title}
                </Text>
              </MotionBox>

              {/* ---------------------------------------------------------- */}
              {/* Brand + Category badges                                      */}
              {/* ---------------------------------------------------------- */}
              <MotionBox custom={2} variants={fadeInUp} initial="hidden" animate="visible">
                <HStack spacing="2" flexWrap="wrap">
                  {data?.brand && (
                    <Badge
                      bg={brandBadgeBg}
                      color={brandBadgeColor}
                      fontWeight="700"
                      fontSize="10px"
                      px="3"
                      py="1"
                      borderRadius="full"
                      textTransform="uppercase"
                      letterSpacing="widest"
                    >
                      {data.brand}
                    </Badge>
                  )}
                  {data?.category && (
                    <Badge
                      bg={catBadgeBg}
                      color={catBadgeColor}
                      fontWeight="500"
                      fontSize="10px"
                      px="3"
                      py="1"
                      borderRadius="full"
                      textTransform="capitalize"
                      letterSpacing="wide"
                    >
                      {data.category}
                    </Badge>
                  )}
                </HStack>
              </MotionBox>

              {/* ---------------------------------------------------------- */}
              {/* Star rating row                                              */}
              {/* ---------------------------------------------------------- */}
              <MotionBox custom={3} variants={fadeInUp} initial="hidden" animate="visible">
                <StarRating
                  rating={data?.rating}
                  totalRating={data?.total_rating}
                  filledColor={accentActive}
                  emptyColor={starEmptyColor}
                  mutedColor={mutedColor}
                />
              </MotionBox>

              <Divider borderColor={borderColor} />

              {/* ---------------------------------------------------------- */}
              {/* Price block                                                  */}
              {/* ---------------------------------------------------------- */}
              <MotionBox custom={4} variants={fadeInUp} initial="hidden" animate="visible" w="100%">
                <Flex align="baseline" gap="3" flexWrap="wrap" mb="1">
                  <Text
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight="900"
                    color={priceColor}
                    lineHeight="1"
                    letterSpacing="-0.03em"
                  >
                    ${currentPrice.toFixed(2)}
                  </Text>

                  {originalPrice && (
                    <Text
                      fontSize="lg"
                      fontWeight="500"
                      color={strikeThroughColor}
                      textDecoration="line-through"
                    >
                      ${originalPrice}
                    </Text>
                  )}

                  {savings && parseFloat(savings) > 0 && (
                    <Box
                      as="span"
                      display="inline-flex"
                      alignItems="center"
                      bg={savingsBadgeBg}
                      color={savingsBadgeColor}
                      border="1px solid"
                      borderColor={savingsBorderColor}
                      fontWeight="700"
                      fontSize="xs"
                      px="2.5"
                      py="1"
                      borderRadius="md"
                    >
                      You save ${savings}
                    </Box>
                  )}
                </Flex>

                <Text fontSize="xs" color={taxNoteColor} letterSpacing="wide">
                  Inclusive of all taxes. Free shipping on orders over $50.
                </Text>
              </MotionBox>

              <Divider borderColor={borderColor} />

              {/* ---------------------------------------------------------- */}
              {/* Size selector                                                */}
              {/* ---------------------------------------------------------- */}
              {data?.sizes && data.sizes.length > 0 && (
                <MotionBox custom={5} variants={fadeInUp} initial="hidden" animate="visible" w="100%">
                  <Flex align="center" justify="space-between" mb="3">
                    <Text
                      fontSize="xs"
                      fontWeight="800"
                      color={textColor}
                      textTransform="uppercase"
                      letterSpacing="widest"
                    >
                      Select Size
                      {selectedSize && (
                        <Box as="span" ml="2" fontWeight="700" color={accentActive} textTransform="none" letterSpacing="normal">
                          — {selectedSize}
                        </Box>
                      )}
                    </Text>
                    <Text
                      fontSize="xs"
                      fontWeight="600"
                      color={sizeGuideLinkColor}
                      cursor="pointer"
                      _hover={{ textDecoration: "underline" }}
                      transition="opacity 0.15s ease"
                    >
                      Size Guide
                    </Text>
                  </Flex>

                  <Flex gap="2" flexWrap="wrap">
                    {data.sizes.map((option, index) => {
                      const isSelected = selectedSize === option;
                      return (
                        <Box
                          key={index}
                          as="button"
                          onClick={() => setSelectedSize(option)}
                          minW="52px"
                          h="46px"
                          px="4"
                          borderRadius="xl"
                          border="2px solid"
                          borderColor={isSelected ? accentActive : borderColor}
                          bg={isSelected ? accentActive : sizeDefaultBg}
                          color={isSelected ? "white" : sizeDefaultText}
                          fontWeight="700"
                          fontSize="sm"
                          textTransform="uppercase"
                          letterSpacing="wide"
                          boxShadow={
                            isSelected
                              ? "0 4px 14px rgba(128,90,213,0.4)"
                              : "none"
                          }
                          transition="all 0.18s ease"
                          _hover={{
                            borderColor: accentActive,
                            bg: isSelected ? accentHover : sizeHoverBg,
                            color: isSelected ? "white" : accentActive,
                            transform: "translateY(-1px)",
                          }}
                          _active={{ transform: "translateY(0)" }}
                        >
                          {option}
                        </Box>
                      );
                    })}
                  </Flex>
                </MotionBox>
              )}

              <Divider borderColor={borderColor} />

              {/* ---------------------------------------------------------- */}
              {/* Description                                                  */}
              {/* ---------------------------------------------------------- */}
              {data?.description && (
                <MotionBox custom={6} variants={fadeInUp} initial="hidden" animate="visible" w="100%">
                  <Text
                    fontSize="10px"
                    fontWeight="800"
                    color={descLabelColor}
                    textTransform="uppercase"
                    letterSpacing="widest"
                    mb="2"
                  >
                    Description
                  </Text>
                  <Text
                    fontSize="sm"
                    color={textColor}
                    lineHeight="1.85"
                  >
                    {data.description}
                  </Text>
                </MotionBox>
              )}

              <Divider borderColor={borderColor} />

              {/* ---------------------------------------------------------- */}
              {/* CTA buttons                                                  */}
              {/* ---------------------------------------------------------- */}
              <MotionBox custom={7} variants={fadeInUp} initial="hidden" animate="visible" w="100%">
                <Flex gap="3" direction={{ base: "column", sm: "row" }}>
                  <Button
                    flex="1"
                    size="lg"
                    leftIcon={<FiShoppingBag size="18px" />}
                    bg={accentActive}
                    color="white"
                    fontWeight="800"
                    fontSize="sm"
                    letterSpacing="widest"
                    textTransform="uppercase"
                    borderRadius="xl"
                    h="54px"
                    onClick={handleAddToCart}
                    isLoading={isLoading}
                    loadingText="Adding..."
                    boxShadow={cartBtnShadow}
                    _hover={{
                      bg: accentHover,
                      transform: "translateY(-2px)",
                      boxShadow: cartBtnHoverShadow,
                    }}
                    _active={{ transform: "translateY(0)" }}
                    transition="all 0.2s ease"
                  >
                    Add to Bag
                  </Button>

                  <Tooltip label="Add to Wishlist" placement="top" hasArrow>
                    <IconButton
                      icon={<FiHeart size="20px" />}
                      aria-label="Add to Wishlist"
                      size="lg"
                      h="54px"
                      w="54px"
                      borderRadius="xl"
                      border="2px solid"
                      borderColor={wishlistBorderColor}
                      bg="transparent"
                      color="pink.500"
                      onClick={handleAddToWishlist}
                      transition="all 0.2s ease"
                      _hover={{
                        borderColor: "pink.400",
                        bg: "pink.50",
                        color: "pink.600",
                        transform: "scale(1.08)",
                      }}
                      _active={{ transform: "scale(0.96)" }}
                    />
                  </Tooltip>
                </Flex>
              </MotionBox>

              {/* ---------------------------------------------------------- */}
              {/* Delivery info card                                           */}
              {/* ---------------------------------------------------------- */}
              <MotionBox custom={8} variants={fadeInUp} initial="hidden" animate="visible" w="100%">
                <Box
                  bg={deliveryCardBg}
                  border="1px solid"
                  borderColor={deliveryCardBorder}
                  borderRadius="2xl"
                  p="5"
                >
                  <Text
                    fontSize="10px"
                    fontWeight="800"
                    color={deliveryHeadingColor}
                    textTransform="uppercase"
                    letterSpacing="widest"
                    mb="4"
                  >
                    Delivery & Returns
                  </Text>

                  <VStack align="flex-start" spacing="4">
                    <DeliveryInfoRow
                      icon={FiTruck}
                      label="Fast Delivery"
                      value="Arrives within 2-3 business days"
                      rowBorderColor={deliveryCardBorder}
                      iconColor={accentActive}
                      iconBg={deliveryIconBg}
                      labelColor={textColor}
                      valueColor={mutedColor}
                    />
                    <DeliveryInfoRow
                      icon={FiRefreshCw}
                      label="Free Returns"
                      value="Hassle-free returns within 30 days"
                      rowBorderColor={deliveryCardBorder}
                      iconColor={accentActive}
                      iconBg={deliveryIconBg}
                      labelColor={textColor}
                      valueColor={mutedColor}
                    />
                    <DeliveryInfoRow
                      icon={FiShield}
                      label="Secure Payments"
                      value="100% protected checkout"
                      rowBorderColor={deliveryCardBorder}
                      iconColor={accentActive}
                      iconBg={deliveryIconBg}
                      labelColor={textColor}
                      valueColor={mutedColor}
                    />
                  </VStack>

                  <Text
                    fontSize="xs"
                    color={taxNoteColor}
                    mt="4"
                    lineHeight="1.75"
                  >
                    Product availability and delivery timelines may vary by location.
                    Returns are subject to item condition and original packaging.
                    Promotions cannot be combined with other offers.
                  </Text>
                </Box>
              </MotionBox>

            </VStack>
          </MotionBox>
        </Flex>
      </Box>
    </Box>
  );
};

export default SingleProduct;
