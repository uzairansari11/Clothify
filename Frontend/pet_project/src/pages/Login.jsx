import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  IconButton,
  InputGroup,
  InputRightElement,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { loginFunction } from "../utils/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (email && password) {
      const userDetails = { email, password };
      let res = await loginFunction(userDetails);

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
          description: `${res}`,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
      }
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
      backgroundImage="url('pet-background.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box
        width={{ base: "90%", sm: "400px" }}
        padding="6"
        backgroundColor="white"
        borderRadius="md"
        boxShadow="lg"
      >
        <Heading as="h2" size="lg" textAlign="center" mb="6" color="teal.500">
          Login to Pet App
        </Heading>
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
          >
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
