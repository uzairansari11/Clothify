import { Box, Flex, Text, Spinner } from "@chakra-ui/react";
import {
    AiOutlineDashboard,
    AiOutlineUser,
    AiOutlineTool,
    AiOutlineShopping,
    AiOutlinePlus,
    AiOutlineFile,
} from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const PannelSiderbar = () => {
    const [logoutLoading, setLogoutLoading] = useState(false);

    const handleLogout = () => {
        setLogoutLoading(true);
        // Perform logout logic here
        // Once logout is complete, setLogoutLoading(false)
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
            color: "orange",
        },
        {
            label: "Order",
            icon: AiOutlineFile,
            path: "/admin/order",
            color: "pink",
        },
        // { label: "Logout", icon: IoLogOutOutline, color: "red" },
    ];

    return (
        <Box bg="whiteAlpha.100" height="100vh">
            <Flex
                direction="column"
                width={["100%", "200px"]} // Responsive width
                justifyContent="left"
                padding={4}
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
