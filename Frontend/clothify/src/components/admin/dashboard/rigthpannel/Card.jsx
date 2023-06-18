import {
  Box,
  Image,
  Flex,
  Heading,
  Text,
  Button,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
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
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  // ... add other edit form field states

  const handleEditSave = () => {
    // Perform save operation with the updated form fields
    // ...
    const payload = { title: editTitle, description: editDescription };
    handleUpdate(_id, payload);

    onEditClose();
  };

  return (
    <Box
      bg="white"
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

        {discount && (
          <Flex align="center" mb={2}>
            <Text color="gray.500" textDecor="line-through" mr={2}>
              ${price}
            </Text>
            <Text color="teal.500" fontWeight="bold">
              ${discount}
            </Text>
          </Flex>
        )}

        {!discount && (
          <Text color="teal.500" fontWeight="bold" mb={2}>
            ${price}
          </Text>
        )}

        <Text fontSize="sm" color="gray.500" mb={2}>
          Category: {category}
        </Text>

        <Text fontSize="sm" color="gray.500" mb={4}>
          Brand: {brand}
        </Text>

        <Text fontSize="sm" color="gray.500" mb={4}>
          {description.substring(0, 42)} ...
        </Text>
      </Box>

      <Flex justify="space-between" alignItems="center">
        <Button
          colorScheme="teal"
          size="sm"
          leftIcon={<EditIcon />}
          onClick={handleEditClick}
        >
          Edit
        </Button>

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
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Enter title"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Enter description"
              />
            </FormControl>

            {/* Add other form fields here */}
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
