import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState, useCallback } from "react";
import { FiEdit2, FiPackage, FiSearch, FiTrash2, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  handleDeleteProductData,
  handleProductData,
  handleUpdateProductData,
} from "../../../../redux/Admin_Redux/admin_products/action";
import Pagination from "./Pagination";
import ConfirmDialog from "../../../common/ConfirmDialog";
import EditModal from "../../../common/EditModal";
import FormField from "../../../common/FormField";

// Row-level component that holds its own modal state
// All useColorModeValue calls are at the top level of this component
const ProductRow = ({ product, headerBg, borderColor, rowHoverBg, nameColor, emailColor, phoneColor, priceColor, onDelete, onUpdate }) => {
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [editFields, setEditFields] = useState({
    editTitle: product.title,
    editDescription: product.description,
    editPrice: product.price,
    editDiscount: product.discount,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    const payload = {
      title: editFields.editTitle,
      description: editFields.editDescription,
      price: editFields.editPrice,
      discount: editFields.editDiscount,
    };
    onUpdate(product._id, payload);
    onEditClose();
  };

  const handleDeleteConfirm = () => {
    onDelete(product._id);
    onDeleteClose();
  };

  const imageUrl = Array.isArray(product.images) ? product.images[0] : product.images;

  return (
    <>
      <Tr
        borderTop="1px solid"
        borderColor={borderColor}
        _hover={{ bg: rowHoverBg }}
        transition="background 0.15s"
      >
        {/* Image */}
        <Td px={4} py={3}>
          <Box
            w="52px"
            h="52px"
            borderRadius="lg"
            overflow="hidden"
            border="1px solid"
            borderColor={borderColor}
            flexShrink={0}
          >
            <Image
              src={imageUrl}
              alt={product.title}
              w="100%"
              h="100%"
              objectFit="cover"
              fallback={
                <Flex w="100%" h="100%" align="center" justify="center" bg={headerBg}>
                  <FiPackage size={18} color={emailColor} />
                </Flex>
              }
            />
          </Box>
        </Td>

        {/* Title */}
        <Td px={4} py={3} maxW="180px">
          <Text
            fontSize="sm"
            fontWeight="600"
            color={nameColor}
            noOfLines={2}
            lineHeight="1.4"
          >
            {product.title}
          </Text>
        </Td>

        {/* Brand */}
        <Td px={4} py={3}>
          <Text fontSize="sm" color={phoneColor}>
            {product.brand || "—"}
          </Text>
        </Td>

        {/* Category */}
        <Td px={4} py={3}>
          <Badge
            variant="subtle"
            borderRadius="full"
            px={2}
            py={0.5}
            fontSize="xs"
            fontWeight="600"
            textTransform="capitalize"
          >
            {product.category || "—"}
          </Badge>
        </Td>

        {/* Price */}
        <Td px={4} py={3}>
          <Text fontSize="sm" fontWeight="700" color={priceColor}>
            ${product.price}
          </Text>
        </Td>

        {/* Discount */}
        <Td px={4} py={3}>
          {product.discount ? (
            <Badge
              colorScheme="green"
              variant="subtle"
              borderRadius="full"
              px={2}
              py={0.5}
              fontSize="xs"
              fontWeight="600"
            >
              -{product.discount}%
            </Badge>
          ) : (
            <Text fontSize="sm" color={emailColor}>
              —
            </Text>
          )}
        </Td>

        {/* Actions */}
        <Td px={4} py={3}>
          <HStack spacing={1}>
            <IconButton
              aria-label="Edit product"
              icon={<FiEdit2 size={14} />}
              size="sm"
              variant="ghost"
              borderRadius="md"
              onClick={onEditOpen}
              _hover={{ bg: "accent.bg" }}
            />
            <IconButton
              aria-label="Delete product"
              icon={<FiTrash2 size={14} />}
              size="sm"
              variant="ghost"
              colorScheme="red"
              borderRadius="md"
              onClick={onDeleteOpen}
              _hover={{ bg: "red.50" }}
            />
          </HStack>
        </Td>
      </Tr>

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        onSave={handleEditSave}
        title="Edit Product"
      >
        <FormField
          label="Title"
          name="editTitle"
          value={editFields.editTitle}
          onChange={handleInputChange}
          placeholder="Enter product title"
        />
        <FormField
          label="Description"
          name="editDescription"
          type="textarea"
          value={editFields.editDescription}
          onChange={handleInputChange}
          placeholder="Enter product description"
          rows={3}
        />
        <HStack spacing={4} w="100%">
          <FormField
            label="Price ($)"
            name="editPrice"
            type="number"
            value={editFields.editPrice}
            onChange={handleInputChange}
            placeholder="0.00"
          />
          <FormField
            label="Discount (%)"
            name="editDiscount"
            type="number"
            value={editFields.editDiscount}
            onChange={handleInputChange}
            placeholder="0"
          />
        </HStack>
      </EditModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        itemName={product.title}
        confirmLabel="Delete Product"
      />
    </>
  );
};

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialLimit    = Number(searchParams.get("limit")) || 10;
  const initialPage     = Number(searchParams.get("page")) || 1;
  const initialSearch   = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialSort     = searchParams.get("sortOrder") || "";
  const [page, setPage]               = useState(initialPage);
  const [limit]                        = useState(initialLimit);
  const [search, setSearch]           = useState(initialSearch);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [category, setCategory]       = useState(initialCategory);
  const [sortOrder, setSortOrder]     = useState(initialSort);

  const { products, totalCount, isLoading, isError } = useSelector(
    (store) => store.adminProductReducer
  );
  const dispatch = useDispatch();

  // All useColorModeValue calls at top level of Products component
  const headerBg           = useColorModeValue("gray.50", "gray.700");
  const headerColor        = useColorModeValue("gray.500", "gray.400");
  const borderColor        = useColorModeValue("gray.100", "gray.700");
  const rowHoverBg         = useColorModeValue("gray.50", "gray.700");
  const nameColor          = useColorModeValue("gray.800", "white");
  const emailColor         = useColorModeValue("gray.500", "gray.400");
  const phoneColor         = useColorModeValue("gray.600", "gray.300");
  const priceColor         = useColorModeValue("green.600", "green.300");
  const sectionBg          = useColorModeValue("white", "gray.800");
  const sectionBorderColor = useColorModeValue("gray.200", "gray.700");
  const inputFocusBorder   = "accent.solid";
  const emptyIconColor     = useColorModeValue("gray.300", "gray.600");
  const emptyTextColor     = useColorModeValue("gray.500", "gray.400");
  const filterInputBg      = useColorModeValue("gray.50", "gray.700");
  const filterInputBorder  = useColorModeValue("gray.200", "gray.600");

  const totalPages = Math.ceil(totalCount / limit);

  const handlePageChange = (data) => {
    setPage(data);
  };

  const handleDelete = (id) => {
    dispatch(handleDeleteProductData(id));
  };

  const handleUpdate = (id, payload) => {
    dispatch(handleUpdateProductData(id, payload));
  };

  const handleSearch = useCallback(() => {
    setSearch(searchInput);
    setPage(1);
  }, [searchInput]);

  const handleClearFilters = () => {
    setSearchInput("");
    setSearch("");
    setCategory("");
    setSortOrder("");
    setPage(1);
  };

  const hasActiveFilters = search || category || sortOrder;

  useEffect(() => {
    const params = { limit, page };
    if (search) params.search = search;
    if (category) params.category = category;
    if (sortOrder) {
      params.sortField = "price";
      params.sortOrder = sortOrder;
    }
    setSearchParams(params);
    dispatch(handleProductData(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, category, sortOrder]);

  return (
    <Box
      bg={sectionBg}
      borderRadius="xl"
      border="1px solid"
      borderColor={sectionBorderColor}
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
            <FiPackage size={18} color="var(--chakra-colors-accent-solid)" />
          </Flex>
          <Text fontSize="lg" fontWeight="600" color={nameColor}>
            Product Management
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
          {totalCount} {totalCount === 1 ? "Product" : "Products"}
        </Badge>
      </Flex>

      {/* Filter Bar */}
      <Flex
        px={6}
        py={3}
        gap={3}
        borderBottom="1px solid"
        borderColor={borderColor}
        align="center"
        wrap="wrap"
      >
        <InputGroup maxW="280px" size="sm">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color={emailColor} boxSize={3.5} />
          </InputLeftElement>
          <Input
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            bg={filterInputBg}
            border="1px solid"
            borderColor={filterInputBorder}
            borderRadius="lg"
            fontSize="sm"
            _focus={{ borderColor: inputFocusBorder, boxShadow: `0 0 0 1px var(--chakra-colors-accent-solid)` }}
          />
          {searchInput && (
            <InputRightElement>
              <IconButton
                aria-label="Clear search"
                icon={<FiX size={12} />}
                size="xs"
                variant="ghost"
                onClick={() => { setSearchInput(""); setSearch(""); setPage(1); }}
              />
            </InputRightElement>
          )}
        </InputGroup>

        <Select
          size="sm"
          maxW="150px"
          borderRadius="lg"
          bg={filterInputBg}
          border="1px solid"
          borderColor={filterInputBorder}
          fontSize="sm"
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          _focus={{ borderColor: inputFocusBorder }}
        >
          <option value="">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </Select>

        <Select
          size="sm"
          maxW="160px"
          borderRadius="lg"
          bg={filterInputBg}
          border="1px solid"
          borderColor={filterInputBorder}
          fontSize="sm"
          value={sortOrder}
          onChange={(e) => { setSortOrder(e.target.value); setPage(1); }}
          _focus={{ borderColor: inputFocusBorder }}
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </Select>

        <Button
          size="sm"
          borderRadius="lg"
          fontWeight="600"
          onClick={handleSearch}
          px={4}
        >
          Search
        </Button>

        {hasActiveFilters && (
          <Button
            size="sm"
            variant="ghost"
            colorScheme="red"
            borderRadius="lg"
            fontWeight="600"
            onClick={handleClearFilters}
            leftIcon={<FiX size={14} />}
          >
            Clear
          </Button>
        )}
      </Flex>

      {/* Loading State */}
      {isLoading && (
        <Flex align="center" justify="center" py={16} gap={3}>
          <Spinner size="md" color="accent.solid" thickness="2px" />
          <Text fontSize="sm" color={emptyTextColor} fontWeight="500">Loading products...</Text>
        </Flex>
      )}

      {/* Error State */}
      {isError && !isLoading && (
        <Flex direction="column" align="center" justify="center" py={16} gap={3}>
          <Flex align="center" justify="center" w={16} h={16} bg="red.50" borderRadius="full">
            <Icon as={FiPackage} boxSize={7} color="red.400" />
          </Flex>
          <Text fontSize="md" fontWeight="600" color="red.500">Failed to load products</Text>
          <Text fontSize="sm" color={emptyTextColor}>Please refresh or try again.</Text>
        </Flex>
      )}

      {/* Table */}
      {!isLoading && !isError && (
        <Box overflowX="auto">
          <Table variant="unstyled" size="sm">
            <Thead bg={headerBg}>
              <Tr>
                <Th color={headerColor} fontSize="xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" py={3} px={4} w="72px">
                  Image
                </Th>
                <Th color={headerColor} fontSize="xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" py={3} px={4}>
                  Title
                </Th>
                <Th color={headerColor} fontSize="xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" py={3} px={4}>
                  Brand
                </Th>
                <Th color={headerColor} fontSize="xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" py={3} px={4}>
                  Category
                </Th>
                <Th color={headerColor} fontSize="xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" py={3} px={4}>
                  Price
                </Th>
                <Th color={headerColor} fontSize="xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" py={3} px={4}>
                  Discount
                </Th>
                <Th color={headerColor} fontSize="xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" py={3} px={4}>
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <ProductRow
                  key={product._id}
                  product={product}
                  headerBg={headerBg}
                  borderColor={borderColor}
                  rowHoverBg={rowHoverBg}
                  nameColor={nameColor}
                  emailColor={emailColor}
                  phoneColor={phoneColor}
                  priceColor={priceColor}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))}
            </Tbody>
          </Table>

          {/* Empty State */}
          {products.length === 0 && (
            <Flex direction="column" align="center" justify="center" py={16} gap={3}>
              <Flex align="center" justify="center" w={16} h={16} bg={headerBg} borderRadius="full">
                <FiPackage size={28} color={emptyIconColor} />
              </Flex>
              <Text fontSize="md" fontWeight="600" color={emptyTextColor}>
                No products found
              </Text>
              <Text fontSize="sm" color={emptyTextColor}>
                {hasActiveFilters
                  ? "Try adjusting your filters."
                  : "Products will appear here once added to the catalog."}
              </Text>
              {hasActiveFilters && (
                <Button size="sm" variant="ghost" onClick={handleClearFilters} leftIcon={<FiX size={14} />}>
                  Clear filters
                </Button>
              )}
            </Flex>
          )}
        </Box>
      )}

      {/* Pagination */}
      {!isLoading && !isError && totalPages > 1 && (
        <Box
          borderTop="1px solid"
          borderColor={borderColor}
          px={6}
          py={4}
        >
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </Box>
      )}
    </Box>
  );
};
