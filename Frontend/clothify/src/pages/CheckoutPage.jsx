import React, { useState } from 'react';
import {
    ChakraProvider,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
} from '@chakra-ui/react';

function CheckoutPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        // For demonstration purposes, we'll just log the form data
        console.log({ name, email, address });
    };

    return (
        <ChakraProvider>
            <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md" boxShadow="lg">
                <Heading as="h1" size="lg" mb={6}>
                    Checkout
                </Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl id="name" isRequired mb={4}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </FormControl>
                    <FormControl id="email" isRequired mb={4}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </FormControl>
                    <FormControl id="address" isRequired mb={4}>
                        <FormLabel>Address</FormLabel>
                        <Input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your address"
                        />
                    </FormControl>
                    <Button colorScheme="blue" type="submit">
                        Place Order
                    </Button>
                </form>
            </Box>
        </ChakraProvider>
    );
}

export default CheckoutPage;
