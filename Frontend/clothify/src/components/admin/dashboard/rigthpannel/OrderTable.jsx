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
import SearchInput from "../../../common/SearchInput";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 10;

const formatDate = (dateStr) => {
  if (!dateStr) return "\u2014";
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
  const { orderData, isLoading, isError, totalCount } = useSelector(
    (store) => store.adminOrderReducer
  );
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // All useColorModeValue at top level
  const sectionBg      = useColorModeValue("white",      "gray.800");
  const sectionBorder  = useColorModeValue("gray.200",   "gray.700");
  const headerBg       = useColorModeValue("gray.50",    "gray.700");
  const headerColor    = useColorModeValue("gray.500",   "gray.400");
  const borderColor    = useColorModeValue("gray.100",   "gray.700");
  const nameColor      = useColorModeValue("gray.800",   "white");
  const emailColor     = useColorModeValue("gray.500",   "gray.400");
  const phoneColor     = useColorModeValue("gray.600",   "gray.300");
  const rowHoverBg     = useColorModeValue("gray.50",    "gray.700");
  const emptyTextColor = useColorModeValue("gray.500",   "gray.400");
  const emptyIconColor = useColorModeValue("gray.300",   "gray.600");
  const amountColor    = useColorModeValue("green.600",  "green.300");
  const idColor        = "accent.text";
  const modalLabelColor = useColorModeValue("gray.500",  "gray.400");
  const modalValueColor = useColorModeValue("gray.800",  "white");
  const itemBg         = useColorModeValue("gray.50",    "gray.700");
  const itemBorder     = useColorModeValue("gray.100",   "gray.600");
  const dividerColor   = useColorModeValue("gray.200",   "gray.600");

  useEffect(() => {
    dispatch(handleGetOrderData({ page, limit: ITEMS_PER_PAGE, search: debouncedSearch }));
  }, [page, debouncedSearch, dispatch]);

  // Map order data to display rows (backend handles pagination & search)
  const rows = Array.isArray(orderData)
    ? orderData.map((order) => ({
        orderId:   order?._id || "",
        customer:  order?.name || "Unknown",
        email:     order?.email || "",
        address:   order?.address || "",
        items:     Array.isArray(order?.items) ? order.items : [],
        itemCount: Array.isArray(order?.items) ? order.items.length : 0,
        total:     order?.grandTotal ?? 0,
        date:      order?.date || "",
        time:      order?.time || "",
      }))
    : [];

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const handlePageChange = (newPage) => setPage(newPage);

  const handleRowClick = (row) => {
    setSelectedOrder(row);
    onOpen();
  };

  const handleModalClose = () => {
    onClose();
    setSelectedOrder(null);
  };

  return (
    <Box
      bg={sectionBg}
      borderRadius="xl"
      border="1px solid"
      borderColor={sectionBorder}
      overflow="hidden"
      boxShadow="sm"
    >
      {/* Section Header */}
      <Flex
        align="center"
        justify="space-between"
        px={6}
        py={4}
        borderBottom="1px solid"
        borderColor={borderColor}
      >
        <HStack spacing={3}>
          <Flex
            align="center"
            justify="center"
            w={9}
            h={9}
            bg="accent.bg"
            borderRadius="lg"
          >
            <FiShoppingBag size={18} color="var(--chakra-colors-accent-solid)" />
          </Flex>
          <Text fontSize="lg" fontWeight="600" color={nameColor}>
            Order Management
          </Text>
        </HStack>
        <Badge
          variant="subtle"
          borderRadius="full"
          px={3}
          py={1}
          fontSize="sm"
          fontWeight="600"
        >
          {totalCount} {totalCount === 1 ? "Order" : "Orders"}
        </Badge>
      </Flex>

      {/* Search Bar */}
      <Flex px={6} py={3} borderBottom="1px solid" borderColor={borderColor}>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={(val) => { setPage(1); setDebouncedSearch(val); }}
          placeholder="Search by customer, email, or order ID..."
        />
      </Flex>

      {/* Loading State */}
      {isLoading && (
        <Flex align="center" justify="center" py={16} gap={3}>
          <Spinner size="md" color="accent.solid" thickness="2px" />
          <Text fontSize="sm" color={emptyTextColor} fontWeight="500">Loading orders...</Text>
        </Flex>
      )}

      {/* Error State */}
      {isError && !isLoading && (
        <Flex direction="column" align="center" justify="center" py={16} gap={3}>
          <Flex align="center" justify="center" w={16} h={16} bg="red.50" borderRadius="full">
            <Icon as={FiShoppingBag} boxSize={7} color="red.400" />
          </Flex>
          <Text fontSize="md" fontWeight="600" color="red.500">Failed to load orders</Text>
          <Text fontSize="sm" color={emptyTextColor}>Please refresh or try again.</Text>
        </Flex>
      )}

      {/* Table */}
      {!isLoading && !isError && <Box overflowX="auto">
        <Table variant="unstyled" size="md">
          <Thead bg={headerBg}>
            <Tr>
              <Th color={headerColor} fontSize="xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" py={3} px={6}>
                Order ID
              </Th>
              <Th color={headerColor} fontSize="xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" py={3} px={6}>
                Customer
              </Th>
              <Th color={headerColor} fontSize="xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" py={3} px={6} isNumeric>
                Items
              </Th>
              <Th color={headerColor} fontSize="xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" py={3} px={6} isNumeric>
                Total
              </Th>
              <Th color={headerColor} fontSize="xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" py={3} px={6}>
                Date
              </Th>
              <Th color={headerColor} fontSize="xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" py={3} px={6}>
                Details
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row, idx) => (
              <Tr
                key={`${row.orderId}-${idx}`}
                borderTop="1px solid"
                borderColor={borderColor}
                _hover={{ bg: rowHoverBg }}
                transition="background 0.15s"
                cursor="pointer"
                onClick={() => handleRowClick(row)}
              >
                <Td px={6} py={4}>
                  <Text fontSize="sm" fontWeight="600" color={idColor} fontFamily="mono">
                    {shortId(row.orderId)}
                  </Text>
                </Td>
                <Td px={6} py={4}>
                  <Flex align="center" gap={3}>
                    <Avatar size="sm" name={row.customer} bg="accent.solid" color="white" fontWeight="600" fontSize="xs" />
                    <VStack align="flex-start" spacing={0}>
                      <Text fontSize="sm" fontWeight="600" color={nameColor} lineHeight="1.3">
                        {row.customer}
                      </Text>
                      {row.email && (
                        <Text fontSize="xs" color={emailColor} lineHeight="1.3">
                          {row.email}
                        </Text>
                      )}
                    </VStack>
                  </Flex>
                </Td>
                <Td px={6} py={4} isNumeric>
                  <Badge variant="subtle" borderRadius="md" px={2} py={0.5} fontSize="xs" fontWeight="600">
                    {row.itemCount} {row.itemCount === 1 ? "item" : "items"}
                  </Badge>
                </Td>
                <Td px={6} py={4} isNumeric>
                  <Text fontSize="sm" fontWeight="700" color={amountColor}>
                    ${Number(row.total).toFixed(2)}
                  </Text>
                </Td>
                <Td px={6} py={4}>
                  <VStack align="flex-start" spacing={0}>
                    <Text fontSize="sm" color={phoneColor}>
                      {formatDate(row.date)}
                    </Text>
                    {row.time && (
                      <Text fontSize="xs" color={emailColor}>
                        {row.time}
                      </Text>
                    )}
                  </VStack>
                </Td>
                <Td px={6} py={4}>
                  <Flex
                    align="center"
                    justify="center"
                    w={8}
                    h={8}
                    borderRadius="lg"
                    bg="accent.bg"
                    color="accent.solid"
                    transition="all 0.15s"
                  >
                    <Icon as={FiEye} boxSize={4} />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Empty State */}
        {rows.length === 0 && (
          <Flex direction="column" align="center" justify="center" py={16} gap={3}>
            <Flex align="center" justify="center" w={16} h={16} bg={headerBg} borderRadius="full">
              <FiShoppingBag size={28} color={emptyIconColor} />
            </Flex>
            <Text fontSize="md" fontWeight="600" color={emptyTextColor}>
              No orders found
            </Text>
            <Text fontSize="sm" color={emptyTextColor}>
              {searchQuery ? "Try adjusting your search." : "Orders will appear here once customers place them."}
            </Text>
          </Flex>
        )}
      </Box>}

      {/* Pagination */}
      {!isLoading && !isError && totalPages > 1 && (
        <Box px={6} py={4} borderTop="1px solid" borderColor={borderColor}>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      )}

      {/* Order Detail Modal */}
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
                                <Flex w="100%" h="100%" align="center" justify="center" bg={headerBg}>
                                  <Icon as={FiPackage} boxSize={5} color={emailColor} />
                                </Flex>
                              }
                            />
                          </Box>
                          <Box flex={1} minW={0}>
                            <Text fontSize="sm" fontWeight="600" color={modalValueColor} noOfLines={1}>
                              {item.brand || "Product"}
                            </Text>
                            <HStack spacing={2} mt={1} flexWrap="wrap">
                              {item.size && (
                                <Badge variant="subtle" fontSize="2xs" borderRadius="md">
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
