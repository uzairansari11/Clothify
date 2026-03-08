import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

/**
 * EditModal — reusable modal wrapper for edit forms.
 *
 * Props:
 *  isOpen          — modal visibility
 *  onClose         — close handler
 *  onSave          — save/confirm handler
 *  title           — header text (e.g. "Edit User")
 *  saveLabel       — save button text (default "Save Changes")
 *  isSaveDisabled  — disable save button
 *  children        — form fields to render inside the body
 */
const EditModal = ({
  isOpen,
  onClose,
  onSave,
  title = "Edit",
  saveLabel = "Save Changes",
  isSaveDisabled = false,
  children,
}) => {
  const borderColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent borderRadius="xl" overflow="hidden">
        <ModalHeader
          fontSize="lg"
          fontWeight="700"
          pb={3}
          borderBottom="1px solid"
          borderColor={borderColor}
        >
          {title}
        </ModalHeader>
        <ModalCloseButton top={4} right={4} />

        <ModalBody py={6}>
          <VStack spacing={5}>{children}</VStack>
        </ModalBody>

        <ModalFooter
          gap={3}
          borderTop="1px solid"
          borderColor={borderColor}
          pt={4}
        >
          <Button
            variant="ghost"
            onClick={onClose}
            borderRadius="lg"
            fontWeight="600"
          >
            Cancel
          </Button>
          <Button
            bg="accent.solid"
            color="white"
            _hover={{ opacity: 0.9 }}
            onClick={onSave}
            isDisabled={isSaveDisabled}
            borderRadius="lg"
            fontWeight="600"
            px={6}
          >
            {saveLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
