import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  FiShoppingBag,
  FiPackage,
  FiMapPin,
  FiMail,
  FiUser,
  FiCalendar,
  FiEye,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { handleGetOrderData } from "../../../../redux/Admin_Redux/order/action";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 10;

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const parts = dateStr.split(".");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;
  }
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return dateStr;
};

const shortId = (id = "") =>
  id.length > 8 ? `#${id.slice(-8).toUpperCase()}` : `#${id.toUpperCase()}`;

const OrderTable = () => {
  const dispatch = useDispatch();
  const { orderData, isLoading, isError } = useSelector(
    (store) => store.adminOrderReducer
  );
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // All useColorModeValue at top level
  const cardBg         = useColorModeValue("white",      "gray.800");
  const cardBorder     = useColorModeValue("gray.200",   "gray.700");
  const thBg           = useColorModeValue("gray.50",    "gray.700");
  const thColor        = useColorModeValue("gray.500",   "gray.400");
  const tdColor        = useColorModeValue("gray.700",   "gray.200");
  const subtitleColor  = useColorModeValue("gray.500",   "gray.400");
  const rowHoverBg     = useColorModeValue("accent.bg",  "gray.700");
  const rowBorderColor = useColorModeValue("gray.100",   "gray.700");
  const emptyIconBg    = "accent.bg";
  const emptyIconColor = "accent.solid";
  const emptyTextColor = useColorModeValue("gray.500",   "gray.400");
  const countBg        = "accent.bg";
  const countColor     = "accent.text";
  const amountColor    = useColorModeValue("green.600",  "green.300");
  const emailColor     = useColorModeValue("gray.400",   "gray.500");
  const idColor        = "accent.text";
  const dateColor      = useColorModeValue("gray.500",   "gray.400");
  const spinnerColor   = "accent.solid";
  const avatarBg       = "accent.bg";
  const modalLabelColor = useColorModeValue("gray.500",  "gray.400");
  const modalValueColor = useColorModeValue("gray.800",  "white");
  const itemBg         = useColorModeValue("gray.50",    "gray.700");
  const itemBorder     = useColorModeValue("gray.100",   "gray.600");
  const dividerColor   = useColorModeValue("gray.200",   "gray.600");

  useEffect(() => {
    dispatch(handleGetOrderData());
  }, [dispatch]);

  // Flatten order groups into flat rows — keep raw items for detail view
  const flatRows = Array.isArray(orderData)
    ? orderData.flatMap((group) => {
        const orders = Array.isArray(group.orders) ? group.orders : [];
        return orders.map((order) => ({
          orderId:   order?._id || "",
          customer:  order?.name || "Unknown",
          email:     order?.email || "",
          address:   order?.address || "",
          items:     Array.isArray(order?.items) ? order.items : [],
          itemCount: Array.isArray(order?.items) ? order.items.length : 0,
          total:     order?.grandTotal ?? 0,
          date:      order?.date || "",
          time:      order?.time || "",
        }));
      })
    : [];

  const totalOrders = flatRows.length;
  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);
  const paginatedRows = flatRows.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => setPage(newPage);

  const handleRowClick = (row) => {
    setSelectedOrder(row);
    onOpen();
  };

  const handleModalClose = () => {
    onClose();
    setSelectedOrder(null);
  };

  if (isLoading) {
    return (
      <Flex align="center" justify="center" minH="50vh" direction="column" gap={4}>
        <Spinner size="lg" color={spinnerColor} thickness="3px" />
        <Text color={subtitleColor} fontWeight="500" fontSize="sm">
          Loading orders...
        </Text>
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex align="center" justify="center" minH="50vh" direction="column" gap={3}>
        <Flex align="center" justify="center" w={16} h={16} borderRadius="full" bg="red.50">
          <Icon as={FiShoppingBag} boxSize={7} color="red.400" />
        </Flex>
        <Text color="red.500" fontWeight="600">Failed to load orders</Text>
        <Text color={subtitleColor} fontSize="sm">Please refresh or try again later.</Text>
      </Flex>
    );
  }

  return (
    <Box>
      {/* Section header */}
      <Flex align="center" justify="space-between" mb={5} wrap="wrap" gap={3}>
        <Flex align="center" gap={3}>
          <Flex
            align="center"
            justify="center"
            w={10}
            h={10}
            borderRadius="xl"
            bg="accent.solid"
          >
            <Icon as={FiShoppingBag} color="white" boxSize={5} />
          </Flex>
          <Box>
            <Text fontSize="lg" fontWeight="700" lineHeight="shorter">
              Order Management
            </Text>
            <Text fontSize="sm" color={subtitleColor}>
              All customer orders at a glance
            </Text>
          </Box>
        </Flex>

        <Flex
          align="center"
          gap={2}
          bg={countBg}
          color={countColor}
          px={4}
          py={2}
          borderRadius="xl"
          fontWeight="700"
          fontSize="sm"
        >
          <Icon as={FiPackage} boxSize={4} />
          {totalOrders} {totalOrders === 1 ? "Order" : "Orders"}
        </Flex>
      </Flex>

      {/* Table card */}
      <Box
        bg={cardBg}
        border="1px solid"
        borderColor={cardBorder}
        borderRadius="xl"
        overflow="hidden"
        shadow="sm"
      >
        {flatRows.length === 0 ? (
          <Flex direction="column" align="center" justify="center" py={20} gap={4}>
            <Flex align="center" justify="center" w={20} h={20} borderRadius="full" bg={emptyIconBg}>
              <Icon as={FiShoppingBag} boxSize={9} color={emptyIconColor} />
            </Flex>
            <Box textAlign="center">
              <Text fontSize="lg" fontWeight="700" mb={1}>No Orders Yet</Text>
              <Text fontSize="sm" color={emptyTextColor} maxW="280px">
                Customer orders will appear here once they start placing them.
              </Text>
            </Box>
          </Flex>
        ) : (
          <>
            <Box overflowX="auto">
              <Table variant="unstyled" size="md">
                <Thead>
                  <Tr bg={thBg}>
                    <Th py={3} px={5} fontSize="2xs" fontWeight="700" letterSpacing="wider" textTransform="uppercase" color={thColor} borderBottom="1px solid" borderColor={rowBorderColor}>
                      Order ID
                    </Th>
                    <Th py={3} px={5} fontSize="2xs" fontWeight="700" letterSpacing="wider" textTransform="uppercase" color={thColor} borderBottom="1px solid" borderColor={rowBorderColor}>
                      Customer
                    </Th>
                    <Th py={3} px={5} fontSize="2xs" fontWeight="700" letterSpacing="wider" textTransform="uppercase" color={thColor} borderBottom="1px solid" borderColor={rowBorderColor} isNumeric>
                      Items
                    </Th>
                    <Th py={3} px={5} fontSize="2xs" fontWeight="700" letterSpacing="wider" textTransform="uppercase" color={thColor} borderBottom="1px solid" borderColor={rowBorderColor} isNumeric>
                      Total
                    </Th>
                    <Th py={3} px={5} fontSize="2xs" fontWeight="700" letterSpacing="wider" textTransform="uppercase" color={thColor} borderBottom="1px solid" borderColor={rowBorderColor}>
                      Date
                    </Th>
                    <Th py={3} px={5} fontSize="2xs" fontWeight="700" letterSpacing="wider" textTransform="uppercase" color={thColor} borderBottom="1px solid" borderColor={rowBorderColor}>
                      Details
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {paginatedRows.map((row, idx) => (
                    <Tr
                      key={`${row.orderId}-${idx}`}
                      borderBottom="1px solid"
                      borderColor={rowBorderColor}
                      _hover={{ bg: rowHoverBg }}
                      transition="background 0.15s ease"
                      cursor="pointer"
                      onClick={() => handleRowClick(row)}
                    >
                      <Td py={3.5} px={5}>
                        <Text fontSize="sm" fontWeight="600" color={idColor} fontFamily="mono">
                          {shortId(row.orderId)}
                        </Text>
                      </Td>

                      <Td py={3.5} px={5}>
                        <Flex align="center" gap={3}>
                          <Avatar size="sm" name={row.customer} bg={avatarBg} color="accent.text" />
                          <VStack align="flex-start" spacing={0}>
                            <Text fontSize="sm" fontWeight="600" color={tdColor} lineHeight="shorter">
                              {row.customer}
                            </Text>
                            {row.email && (
                              <Text fontSize="xs" color={emailColor}>
                                {row.email}
                              </Text>
                            )}
                          </VStack>
                        </Flex>
                      </Td>

                      <Td py={3.5} px={5} isNumeric>
                        <Badge  variant="subtle" borderRadius="md" px={2} py={0.5} fontSize="xs" fontWeight="600">
                          {row.itemCount} {row.itemCount === 1 ? "item" : "items"}
                        </Badge>
                      </Td>

                      <Td py={3.5} px={5} isNumeric>
                        <Text fontSize="sm" fontWeight="700" color={amountColor}>
                          ${Number(row.total).toFixed(2)}
                        </Text>
                      </Td>

                      <Td py={3.5} px={5}>
                        <VStack align="flex-start" spacing={0}>
                          <Text fontSize="sm" color={dateColor}>
                            {formatDate(row.date)}
                          </Text>
                          {row.time && (
                            <Text fontSize="xs" color={emailColor}>
                              {row.time}
                            </Text>
                          )}
                        </VStack>
                      </Td>

                      <Td py={3.5} px={5}>
                        <Flex
                          align="center"
                          justify="center"
                          w={8}
                          h={8}
                          borderRadius="lg"
                          bg="accent.bg"
                          color="accent.solid"
                          _hover={{ bg: "accent.bg" }}
                          transition="all 0.15s"
                        >
                          <Icon as={FiEye} boxSize={4} />
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

            {totalPages > 1 && (
              <Box px={5} py={4} borderTop="1px solid" borderColor={rowBorderColor}>
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </Box>
            )}
          </>
        )}
      </Box>

      {/* ── Order Detail Modal ── */}
      <Modal isOpen={isOpen} onClose={handleModalClose} isCentered size="lg" scrollBehavior="inside">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="xl" overflow="hidden" maxH="85vh">
          <ModalHeader
            pb={3}
            borderBottom="1px solid"
            borderColor={dividerColor}
          >
            <Flex align="center" gap={3}>
              <Flex
                align="center"
                justify="center"
                w={9}
                h={9}
                borderRadius="lg"
                bg="accent.solid"
              >
                <Icon as={FiShoppingBag} color="white" boxSize={4} />
              </Flex>
              <Box>
                <Text fontSize="lg" fontWeight="700" lineHeight="shorter">
                  Order Details
                </Text>
                {selectedOrder && (
                  <Text fontSize="xs" fontFamily="mono" color={idColor} fontWeight="600">
                    {shortId(selectedOrder.orderId)}
                  </Text>
                )}
              </Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton top={4} right={4} />

          <ModalBody py={5} px={6}>
            {selectedOrder && (
              <VStack spacing={5} align="stretch">
                {/* Customer Info */}
                <Box>
                  <Text fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="wider" color={modalLabelColor} mb={3}>
                    Customer Information
                  </Text>
                  <VStack spacing={2.5} align="stretch">
                    <HStack spacing={3}>
                      <Icon as={FiUser} boxSize={4} color={modalLabelColor} />
                      <Text fontSize="sm" fontWeight="600" color={modalValueColor}>
                        {selectedOrder.customer}
                      </Text>
                    </HStack>
                    {selectedOrder.email && (
                      <HStack spacing={3}>
                        <Icon as={FiMail} boxSize={4} color={modalLabelColor} />
                        <Text fontSize="sm" color={modalValueColor}>
                          {selectedOrder.email}
                        </Text>
                      </HStack>
                    )}
                    {selectedOrder.address && (
                      <HStack spacing={3} align="flex-start">
                        <Icon as={FiMapPin} boxSize={4} color={modalLabelColor} mt={0.5} />
                        <Text fontSize="sm" color={modalValueColor}>
                          {selectedOrder.address}
                        </Text>
                      </HStack>
                    )}
                    <HStack spacing={3}>
                      <Icon as={FiCalendar} boxSize={4} color={modalLabelColor} />
                      <Text fontSize="sm" color={modalValueColor}>
                        {formatDate(selectedOrder.date)}
                        {selectedOrder.time ? ` at ${selectedOrder.time}` : ""}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>

                <Divider borderColor={dividerColor} />

                {/* Order Items */}
                <Box>
                  <Flex align="center" justify="space-between" mb={3}>
                    <Text fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="wider" color={modalLabelColor}>
                      Items ({selectedOrder.items.length})
                    </Text>
                    <Text fontSize="sm" fontWeight="700" color={amountColor}>
                      Total: ${Number(selectedOrder.total).toFixed(2)}
                    </Text>
                  </Flex>

                  <VStack spacing={3} align="stretch">
                    {selectedOrder.items.map((item, i) => {
                      const imgUrl = Array.isArray(item.images) ? item.images[0] : item.images;
                      return (
                        <Flex
                          key={i}
                          p={3}
                          bg={itemBg}
                          border="1px solid"
                          borderColor={itemBorder}
                          borderRadius="lg"
                          gap={3}
                          align="center"
                        >
                          {/* Item Image */}
                          <Box
                            w="56px"
                            h="56px"
                            borderRadius="md"
                            overflow="hidden"
                            border="1px solid"
                            borderColor={itemBorder}
                            flexShrink={0}
                          >
                            <Image
                              src={imgUrl}
                              alt={item.brand}
                              w="100%"
                              h="100%"
                              objectFit="cover"
                              fallback={
                                <Flex w="100%" h="100%" align="center" justify="center" bg={thBg}>
                                  <Icon as={FiPackage} boxSize={5} color={emailColor} />
                                </Flex>
                              }
                            />
                          </Box>

                          {/* Item Details */}
                          <Box flex={1} minW={0}>
                            <Text fontSize="sm" fontWeight="600" color={modalValueColor} noOfLines={1}>
                              {item.brand || "Product"}
                            </Text>
                            <HStack spacing={2} mt={1} flexWrap="wrap">
                              {item.size && (
                                <Badge variant="subtle"  fontSize="2xs" borderRadius="md">
                                  Size: {item.size}
                                </Badge>
                              )}
                              <Badge variant="subtle" colorScheme="gray" fontSize="2xs" borderRadius="md">
                                Qty: {item.quantity || 1}
                              </Badge>
                              {item.discount > 0 && (
                                <Badge variant="subtle" colorScheme="green" fontSize="2xs" borderRadius="md">
                                  -{item.discount}%
                                </Badge>
                              )}
                            </HStack>
                          </Box>

                          {/* Item Price */}
                          <VStack spacing={0} align="flex-end" flexShrink={0}>
                            <Text fontSize="sm" fontWeight="700" color={amountColor}>
                              ${Number(item.totalPrice || item.price * (item.quantity || 1)).toFixed(2)}
                            </Text>
                            {(item.quantity || 1) > 1 && (
                              <Text fontSize="2xs" color={emailColor}>
                                ${Number(item.price).toFixed(2)} each
                              </Text>
                            )}
                          </VStack>
                        </Flex>
                      );
                    })}
                  </VStack>
                </Box>

                {/* Grand Total */}
                <Flex
                  p={4}
                  bg="accent.bg"
                  borderRadius="lg"
                  align="center"
                  justify="space-between"
                >
                  <Text fontSize="sm" fontWeight="600" color="accent.text">
                    Grand Total
                  </Text>
                  <Text fontSize="xl" fontWeight="800" color="accent.text">
                    ${Number(selectedOrder.total).toFixed(2)}
                  </Text>
                </Flex>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default OrderTable;
