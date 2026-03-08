import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef } from "react";

/**
 * ConfirmDialog — reusable confirmation dialog (typically for delete actions).
 *
 * Props:
 *  isOpen        — dialog visibility
 *  onClose       — close handler
 *  onConfirm     — confirm handler
 *  title         — header text (e.g. "Delete User")
 *  body          — body content (string or ReactNode)
 *  itemName      — name to bold in default body template
 *  confirmLabel  — confirm button text (default "Delete")
 *  confirmColorScheme — confirm button color scheme (default "red")
 */
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  body,
  itemName,
  confirmLabel = "Delete",
  confirmColorScheme = "red",
}) => {
  const cancelRef = useRef();

  const borderColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const nameColor = useColorModeValue("gray.800", "white");

  const defaultBody = itemName ? (
    <Text fontSize="sm" color={textColor}>
      Are you sure you want to delete{" "}
      <Text as="span" fontWeight="600" color={nameColor}>
        {itemName}
      </Text>
      ? This action cannot be undone.
    </Text>
  ) : (
    <Text fontSize="sm" color={textColor}>
      Are you sure? This action cannot be undone.
    </Text>
  );

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
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
            {title}
          </AlertDialogHeader>

          <AlertDialogBody py={5}>{body || defaultBody}</AlertDialogBody>

          <AlertDialogFooter
            gap={3}
            borderTop="1px solid"
            borderColor={borderColor}
            pt={4}
          >
            <Button
              ref={cancelRef}
              variant="ghost"
              onClick={onClose}
              borderRadius="lg"
              fontWeight="600"
            >
              Cancel
            </Button>
            <Button
              colorScheme={confirmColorScheme}
              onClick={onConfirm}
              borderRadius="lg"
              fontWeight="600"
              px={6}
            >
              {confirmLabel}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmDialog;
