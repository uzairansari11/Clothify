import {
  Avatar,
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  FiDollarSign,
  FiPackage,
  FiShield,
  FiShoppingBag,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { handleProductData } from '../../../../redux/Admin_Redux/admin_products/action';
import { handleGetAdmin } from '../../../../redux/Admin_Redux/admins/action';
import { handleGetOrderData } from '../../../../redux/Admin_Redux/order/action';
import { handleGetUser } from '../../../../redux/Admin_Redux/users/action';
import { getOrderQuantity } from '../../utils/order';
import { getTotalRevenue } from '../../utils/totalRevanu';

// ---------------------------------------------------------------------------
// StatCard – colored top accent border for visual hierarchy
// ---------------------------------------------------------------------------
const StatCard = ({
  icon,
  iconBg,
  iconColor,
  accentColor,
  label,
  value,
  cardBg,
  borderColor,
  labelColor,
  valueColor,
}) => (
  <Box
    bg={cardBg}
    border="1px solid"
    borderColor={borderColor}
    borderRadius="xl"
    overflow="hidden"
    position="relative"
    transition="all 0.2s ease"
    _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
  >
    {/* Colored top accent */}
    <Box h="3px" bg={accentColor} />
    <Box p={5}>
      <Flex align="center" justify="space-between" mb={3}>
        <Text fontSize="xs" fontWeight="600" color={labelColor} textTransform="uppercase" letterSpacing="wider">
          {label}
        </Text>
        <Flex
          align="center"
          justify="center"
          bg={iconBg}
          color={iconColor}
          borderRadius="lg"
          w="36px"
          h="36px"
          flexShrink={0}
        >
          <Icon as={icon} boxSize="18px" />
        </Flex>
      </Flex>
      <Text fontSize="2xl" fontWeight="800" color={valueColor} lineHeight="1">
        {value}
      </Text>
    </Box>
  </Box>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
const Statistics = () => {
  const { users } = useSelector((store) => store.userReducer);
  const { totalCount } = useSelector((store) => store.adminProductReducer);
  const { admins } = useSelector((store) => store.adminReducer);
  const { orderData, isLoading } = useSelector((store) => store.adminOrderReducer);
  const { adminDetails } = useSelector((store) => store.adminAuthReducer);

  const adminOrders = getOrderQuantity(orderData);
  const totalRevenue = getTotalRevenue(orderData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGetUser());
    dispatch(handleGetAdmin());
    dispatch(handleProductData());
    dispatch(handleGetOrderData());
  }, [dispatch]);

  // All color tokens at top level
  const cardBg         = useColorModeValue('white',    'gray.800');
  const borderColor    = useColorModeValue('gray.200', 'gray.700');
  const headingColor   = useColorModeValue('gray.800', 'white');
  const subheadColor   = useColorModeValue('gray.500', 'gray.400');
  const labelColor     = useColorModeValue('gray.500', 'gray.400');
  const valueColor     = useColorModeValue('gray.800', 'white');
  const tableHeadBg    = useColorModeValue('gray.50',  'gray.700');
  const tableHeadColor = useColorModeValue('gray.500', 'gray.400');
  const tableRowHover  = useColorModeValue('accent.bg','gray.700');
  const tdColor        = useColorModeValue('gray.700', 'gray.300');
  const emptyColor     = useColorModeValue('gray.400', 'gray.500');
  const sectionTitle   = useColorModeValue('gray.700', 'gray.200');
  const emailColor     = useColorModeValue('gray.400', 'gray.500');
  const amountColor    = useColorModeValue('green.600','green.300');
  const idColor        = "accent.text";
  const avatarBg       = "accent.bg";
  const spinnerColor   = "accent.solid";
  const welcomeBg      = useColorModeValue('white',    'gray.800');
  const trendColor     = "accent.text";

  // Flatten orderData
  const recentOrders = (orderData ?? [])
    .flatMap((group) =>
      (group.orders ?? []).map((order) => ({
        id: order._id,
        customer: order.name ?? 'Unknown',
        email: order.email ?? '',
        items: order.items?.length ?? 0,
        total: order.grandTotal ?? 0,
        date: order.date ?? '',
        time: order.time ?? '',
      }))
    )
    .slice(-10)
    .reverse();

  const adminName = adminDetails?.name || 'Admin';

  const stats = [
    {
      icon: FiDollarSign,
      iconBg: 'green.50',
      iconColor: 'green.500',
      accentColor: 'green.400',
      label: 'Revenue',
      value: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      icon: FiUsers,
      iconBg: 'blue.50',
      iconColor: 'blue.500',
      accentColor: 'blue.400',
      label: 'Users',
      value: (users?.length ?? 0).toLocaleString(),
    },
    {
      icon: FiShield,
      iconBg: 'accent.bg',
      iconColor: 'accent.solid',
      accentColor: 'accent.solid',
      label: 'Admins',
      value: (admins?.length ?? 0).toLocaleString(),
    },
    {
      icon: FiPackage,
      iconBg: 'orange.50',
      iconColor: 'orange.500',
      accentColor: 'orange.400',
      label: 'Products',
      value: (totalCount ?? 0).toLocaleString(),
    },
    {
      icon: FiShoppingBag,
      iconBg: 'teal.50',
      iconColor: 'teal.500',
      accentColor: 'teal.400',
      label: 'Orders',
      value: (adminOrders ?? 0).toLocaleString(),
    },
  ];

  return (
    <Box>
      {/* Welcome banner */}
      <Box
        bg={welcomeBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="xl"
        p={5}
        mb={4}
      >
        <Flex align="center" justify="space-between" wrap="wrap" gap={4}>
          <Box>
            <Flex align="center" gap={2} mb={1}>
              <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="700" color={headingColor}>
                Welcome back, {adminName}
              </Text>
              <Text fontSize="xl">👋</Text>
            </Flex>
            <Text fontSize="sm" color={subheadColor}>
              Here&apos;s an overview of your store performance.
            </Text>
          </Box>
          <Flex
            align="center"
            gap={2}
            bg="accent.bg"
            color={trendColor}
            px={4}
            py={2}
            borderRadius="lg"
            fontWeight="600"
            fontSize="sm"
          >
            <Icon as={FiTrendingUp} boxSize={4} />
            {(adminOrders ?? 0)} total orders
          </Flex>
        </Flex>
      </Box>

      {/* Stat cards */}
      <Grid
        templateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(5, 1fr)',
        }}
        gap={4}
        mb={4}
      >
        {stats.map((stat) => (
          <GridItem key={stat.label}>
            <StatCard
              {...stat}
              cardBg={cardBg}
              borderColor={borderColor}
              labelColor={labelColor}
              valueColor={valueColor}
            />
          </GridItem>
        ))}
      </Grid>

      {/* Recent Orders */}
      <Box
        bg={cardBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="xl"
        overflow="hidden"
      >
        <Flex px={6} py={4} borderBottom="1px solid" borderColor={borderColor} align="center" justify="space-between">
          <Box>
            <Text fontSize="md" fontWeight="600" color={sectionTitle}>
              Recent Orders
            </Text>
            <Text fontSize="xs" color={subheadColor} mt={0.5}>
              Latest {recentOrders.length} customer orders
            </Text>
          </Box>
          <Badge  variant="subtle" borderRadius="lg" px={3} py={1} fontSize="xs" fontWeight="600">
            {recentOrders.length} orders
          </Badge>
        </Flex>

        {isLoading ? (
          <Flex align="center" justify="center" py={16} gap={3}>
            <Spinner size="md" color={spinnerColor} thickness="3px" />
            <Text fontSize="sm" color={emptyColor}>Loading orders...</Text>
          </Flex>
        ) : recentOrders.length === 0 ? (
          <Flex direction="column" align="center" justify="center" py={16} gap={2}>
            <Icon as={FiShoppingBag} boxSize={8} color={emptyColor} />
            <Text fontSize="sm" color={emptyColor} fontWeight="500">No orders found</Text>
            <Text fontSize="xs" color={emptyColor}>Orders will appear here once customers start placing them.</Text>
          </Flex>
        ) : (
          <Box overflowX="auto">
            <Table variant="unstyled" size="sm">
              <Thead bg={tableHeadBg}>
                <Tr>
                  <Th py={3} px={5} color={tableHeadColor} fontSize="2xs" fontWeight="700" letterSpacing="wider" textTransform="uppercase" borderBottom="1px solid" borderColor={borderColor}>
                    Order ID
                  </Th>
                  <Th py={3} px={5} color={tableHeadColor} fontSize="2xs" fontWeight="700" letterSpacing="wider" textTransform="uppercase" borderBottom="1px solid" borderColor={borderColor}>
                    Customer
                  </Th>
                  <Th py={3} px={5} color={tableHeadColor} fontSize="2xs" fontWeight="700" letterSpacing="wider" textTransform="uppercase" borderBottom="1px solid" borderColor={borderColor} isNumeric>
                    Items
                  </Th>
                  <Th py={3} px={5} color={tableHeadColor} fontSize="2xs" fontWeight="700" letterSpacing="wider" textTransform="uppercase" borderBottom="1px solid" borderColor={borderColor} isNumeric>
                    Total
                  </Th>
                  <Th py={3} px={5} color={tableHeadColor} fontSize="2xs" fontWeight="700" letterSpacing="wider" textTransform="uppercase" borderBottom="1px solid" borderColor={borderColor}>
                    Date
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {recentOrders.map((order, idx) => (
                  <Tr
                    key={`${order.id}-${idx}`}
                    _hover={{ bg: tableRowHover }}
                    transition="background 0.15s"
                    borderBottom="1px solid"
                    borderColor={borderColor}
                  >
                    <Td py={3} px={5}>
                      <Text fontSize="xs" fontFamily="mono" fontWeight="600" color={idColor}>
                        #{order.id?.slice(-8).toUpperCase()}
                      </Text>
                    </Td>
                    <Td py={3} px={5}>
                      <Flex align="center" gap={2.5}>
                        <Avatar size="xs" name={order.customer} bg={avatarBg} color="accent.text" fontSize="2xs" />
                        <VStack align="flex-start" spacing={0}>
                          <Text fontSize="sm" color={tdColor} fontWeight="500" lineHeight="shorter">
                            {order.customer}
                          </Text>
                          {order.email && (
                            <Text fontSize="2xs" color={emailColor}>{order.email}</Text>
                          )}
                        </VStack>
                      </Flex>
                    </Td>
                    <Td py={3} px={5} isNumeric>
                      <Badge  variant="subtle" borderRadius="md" px={2} fontSize="xs">
                        {order.items}
                      </Badge>
                    </Td>
                    <Td py={3} px={5} isNumeric>
                      <Text fontSize="sm" color={amountColor} fontWeight="700">
                        ${order.total.toFixed(2)}
                      </Text>
                    </Td>
                    <Td py={3} px={5}>
                      <Text fontSize="xs" color={tdColor}>
                        {order.date}
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Statistics;
