import { Avatar, Stack } from "@chakra-ui/react";
import React from "react";

const AvatarNavbar = ({ name = "N A" }) => {
  return (
    <Stack direction="row" cursor={"pointer"}>
      <Avatar size={{ base: "xs", md: "sm" }} name={name} />
    </Stack>
  );
};

export default AvatarNavbar;
