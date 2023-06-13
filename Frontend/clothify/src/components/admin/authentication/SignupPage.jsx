import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform your signup logic here
        // You can make API requests or handle form submission

        setIsLoading(true);

        // Simulating an API request
        setTimeout(() => {
            setIsLoading(false);
            setError(null);

            // Display success toast
            toast({
                title: "Signup Successful",
                description: "You have successfully signed up as an admin.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            // Reset form fields
            setName("");
            setEmail("");
            setMobile("");
            setPassword("");
            setSecretKey("");
        }, 2000);
    };

    return (
        <Box maxW="md" mx="auto" py={8} px={4}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                        Admin Signup
                    </Text>
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
                                    {showPassword ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <FormControl id="secretKey" isRequired>
                        <FormLabel>Secret Key</FormLabel>
                        <Input
                            type="text"
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
                    <Button
                        type="submit"
                        colorScheme="teal"
                        isLoading={isLoading}
                        loadingText="Signing up..."
                        fontSize="md"
                        _hover={{ bg: "teal.600" }}
                    >
                        Sign up
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default AdminSignupPage;
