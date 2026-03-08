import { Avatar, Tooltip, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const AvatarNavbar = (props) => {
  const bgAuth = "accent.solid";
  const bgNoAuth = useColorModeValue("gray.200", "gray.600");

  return (
    <Tooltip label={props?.authDetails?.userDetails?.name || "Account"} hasArrow placement="bottom">
      <Avatar
        size="xs"
        name={props?.authDetails?.userDetails?.name}
        bg={props.authDetails.isAuth ? bgAuth : bgNoAuth}
        color="white"
        fontSize="xs"
        fontWeight="600"
        cursor="pointer"
      />
    </Tooltip>
  );
};

export default AvatarNavbar;
