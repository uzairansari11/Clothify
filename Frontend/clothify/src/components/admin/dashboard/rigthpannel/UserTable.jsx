import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteUser,
  handleGetUser,
  handleUpdateUser,
} from "../../../../redux/Admin_Redux/users/action";

const UserTable = () => {
  const { users } = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const cancelRef = useRef();
  const onDelete = (id) => {
    dispatch(handleDeleteUser(id));
    setIsDeleteConfirmationOpen(false);
  };

  const handleEditClick = (user, _id) => {
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

  useEffect(() => {
    dispatch(handleGetUser());
  }, []);
  return (
    <Box overflowX="auto">
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone Number</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user._id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.mobile}</Td>
              <Td>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(user, user._id)}
                  leftIcon={<EditIcon />}
                  marginRight={2}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(user)}
                  leftIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {users.length === 0 && (
        <Text
          textAlign="center"
          mt={4}
          color="black.500"
          height="70vh"
          display="flex"
          alignItems="center"
          fontFamily="FontAwesome"
          fontSize="4xl"
          fontWeight="bold"
          justifyContent={"center"}
        >
          😒 No User Found 😒
        </Text>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedUser && (
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      name: e.target.value,
                    })
                  }
                />
                <FormLabel>Email</FormLabel>
                <Input
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      email: e.target.value,
                    })
                  }
                />
                <FormLabel>Phone Number</FormLabel>
                <Input
                  value={selectedUser.mobile}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      mobile: e.target.value,
                    })
                  }
                />
              </FormControl>
            )}
            <Button
              colorScheme="teal"
              mt={4}
              onClick={handleSaveChanges}
              disabled={!selectedUser}
            >
              Save Changes
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isDeleteConfirmationOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleCloseDeleteConfirmation}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete the user?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCloseDeleteConfirmation}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => onDelete(selectedUser._id)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default UserTable;
