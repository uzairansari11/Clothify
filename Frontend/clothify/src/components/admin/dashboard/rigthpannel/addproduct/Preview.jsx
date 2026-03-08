import {
  Badge,
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiPackage } from "react-icons/fi";

const Preview = ({ productData }) => {
  // All color tokens at top level
  const cardBg           = useColorModeValue("white", "gray.800");
  const cardBorder       = useColorModeValue("gray.200", "gray.700");
  const labelText        = useColorModeValue("gray.500", "gray.400");
  const titleText        = useColorModeValue("gray.800", "gray.100");
  const priceText        = useColorModeValue("gray.800", "gray.100");
  const originalPrice    = useColorModeValue("gray.400", "gray.500");
  const discountedBg     = useColorModeValue("green.50", "green.900");
  const discountedColor  = useColorModeValue("green.600", "green.300");
  const descriptionColor = useColorModeValue("gray.600", "gray.300");
  const placeholderBg    = useColorModeValue("gray.100", "gray.700");
  const placeholderIcon  = useColorModeValue("gray.300", "gray.600");
  const headerBg         = "accent.bg";
  const headerColor      = "accent.text";
  const dividerColor     = useColorModeValue("gray.100", "gray.700");
  const metaRowBg        = useColorModeValue("gray.50", "gray.750");

  const hasImage = productData.images.length > 0 && productData.images[0] !== "";

  // Compute discounted price for display
  const discountedPrice =
    productData.price && productData.discount
      ? (
          parseFloat(productData.price) *
          (1 - parseFloat(productData.discount) / 100)
        ).toFixed(2)
      : null;

  return (
    <Box>
      {/* Preview label */}
      <Flex
        align="center"
        gap={2}
        mb={3}
        px={1}
      >
        <Flex
          align="center"
          justify="center"
          w={7}
          h={7}
          borderRadius="md"
          bg={headerBg}
        >
          <FiPackage size={14} color="var(--chakra-colors-accent-solid)" />
        </Flex>
        <Text
          fontSize="xs"
          fontWeight="700"
          letterSpacing="wider"
          textTransform="uppercase"
          color={headerColor}
        >
          Live Preview
        </Text>
      </Flex>

      {/* Product card */}
      <Box
        bg={cardBg}
        border="1px solid"
        borderColor={cardBorder}
        borderRadius="2xl"
        overflow="hidden"
        shadow="sm"
      >
        {/* Image area */}
        <Box position="relative" w="100%" h="220px" bg={placeholderBg}>
          {hasImage ? (
            <Image
              src={productData.images[0]}
              alt="Product preview"
              objectFit="cover"
              w="100%"
              h="100%"
            />
          ) : (
            <Flex
              w="100%"
              h="100%"
              align="center"
              justify="center"
              direction="column"
              gap={2}
            >
              <Box color={placeholderIcon}>
                <FiPackage size={40} />
              </Box>
              <Text fontSize="xs" color={placeholderIcon} fontWeight="500">
                No image added yet
              </Text>
            </Flex>
          )}

          {/* Discount badge overlay */}
          {productData.discount && (
            <Badge
              position="absolute"
              top={3}
              left={3}
              colorScheme="green"
              variant="solid"
              borderRadius="lg"
              fontSize="xs"
              px={2}
              py={0.5}
            >
              -{productData.discount}% OFF
            </Badge>
          )}
        </Box>

        {/* Product info */}
        <Box p={4}>
          {/* Badges row */}
          <Flex gap={2} mb={2} wrap="wrap">
            {productData.category && (
              <Badge
                                variant="subtle"
                borderRadius="md"
                fontSize="2xs"
                textTransform="uppercase"
                letterSpacing="wide"
                px={2}
                py={0.5}
              >
                {productData.category}
              </Badge>
            )}
            {productData.subcategory && (
              <Badge
                colorScheme="blue"
                variant="subtle"
                borderRadius="md"
                fontSize="2xs"
                textTransform="uppercase"
                letterSpacing="wide"
                px={2}
                py={0.5}
              >
                {productData.subcategory}
              </Badge>
            )}
            {productData.brand && (
              <Badge
                colorScheme="orange"
                variant="subtle"
                borderRadius="md"
                fontSize="2xs"
                textTransform="uppercase"
                letterSpacing="wide"
                px={2}
                py={0.5}
              >
                {productData.brand}
              </Badge>
            )}
          </Flex>

          {/* Title */}
          <Text
            fontSize="md"
            fontWeight="700"
            color={titleText}
            mb={2}
            lineHeight="shorter"
            noOfLines={2}
          >
            {productData.title || "Product title will appear here"}
          </Text>

          {/* Price row */}
          {productData.price && (
            <Flex align="center" gap={2} mb={3}>
              {discountedPrice ? (
                <>
                  <Text fontSize="lg" fontWeight="800" color={priceText}>
                    ${discountedPrice}
                  </Text>
                  <Text
                    fontSize="sm"
                    fontWeight="500"
                    color={originalPrice}
                    textDecoration="line-through"
                  >
                    ${parseFloat(productData.price).toFixed(2)}
                  </Text>
                  <Box
                    bg={discountedBg}
                    color={discountedColor}
                    fontSize="xs"
                    fontWeight="700"
                    px={2}
                    py={0.5}
                    borderRadius="md"
                  >
                    Save {productData.discount}%
                  </Box>
                </>
              ) : (
                <Text fontSize="lg" fontWeight="800" color={priceText}>
                  ${parseFloat(productData.price).toFixed(2)}
                </Text>
              )}
            </Flex>
          )}

          {/* Divider */}
          <Box h="1px" bg={dividerColor} mb={3} />

          {/* Meta row: rating + qty */}
          <Flex
            bg={metaRowBg}
            borderRadius="lg"
            px={3}
            py={2}
            justify="space-between"
            mb={3}
          >
            <Box>
              <Text fontSize="2xs" color={labelText} fontWeight="600" textTransform="uppercase" letterSpacing="wide">
                Rating
              </Text>
              <Text fontSize="sm" fontWeight="700" color={titleText}>
                {productData.rating || "—"}
                {productData.total_rating
                  ? ` (${parseInt(productData.total_rating).toLocaleString()})`
                  : ""}
              </Text>
            </Box>
            <Box textAlign="right">
              <Text fontSize="2xs" color={labelText} fontWeight="600" textTransform="uppercase" letterSpacing="wide">
                In Stock
              </Text>
              <Text fontSize="sm" fontWeight="700" color={titleText}>
                {productData.quantity || "—"}
              </Text>
            </Box>
          </Flex>

          {/* Sizes */}
          {productData.sizes.length > 0 && (
            <Box mb={3}>
              <Text
                fontSize="2xs"
                fontWeight="700"
                color={labelText}
                textTransform="uppercase"
                letterSpacing="wide"
                mb={1.5}
              >
                Available Sizes
              </Text>
              <Flex wrap="wrap" gap={1.5}>
                {productData.sizes.map((size) => (
                  <Badge
                    key={size}
                    variant="solid"
                                        borderRadius="md"
                    px={2}
                    py={0.5}
                    fontSize="xs"
                    fontWeight="600"
                  >
                    {size}
                  </Badge>
                ))}
              </Flex>
            </Box>
          )}

          {/* Description */}
          {productData.description && (
            <>
              <Box h="1px" bg={dividerColor} mb={3} />
              <Box>
                <Text
                  fontSize="2xs"
                  fontWeight="700"
                  color={labelText}
                  textTransform="uppercase"
                  letterSpacing="wide"
                  mb={1}
                >
                  Description
                </Text>
                <Text
                  fontSize="xs"
                  color={descriptionColor}
                  lineHeight="tall"
                  noOfLines={3}
                >
                  {productData.description}
                </Text>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Preview;
