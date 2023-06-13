import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  useToast,
  Icon,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutFunction } from "../../redux/authentication/action";
import { FiLogOut, FiUser, FiUserPlus } from "react-icons/fi";

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
        position: "top",
      });

      navigate("/", { replace: true });
    }, 1000);
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        p={1}
        rounded="full"
        bg={isAuth ? "green" : "red.200"}
        _hover={{ bg: "gray.300" }}
      >
        {children}
      </MenuButton>
      {isAuth ? (
        <MenuList
          position="fixed"
          right={0}
          zIndex="100"
          borderRadius="md"
          boxShadow="md"
          bg="white"
          maxW="30px"
          padding={1}
        >
          <MenuItem
            textAlign="center"
            onClick={handleLogout}
            icon={<Icon as={FiLogOut} boxSize={4} color="red.500" mr={2} />}
            _hover={{ bg: "red.100" }}
            transition="background 0.3s ease"
          >
            Logout
          </MenuItem>
        </MenuList>
      ) : (
        <MenuList
          maxW="120px"
          position="fixed"
          right={0}
          zIndex="100"
          borderRadius="md"
          boxShadow="md"
          bg="white"
          padding={1}
        >
          <MenuItem
            as={ReactLink}
            to="/login"
            textAlign="center"
            icon={<Icon as={FiUser} boxSize={4} color="blue.500" mr={2} />}
            _hover={{ bg: "blue.100" }}
            transition="background 0.3s ease"
          >
            Login
          </MenuItem>

          <MenuItem
            as={ReactLink}
            to="/signup"
            textAlign="center"
            icon={
              <Icon as={FiUserPlus} boxSize={4} color="purple.500" mr={2} />
            }
            _hover={{ bg: "purple.100" }}
            transition="background 0.3s ease"
          >
            Signup
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};

export default Menuitem;
