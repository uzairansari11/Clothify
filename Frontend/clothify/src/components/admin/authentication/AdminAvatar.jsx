import { Avatar, Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";

const AdminAvatar = ({ adminDetails }) => {
  const namColor = useColorModeValue("gray.700", "gray.200");
  const roleColor = useColorModeValue("gray.400", "gray.500");

  return (
    <Flex align="center" gap={3} cursor="pointer" _hover={{ opacity: 0.85 }} transition="opacity 0.2s">
      <Box textAlign="right" display={{ base: "none", md: "block" }}>
        <Text fontSize="sm" fontWeight={600} color={namColor} lineHeight={1.2}>
          {adminDetails?.name || "Admin"}
        </Text>
        <Text fontSize="xs" color={roleColor} lineHeight={1.4}>
          Administrator
        </Text>
      </Box>
      <Avatar
        size={{ base: "sm", md: "sm" }}
        name={adminDetails?.name}
        bg="accent.solid"
        color="white"
        fontWeight="bold"
        boxShadow="0 0 0 2px var(--chakra-colors-accent-bg)"
      />
    </Flex>
  );
};

export default AdminAvatar;
