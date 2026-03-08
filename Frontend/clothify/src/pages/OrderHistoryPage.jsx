import {
  Badge,
  Box,
  Container,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiMapPin,
  FiPackage,
  FiUser,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import EmptyState from "../components/common/EmptyState";

const MotionBox = motion(Box);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const OrderHistoryPage = () => {
  const { orderData } = useSelector((store) => store.orderReducer);

  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorderColor = useColorModeValue("gray.100", "gray.700");
  const cardShadow = useColorModeValue(
    "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    "0 1px 3px rgba(0,0,0,0.3)"
  );
  const cardHoverShadow = useColorModeValue(
    "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
    "0 4px 12px rgba(0,0,0,0.4)"
  );
  const headingColor = useColorModeValue("gray.800", "white");
  const subtextColor = useColorModeValue("gray.500", "gray.400");
  const labelColor = useColorModeValue("gray.400", "gray.500");
  const primaryTextColor = useColorModeValue("gray.700", "gray.200");
  const orderIdColor = useColorModeValue("gray.500", "gray.400");
  const dividerColor = useColorModeValue("gray.100", "gray.700");
  const itemCardBg = useColorModeValue("gray.50", "gray.700");
  const itemCardBorder = useColorModeValue("gray.100", "gray.600");
  const brandTextColor = useColorModeValue("gray.800", "gray.100");
  const sizeBadgeBg = "accent.bg";
  const sizeBadgeColor = "accent.text";
  const totalLabelColor = useColorModeValue("gray.500", "gray.400");
  const totalAmountColor = "accent.text";
  const pageHeaderIconBg = "accent.bg";
  const pageHeaderIconColor = "accent.text";
  const countBg = useColorModeValue("gray.100", "gray.700");
  const countColor = useColorModeValue("gray.600", "gray.300");

  const orderCount = orderData?.length || 0;

  return (
    <Box pt="80px" pb={12} bg={pageBg} minH="100vh">
      <Container maxW="container.lg">
        {/* Page Header */}
        <Flex align="center" justify="space-between" mb={8} flexWrap="wrap" gap={3}>
          <HStack spacing={3}>
            <Flex
              align="center"
              justify="center"
              w={10}
              h={10}
              borderRadius="lg"
              bg={pageHeaderIconBg}
            >
              <Icon as={FiPackage} boxSize={5} color={pageHeaderIconColor} />
            </Flex>
            <Box>
              <Heading
                size="lg"
                color={headingColor}
                fontWeight="700"
                letterSpacing="-0.02em"
              >
                Order History
              </Heading>
              <Text fontSize="sm" color={subtextColor} mt={0.5}>
                Track and review your past purchases
              </Text>
            </Box>
          </HStack>

          <Flex
            align="center"
            gap={2}
            px={3}
            py={1.5}
            bg={countBg}
            borderRadius="full"
          >
            <Text fontSize="sm" fontWeight="600" color={countColor}>
              {orderCount} {orderCount === 1 ? "order" : "orders"}
            </Text>
          </Flex>
        </Flex>

        {/* Order List */}
        {orderCount > 0 ? (
          <MotionBox
            as="div"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <VStack spacing={4} align="stretch">
              {orderData.map((order) => (
                <MotionBox
                  key={order?._id}
                  variants={cardVariants}
                  bg={cardBg}
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor={cardBorderColor}
                  boxShadow={cardShadow}
                  overflow="hidden"
                  _hover={{ boxShadow: cardHoverShadow }}
                  transition={{ duration: "0.2s" }}
                >
                  {/* Card Top: Order ID + Status + Date/Time */}
                  <Flex
                    align="center"
                    justify="space-between"
                    flexWrap="wrap"
                    gap={3}
                    px={6}
                    pt={5}
                    pb={4}
                  >
                    <Box minW={0}>
                      <Text
                        fontSize="10px"
                        fontWeight="700"
                        letterSpacing="0.08em"
                        color={labelColor}
                        textTransform="uppercase"
                        mb={1}
                      >
                        Order ID
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color={orderIdColor}
                        fontFamily="mono"
                        isTruncated
                        maxW={{ base: "180px", sm: "280px", md: "none" }}
                        title={order?._id}
                      >
                        #{order?._id?.slice(-12).toUpperCase()}
                      </Text>
                    </Box>

                    <HStack spacing={2} flexShrink={0}>
                      <Badge
                        display="flex"
                        alignItems="center"
                        gap={1}
                        colorScheme="green"
                        variant="subtle"
                        borderRadius="full"
                        px={3}
                        py={1}
                        fontSize="xs"
                        fontWeight="600"
                      >
                        <Icon as={FiCheckCircle} boxSize={3} />
                        Delivered
                      </Badge>
                      <Badge
                        display="flex"
                        alignItems="center"
                        gap={1}
                        colorScheme="gray"
                        variant="subtle"
                        borderRadius="full"
                        px={3}
                        py={1}
                        fontSize="xs"
                      >
                        <Icon as={FiCalendar} boxSize={3} />
                        {order?.date}
                      </Badge>
                      <Badge
                        display="flex"
                        alignItems="center"
                        gap={1}
                                                variant="subtle"
                        borderRadius="full"
                        px={3}
                        py={1}
                        fontSize="xs"
                      >
                        <Icon as={FiClock} boxSize={3} />
                        {order?.time}
                      </Badge>
                    </HStack>
                  </Flex>

                  {/* Customer Info */}
                  <Box px={6} pb={4}>
                    <Flex
                      gap={{ base: 3, sm: 6 }}
                      flexWrap="wrap"
                      mb={2}
                    >
                      <HStack spacing={2}>
                        <Icon as={FiUser} boxSize={3.5} color={labelColor} />
                        <Text fontSize="sm" color={primaryTextColor} fontWeight="500">
                          {order?.name}
                        </Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FiMail} boxSize={3.5} color={labelColor} />
                        <Text fontSize="sm" color={subtextColor}>
                          {order?.email}
                        </Text>
                      </HStack>
                    </Flex>
                    <HStack spacing={2} align="flex-start">
                      <Icon as={FiMapPin} boxSize={3.5} color={labelColor} mt="3px" flexShrink={0} />
                      <Text fontSize="sm" color={subtextColor} lineHeight="1.5">
                        {order?.address}
                      </Text>
                    </HStack>
                  </Box>

                  <Divider borderColor={dividerColor} />

                  {/* Product Items — horizontally scrollable */}
                  <Box px={6} pt={4} pb={4}>
                    <Text
                      fontSize="10px"
                      fontWeight="700"
                      letterSpacing="0.08em"
                      color={labelColor}
                      textTransform="uppercase"
                      mb={3}
                    >
                      Items ({order?.items?.length})
                    </Text>
                    <Flex
                      gap={3}
                      overflowX="auto"
                      pb={1}
                      sx={{
                        "&::-webkit-scrollbar": { height: "4px" },
                        "&::-webkit-scrollbar-track": { bg: "transparent" },
                        "&::-webkit-scrollbar-thumb": {
                          bg: dividerColor,
                          borderRadius: "full",
                        },
                      }}
                    >
                      {order?.items?.map((item) => (
                        <Box
                          key={item?._id}
                          minW="180px"
                          maxW="180px"
                          p={3}
                          border="1px solid"
                          borderColor={itemCardBorder}
                          borderRadius="xl"
                          bg={itemCardBg}
                          flexShrink={0}
                        >
                          <HStack spacing={3} align="flex-start">
                            <Image
                              src={item?.images?.[0]}
                              alt={item?.brand}
                              boxSize="60px"
                              minW="60px"
                              objectFit="contain"
                              borderRadius="lg"
                              bg={cardBg}
                              p={1}
                            />
                            <VStack spacing={1} align="flex-start" minW={0} flex={1}>
                              <Text
                                fontSize="sm"
                                fontWeight="700"
                                color={brandTextColor}
                                isTruncated
                                maxW="full"
                                title={item?.brand}
                              >
                                {item?.brand}
                              </Text>
                              <HStack spacing={1.5} flexWrap="wrap">
                                {item?.size && (
                                  <Badge
                                    bg={sizeBadgeBg}
                                    color={sizeBadgeColor}
                                    borderRadius="md"
                                    px={1.5}
                                    py={0.5}
                                    fontSize="10px"
                                    fontWeight="700"
                                  >
                                    {item?.size}
                                  </Badge>
                                )}
                                <Text fontSize="xs" color={subtextColor}>
                                  x{item?.quantity}
                                </Text>
                              </HStack>
                              <Text
                                fontSize="sm"
                                fontWeight="700"
                                color={totalAmountColor}
                              >
                                ${Number(item?.totalPrice).toFixed(2)}
                              </Text>
                            </VStack>
                          </HStack>
                        </Box>
                      ))}
                    </Flex>
                  </Box>

                  {/* Order Total */}
                  <Box
                    px={6}
                    py={4}
                    borderTop="1px solid"
                    borderColor={dividerColor}
                  >
                    <Flex align="center" justify="flex-end" gap={3}>
                      <Text fontSize="sm" color={totalLabelColor} fontWeight="500">
                        Order Total
                      </Text>
                      <Text
                        fontSize="xl"
                        fontWeight="800"
                        color={totalAmountColor}
                        letterSpacing="-0.02em"
                      >
                        ${Number(order?.grandTotal).toFixed(2)}
                      </Text>
                    </Flex>
                  </Box>
                </MotionBox>
              ))}
            </VStack>
          </MotionBox>
        ) : (
          <EmptyState
            icon={FiPackage}
            title="No orders yet"
            message="Your order history will appear here once you place your first order."
          />
        )}
      </Container>
    </Box>
  );
};

export default OrderHistoryPage;
