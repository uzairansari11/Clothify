import { Box, Button, Flex, Heading, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);

const EmptyState = ({
  icon,
  title = "Nothing here yet",
  message = "Check back later.",
  actionLabel,
  onAction,
  variant = "default", // "default" | "error"
}) => {
  const isError = variant === "error";

  const iconBg = useColorModeValue(
    isError ? "red.50" : "gray.100",
    isError ? "rgba(254,178,178,0.1)" : "whiteAlpha.100"
  );
  const iconColor = useColorModeValue(
    isError ? "red.400" : "gray.400",
    isError ? "red.300" : "gray.500"
  );
  const iconRingColor = useColorModeValue(
    isError ? "red.100" : "gray.200",
    isError ? "rgba(254,178,178,0.15)" : "whiteAlpha.50"
  );
  const headingColor = useColorModeValue("gray.800", "gray.100");
  const textColor = useColorModeValue("gray.500", "gray.400");
  const btnBg = useColorModeValue(
    isError ? "red.500" : "accent.solid",
    isError ? "red.400" : "accent.solid"
  );

  return (
    <MotionFlex
      direction="column"
      align="center"
      justify="center"
      minH="40vh"
      p={8}
      textAlign="center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {icon && (
        <Box position="relative" mb={5}>
          {/* Outer ring */}
          <Box
            position="absolute"
            inset="-8px"
            borderRadius="full"
            bg={iconRingColor}
          />
          {/* Icon circle */}
          <Flex
            position="relative"
            align="center"
            justify="center"
            bg={iconBg}
            w="64px"
            h="64px"
            borderRadius="full"
            border="1px solid"
            borderColor={iconRingColor}
          >
            <Icon as={icon} boxSize={7} color={iconColor} />
          </Flex>
        </Box>
      )}
      <Heading
        size="md"
        color={headingColor}
        mb={2}
        fontWeight="700"
        letterSpacing="-0.3px"
      >
        {title}
      </Heading>
      <Text
        color={textColor}
        fontSize="sm"
        maxW="380px"
        mb={6}
        lineHeight="1.7"
      >
        {message}
      </Text>
      {actionLabel && onAction && (
        <Button
          size="sm"
          bg={btnBg}
          color="white"
          borderRadius="full"
          px={7}
          fontWeight="600"
          fontSize="13px"
          onClick={onAction}
          _hover={{ transform: "translateY(-2px)", boxShadow: "lg", opacity: 0.9 }}
          _active={{ transform: "translateY(0)" }}
          transition="all 0.25s cubic-bezier(0.22,1,0.36,1)"
        >
          {actionLabel}
        </Button>
      )}
    </MotionFlex>
  );
};

export default EmptyState;
