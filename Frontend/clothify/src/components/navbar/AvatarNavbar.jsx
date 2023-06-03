import { Avatar, Box, Stack, Tooltip } from "@chakra-ui/react";
import React from "react";

const AvatarNavbar = ({ name = "N A" }) => {
  return (
    <Stack direction="row" align="center" spacing={2} cursor="pointer">
      <Box as="span" display="inline-block">
        <Tooltip label={name}>
          <Avatar
            size={{ base: "xs", md: "sm" }}
            name={name}
            bg="teal.500"
            boxShadow="md"
          />
        </Tooltip>
      </Box>
    </Stack>
  );
};

export default AvatarNavbar;
