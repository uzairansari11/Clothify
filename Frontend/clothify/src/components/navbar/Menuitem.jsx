import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutFunction } from "../../redux/authentication/action";
const Menuitem = ({ children }) => {
  const { isLoading, isAuth } = useSelector((store) => store.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const handleLogout = () => {
    dispatch(handleLogoutFunction());
    setTimeout(() => {
      toast({
        title: "Logout Success",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: 'top'
      });

      navigate("/", { replace: true });
    }, 1000);
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
