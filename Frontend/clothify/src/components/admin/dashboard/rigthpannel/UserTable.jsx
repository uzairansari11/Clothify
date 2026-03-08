import {
  Avatar,
  Badge,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Spinner,
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
import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiUsers } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteUser,
  handleGetUser,
  handleUpdateUser,
} from "../../../../redux/Admin_Redux/users/action";
import ConfirmDialog from "../../../common/ConfirmDialog";
import EditModal from "../../../common/EditModal";
import FormField from "../../../common/FormField";
import SearchInput from "../../../common/SearchInput";
import { isEmail, isPhone, required } from "../../../common/validators";
import { useFormValidation } from "../../../common/useFormValidation";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 10;

const VALIDATION_RULES = {
  name: [required("Full name is required")],
  email: [required("Email is required"), isEmail()],
  mobile: [isPhone()],
};

const UserTable = () => {
  const { users, isLoading, isError, totalCount } = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { values, errors, handleChange, handleBlur, validateAll, setValues, resetForm } =
    useFormValidation({ name: "", email: "", mobile: "" }, VALIDATION_RULES);

  // All useColorModeValue calls at top level
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const headerColor = useColorModeValue("gray.500", "gray.400");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const rowHoverBg = useColorModeValue("gray.50", "gray.700");
  const nameColor = useColorModeValue("gray.800", "white");
  const emailColor = useColorModeValue("gray.500", "gray.400");
  const phoneColor = useColorModeValue("gray.600", "gray.300");
  const emptyIconColor = useColorModeValue("gray.300", "gray.600");
  const emptyTextColor = useColorModeValue("gray.500", "gray.400");
  const sectionBg = useColorModeValue("white", "gray.800");
  const sectionBorderColor = useColorModeValue("gray.200", "gray.700");

  const onDelete = (id) => {
    dispatch(handleDeleteUser(id));
    setIsDeleteConfirmationOpen(false);
    setSelectedUser(null);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setValues({ name: user.name || "", email: user.email || "", mobile: user.mobile || "" });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    resetForm();
    setIsModalOpen(false);
  };

  const handleSaveChanges = () => {
    if (!validateAll()) return;
    dispatch(handleUpdateUser(selectedUser._id, {
      name: values.name,
      email: values.email,
      mobile: values.mobile,
    }));
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

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => setPage(newPage);

  useEffect(() => {
    dispatch(handleGetUser({ page, limit: ITEMS_PER_PAGE, search: debouncedSearch }));
  }, [page, debouncedSearch, dispatch]);

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
          {totalCount} {totalCount === 1 ? "User" : "Users"}
        </Badge>
      </Flex>

      {/* Search Bar */}
      <Flex px={6} py={3} borderBottom="1px solid" borderColor={borderColor}>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={(val) => { setPage(1); setDebouncedSearch(val); }}
          placeholder="Search by name, email, or phone..."
        />
      </Flex>

      {/* Loading State */}
      {isLoading && (
        <Flex align="center" justify="center" py={16} gap={3}>
          <Spinner size="md" color="accent.solid" thickness="2px" />
          <Text fontSize="sm" color={emptyTextColor} fontWeight="500">Loading users...</Text>
        </Flex>
      )}

      {/* Error State */}
      {isError && !isLoading && (
        <Flex direction="column" align="center" justify="center" py={16} gap={3}>
          <Flex align="center" justify="center" w={16} h={16} bg="red.50" borderRadius="full">
            <Icon as={FiUsers} boxSize={7} color="red.400" />
          </Flex>
          <Text fontSize="md" fontWeight="600" color="red.500">Failed to load users</Text>
          <Text fontSize="sm" color={emptyTextColor}>Please refresh or try again.</Text>
        </Flex>
      )}

      {/* Table */}
      {!isLoading && !isError && <Box overflowX="auto">
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
            {users.map((user) => (
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
              {searchQuery ? "Try adjusting your search." : "Users will appear here once they register."}
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

      {/* Edit Modal */}
      <EditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveChanges}
        title="Edit User"
        isSaveDisabled={!selectedUser}
      >
        {selectedUser && (
          <>
            <FormField
              label="Full Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              placeholder="Enter full name"
              isRequired
            />
            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              placeholder="Enter email address"
              isRequired
            />
            <FormField
              label="Phone Number"
              name="mobile"
              type="tel"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.mobile}
              placeholder="Enter phone number"
            />
          </>
        )}
      </EditModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteConfirmationOpen}
        onClose={handleCloseDeleteConfirmation}
        onConfirm={() => onDelete(selectedUser._id)}
        title="Delete User"
        itemName={selectedUser?.name}
        confirmLabel="Delete User"
      />
    </Box>
  );
};

export default UserTable;
