import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PannelSiderbar from "./lfetpannel/PannelSiderbar";
import AdminSearchBar from "./rigthpannel/AdminSearchBar";
import AdminDashboard from "./rigthpannel/AdminDashboard";
import UserTable from "./rigthpannel/UserTable";
import AdminTable from "./rigthpannel/AdminTable";
import AddProduct from "./rigthpannel/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { handleGetUser } from "../../../redux/Admin_Redux/users/action";
import { Products } from './rigthpannel/Products';
import { handleProductData } from '../../../redux/Admin_Redux/admin_products/action';

const Dashboard = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const finalPath = pathname.split("/")[2];
  const { users } = useSelector((store) => store.userReducer);
  const { totalCount } = useSelector(
    (store) => store.adminProductReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetUser());
    dispatch(handleProductData());

  }, []);

  return (
    <Box position={"fixed"} top={0} left={0} width={"100%"}>
      <Box bg={"white"} p={4} shadow={"lg"}>
        <AdminSearchBar />
      </Box>
      <Box display={"flex"}>
        <Box width={"20%"}>
          <PannelSiderbar />
        </Box>
        <Box width={"80%"} height={"90vh"} overflowY={"scroll"} py={4}>
          <Box>
            {" "}
            {finalPath == "dashboard" && (
              <AdminDashboard totalUsers={users.length} products={totalCount} />
            )}
            {finalPath == "user" && <UserTable users={users} />}
            {finalPath == "admin" && <AdminTable users={users}  />}
            {finalPath == "addproduct" && <AddProduct />}
            {finalPath == "product" && <Products />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
