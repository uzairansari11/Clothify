import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { FiUserPlus, FiEye, FiEyeOff } from "react-icons/fi";
import { signupFunction } from "../utils/signup";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulating signup logic with a delay
    if (email && password && mobile && name) {
      const userData = { email, password, name, mobile };
      let res = await signupFunction(userData);
      console.log(res);
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Add your actual signup logic here
    }, 2000);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      backgroundImage="url('signup-background.jpg')"
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
          Sign Up for Pet App
        </Heading>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            mb="4"
          />
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
              minLength={8}
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
          <Input
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            mb="4"
            minLength={10}
            maxLength={10}
          />

          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            width="100%"
            leftIcon={<FiUserPlus />}
            isLoading={isLoading}
            loadingText="Signing Up..."
            loadingspinner={<Spinner color="white" size="sm" />}
            isDisabled={!name || !email || !password || !mobile}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Signup;
