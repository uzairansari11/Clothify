import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PannelSiderbar from "./lfetpannel/PannelSiderbar";
import AdminDashboard from "./rigthpannel/AdminDashboard";
import UserTable from "./rigthpannel/UserTable";
import AdminTable from "./rigthpannel/AdminTable";

import { Products } from "./rigthpannel/Products";
import AddProduct from "./rigthpannel/addproduct/AddProduct";
import AdminAvatar from "../authentication/AdminAvatar";
import Logo from "../../navbar/Logo";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const finalPath = pathname.split("/")[2];
  const { adminDetails } = useSelector((store) => store.adminAuthReducer);

  return (
    <Box
      position={"fixed"}
      top={0}
      left={0}
      width={"100%"}
      backgroundColor={"whiteAlpha.200"}
    >
      <Box
        bg={"white"}
        p={2}
        shadow={"lg"}
        display={"flex"}
        justifyContent={"space-between"}
        px={10}
        alignItems={"center"}
      >
        <Logo />
        <AdminAvatar adminDetails={adminDetails} />
      </Box>
      <Box display={"flex"}>
        <Box width={"20%"}>
          <PannelSiderbar />
        </Box>
        <Box width={"80%"} height={"90vh"} overflowY={"scroll"} py={4}>
          <Box>
            {" "}
            {finalPath === "dashboard" && <AdminDashboard />}
            {finalPath === "user" && <UserTable />}
            {finalPath === "admin" && <AdminTable />}
            {finalPath === "addproduct" && <AddProduct />}
            {finalPath === "product" && <Products />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
