import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PannelSiderbar from "./PannelSiderbar";
import AdminSearchBar from "./AdminSearchBar";
import UserTable from "./UserTable";
import AdminTable from "./AdminTable";
import { useLocation, useParams } from "react-router-dom";
import AddProduct from "./AddProduct";
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const finalPath = pathname.split("/")[2];
  console.log(finalPath, "pathname");
  const { slug } = useParams();
  console.log(slug, "pppp");
  useEffect(() => {}, [location, slug]);
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      orders: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      orders: 3,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "555-555-5555",
      orders: 8,
    }, {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      orders: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      orders: 3,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "555-555-5555",
      orders: 8,
    }, {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      orders: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      orders: 3,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "555-555-5555",
      orders: 8,
    },
  ];
  return (
    <Box position={"fixed"} top={0} left={0} width={"100%"}>
      <Box bg={"white"} p={4} shadow={'lg'}>
        <AdminSearchBar />
      </Box>
      <Box display={"flex"} >
        <Box width={"20%"} >
          <PannelSiderbar />
        </Box>
        <Box width={"80%"} height={'90vh'} overflowY={"scroll"} py={4}>
          <Box >
            {" "}
            {finalPath == "dashboard" && <AdminDashboard/>}
            {finalPath == "user" && <UserTable users={users} />}
            {finalPath == "admin" && <AdminTable users={users} />}
            {finalPath == "addproduct" && <AddProduct />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
