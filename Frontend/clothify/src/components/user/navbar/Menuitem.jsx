import {
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { FaUserShield } from "react-icons/fa";
import { FiLogOut, FiUser, FiUserPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { handleLogoutFunction } from "../../../redux/User_Redux/authentication/action";

const Menuitem = ({ children }) => {
  const { isAuth } = useSelector((store) => store.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuBg = useColorModeValue("white", "gray.800");
  const menuBorder = useColorModeValue("gray.100", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  const handleLogout = () => {
    dispatch(handleLogoutFunction());
    setTimeout(() => {
      toast.success("You've been signed out successfully.");
      navigate("/", { replace: true });
    }, 1000);
  };

  return (
    <Menu closeOnSelect>
      <MenuButton
        p={0.5}
        rounded="full"
        _hover={{ opacity: 0.8 }}
        transition="opacity 0.2s"
      >
        {children}
      </MenuButton>

      <MenuList
        zIndex="100"
        borderRadius="xl"
        boxShadow="lg"
        bg={menuBg}
        border="1px solid"
        borderColor={menuBorder}
        py={1}
        minW="160px"
      >
        {isAuth ? (
          <MenuItem
            onClick={handleLogout}
            icon={<Icon as={FiLogOut} boxSize={4} color="red.500" />}
            fontSize="sm"
            fontWeight="500"
            _hover={{ bg: "red.50" }}
            borderRadius="md"
            mx={1}
          >
            Logout
          </MenuItem>
        ) : (
          <>
            <MenuItem
              as={ReactLink}
              to="/login"
              icon={<Icon as={FiUser} boxSize={4} color="accent.solid" />}
              fontSize="sm"
              fontWeight="500"
              _hover={{ bg: hoverBg }}
              borderRadius="md"
              mx={1}
            >
              Login
            </MenuItem>
            <MenuItem
              as={ReactLink}
              to="/signup"
              icon={<Icon as={FiUserPlus} boxSize={4} color="accent.solid" />}
              fontSize="sm"
              fontWeight="500"
              _hover={{ bg: hoverBg }}
              borderRadius="md"
              mx={1}
            >
              Sign Up
            </MenuItem>
            <MenuDivider />
            <MenuItem
              as={ReactLink}
              to="/admin/login"
              icon={<Icon as={FaUserShield} boxSize={4} color="gray.500" />}
              fontSize="sm"
              fontWeight="500"
              _hover={{ bg: hoverBg }}
              borderRadius="md"
              mx={1}
            >
              Admin
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default Menuitem;
