import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  ScaleFade,
  Text,
  Tooltip
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import CartItemCard from '../components/user/cart/CartItemCard';

import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/user/spinner/Spinner';
import {
  handleDeleteToCartData,
  handleUpdateToCartData,
} from '../redux/User_Redux/cart/action';

const CartPage = () => {
  const { cartData } = useSelector((store) => store.cartReducer);
  const { isAuth } = useSelector((store) => store.authReducer);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleQuantityChange = (itemId, payload) => {
    dispatch(handleUpdateToCartData(itemId, payload));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(handleDeleteToCartData(itemId));
  };

  const calculateTotalPrice =
    cartData?.length &&
    Math.ceil(
      cartData?.reduce((total, item) => total + item.price * item.quantity, 0),
    );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [dispatch]);

  if (!isAuth) {
    // Redirect or display message indicating that the user needs to log in
    return (
      <Box p={4}>
        <Heading
          as="h1"
          mb={4}
          size="xl"
          textAlign="center"
          color="teal.500"
          fontFamily={'cursive'}
          fontSize={'xl'}
          fontWeight={'extrabold'}
        >
          Your Cart
        </Heading>
        <Divider my={4} />
        <Flex justifyContent="center" alignItems="center" minHeight="200px">
          <Text fontSize="xl" textAlign="center" color="gray.500">
            Please log in to view your cart.
          </Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading
        as="h1"
        mb={4}
        size="xl"
        textAlign="center"
        color="teal.500"
        fontFamily={'cursive'}
        fontSize={'xl'}
        fontWeight={'extrabold'}
      >
        Your Cart
      </Heading>
      <Divider my={4} />

      <Flex flexDirection={{ base: 'column-reverse', md: 'row' }}>
        <Flex
          flexDirection="column"
          flex={{ base: 'none', md: '3' }}
          pr={{ base: '0', md: '4' }}
          css={{
            overflowY: 'auto',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {loading ? (
            <Flex justifyContent="center" alignItems="center" minHeight="200px">
              <LoadingSpinner />
            </Flex>
          ) : cartData?.length ? (
            <Grid
              gridTemplateColumns={{
                base: 'repeat(1,1fr)',
                md: 'repeat(1,1fr)',
                lg: 'repeat(2,1fr)',
              }}
              gap={{ sm: '4' }}
            >
              {cartData.map((ele) => (
                <CartItemCard
                  key={ele._id}
                  {...ele}
                  handleRemoveItem={handleRemoveItem}
                  handleQuantityChange={handleQuantityChange}
                />
              ))}
            </Grid>
          ) : (
            <Flex justifyContent="center" alignItems="center" minHeight="200px">
              <ScaleFade initialScale={0.9} in>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 150,
                  }}
                >
                  <Text fontSize="xl" textAlign="center" color="gray.500">
                    Your Cart Is Empty !
                  </Text>
                </motion.div>
              </ScaleFade>
            </Flex>
          )}
        </Flex>
        {loading ? (
          <></>
        ) : isAuth && cartData?.length ? (
          <Flex
            flexDirection="column"
            flex={{ base: 'none', md: '1' }}
            pl={{ base: '0', md: '4' }}
            position="sticky"
            top={0}
            alignSelf="flex-start"
            background={'white'}
            margin={{ base: 'auto', md: '0' }}
          >
            <Flex justifyContent="space-around" alignItems="center" mt={4}>
              <Text fontWeight="bold">Total:</Text>
              <Tooltip label="Total Price" placement="top">
                <Text fontWeight="bold">$ {calculateTotalPrice}</Text>
              </Tooltip>
            </Flex>
            <Link to="/checkout">
              <Flex justifyContent="flex-end" alignItems="center" mt={4}>
                <Button
                  colorScheme="teal"
                  size="md"
                  width={{ base: '100%', md: 'auto%' }}
                  rightIcon={<FaShoppingCart />}
                  margin={'auto'}
                >
                  Proceed to Checkout
                </Button>
              </Flex>
            </Link>
          </Flex>
        ) : (
          <></>
        )}
      </Flex>
    </Box>
  );
};

export default CartPage;
