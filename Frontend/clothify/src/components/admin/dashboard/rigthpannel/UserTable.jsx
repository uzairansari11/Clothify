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
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FiEdit2, FiTrash2, FiUsers } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteUser,
  handleGetUser,
  handleUpdateUser,
} from "../../../../redux/Admin_Redux/users/action";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 10;

const UserTable = () => {
  const { users } = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [page, setPage] = useState(1);
  const cancelRef = useRef();

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
  const inputFocusBorder = "accent.solid";

  const onDelete = (id) => {
    dispatch(handleDeleteUser(id));
    setIsDeleteConfirmationOpen(false);
    setSelectedUser(null);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleSaveChanges = () => {
    const payload = {
      name: selectedUser.name,
      email: selectedUser.email,
      mobile: selectedUser.mobile,
    };
    dispatch(handleUpdateUser(selectedUser._id, payload));
    handleCloseModal();
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setSelectedUser(null);
    setIsDeleteConfirmationOpen(false);
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

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const paginatedUsers = users.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => setPage(newPage);

  useEffect(() => {
    dispatch(handleGetUser());
  }, []);

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
            <FiUsers size={18} color="var(--chakra-colors-accent-solid)" />
          </Flex>
          <Text fontSize="lg" fontWeight="600" color={nameColor}>
            User Management
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
          {users.length} {users.length === 1 ? "User" : "Users"}
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
                User
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
            {paginatedUsers.map((user) => (
              <Tr
                key={user._id}
                borderTop="1px solid"
                borderColor={borderColor}
                _hover={{ bg: rowHoverBg }}
                transition="background 0.15s"
              >
                <Td px={6} py={4}>
                  <HStack spacing={3}>
                    <Avatar
                      size="sm"
                      name={user.name}
                      getInitials={getInitials}
                      bg="accent.solid"
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
                        {user.name}
                      </Text>
                      <Text fontSize="xs" color={emailColor} lineHeight="1.3">
                        {user.email}
                      </Text>
                    </VStack>
                  </HStack>
                </Td>
                <Td px={6} py={4}>
                  <Text fontSize="sm" color={phoneColor}>
                    {user.mobile || "—"}
                  </Text>
                </Td>
                <Td px={6} py={4}>
                  <HStack spacing={2}>
                    <IconButton
                      aria-label="Edit user"
                      icon={<FiEdit2 size={15} />}
                      size="sm"
                      variant="ghost"
                                            borderRadius="md"
                      onClick={() => handleEditClick(user)}
                      _hover={{ bg: "accent.bg" }}
                    />
                    <IconButton
                      aria-label="Delete user"
                      icon={<FiTrash2 size={15} />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      borderRadius="md"
                      onClick={() => handleDeleteClick(user)}
                      _hover={{ bg: "red.50" }}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Empty State */}
        {users.length === 0 && (
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
              <FiUsers size={28} color={emptyIconColor} />
            </Flex>
            <Text fontSize="md" fontWeight="600" color={emptyTextColor}>
              No users found
            </Text>
            <Text fontSize="sm" color={emptyTextColor}>
              Users will appear here once they register.
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} isCentered size="md">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="xl" overflow="hidden">
          <ModalHeader
            fontSize="lg"
            fontWeight="700"
            pb={3}
            borderBottom="1px solid"
            borderColor={borderColor}
          >
            Edit User
          </ModalHeader>
          <ModalCloseButton top={4} right={4} />
          <ModalBody py={6}>
            {selectedUser && (
              <VStack spacing={5}>
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="600" color={headerColor} mb={1}>
                    Full Name
                  </FormLabel>
                  <Input
                    value={selectedUser.name}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, name: e.target.value })
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
                    value={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, email: e.target.value })
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
                    value={selectedUser.mobile}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, mobile: e.target.value })
                    }
                    placeholder="Enter phone number"
                    borderRadius="lg"
                    size="md"
                    focusBorderColor={inputFocusBorder}
                  />
                </FormControl>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter
            gap={3}
            borderTop="1px solid"
            borderColor={borderColor}
            pt={4}
          >
            <Button
              variant="ghost"
              onClick={handleCloseModal}
              borderRadius="lg"
              fontWeight="600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveChanges}
              isDisabled={!selectedUser}
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
        isOpen={isDeleteConfirmationOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleCloseDeleteConfirmation}
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
              Delete User
            </AlertDialogHeader>
            <AlertDialogBody py={5}>
              <Text fontSize="sm" color={phoneColor}>
                Are you sure you want to delete{" "}
                <Text as="span" fontWeight="600" color={nameColor}>
                  {selectedUser?.name}
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
                onClick={handleCloseDeleteConfirmation}
                borderRadius="lg"
                fontWeight="600"
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => onDelete(selectedUser._id)}
                borderRadius="lg"
                fontWeight="600"
                px={6}
              >
                Delete User
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default UserTable;
