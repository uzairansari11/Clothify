import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  IconButton,
  InputGroup,
  InputRightElement,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { loginFunction } from "../utils/coockies";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginFunction } from "../redux/authentication/action";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
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
          toast({
            title: "Login Success.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setIsLogin(true);
          setIsLoading(false);
        } else {
          toast({
            title: "Login failed",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
        }
      });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isLogin) {
      return navigate("/", { replace: true });
    }
  }, [isLogin]);

  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      backgroundImage="url('/images/loginbg.jpg')"
      backgroundSize={"cover"}
      backgroundPosition="center"
      objectFit={"cover"}
    >
      <Box
        width={{ base: "90%", sm: "400px" }}
        padding="6"
        backgroundColor="white"
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
          fontFamily={"cursive"}
          fontSize={"xl"}
          fontWeight={"extrabold"}
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
              type={showPassword ? "text" : "password"}
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
                aria-label={showPassword ? "Hide password" : "Show password"}
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
            isDisabled={email === "" || password === ""}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
