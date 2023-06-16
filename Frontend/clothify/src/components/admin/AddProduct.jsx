import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const AddProduct = () => {
    const [productData, setProductData] = useState({
        productName: "",
        productCategory: "",
        productType: "",
        brand: "",
        price: "",
        discount: "",
        pic: [],
        description: "",
        expiry: "",
        rating: "",
        lifeStage: "",
        weight: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform the submit action with productData
        console.log(productData);
    };

    return (
        <Box mx="auto" p={4} border={"1px solid red"} display={'flex'} justifyContent={'space-around'}>
            <Box width={'30%'}>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Product Name</FormLabel>
                            <Input type="text" name="productName" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Product Category</FormLabel>
                            <Input
                                type="text"
                                name="productCategory"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Product Type</FormLabel>
                            <Input type="text" name="productType" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Brand</FormLabel>
                            <Input type="text" name="brand" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Price</FormLabel>
                            <Input type="number" name="price" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Discount</FormLabel>
                            <Input type="number" name="discount" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Description</FormLabel>
                            <Textarea name="description" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Expiry</FormLabel>
                            <Input type="number" name="expiry" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Rating</FormLabel>
                            <Input type="number" name="rating" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Life Stage</FormLabel>
                            <Input type="text" name="lifeStage" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Weight</FormLabel>
                            <Input type="number" name="weight" onChange={handleChange} />
                        </FormControl>
                        <Button colorScheme="teal" type="submit">
                            Add Product
                        </Button>
                    </VStack>
                </form>
            </Box>
            {/* Preview section */}
            <Box mt={4} width={'40%'}>
                <strong>Preview:</strong>
                <Box mt={2}>
                    <pre>{JSON.stringify(productData, null, 2)}</pre>
                </Box>
            </Box>
        </Box>
    );
};

export default AddProduct;
