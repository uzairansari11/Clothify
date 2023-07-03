import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { adminsignupFunction } from "../../../utils/signup";

const AdminSignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const toast = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let response = await adminsignupFunction({
      name,
      email,
      mobile,
      password,
      code: secretKey,
    });
    if (response === true) {
      setTimeout(() => {
        setIsLoading(false);
        setError(null);
        toast({
          title: "Signup Successful",
          description: "You have successfully signed up as an admin.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setName("");
        setEmail("");
        setMobile("");
        setPassword("");
        setSecretKey("");
        navigate("/admin/login", { replace: true });
      }, 2000);
    } else {
      setIsLoading(false);
      toast({
        title: `${response}`,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <Box
        width={{ base: "90%", sm: "400px" }}
        mx="auto"
        px={4}
        boxShadow="lg"
        rounded="lg"
        bg="white"
        py={2}
      >
        <Box>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Flex align="center" justify="center" direction="column">
                <Heading
                  as={motion.h2}
                  size="xl"
                  textAlign="center"
                  color="teal.500"
                  fontFamily="cursive"
                  fontSize="2xl"
                  fontWeight="extrabold"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Clothify Admin Signup
                </Heading>
              </Flex>

              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="mobile" isRequired>
                <FormLabel>Mobile Number</FormLabel>
                <Input
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="secretKey" isRequired>
                <FormLabel>
                  <FcApproval /> Secret Key
                </FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your secret key"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                />
              </FormControl>
              {error && (
                <FormErrorMessage fontSize="sm">
                  {error.message}
                </FormErrorMessage>
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  type="submit"
                  colorScheme="teal"
                  isLoading={isLoading}
                  loadingText="Signing up..."
                  fontSize="md"
                  width="100%"
                  _hover={{ bg: "teal.600" }}
                  leftIcon={<FaUser />}
                >
                  Sign up
                </Button>
              </motion.div>
              <Text textAlign="center" fontSize="sm">
                Already have an account? <Link to="/admin/login">Login</Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminSignupPage;
