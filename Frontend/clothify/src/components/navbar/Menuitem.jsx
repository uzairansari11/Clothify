import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  Toast,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutFunction } from "../../redux/authentication/action";
const Menuitem = ({ children }) => {
  const { isLoading, isAuth } = useSelector((store) => store.authReducer);

  const dispatch = useDispatch();
  const toast = useToast();
  const handleLogout = () => {
    if (isLoading == false) {
      toast({
        title: "Logout Initialted",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
    }
    dispatch(handleLogoutFunction());
    setTimeout(() => {
      toast({
        title: "Logout Success",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }, 2000);
  };
  return (
    <Menu closeOnSelect={false}>
      <MenuButton>{children}</MenuButton>
      {isAuth ? (
        <MenuList maxWidth={{ base: "40px", md: "150px" }}>
          <MenuItemOption textAlign={"center"} onClick={handleLogout}>
            Logout
          </MenuItemOption>
        </MenuList>
      ) : (
        <MenuList maxWidth={{ base: "40px", md: "150px" }}>
          <ReactLink to="/login">
            <MenuItemOption textAlign={"center"}>Login</MenuItemOption>
          </ReactLink>
          <MenuDivider />
          <ReactLink to="/signup">
            <MenuItemOption textAlign={"center"}>Signup</MenuItemOption>
          </ReactLink>
        </MenuList>
      )}
    </Menu>
  );
};

export default Menuitem;
