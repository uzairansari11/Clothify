import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
} from "@chakra-ui/react";
import React from "react";

const Menuitem = ({ children }) => {
  return (
    <Menu closeOnSelect={false} >
      <MenuButton>{children}</MenuButton>
      <MenuList maxWidth={{ base: "40px", md: "150px" }}>
        <MenuItemOption  textAlign={"center"}>Login</MenuItemOption>
        <MenuDivider />
        <MenuItemOption textAlign={"center"}>Logout</MenuItemOption>
      </MenuList>
    </Menu>
  );
};

export default Menuitem;
