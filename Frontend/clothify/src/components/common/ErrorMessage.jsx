import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FiAlertTriangle, FiRefreshCcw } from "react-icons/fi";

const ErrorMessage = ({
  title = "Something went wrong",
  message = "Please try again later.",
  onRetry,
  variant = "full",
}) => {
  if (variant === "inline") {
    return (
      <Alert status="error" borderRadius="lg" variant="subtle">
        <AlertIcon />
        <Box>
          <AlertTitle fontSize="sm">{title}</AlertTitle>
          <AlertDescription fontSize="xs">{message}</AlertDescription>
        </Box>
        {onRetry && (
          <Button
            size="xs"
            ml="auto"
            colorScheme="red"
            variant="ghost"
            onClick={onRetry}
          >
            Retry
          </Button>
        )}
      </Alert>
    );
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="60vh"
      p={8}
      textAlign="center"
    >
      <Box
        bg="red.50"
        p={4}
        borderRadius="full"
        mb={4}
      >
        <Icon as={FiAlertTriangle} boxSize={8} color="red.400" />
      </Box>
      <Heading size="md" color="gray.700" mb={2}>
        {title}
      </Heading>
      <Text color="gray.500" fontSize="sm" maxW="400px" mb={6}>
        {message}
      </Text>
      {onRetry && (
        <Button
          leftIcon={<FiRefreshCcw />}
          variant="outline"
          size="sm"
          borderRadius="full"
          onClick={onRetry}
          _hover={{ bg: "accent.bg" }}
        >
          Try Again
        </Button>
      )}
    </Flex>
  );
};

export default ErrorMessage;
