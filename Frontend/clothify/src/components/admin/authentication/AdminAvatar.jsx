import { Avatar, Box, Stack, Tooltip } from "@chakra-ui/react";
import React from "react";

const AdminAvatar = ({ adminDetails }) => {
  return (
    <Stack direction="row" align="center" spacing={2} cursor="pointer">
      <Box as="span" display="inline-block">
        <Tooltip label={adminDetails?.name}>
          <Avatar
            size={{ base: "xs", md: "sm" }}
            fontWeight={"bold"}
            fontStyle={"italic"}
            name={adminDetails?.name}
            boxShadow="md"
          />
        </Tooltip>
      </Box>
    </Stack>
  );
};

export default AdminAvatar;
