import { Box, Flex, Heading, SimpleGrid, Stat, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import { RiShoppingCart2Line, RiUser3Line, RiMoneyDollarCircleLine, RiFileList2Line } from "react-icons/ri";
import { GrUserAdmin } from "react-icons/gr";
import { AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";

const AdminDashboard = ({ totalUsers, products }) => {
  const totalRevenue = 5000; // Replace with actual data
  const adminOrders = 20; // Replace with actual data


  return (
    <Box p={4}>
      <Heading as="h1" size="lg" mb={4} >
        States Overview
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Stat p={4} borderRadius="md" boxShadow="md" bg="teal.100">
            <Flex align="center">
              <Box as={RiMoneyDollarCircleLine} fontSize="2xl" mr={2} />
              <Box>
                <StatLabel>Total Revenue</StatLabel>
                <StatNumber>${totalRevenue}</StatNumber>
              </Box>
            </Flex>
          </Stat>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Stat p={4} borderRadius="md" boxShadow="md" bg="blue.100">
            <Flex align="center">
              <Box as={RiUser3Line} fontSize="2xl" mr={2} />
              <Box>
                <StatLabel>Total Users</StatLabel>
                <StatNumber>{totalUsers}</StatNumber>
              </Box>
            </Flex>
          </Stat>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Stat p={4} borderRadius="md" boxShadow="md" bg="purple.100">
            <Flex align="center">
              <Box as={GrUserAdmin} fontSize="2xl" mr={2} />
              <Box>
                <StatLabel> Total Admins</StatLabel>
                <StatNumber>{adminOrders}</StatNumber>
              </Box>
            </Flex>
          </Stat>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Stat p={4} borderRadius="md" boxShadow="md" bg="orange.100">
            <Flex align="center">
              <Box as={RiFileList2Line} fontSize="2xl" mr={2} />
              <Box>
                <StatLabel>Total Products</StatLabel>
                <StatNumber>{products}</StatNumber>
              </Box>
            </Flex>
          </Stat>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Stat p={4} borderRadius="md" boxShadow="md" bg="orange.100">
            <Flex align="center">
              <Box as={RiShoppingCart2Line} fontSize="2xl" mr={2} />
              <Box>
                <StatLabel>Total Orders</StatLabel>
                <StatNumber>{products}</StatNumber>
              </Box>
            </Flex>
          </Stat>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Stat p={4} borderRadius="md" boxShadow="md" bg="orange.100">
            <Flex align="center">
              <Box as={AiFillHeart} fontSize="2xl" mr={2} />
              <Box>
                <StatLabel>Total Wishlist</StatLabel>
                <StatNumber>{products}</StatNumber>
              </Box>
            </Flex>
          </Stat>
        </motion.div>
      </SimpleGrid>
      <Flex justify="center" mt={8}>
        <Text fontSize="lg">More features coming soon...</Text>
      </Flex>
    </Box>
  );
};

export default AdminDashboard;
