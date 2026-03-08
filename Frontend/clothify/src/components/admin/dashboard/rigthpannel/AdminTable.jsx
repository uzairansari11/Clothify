import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
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
  Th,
  Thead,
  Tr,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiEdit2, FiShield, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteAdmin,
  handleGetAdmin,
  handleUpdateAdmin,
} from "../../../../redux/Admin_Redux/admins/action";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 10;

const AdminTable = () => {
  const { admins } = useSelector((store) => store.adminReducer);
  const dispatch = useDispatch();
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [page, setPage] = useState(1);

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

  // All useColorModeValue calls at top level
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const headerColor = useColorModeValue("gray.500", "gray.400");
  const tableBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const rowHoverBg = useColorModeValue("gray.50", "gray.700");
  const nameColor = useColorModeValue("gray.800", "white");
  const emailColor = useColorModeValue("gray.500", "gray.400");
  const phoneColor = useColorModeValue("gray.600", "gray.300");
  const emptyIconColor = useColorModeValue("gray.300", "gray.600");
  const emptyTextColor = useColorModeValue("gray.500", "gray.400");
  const sectionBg = useColorModeValue("white", "gray.800");
  const sectionBorderColor = useColorModeValue("gray.200", "gray.700");
  const inputFocusBorder = useColorModeValue("blue.400", "blue.300");
  const shieldBg = useColorModeValue("blue.50", "blue.900");

  const totalPages = Math.ceil(admins.length / ITEMS_PER_PAGE);
  const paginatedAdmins = admins.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => setPage(newPage);

  useEffect(() => {
    dispatch(handleGetAdmin());
  }, []);

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    onEditOpen();
  };

  const handleDelete = (admin) => {
    setSelectedAdmin(admin);
    onDeleteOpen();
  };

  const handleEditConfirm = () => {
    const payload = {
      name: selectedAdmin.name,
      email: selectedAdmin.email,
      mobile: selectedAdmin.mobile,
    };
    dispatch(handleUpdateAdmin(selectedAdmin._id, payload));
    onEditClose();
    setSelectedAdmin(null);
  };

  const handleDeleteConfirm = () => {
    dispatch(handleDeleteAdmin(selectedAdmin._id));
    onDeleteClose();
    setSelectedAdmin(null);
  };

  const handleEditClose = () => {
    onEditClose();
    setSelectedAdmin(null);
  };

  const handleDeleteClose = () => {
    onDeleteClose();
    setSelectedAdmin(null);
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

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
            bg={shieldBg}
            borderRadius="lg"
          >
            <FiShield size={18} color="#3182CE" />
          </Flex>
          <Text fontSize="lg" fontWeight="600" color={nameColor}>
            Admin Management
          </Text>
        </HStack>
        <Badge
          colorScheme="blue"
          variant="subtle"
          borderRadius="full"
          px={3}
          py={1}
          fontSize="sm"
          fontWeight="600"
        >
          {admins.length} {admins.length === 1 ? "Admin" : "Admins"}
        </Badge>
      </Flex>

      {/* Table */}
      <Box overflowX="auto">
        <Table variant="unstyled" size="md">
          <Thead bg={headerBg}>
            <Tr>
              <Th
                color={headerColor}
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.08em"
                textTransform="uppercase"
                py={3}
                px={6}
              >
                Admin
              </Th>
              <Th
                color={headerColor}
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.08em"
                textTransform="uppercase"
                py={3}
                px={6}
              >
                Phone
              </Th>
              <Th
                color={headerColor}
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.08em"
                textTransform="uppercase"
                py={3}
                px={6}
              >
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedAdmins.map((admin) => (
              <Tr
                key={admin._id}
                borderTop="1px solid"
                borderColor={borderColor}
                _hover={{ bg: rowHoverBg }}
                transition="background 0.15s"
              >
                <Td px={6} py={4}>
                  <HStack spacing={3}>
                    <Avatar
                      size="sm"
                      name={admin.name}
                      getInitials={getInitials}
                      bg="blue.400"
                      color="white"
                      fontWeight="600"
                      fontSize="xs"
                    />
                    <VStack align="start" spacing={0}>
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color={nameColor}
                        lineHeight="1.3"
                      >
                        {admin.name}
                      </Text>
                      <Text fontSize="xs" color={emailColor} lineHeight="1.3">
                        {admin.email}
                      </Text>
                    </VStack>
                  </HStack>
                </Td>
                <Td px={6} py={4}>
                  <Text fontSize="sm" color={phoneColor}>
                    {admin.mobile || "—"}
                  </Text>
                </Td>
                <Td px={6} py={4}>
                  <HStack spacing={2}>
                    <IconButton
                      aria-label="Edit admin"
                      icon={<FiEdit2 size={15} />}
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                      borderRadius="md"
                      onClick={() => handleEdit(admin)}
                      _hover={{ bg: "blue.50" }}
                    />
                    <IconButton
                      aria-label="Delete admin"
                      icon={<FiTrash2 size={15} />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      borderRadius="md"
                      onClick={() => handleDelete(admin)}
                      _hover={{ bg: "red.50" }}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Empty State */}
        {admins.length === 0 && (
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
              <FiShield size={28} color={emptyIconColor} />
            </Flex>
            <Text fontSize="md" fontWeight="600" color={emptyTextColor}>
              No admins found
            </Text>
            <Text fontSize="sm" color={emptyTextColor}>
              Admin accounts will appear here once created.
            </Text>
          </Flex>
        )}
      </Box>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box px={6} py={4} borderTop="1px solid" borderColor={borderColor}>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      )}

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={handleEditClose} isCentered size="md">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="xl" overflow="hidden">
          <ModalHeader
            fontSize="lg"
            fontWeight="700"
            pb={3}
            borderBottom="1px solid"
            borderColor={borderColor}
          >
            Edit Admin
          </ModalHeader>
          <ModalCloseButton top={4} right={4} />
          <ModalBody py={6}>
            <VStack spacing={5}>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="600" color={headerColor} mb={1}>
                  Full Name
                </FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={selectedAdmin?.name || ""}
                  onChange={(e) =>
                    setSelectedAdmin((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter full name"
                  borderRadius="lg"
                  size="md"
                  focusBorderColor={inputFocusBorder}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="600" color={headerColor} mb={1}>
                  Email Address
                </FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={selectedAdmin?.email || ""}
                  onChange={(e) =>
                    setSelectedAdmin((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Enter email address"
                  borderRadius="lg"
                  size="md"
                  focusBorderColor={inputFocusBorder}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="600" color={headerColor} mb={1}>
                  Phone Number
                </FormLabel>
                <Input
                  type="text"
                  name="mobile"
                  value={selectedAdmin?.mobile || ""}
                  onChange={(e) =>
                    setSelectedAdmin((prev) => ({ ...prev, mobile: e.target.value }))
                  }
                  placeholder="Enter phone number"
                  borderRadius="lg"
                  size="md"
                  focusBorderColor={inputFocusBorder}
                />
              </FormControl>
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
              onClick={handleEditClose}
              borderRadius="lg"
              fontWeight="600"
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleEditConfirm}
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
        onClose={handleDeleteClose}
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
              Delete Admin
            </AlertDialogHeader>
            <AlertDialogBody py={5}>
              <Text fontSize="sm" color={phoneColor}>
                Are you sure you want to delete{" "}
                <Text as="span" fontWeight="600" color={nameColor}>
                  {selectedAdmin?.name}
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
                onClick={handleDeleteClose}
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
                Delete Admin
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default AdminTable;
