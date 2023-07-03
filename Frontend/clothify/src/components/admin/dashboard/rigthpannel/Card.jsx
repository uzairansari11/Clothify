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
  Flex,
  FormControl,
  FormLabel,
  Heading,
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
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

const Card = ({
  images,
  title,
  discount,
  price,
  category,
  brand,
  description,
  _id,
  handleDelete,
  handleUpdate,
}) => {
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const handleDeleteClick = () => {
    onDeleteOpen();
  };

  const handleDeleteConfirmation = () => {
    handleDelete(_id);
    onDeleteClose();
  };

  const handleEditClick = () => {
    onEditOpen();
  };

  // Edit form fields state
  const [editFields, setEditFields] = useState({
    editTitle: title,
    editDescription: description,
    editPrice: price,
    editDiscount: discount,
  });

  const handleEditSave = () => {
    // Perform save operation with the updated form fields
    // ...
    const payload = {
      title: editFields.editTitle,
      description: editFields.editDescription,
      price: editFields.editPrice,
      discount: editFields.editDiscount,
    };
    handleUpdate(_id, payload);

    onEditClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  return (
    <Box
      bg="gray.100"
      boxShadow="md"
      borderRadius="md"
      p={4}
      maxW="sm"
      w="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Image
          src={images[0]}
          alt={title}
          mb={4}
          borderRadius="md"
          height="200px"
          width="200px"
          objectFit="contain"
          margin={"auto"}
        />

        <Heading as="h2" size="md" mb={2}>
          {title}
        </Heading>

        {editFields.editDiscount >= 0 && (
          <Flex align="center" mb={2}>
            <Text color="gray.500" textDecor="line-through" mr={2}>
              ${editFields.editPrice}
            </Text>
            <Text color="teal.500" fontWeight="bold">
              ${editFields.editDiscount}
            </Text>
          </Flex>
        )}

        {!editFields.editDiscount && (
          <Text color="teal.500" fontWeight="bold" mb={2}>
            ${editFields.editPrice}
          </Text>
        )}

        <Text fontSize="sm" color="gray.500" mb={2}>
          Category: {category}
        </Text>

        <Text fontSize="sm" color="gray.500" mb={4}>
          Brand: {brand}
        </Text>

        <Text fontSize="sm" color="gray.500" mb={4}>
          {editFields.editDescription.substring(0, 42)} ...
        </Text>
      </Box>

      <Flex justify="space-between" alignItems="center">
        <IconButton
          colorScheme="teal"
          size="sm"
          icon={<EditIcon />}
          onClick={handleEditClick}
        />
        <IconButton
          icon={<DeleteIcon />}
          aria-label="Delete"
          colorScheme="red"
          size="sm"
          onClick={handleDeleteClick}
        />
      </Flex>

      {/* Delete Confirmation Dialog */}
      <AlertDialog isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete Confirmation</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this product?
          </AlertDialogBody>
          <AlertDialogFooter gap={4}>
            <Button colorScheme="red" onClick={handleDeleteConfirmation}>
              Delete
            </Button>
            <Button onClick={onDeleteClose}>Cancel</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                name="editTitle"
                value={editFields.editTitle}
                onChange={handleInputChange}
                placeholder="Enter title"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="editDescription"
                value={editFields.editDescription}
                onChange={handleInputChange}
                placeholder="Enter description"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Price</FormLabel>
              <Input
                name="editPrice"
                value={editFields.editPrice}
                onChange={handleInputChange}
                placeholder="Enter price"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Discount</FormLabel>
              <Input
                name="editDiscount"
                value={editFields.editDiscount}
                onChange={handleInputChange}
                placeholder="Enter discount"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter gap={4}>
            <Button colorScheme="teal" onClick={handleEditSave}>
              Save
            </Button>
            <Button onClick={onEditClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Card;
