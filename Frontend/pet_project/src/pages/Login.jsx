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
  
  /*------------------------- All states --------------------------------*/

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const Navigate = useNavigate();
  
  /*------------------------- All states end-------------------------- */

  /*-------------------- Logical parts------------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (email && password) {
      const userDetails = { email, password };
      let res = await loginFunction(userDetails);

      if (res) {
        toast({
          title: "Login Success.",
          status: "success",
          duration: 9000,
          isClosable: true,
          textAlign: "center",
        });
        setIsLogin(true);
      } else {
        toast({
          title: "Login failed.",
          status: "error",
          duration: 9000,
          isClosable: true,
          textAlign: "center",
        });
      }
    }
    setIsLoading(false);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    if (isLogin) {
      return Navigate("/");
    }
  }, [isLogin]);

  /*------------------------- Logical part end ---------------------------*/
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
        backgroundColor="whiteAlpha.900"
        borderRadius="md"
        boxShadow="lg"
      >
        <Heading as="h2" size="lg" textAlign="center" mb="6">
          Login to Pet App
        </Heading>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb="4"
          />
          <InputGroup>
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
            loadingspinner={<Spinner color="white" size="sm" />}
            isDisabled={email == "" || password == ""}
          >
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
