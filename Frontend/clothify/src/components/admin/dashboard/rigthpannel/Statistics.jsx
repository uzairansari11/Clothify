import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { GrUserAdmin } from 'react-icons/gr';
import {
  RiFileList2Line,
  RiMoneyDollarCircleLine,
  RiShoppingCart2Line,
  RiUser3Line,
} from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { handleProductData } from '../../../../redux/Admin_Redux/admin_products/action';
import { handleGetAdmin } from '../../../../redux/Admin_Redux/admins/action';
import { handleGetOrderData } from '../../../../redux/Admin_Redux/order/action';
import { handleGetUser } from '../../../../redux/Admin_Redux/users/action';
import { getOrderQuantity } from '../../utils/order';
import { getTotalRevenue } from '../../utils/totalRevanu';

const Statistics = () => {
  const { users } = useSelector((store) => store.userReducer);
  const { totalCount } = useSelector((store) => store.adminProductReducer);
  const { admins } = useSelector((store) => store.adminReducer);
  const { orderData } = useSelector((store) => store.adminOrderReducer);
  let adminOrders = getOrderQuantity(orderData);
  const totalRevenue = getTotalRevenue(orderData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetUser());
    dispatch(handleGetAdmin());
    dispatch(handleProductData());
    dispatch(handleGetOrderData());
  }, [dispatch]);
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        <Stat p={4} borderRadius="md" boxShadow="md" bg="teal.100">
          <Flex align="center">
            <Box as={RiMoneyDollarCircleLine} fontSize="2xl" mr={2} />
            <Box>
              <StatLabel>Total Revenue</StatLabel>
              <StatNumber>${totalRevenue.toFixed(2)}</StatNumber>
            </Box>
          </Flex>
        </Stat>

        <Stat p={4} borderRadius="md" boxShadow="md" bg="blue.100">
          <Flex align="center">
            <Box as={RiUser3Line} fontSize="2xl" mr={2} />
            <Box>
              <StatLabel>Total Users</StatLabel>
              <StatNumber>{users?.length}</StatNumber>
            </Box>
          </Flex>
        </Stat>

        <Stat p={4} borderRadius="md" boxShadow="md" bg="purple.100">
          <Flex align="center">
            <Box as={GrUserAdmin} fontSize="2xl" mr={2} />
            <Box>
              <StatLabel> Total Admins</StatLabel>
              <StatNumber>{admins?.length}</StatNumber>
            </Box>
          </Flex>
        </Stat>

        <Stat p={4} borderRadius="md" boxShadow="md" bg="orange.100">
          <Flex align="center">
            <Box as={RiFileList2Line} fontSize="2xl" mr={2} />
            <Box>
              <StatLabel>Total Products</StatLabel>
              <StatNumber>{totalCount}</StatNumber>
            </Box>
          </Flex>
        </Stat>

        <Stat p={4} borderRadius="md" boxShadow="md" bg="teal.100">
          <Flex align="center">
            <Box as={RiShoppingCart2Line} fontSize="2xl" mr={2} />
            <Box>
              <StatLabel>Total Orders</StatLabel>
              <StatNumber>{adminOrders}</StatNumber>
            </Box>
          </Flex>
        </Stat>
      </SimpleGrid>
      <Flex justify="center" mt={8}>
        <Text fontSize="lg">More features coming soon...</Text>
      </Flex>
    </Box>
  );
};

export default Statistics;
