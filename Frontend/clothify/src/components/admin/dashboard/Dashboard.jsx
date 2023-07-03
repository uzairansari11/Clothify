import { Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import PannelSiderbar from "./lfetpannel/PannelSiderbar";
import AdminTable from "./rigthpannel/AdminTable";
import Statistics from "./rigthpannel/Statistics";
import UserTable from "./rigthpannel/UserTable";
import { useSelector } from "react-redux";
import Logo from "../../user/navbar/Logo";
import AdminAvatar from "../authentication/AdminAvatar";
import { Products } from "./rigthpannel/Products";
import AddProduct from "./rigthpannel/addproduct/AddProduct";

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
        <Box width={{ base: "40%", md: "20%" }}>
          <PannelSiderbar />
        </Box>
        <Box
          width={{ base: "60%", md: "80%" }}
          height={"90vh"}
          overflowY={"scroll"}
          py={4}
        >
          <Box>
            {" "}
            {finalPath === "dashboard" && <Statistics />}
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
