import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FiEye, FiEyeOff, FiLock, FiLogIn, FiMail, FiShield } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { handleLoginFunction } from '../../../redux/Admin_Redux/authentication/action';
import { cookiesGetter } from '../../../utils/cookies';

const MotionFlex = motion(Flex);

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pageBg = useColorModeValue('gray.100', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBorder = useColorModeValue('gray.200', 'gray.700');
  const headingColor = useColorModeValue('gray.900', 'white');
  const subtextColor = useColorModeValue('gray.500', 'gray.400');
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const inputBorder = useColorModeValue('gray.200', 'gray.600');
  const inputIconColor = useColorModeValue('gray.400', 'gray.500');
  const linkColor = 'accent.solid';

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (email && password) {
      dispatch(handleLoginFunction({ email, password })).then((res) => {
        if (res === true) {
          const adminDetails = cookiesGetter(`${process.env.REACT_APP_ADMIN_TOKEN}`);
          toast({
            title: `Welcome back, ${adminDetails?.name || 'Admin'}`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          });
          setIsLogin(true);
        } else {
          toast({
            title: 'Login failed',
            description: 'Invalid email or password.',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
          });
        }
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isLogin) navigate('/admin/dashboard', { replace: true });
  }, [isLogin, navigate]);

  return (
    <Flex align="center" justify="center" minH="100vh" bg={pageBg} px={4} py={12}>
      <MotionFlex
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        direction={{ base: 'column', md: 'row' }}
        maxW="820px"
        w="100%"
        bg={cardBg}
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="0 4px 24px rgba(0,0,0,0.1)"
        border="1px solid"
        borderColor={cardBorder}
      >
        {/* Left panel — admin branding */}
        <Flex
          display={{ base: 'none', md: 'flex' }}
          direction="column"
          justify="center"
          align="center"
          bg="gray.900"
          color="white"
          w="320px"
          minH="440px"
          p={10}
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="-20%"
            right="-20%"
            w="200px"
            h="200px"
            borderRadius="full"
            bg="accent.solid"
            opacity={0.15}
            filter="blur(50px)"
          />
          <Box
            position="absolute"
            bottom="-15%"
            left="-15%"
            w="160px"
            h="160px"
            borderRadius="full"
            bg="accent.solid"
            opacity={0.1}
            filter="blur(40px)"
          />

          <Box position="relative" zIndex={1} textAlign="center">
            <Flex align="center" justify="center" mb={6}>
              <Flex
                align="center"
                justify="center"
                w="56px"
                h="56px"
                borderRadius="xl"
                bg="whiteAlpha.100"
                border="1px solid"
                borderColor="whiteAlpha.200"
              >
                <Icon as={FiShield} boxSize={6} />
              </Flex>
            </Flex>
            <Text fontSize="2xl" fontWeight="800" letterSpacing="-0.5px" mb={2}>
              Admin Panel
            </Text>
            <Text fontSize="sm" fontWeight="400" opacity={0.7} lineHeight="1.7" maxW="220px">
              Manage products, orders, and users from the Clothify dashboard.
            </Text>
          </Box>
        </Flex>

        {/* Right panel — form */}
        <Flex flex="1" direction="column" justify="center" p={{ base: 6, sm: 10 }}>
          {/* Mobile-only brand */}
          <Flex display={{ base: 'flex', md: 'none' }} align="center" justify="center" mb={6}>
            <Flex align="center" gap={2}>
              <Icon as={FiShield} boxSize={5} color="accent.solid" />
              <Text fontSize="lg" fontWeight="800" color={headingColor} letterSpacing="-0.5px">
                Admin Panel
              </Text>
            </Flex>
          </Flex>

          <Box mb={8}>
            <Heading size="lg" color={headingColor} fontWeight="800" letterSpacing="-0.5px" mb={2}>
              Admin Login
            </Heading>
            <Text fontSize="sm" color={subtextColor}>
              Sign in to access the admin dashboard
            </Text>
          </Box>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontSize="xs" fontWeight="600" color={subtextColor} mb={1.5} textTransform="uppercase" letterSpacing="0.05em">
                  Email
                </Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" h="48px">
                    <Icon as={FiMail} color={inputIconColor} boxSize={4} />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    h="48px"
                    bg={inputBg}
                    border="1px solid"
                    borderColor={inputBorder}
                    borderRadius="xl"
                    fontSize="sm"
                    _focus={{
                      borderColor: 'accent.solid',
                      boxShadow: '0 0 0 1px var(--chakra-colors-accent-solid)',
                      bg: cardBg,
                    }}
                    _placeholder={{ color: inputIconColor }}
                  />
                </InputGroup>
              </Box>

              <Box>
                <Text fontSize="xs" fontWeight="600" color={subtextColor} mb={1.5} textTransform="uppercase" letterSpacing="0.05em">
                  Password
                </Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" h="48px">
                    <Icon as={FiLock} color={inputIconColor} boxSize={4} />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    h="48px"
                    bg={inputBg}
                    border="1px solid"
                    borderColor={inputBorder}
                    borderRadius="xl"
                    fontSize="sm"
                    _focus={{
                      borderColor: 'accent.solid',
                      boxShadow: '0 0 0 1px var(--chakra-colors-accent-solid)',
                      bg: cardBg,
                    }}
                    _placeholder={{ color: inputIconColor }}
                  />
                  <InputRightElement h="48px">
                    <IconButton
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      icon={showPassword ? <FiEyeOff /> : <FiEye />}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      color={inputIconColor}
                    />
                  </InputRightElement>
                </InputGroup>
              </Box>

              <Button
                type="submit"
                size="lg"
                w="100%"
                h="50px"
                mt={2}
                bg="gray.900"
                color="white"
                leftIcon={<FiLogIn />}
                isLoading={isLoading}
                loadingText="Signing in..."
                isDisabled={!email || !password}
                borderRadius="xl"
                fontWeight="700"
                fontSize="sm"
                letterSpacing="0.02em"
                _hover={{
                  bg: 'gray.800',
                  transform: 'translateY(-1px)',
                  boxShadow: 'lg',
                }}
                _active={{ transform: 'translateY(0)' }}
                transition="all 0.2s"
              >
                Sign In
              </Button>
            </VStack>
          </form>

          <Text mt={8} textAlign="center" color={subtextColor} fontSize="sm">
            Don't have an account?{' '}
            <Link to="/admin/signup">
              <Text as="span" color={linkColor} fontWeight="600" _hover={{ textDecoration: 'underline' }}>
                Create admin account
              </Text>
            </Link>
          </Text>
        </Flex>
      </MotionFlex>
    </Flex>
  );
};

export default AdminLoginPage;
