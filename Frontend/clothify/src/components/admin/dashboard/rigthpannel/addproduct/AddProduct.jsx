import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Card,
  Image,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import React, { useState } from "react";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    title: "",
    category: "",
    subcategory: "",
    description: "",
    brand: "",
    price: "",
    discount: "",
    rating: "",
    total_rating: "",
    images: [],
    sizes: [],
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    let newSize;

    if (checked) {
      newSize = [...productData.size, value];
    } else {
      newSize = productData.size.filter((size) => size !== value);
    }

    setProductData((prevData) => ({
      ...prevData,
      size: newSize,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the submit action with productData
    console.log(productData);
  };

  return (
    <Box
      mx="auto"
      p={4}
      border={"1px solid red"}
      display="flex"
      justifyContent="space-around"
    >
      <Box width="30%">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input type="text" name="title" onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Select name="category" onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Subcategory</FormLabel>
              <Select name="subcategory" onChange={handleChange}>
                <option value="">Select Subcategory</option>
                {/* Add options for subcategories */}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Brand</FormLabel>
              <Select name="brand" onChange={handleChange}>
                <option value="">Select Brand</option>
                {/* Add options for brands */}
              </Select>
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
              <textarea name="description" onChange={handleChange} />
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
            <FormControl isRequired>
              <FormLabel>Quantity</FormLabel>
              <Input type="number" name="quantity" onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Size</FormLabel>
              <Checkbox value="S" onChange={handleSizeChange}>
                S
              </Checkbox>
              <Checkbox value="M" onChange={handleSizeChange}>
                M
              </Checkbox>
              <Checkbox value="L" onChange={handleSizeChange}>
                L
              </Checkbox>
              {/* Add more checkbox options for sizes */}
            </FormControl>
            <Button colorScheme="teal" type="submit">
              Add Product
            </Button>
          </VStack>
        </form>
      </Box>
      {/* Preview section */}
      <Card mt={4} width="40%" p={4}>
        <strong>Preview:</strong>
        <Box mt={2}>
          {/* Display product information */}
          <Image src={productData.pic} alt="Product Image" />
          <Text>{productData.title}</Text>
          <Text>{productData.category}</Text>
          <Text>{productData.description}</Text>
          {/* ... */}
        </Box>
      </Card>
    </Box>
  );
};

export default AddProduct;
