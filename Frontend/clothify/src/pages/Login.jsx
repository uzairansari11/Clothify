import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiLogIn, FiLock, FiMail, FiShoppingBag } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormField from "../components/common/FormField";
import { useFormValidation } from "../components/common/useFormValidation";
import { required, isEmail } from "../components/common/validators";
import { handleLoginFunction } from "../redux/User_Redux/authentication/action";
import { cookiesGetter } from "../utils/cookies";

const MotionFlex = motion(Flex);

const Login = () => {
  const { values, errors, handleChange, handleBlur, validateAll } = useFormValidation(
    { email: "", password: "" },
    {
      email: [required("Email is required"), isEmail()],
      password: [required("Password is required")],
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();
  const comingFrom = location.state?.data || "/";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.100", "gray.700");
  const headingColor = useColorModeValue("gray.900", "white");
  const subtextColor = useColorModeValue("gray.500", "gray.400");
  const brandDotColor = "accent.solid";
  const linkColor = "accent.solid";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setIsLoading(true);
    dispatch(handleLoginFunction({ email: values.email, password: values.password })).then((res) => {
      if (res === true) {
        const userDetails = cookiesGetter(`${process.env.REACT_APP_USER_TOKEN}`);
        toast.success(`Welcome back, ${userDetails?.name || ""}!`);
        setIsLogin(true);
      } else {
        toast.error(typeof res === "string" ? res : "Invalid email or password");
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isLogin) navigate(comingFrom, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      bg={pageBg}
      px={4}
      py={12}
    >
      <MotionFlex
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        direction={{ base: "column", md: "row" }}
        maxW="860px"
        w="100%"
        bg={cardBg}
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="0 4px 24px rgba(0,0,0,0.08)"
        border="1px solid"
        borderColor={cardBorder}
      >
        {/* Left panel — branding */}
        <Flex
          display={{ base: "none", md: "flex" }}
          direction="column"
          justify="center"
          align="center"
          bg="accent.solid"
          color="white"
          w="340px"
          minH="480px"
          p={10}
          position="relative"
          overflow="hidden"
        >
          {/* Decorative orbs */}
          <Box
            position="absolute"
            top="-20%"
            right="-20%"
            w="200px"
            h="200px"
            borderRadius="full"
            bg="whiteAlpha.200"
            filter="blur(40px)"
          />
          <Box
            position="absolute"
            bottom="-15%"
            left="-15%"
            w="160px"
            h="160px"
            borderRadius="full"
            bg="whiteAlpha.150"
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
                bg="whiteAlpha.200"
              >
                <Icon as={FiShoppingBag} boxSize={6} />
              </Flex>
            </Flex>
            <Text
              fontSize="2xl"
              fontWeight="800"
              letterSpacing="-0.5px"
              mb={3}
            >
              Clothify
            </Text>
            <Text
              fontSize="sm"
              fontWeight="400"
              opacity={0.85}
              lineHeight="1.7"
              maxW="220px"
            >
              Discover curated collections crafted for every occasion. Style meets comfort.
            </Text>
          </Box>
        </Flex>

        {/* Right panel — form */}
        <Flex
          flex="1"
          direction="column"
          justify="center"
          p={{ base: 6, sm: 10 }}
        >
          {/* Mobile-only brand */}
          <Flex display={{ base: "flex", md: "none" }} align="center" justify="center" mb={6}>
            <Text fontSize="xl" fontWeight="800" color={headingColor} letterSpacing="-0.5px">
              Clothify
              <Text as="span" color={brandDotColor}>.</Text>
            </Text>
          </Flex>

          <Box mb={8}>
            <Heading
              size="lg"
              color={headingColor}
              fontWeight="800"
              letterSpacing="-0.5px"
              mb={2}
            >
              Welcome back
            </Heading>
            <Text fontSize="sm" color={subtextColor}>
              Sign in to your account to continue shopping
            </Text>
          </Box>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                icon={FiMail}
                variant="auth"
              />

              <FormField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                icon={FiLock}
                variant="auth"
              />

              <Button
                type="submit"
                size="lg"
                w="100%"
                h="50px"
                mt={2}
                bg="accent.solid"
                color="white"
                leftIcon={<FiLogIn />}
                isLoading={isLoading}
                loadingText="Signing in..."
                isDisabled={!values.email || !values.password}
                borderRadius="xl"
                fontWeight="700"
                fontSize="sm"
                letterSpacing="0.02em"
                _hover={{
                  opacity: 0.9,
                  transform: "translateY(-1px)",
                  boxShadow: "lg",
                }}
                _active={{ transform: "translateY(0)" }}
                transition="all 0.2s"
              >
                Sign In
              </Button>
            </VStack>
          </form>

          <Text mt={8} textAlign="center" color={subtextColor} fontSize="sm">
            Don't have an account?{" "}
            <Link to="/signup">
              <Text as="span" color={linkColor} fontWeight="600" _hover={{ textDecoration: "underline" }}>
                Create account
              </Text>
            </Link>
          </Text>
        </Flex>
      </MotionFlex>
    </Flex>
  );
};

export default Login;
