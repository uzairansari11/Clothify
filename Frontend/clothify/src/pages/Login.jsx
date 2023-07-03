import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { handleLoginFunction } from '../redux/User_Redux/authentication/action';
import { cookiesGetter } from '../utils/coockies';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();
  const comingFrom = location.state?.data || '/';
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (email && password) {
      const userDetails = { email, password };
      dispatch(handleLoginFunction(userDetails)).then((res) => {
        if (res === true) {
          const userDetails = cookiesGetter(
            `${process.env.REACT_APP_USER_TOKEN}`,
          );
          setTimeout(() => {
            toast({
              title: `Welcome Back ${userDetails.name.toUpperCase()}`,
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'top',
            });
          }, 1000);

          setIsLogin(true);
          setIsLoading(false);
        } else {
          setTimeout(() => {
            toast({
              title: 'Login Failed',
              status: 'warning',
              duration: 3000,
              isClosable: true,
              position: 'top',
            });
          }, 1000);
          setIsLoading(false);
        }
      });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isLogin) {
      return navigate(comingFrom, { replace: true });
    }
  }, [isLogin]);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box
        width={{ base: '90%', sm: '400px' }}
        padding="6"
        borderRadius="md"
        boxShadow="lg"
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            delay: 0.2,
            duration: 0.6,
          },
        }}
        initial={{ y: -100, opacity: 0 }}
      >
        <Heading
          as={motion.h2}
          size="xl"
          textAlign="center"
          mb="6"
          color="teal.500"
          fontFamily="cursive"
          fontSize="2xl"
          fontWeight="extrabold"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Welcome to Clothify
        </Heading>
        <Text textAlign="center" mb="6" color="gray.600">
          Where fashion meets style, and elegance becomes you.
        </Text>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb="4"
            size="lg"
          />
          <InputGroup size="lg">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pr="4.5rem"
              mb="4"
            />
            <InputRightElement width="4.5rem">
              <IconButton
                h="1.75rem"
                size="sm"
                onClick={handleTogglePassword}
                icon={showPassword ? <FiEyeOff /> : <FiEye />}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                variant="unstyled"
              />
            </InputRightElement>
          </InputGroup>
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            width="100%"
            leftIcon={<FiLogIn />}
            isLoading={isLoading}
            loadingText="Logging In..."
            spinner={<Spinner color="white" size="sm" />}
            isDisabled={email === '' || password === ''}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            Login
          </Button>
        </form>
        <Text mt="4" textAlign="center" color="gray.500">
          Don't have an account?{' '}
          <Link to="/signup" color="teal.500">
            Sign up
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;
