import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Text,
  Icon,
  Spinner,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FaArrowRight, FaCheck, FaChevronLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddToOrderData } from '../redux/User_Redux/order/action';
function CheckoutPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { cartData } = useSelector((store) => store.cartReducer);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    const storedData = localStorage.getItem('checkoutData');
    if (storedData) {
      const { name, email, address } = JSON.parse(storedData);
      setName(name);
      setEmail(email);
      setAddress(address);
    }
  }, []);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    setIsPlacingOrder(true);
    setTimeout(() => {
      setIsPlacingOrder(false);
      setShowSummary(true);
    }, 2000);
  };

  const handleConfirmOrder = async () => {
    const items = cartData.map((item) => {
      return {
        brand: item.brand,
        price: item.price,
        discount: item.discount,
        images: item.images,
        size: item.size,
        quantity: item.quantity,
      };
    });
    const payload = { name, email, address, items };

    dispatch(handleAddToOrderData(payload));
  };
  useEffect(() => {
    localStorage.setItem(
      'checkoutData',
      JSON.stringify({ name, email, address }),
    );
  }, [name, email, address]);

  const calculateTotalPrice =
    cartData.length > 0
      ? Math.ceil(
          cartData.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
          ),
        )
      : 0;

  return (
    <ChakraProvider>
      <Box
        maxW="md"
        mx="auto"
        mt={10}
        p={6}
        borderWidth={1}
        borderRadius="md"
        boxShadow="lg"
      >
        <Heading as="h1" size="lg" mb={6}>
          Checkout
        </Heading>
        {!showSummary ? (
          <form onSubmit={handlePlaceOrder}>
            <FormControl id="name" isRequired mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </FormControl>
            <FormControl id="email" isRequired mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl id="address" isRequired mb={4}>
              <FormLabel>Address</FormLabel>

              <Textarea
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
              />
            </FormControl>
            <Button
              colorScheme="blue"
              type="submit"
              rightIcon={
                isPlacingOrder ? (
                  <Spinner size="sm" />
                ) : (
                  <Icon as={FaArrowRight} />
                )
              }
              isLoading={isPlacingOrder}
              loadingText="Placing Order"
            >
              Place Order
            </Button>
          </form>
        ) : (
          <Box mt={6}>
            <Heading as="h2" size="md" mb={2}>
              Order Summary
            </Heading>
            <Box borderWidth={1} borderRadius="md" p={4}>
              <Flex alignItems="center" mb={2}>
                <Icon as={FaCheck} boxSize={6} mr={2} />
                <Text fontWeight="bold">Payment: $ {calculateTotalPrice}</Text>
              </Flex>
              <Flex alignItems="center" mb={2}>
                <Icon as={FaCheck} boxSize={6} mr={2} />
                <Text fontWeight="bold">Name: {name}</Text>
              </Flex>
              <Flex alignItems="center" mb={2}>
                <Icon as={FaCheck} boxSize={6} mr={2} />
                <Text fontWeight="bold">Email: {email}</Text>
              </Flex>
              <Flex alignItems="center">
                <Icon as={FaCheck} boxSize={6} mr={2} />
                <Text fontWeight="bold">Address: {address}</Text>
              </Flex>
              <FormControl id="cardNumber" isRequired mb={4}>
                <FormLabel>Card Number</FormLabel>
                <Input
                  type="text"
                  {...register('cardNumber', {
                    required: 'Card number is required',
                    pattern: {
                      value: /^\d{16}$/,
                      message: 'Invalid card number',
                    },
                  })}
                  placeholder="Enter your card number"
                />
                {errors.cardNumber && (
                  <Text color="red.500">{errors.cardNumber.message}</Text>
                )}
              </FormControl>
              <FormControl id="cvv" isRequired mb={4}>
                <FormLabel>CVV</FormLabel>
                <Input
                  type="text"
                  {...register('cvv', {
                    required: 'CVV is required',
                    pattern: {
                      value: /^\d{3}$/,
                      message: 'Invalid CVV',
                    },
                  })}
                  placeholder="Enter CVV"
                />
                {errors.cvv && (
                  <Text color="red.500">{errors.cvv.message}</Text>
                )}
              </FormControl>
              <FormControl id="expiryDate" isRequired mb={4}>
                <FormLabel>Expiry Date</FormLabel>
                <Input
                  type="text"
                  {...register('expiryDate', {
                    required: 'Expiry date is required',
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                      message: 'Invalid expiry date',
                    },
                  })}
                  placeholder="Enter expiry date (MM/YY)"
                />
                {errors.expiryDate && (
                  <Text color="red.500">{errors.expiryDate.message}</Text>
                )}
              </FormControl>
            </Box>
            <Button
              mt={4}
              leftIcon={<Icon as={FaChevronLeft} />}
              onClick={() => setShowSummary(false)}
            >
              Go Back
            </Button>
            <Button
              mt={4}
              ml={4}
              colorScheme="blue"
              rightIcon={
                isPlacingOrder ? (
                  <Spinner size="sm" />
                ) : (
                  <Icon as={FaArrowRight} />
                )
              }
              isLoading={isPlacingOrder}
              loadingText="Placing Order"
              onClick={handleSubmit(handleConfirmOrder)}
            >
              Confirm Order
            </Button>
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default CheckoutPage;
