import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import {
  handleDeleteUser,
  handleUpdateUser,
} from "../../../../redux/Admin_Redux/users/action";
import { useRef, useState } from 'react';

const UserTable = ({ users }) => {
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
    console.log(selectedUser._id, payload);
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
        <Text textAlign="center" mt={4} color="black.500">
          No users found.
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
