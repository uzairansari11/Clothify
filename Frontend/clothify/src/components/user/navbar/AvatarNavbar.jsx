import { Avatar, Box, Stack, Tooltip } from '@chakra-ui/react';
import React from 'react';

const AvatarNavbar = (props) => {
  return (
    <Stack direction="row" align="center" spacing={2} cursor="pointer">
      <Box as="span" display="inline-block">
        <Tooltip label={props?.authDetails?.userDetails?.name}>
          <Avatar
            size={{ base: 'xs', md: 'sm' }}
            fontWeight={'bold'}
            fontStyle={'italic'}
            name={props?.authDetails?.userDetails?.name}
            bg={props.authDetails.isAuth ? 'white' : 'red'}
            boxShadow="md"
          />
        </Tooltip>
      </Box>
    </Stack>
  );
};

export default AvatarNavbar;
