import { Box, Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);

const EmptyState = ({
  icon,
  title = "Nothing here yet",
  message = "Check back later.",
  actionLabel,
  onAction,
}) => {
  return (
    <MotionFlex
      direction="column"
      align="center"
      justify="center"
      minH="40vh"
      p={8}
      textAlign="center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {icon && (
        <Box bg="gray.100" p={4} borderRadius="full" mb={4}>
          <Icon as={icon} boxSize={8} color="gray.400" />
        </Box>
      )}
      <Heading size="md" color="gray.600" mb={2}>
        {title}
      </Heading>
      <Text color="gray.400" fontSize="sm" maxW="350px" mb={6}>
        {message}
      </Text>
      {actionLabel && onAction && (
        <Button
          size="sm"
          borderRadius="full"
          px={6}
          onClick={onAction}
          _hover={{ transform: "translateY(-1px)", boxShadow: "md" }}
          transition="all 0.2s"
        >
          {actionLabel}
        </Button>
      )}
    </MotionFlex>
  );
};

export default EmptyState;
