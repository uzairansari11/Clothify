import React, { useState } from "react";
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
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AdminLoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Flex align="center" justify="center" height="80vh">
            <Box
                width={{ base: "90%", sm: "400px" }}
                padding="6"
                borderRadius="lg"
                boxShadow="lg"
                bg="white"
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
                    Clothify Admin Login
                </Heading>

                <form>
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
                <Text mt="4" textAlign="center" color="gray.500">
                    Don't have an account?{" "}
                    <Link to="/admin/signup" color="teal.500">
                        Sign up
                    </Link>
                </Text>
            </Box>
        </Flex>
    );
};

export default AdminLoginPage;