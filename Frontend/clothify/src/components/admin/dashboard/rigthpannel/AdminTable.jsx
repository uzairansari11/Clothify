import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteAdmin,
  handleGetAdmin,
  handleUpdateAdmin,
} from "../../../../redux/Admin_Redux/admins/action";
const AdminTable = ({ users, onDelete, onEdit }) => {
  const { admins } = useSelector((store) => store.adminReducer);
  const dispatch = useDispatch();
  const [selectedAdmin, setSelectedAdmin] = useState(null);
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
  };

  const handleDeleteConfirm = () => {
    dispatch(handleDeleteAdmin(selectedAdmin._id));
    onDeleteClose();
  };

  return (
    <Box overflowX="auto">
      <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone Number</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {admins.map((admin) => (
            <Tr key={admin._id}>
              <Td>{admin.name}</Td>
              <Td>{admin.email}</Td>
              <Td>{admin.mobile}</Td>
              <Td>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(admin)}
                  leftIcon={<EditIcon />}
                  marginRight={2}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(admin)}
                  leftIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {admins.length === 0 && (
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
          😒 No Admin Found 😒
        </Text>
      )}

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={selectedAdmin?.name || ""}
                onChange={(e) =>
                  setSelectedAdmin((prevAdmin) => ({
                    ...prevAdmin,
                    name: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={selectedAdmin?.email || ""}
                onChange={(e) =>
                  setSelectedAdmin((prevAdmin) => ({
                    ...prevAdmin,
                    email: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Mobile</FormLabel>
              <Input
                type="text"
                name="mobile"
                value={selectedAdmin?.mobile || ""}
                onChange={(e) =>
                  setSelectedAdmin((prevAdmin) => ({
                    ...prevAdmin,
                    mobile: e.target.value,
                  }))
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleEditConfirm}>
              Save
            </Button>
            <Button variant="ghost" onClick={onEditClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete Admin</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this admin?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onDeleteClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default AdminTable;
