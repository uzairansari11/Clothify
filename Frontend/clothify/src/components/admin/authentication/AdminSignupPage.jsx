import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  FiKey,
  FiLock,
  FiMail,
  FiPhone,
  FiShield,
  FiUser,
  FiUserPlus,
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { adminsignupFunction } from '../../../utils/signup';
import FormField from '../../common/FormField';
import { useFormValidation } from '../../common/useFormValidation';
import { isEmail, isPhone, minLength, required } from '../../common/validators';

const MotionFlex = motion(Flex);

const AdminSignupPage = () => {
  const { values, errors, handleChange, handleBlur, validateAll } = useFormValidation(
    { name: '', email: '', mobile: '', password: '', secretKey: '' },
    {
      name: [required('Full name is required'), minLength(2, 'Name must be at least 2 characters')],
      email: [required('Email is required'), isEmail()],
      mobile: [required('Mobile number is required'), isPhone()],
      password: [required('Password is required'), minLength(8, 'Password must be at least 8 characters')],
      secretKey: [required('Secret key is required')],
    }
  );

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const pageBg = useColorModeValue('gray.100', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBorder = useColorModeValue('gray.200', 'gray.700');
  const headingColor = useColorModeValue('gray.900', 'white');
  const subtextColor = useColorModeValue('gray.500', 'gray.400');
  const linkColor = 'accent.solid';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setIsLoading(true);
    const response = await adminsignupFunction({
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      password: values.password,
      code: values.secretKey,
    });
    if (response === true) {
      toast.success('Admin account created! You can now sign in.');
      setIsLoading(false);
      navigate('/admin/login', { replace: true });
    } else {
      toast.error(typeof response === 'string' ? response : 'Could not create account.');
      setIsLoading(false);
    }
  };

  const isFormValid =
    values.name && values.email && values.mobile && values.password && values.secretKey;

  return (
    <Flex align="center" justify="center" minH="100vh" bg={pageBg} px={4} py={12}>
      <MotionFlex
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        direction={{ base: 'column', md: 'row' }}
        maxW="860px"
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
          minH="580px"
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
              Join as Admin
            </Text>
            <Text fontSize="sm" fontWeight="400" opacity={0.7} lineHeight="1.7" maxW="220px">
              Create an admin account to manage the Clothify store. A secret key is required.
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

          <Box mb={6}>
            <Heading size="lg" color={headingColor} fontWeight="800" letterSpacing="-0.5px" mb={2}>
              Create admin account
            </Heading>
            <Text fontSize="sm" color={subtextColor}>
              Fill in your details and secret key to get started
            </Text>
          </Box>

          <form onSubmit={handleSubmit}>
            <VStack spacing={3} align="stretch">
              <FormField
                label="Full Name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                placeholder="Your full name"
                icon={FiUser}
                variant="auth"
              />

              <FormField
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                placeholder="admin@example.com"
                icon={FiMail}
                variant="auth"
              />

              <FormField
                label="Mobile"
                name="mobile"
                type="tel"
                value={values.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.mobile}
                placeholder="10-digit mobile number"
                icon={FiPhone}
                variant="auth"
              />

              <FormField
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                placeholder="Min 8 characters"
                icon={FiLock}
                variant="auth"
              />

              <FormField
                label="Secret Key"
                name="secretKey"
                type="password"
                value={values.secretKey}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.secretKey}
                placeholder="Admin secret key"
                icon={FiKey}
                variant="auth"
              />

              <Button
                type="submit"
                size="lg"
                w="100%"
                h="50px"
                mt={2}
                bg="gray.900"
                color="white"
                leftIcon={<FiUserPlus />}
                isLoading={isLoading}
                loadingText="Creating account..."
                isDisabled={!isFormValid}
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
                Create Account
              </Button>
            </VStack>
          </form>

          <Text mt={6} textAlign="center" color={subtextColor} fontSize="sm">
            Already have an account?{' '}
            <Link to="/admin/login">
              <Text as="span" color={linkColor} fontWeight="600" _hover={{ textDecoration: 'underline' }}>
                Sign in
              </Text>
            </Link>
          </Text>
        </Flex>
      </MotionFlex>
    </Flex>
  );
};

export default AdminSignupPage;
