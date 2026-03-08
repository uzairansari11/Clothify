import {
  Badge,
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useCallback, useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";

const responsive = {
  0:    { items: 1 },
  600:  { items: 2 },
  900:  { items: 3 },
  1200: { items: 4 },
};

const Carousel = ({ products }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  // All color tokens resolved at top level — never inside callbacks
  const cardBg          = useColorModeValue("white", "gray.800");
  const cardBorder      = useColorModeValue("gray.100", "gray.700");
  const cardBorderHover = "card.hoverBorder";
  const imageBg         = useColorModeValue("gray.50", "gray.900");
  const brandColor      = "accent.text";
  const titleColor      = useColorModeValue("gray.800", "gray.100");
  const titleHover      = "accent.text";
  const priceColor      = useColorModeValue("gray.900", "white");
  const originalColor   = useColorModeValue("gray.400", "gray.500");
  const dotInactive     = useColorModeValue("gray.300", "gray.600");
  const dotHover        = "accent.text";
  const shadowHover     = useColorModeValue(
    "0 12px 32px rgba(0,0,0,0.12)",
    "0 12px 32px rgba(0,0,0,0.45)"
  );

  const onSlideChanged = useCallback(({ item }) => {
    setActiveIndex(item);
  }, []);

  const slideTo = useCallback((index) => {
    if (carouselRef.current) {
      carouselRef.current.slideTo(index);
    }
    setActiveIndex(index);
  }, []);

  const items = products.map((product) => {
    const discount = Math.min(Math.max(product.discount || 0, 0), 90);
    const originalPrice =
      discount > 0
        ? Math.round(product.price / (1 - discount / 100))
        : null;

    return (
      <Box
        key={product._id}
        px={{ base: 2, md: 3 }}
        py={4}
        // Prevent drag events from navigating via the Link
        onDragStart={(e) => e.preventDefault()}
      >
        <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
          <Box
            bg={cardBg}
            borderRadius="2xl"
            border="1px solid"
            borderColor={cardBorder}
            overflow="hidden"
            cursor="pointer"
            role="group"
            transition="transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease"
            _hover={{
              transform: "translateY(-6px)",
              boxShadow: shadowHover,
              borderColor: cardBorderHover,
            }}
          >
            {/* Image container */}
            <Box
              position="relative"
              bg={imageBg}
              overflow="hidden"
              height="240px"
            >
              <Image
                src={product.images?.[0]}
                alt={product.title}
                width="100%"
                height="240px"
                objectFit="contain"
                p={3}
                loading="lazy"
                transition="transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)"
                _groupHover={{ transform: "scale(1.06)" }}
              />

              {discount > 0 && (
                <Badge
                  position="absolute"
                  top={3}
                  left={3}
                  colorScheme="green"
                  variant="solid"
                  fontSize="0.65rem"
                  fontWeight="700"
                  letterSpacing="0.03em"
                  borderRadius="full"
                  px={2.5}
                  py={0.5}
                  boxShadow="sm"
                >
                  {discount}% OFF
                </Badge>
              )}
            </Box>

            {/* Card body */}
            <Box px={4} pt={3} pb={4}>
              {/* Brand */}
              <Text
                fontSize="xs"
                fontWeight="700"
                color={brandColor}
                textTransform="uppercase"
                letterSpacing="0.08em"
                mb={1}
                noOfLines={1}
              >
                {product.brand}
              </Text>

              {/* Title */}
              <Text
                fontWeight="600"
                fontSize="sm"
                color={titleColor}
                noOfLines={1}
                mb={3}
                transition="color 0.2s ease"
                _groupHover={{ color: titleHover }}
              >
                {product.title}
              </Text>

              {/* Price row */}
              <Flex align="baseline" gap={2} wrap="nowrap">
                <Text
                  fontWeight="800"
                  fontSize="md"
                  color={priceColor}
                  lineHeight="1"
                >
                  ${product.price}
                </Text>
                {originalPrice && (
                  <Text
                    fontSize="xs"
                    color={originalColor}
                    textDecoration="line-through"
                    lineHeight="1"
                  >
                    ${originalPrice}
                  </Text>
                )}
              </Flex>
            </Box>
          </Box>
        </Link>
      </Box>
    );
  });

  return (
    <Box
      position="relative"
      width="100%"
      pb={10}
      // Pause autoplay on hover via CSS class manipulation through Alice's
      // autoPlayStrategy; we handle it via onMouseEnter/Leave on the wrapper
      sx={{
        // Remove default Alice outline
        ".alice-carousel__stage-item": {
          userSelect: "none",
        },
      }}
      onMouseEnter={() => carouselRef.current?.pause?.()}
      onMouseLeave={() => carouselRef.current?.play?.()}
    >
      <AliceCarousel
        ref={carouselRef}
        items={items}
        responsive={responsive}
        autoPlay
        autoPlayInterval={3500}
        autoPlayStrategy="none"
        infinite
        mouseTracking
        animationDuration={800}
        animationType="slide"
        disableDotsControls
        disableButtonsControls
        onSlideChanged={onSlideChanged}
        touchTracking
      />

      {/* Custom dot indicators */}
      <Flex
        position="absolute"
        bottom={2}
        left="50%"
        transform="translateX(-50%)"
        justify="center"
        align="center"
        gap={1.5}
      >
        {products.map((_, index) => (
          <Box
            key={index}
            as="button"
            aria-label={`Go to slide ${index + 1}`}
            borderRadius="full"
            bg={index === activeIndex ? "accent.solid" : dotInactive}
            height="8px"
            width={index === activeIndex ? "20px" : "8px"}
            minW={index === activeIndex ? "20px" : "8px"}
            cursor="pointer"
            border="none"
            p={0}
            transition="width 0.35s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.35s ease, min-width 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{
              bg: index === activeIndex ? "accent.solid" : dotHover,
            }}
            _focusVisible={{
              outline: "2px solid",
              outlineColor: "accent.solid",
              outlineOffset: "2px",
            }}
            onClick={() => slideTo(index)}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Carousel;
