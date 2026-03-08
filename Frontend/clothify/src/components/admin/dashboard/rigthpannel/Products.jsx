import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiEdit2, FiPackage, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  handleDeleteProductData,
  handleProductData,
  handleUpdateProductData,
} from "../../../../redux/Admin_Redux/admin_products/action";
import Pagination from "./Pagination";

// Row-level component that holds its own modal state
// All useColorModeValue calls are at the top level of this component
const ProductRow = ({ product, headerBg, borderColor, rowHoverBg, nameColor, emailColor, phoneColor, priceColor, sectionBorderColor, inputFocusBorder, onDelete, onUpdate }) => {
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

  const cancelRef = React.useRef();

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
      <Modal isOpen={isEditOpen} onClose={onEditClose} isCentered size="md">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="xl" overflow="hidden">
          <ModalHeader
            fontSize="lg"
            fontWeight="700"
            pb={3}
            borderBottom="1px solid"
            borderColor={borderColor}
          >
            Edit Product
          </ModalHeader>
          <ModalCloseButton top={4} right={4} />
          <ModalBody py={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="600" color={emailColor} mb={1}>
                  Title
                </FormLabel>
                <Input
                  name="editTitle"
                  value={editFields.editTitle}
                  onChange={handleInputChange}
                  placeholder="Enter product title"
                  borderRadius="lg"
                  focusBorderColor={inputFocusBorder}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="600" color={emailColor} mb={1}>
                  Description
                </FormLabel>
                <Textarea
                  name="editDescription"
                  value={editFields.editDescription}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  borderRadius="lg"
                  focusBorderColor={inputFocusBorder}
                  rows={3}
                  resize="vertical"
                />
              </FormControl>
              <HStack spacing={4} w="100%">
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="600" color={emailColor} mb={1}>
                    Price ($)
                  </FormLabel>
                  <Input
                    name="editPrice"
                    value={editFields.editPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    borderRadius="lg"
                    focusBorderColor={inputFocusBorder}
                    type="number"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="600" color={emailColor} mb={1}>
                    Discount (%)
                  </FormLabel>
                  <Input
                    name="editDiscount"
                    value={editFields.editDiscount}
                    onChange={handleInputChange}
                    placeholder="0"
                    borderRadius="lg"
                    focusBorderColor={inputFocusBorder}
                    type="number"
                  />
                </FormControl>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter
            gap={3}
            borderTop="1px solid"
            borderColor={borderColor}
            pt={4}
          >
            <Button
              variant="ghost"
              onClick={onEditClose}
              borderRadius="lg"
              fontWeight="600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditSave}
              borderRadius="lg"
              fontWeight="600"
              px={6}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
        isCentered
      >
        <AlertDialogOverlay backdropFilter="blur(4px)">
          <AlertDialogContent borderRadius="xl">
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="700"
              borderBottom="1px solid"
              borderColor={borderColor}
              pb={3}
            >
              Delete Product
            </AlertDialogHeader>
            <AlertDialogBody py={5}>
              <Text fontSize="sm" color={phoneColor}>
                Are you sure you want to delete{" "}
                <Text as="span" fontWeight="600" color={nameColor}>
                  {product.title}
                </Text>
                ? This action cannot be undone.
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter
              gap={3}
              borderTop="1px solid"
              borderColor={borderColor}
              pt={4}
            >
              <Button
                ref={cancelRef}
                variant="ghost"
                onClick={onDeleteClose}
                borderRadius="lg"
                fontWeight="600"
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDeleteConfirm}
                borderRadius="lg"
                fontWeight="600"
                px={6}
              >
                Delete Product
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialLimit = Number(searchParams.get("limit")) || 10;
  const initialPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);

  const { products, totalCount } = useSelector(
    (store) => store.adminProductReducer
  );
  const dispatch = useDispatch();

  // All useColorModeValue calls at top level of Products component
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const headerColor = useColorModeValue("gray.500", "gray.400");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const rowHoverBg = useColorModeValue("gray.50", "gray.700");
  const nameColor = useColorModeValue("gray.800", "white");
  const emailColor = useColorModeValue("gray.500", "gray.400");
  const phoneColor = useColorModeValue("gray.600", "gray.300");
  const priceColor = useColorModeValue("green.600", "green.300");
  const sectionBg = useColorModeValue("white", "gray.800");
  const sectionBorderColor = useColorModeValue("gray.200", "gray.700");
  const inputFocusBorder = "accent.solid";
  const emptyIconColor = useColorModeValue("gray.300", "gray.600");
  const emptyTextColor = useColorModeValue("gray.500", "gray.400");

  const totalPages = Math.ceil(totalCount / limit);

  const handlePageChange = (data) => {
    setPage(data);
    setSearchParams({ page: data, limit });
  };

  const handleDelete = (id) => {
    dispatch(handleDeleteProductData(id));
  };

  const handleUpdate = (id, payload) => {
    dispatch(handleUpdateProductData(id, payload));
  };

  useEffect(() => {
    const params = { limit, page };
    setSearchParams(params);
    dispatch(handleProductData(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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

      {/* Table */}
      <Box overflowX="auto">
        <Table variant="unstyled" size="sm">
          <Thead bg={headerBg}>
            <Tr>
              <Th
                color={headerColor}
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.08em"
                textTransform="uppercase"
                py={3}
                px={4}
                w="72px"
              >
                Image
              </Th>
              <Th
                color={headerColor}
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.08em"
                textTransform="uppercase"
                py={3}
                px={4}
              >
                Title
              </Th>
              <Th
                color={headerColor}
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.08em"
                textTransform="uppercase"
                py={3}
                px={4}
              >
                Brand
              </Th>
              <Th
                color={headerColor}
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.08em"
                textTransform="uppercase"
                py={3}
                px={4}
              >
                Category
              </Th>
              <Th
                color={headerColor}
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.08em"
                textTransform="uppercase"
                py={3}
                px={4}
              >
                Price
              </Th>
              <Th
                color={headerColor}
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.08em"
                textTransform="uppercase"
                py={3}
                px={4}
              >
                Discount
              </Th>
              <Th
                color={headerColor}
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.08em"
                textTransform="uppercase"
                py={3}
                px={4}
              >
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
                sectionBorderColor={sectionBorderColor}
                inputFocusBorder={inputFocusBorder}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </Tbody>
        </Table>

        {/* Empty State */}
        {products.length === 0 && (
          <Flex
            direction="column"
            align="center"
            justify="center"
            py={16}
            gap={3}
          >
            <Flex
              align="center"
              justify="center"
              w={16}
              h={16}
              bg={headerBg}
              borderRadius="full"
            >
              <FiPackage size={28} color={emptyIconColor} />
            </Flex>
            <Text fontSize="md" fontWeight="600" color={emptyTextColor}>
              No products found
            </Text>
            <Text fontSize="sm" color={emptyTextColor}>
              Products will appear here once added to the catalog.
            </Text>
          </Flex>
        )}
      </Box>

      {/* Pagination */}
      {totalPages > 1 && (
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
