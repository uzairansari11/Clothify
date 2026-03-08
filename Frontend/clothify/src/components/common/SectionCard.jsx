import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";

/**
 * SectionCard — a card with an icon + label header bar and content area.
 *
 * Props:
 *  icon      — icon component (e.g. FiPackage)
 *  label     — header label text
 *  children  — card body content
 *  cardBg    — optional override for card background
 *  cardBorder — optional override for border color
 */
const SectionCard = ({ icon, label, children, cardBg, cardBorder }) => {
  const defaultBg = useColorModeValue("white", "gray.800");
  const defaultBorder = useColorModeValue("gray.200", "gray.700");

  const bg = cardBg || defaultBg;
  const border = cardBorder || defaultBorder;

  return (
    <Box
      bg={bg}
      border="1px solid"
      borderColor={border}
      borderRadius="xl"
      overflow="hidden"
      shadow="sm"
    >
      <Flex
        align="center"
        gap={2.5}
        px={5}
        py={3.5}
        borderBottom="1px solid"
        borderColor={border}
      >
        <Flex
          align="center"
          justify="center"
          w={7}
          h={7}
          borderRadius="lg"
          bg="accent.bg"
        >
          <Icon as={icon} boxSize={3.5} color="accent.solid" />
        </Flex>
        <Text
          fontSize="sm"
          fontWeight="700"
          color="accent.text"
          letterSpacing="0.02em"
        >
          {label}
        </Text>
      </Flex>
      <Box p={5}>{children}</Box>
    </Box>
  );
};

export default SectionCard;
