import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  AiOutlineDashboard,
  AiOutlineFile,
  AiOutlinePlus,
  AiOutlineShopping,
  AiOutlineTool,
  AiOutlineUser,
} from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLogoutFunction } from "../../../../redux/Admin_Redux/authentication/action";

const PannelSiderbar = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.adminAuthReducer);
  const navigate = useNavigate();
  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      setTimeout(() => {
        dispatch(handleLogoutFunction());
      }, 1000);
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLogoutLoading(false);
      }, 1200);
    }
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: AiOutlineDashboard,
      path: "/admin/dashboard",
      color: "teal",
    },
    {
      label: "Users",
      icon: AiOutlineUser,
      path: "/admin/user",
      color: "purple",
    },
    {
      label: "Admin",
      icon: AiOutlineTool,
      path: "/admin/admin",
      color: "blue",
    },
    {
      label: "Product",
      icon: AiOutlineShopping,
      path: "/admin/product",
      color: "yellow",
    },
    {
      label: "Add Product",
      icon: AiOutlinePlus,
      path: "/admin/addproduct",
      color: "pink",
    },
    {
      label: "Order",
      icon: AiOutlineFile,
      path: "/admin/order",
      color: "orange",
    },
    // { label: "Logout", icon: IoLogOutOutline, color: "red" },
  ];
  useEffect(() => {
    if (isAuth === false) {
      navigate("/admin/login");
    }
  }, [isAuth]);
  return (
    <Box bg="whiteAlpha.100" height="100vh">
      <Flex
        direction="column"
        width={["100%", "200px", "200px", "200px"]} // Responsive width
        justifyContent="left"
        padding={[2, 4, 4, 4]} // Responsive padding
        gap={4}
      >
        {menuItems.map(({ label, icon: Icon, path, color }) => (
          <Link to={path} key={label}>
            <Box
              p={2}
              borderRadius="md"
              backgroundColor={`${color}.100`}
              _hover={{ backgroundColor: `${color}.200`, cursor: "pointer" }}
              transition="background-color 0.3s ease"
              display="flex"
              alignItems="center"
            >
              <Icon style={{ marginRight: "8px" }} />
              <Text>{label}</Text>
            </Box>
          </Link>
        ))}
        <Box
          p={2}
          borderRadius="md"
          backgroundColor="red.100"
          _hover={{ backgroundColor: "red.200", cursor: "pointer" }}
          transition="background-color 0.3s ease"
          display="flex"
          alignItems="center"
          onClick={handleLogout}
        >
          {logoutLoading ? (
            <Spinner size="sm" color="white" mr={2} />
          ) : (
            <IoLogOutOutline style={{ marginRight: "8px" }} />
          )}
          <Text>{logoutLoading ? "Logging out..." : "Logout"}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default PannelSiderbar;
