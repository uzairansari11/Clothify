import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { Link as ReactLink } from "react-router-dom";
const Menuitem = ({ children }) => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton>{children}</MenuButton>

      <MenuList maxWidth={{ base: "40px", md: "150px" }}>
        <ReactLink to="/login">
          <MenuItemOption textAlign={"center"}>Login</MenuItemOption>
        </ReactLink>
        <MenuDivider />
        <ReactLink to="/signup">
          <MenuItemOption textAlign={"center"}>Signup</MenuItemOption>
        </ReactLink>
      </MenuList>
    </Menu>
  );
};

export default Menuitem;
