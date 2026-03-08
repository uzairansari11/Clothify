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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff, FiLock, FiMail, FiPhone, FiShoppingBag, FiUser, FiUserPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { signupFunction } from "../utils/signup";

const MotionFlex = motion(Flex);

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.100", "gray.700");
  const headingColor = useColorModeValue("gray.900", "white");
  const subtextColor = useColorModeValue("gray.500", "gray.400");
  const inputBg = useColorModeValue("gray.50", "gray.700");
  const inputBorder = useColorModeValue("gray.200", "gray.600");
  const inputIconColor = useColorModeValue("gray.400", "gray.500");
  const brandDotColor = "accent.solid";
  const linkColor = "accent.solid";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (email && password && mobile && name) {
      const res = await signupFunction({ email, password, name, mobile });

      if (res === true) {
        toast({
          title: "Account created!",
          description: "You can now sign in with your credentials.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        setIsCreated(true);
      } else {
        toast({
          title: "Signup failed",
          description: typeof res === "string" ? res : "Could not create account. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isCreated) navigate("/login", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreated]);

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
          minH="540px"
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
              Join Clothify
            </Text>
            <Text
              fontSize="sm"
              fontWeight="400"
              opacity={0.85}
              lineHeight="1.7"
              maxW="220px"
            >
              Create an account to unlock exclusive deals, track orders, and build your personal wishlist.
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

          <Box mb={6}>
            <Heading
              size="lg"
              color={headingColor}
              fontWeight="800"
              letterSpacing="-0.5px"
              mb={2}
            >
              Create account
            </Heading>
            <Text fontSize="sm" color={subtextColor}>
              Fill in your details to get started
            </Text>
          </Box>

          <form onSubmit={handleSubmit}>
            <VStack spacing={3.5} align="stretch">
              <Box>
                <Text fontSize="xs" fontWeight="600" color={subtextColor} mb={1.5} textTransform="uppercase" letterSpacing="0.05em">
                  Full Name
                </Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" h="46px">
                    <Icon as={FiUser} color={inputIconColor} boxSize={4} />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    h="46px"
                    bg={inputBg}
                    border="1px solid"
                    borderColor={inputBorder}
                    borderRadius="xl"
                    fontSize="sm"
                    _focus={{
                      borderColor: "accent.solid",
                      boxShadow: "0 0 0 1px var(--chakra-colors-accent-solid)",
                      bg: cardBg,
                    }}
                    _placeholder={{ color: inputIconColor }}
                  />
                </InputGroup>
              </Box>

              <Box>
                <Text fontSize="xs" fontWeight="600" color={subtextColor} mb={1.5} textTransform="uppercase" letterSpacing="0.05em">
                  Email
                </Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" h="46px">
                    <Icon as={FiMail} color={inputIconColor} boxSize={4} />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    h="46px"
                    bg={inputBg}
                    border="1px solid"
                    borderColor={inputBorder}
                    borderRadius="xl"
                    fontSize="sm"
                    _focus={{
                      borderColor: "accent.solid",
                      boxShadow: "0 0 0 1px var(--chakra-colors-accent-solid)",
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
                  <InputLeftElement pointerEvents="none" h="46px">
                    <Icon as={FiLock} color={inputIconColor} boxSize={4} />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    h="46px"
                    bg={inputBg}
                    border="1px solid"
                    borderColor={inputBorder}
                    borderRadius="xl"
                    fontSize="sm"
                    _focus={{
                      borderColor: "accent.solid",
                      boxShadow: "0 0 0 1px var(--chakra-colors-accent-solid)",
                      bg: cardBg,
                    }}
                    _placeholder={{ color: inputIconColor }}
                  />
                  <InputRightElement h="46px">
                    <IconButton
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      icon={showPassword ? <FiEyeOff /> : <FiEye />}
                      aria-label={showPassword ? "Hide" : "Show"}
                      color={inputIconColor}
                    />
                  </InputRightElement>
                </InputGroup>
              </Box>

              <Box>
                <Text fontSize="xs" fontWeight="600" color={subtextColor} mb={1.5} textTransform="uppercase" letterSpacing="0.05em">
                  Mobile
                </Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" h="46px">
                    <Icon as={FiPhone} color={inputIconColor} boxSize={4} />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    minLength={10}
                    maxLength={10}
                    h="46px"
                    bg={inputBg}
                    border="1px solid"
                    borderColor={inputBorder}
                    borderRadius="xl"
                    fontSize="sm"
                    _focus={{
                      borderColor: "accent.solid",
                      boxShadow: "0 0 0 1px var(--chakra-colors-accent-solid)",
                      bg: cardBg,
                    }}
                    _placeholder={{ color: inputIconColor }}
                  />
                </InputGroup>
              </Box>

              <Button
                type="submit"
                size="lg"
                w="100%"
                h="50px"
                mt={2}
                bg="accent.solid"
                color="white"
                leftIcon={<FiUserPlus />}
                isLoading={isLoading}
                loadingText="Creating account..."
                isDisabled={!name || !email || !password || !mobile}
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
                Create Account
              </Button>
            </VStack>
          </form>

          <Text mt={6} textAlign="center" color={subtextColor} fontSize="sm">
            Already have an account?{" "}
            <Link to="/login">
              <Text as="span" color={linkColor} fontWeight="600" _hover={{ textDecoration: "underline" }}>
                Sign in
              </Text>
            </Link>
          </Text>
        </Flex>
      </MotionFlex>
    </Flex>
  );
};

export default Signup;
