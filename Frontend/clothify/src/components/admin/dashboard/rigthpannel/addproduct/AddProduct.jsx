import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { handleAddProductData } from "../../../../../redux/Admin_Redux/admin_products/action";
import { data } from "../../../../../utils/data";
import Preview from "./Preview";
import { productInitialState } from "./productinitialState";

const AddProduct = () => {
  const [productData, setProductData] = useState(productInitialState);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isAtLeastOneSizeSelected = productData.sizes.length > 0;

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    let newSize;

    if (checked) {
      newSize = [...productData.sizes, value];
    } else {
      newSize = productData.sizes.filter((size) => size !== value);
    }

    setProductData((prevData) => ({
      ...prevData,
      sizes: newSize,
    }));
  };

  const handleImageChange = (e) => {
    const { value } = e.target;
    const imageUrls = value.split(",").map((url) => url.trim());

    setProductData((prevData) => ({
      ...prevData,
      images: imageUrls,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddProductData(productData));
  };

  return (
    <Box mx="auto" p={4} display="flex" justifyContent="space-around">
      <Box width={{ base: "100%", md: "30%" }}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input type="text" name="title" onChange={handleChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Select name="category" onChange={handleChange}>
                <option value="">Select Category</option>
                {data.categories.map((item) => (
                  <option key={item._id} value={item.category}>
                    {item.category}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Subcategory</FormLabel>
              <Select name="subcategory" onChange={handleChange}>
                <option value="">Select Subcategory</option>
                {data.subcategories &&
                  data.subcategories[productData.category.toLowerCase()] &&
                  data.subcategories[productData.category.toLowerCase()].map(
                    (item) => (
                      <option key={item._id} value={item.subcategory}>
                        {item.subcategory}
                      </option>
                    )
                  )}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Brand</FormLabel>
              <Select name="brand" onChange={handleChange}>
                <option value="">Select Brand</option>
                {data.brands &&
                  data.brands[productData.category.toLowerCase()] &&
                  data.brands[productData.category.toLowerCase()].map(
                    (item) => (
                      <option key={item._id} value={item.brand}>
                        {item.brand}
                      </option>
                    )
                  )}
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
              <Textarea name="description" onChange={handleChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Rating</FormLabel>
              <Input type="number" name="rating" onChange={handleChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Total Rating</FormLabel>
              <Input
                type="number"
                name="total_rating"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Quantity</FormLabel>
              <Input type="number" name="quantity" onChange={handleChange} />
            </FormControl>

            <FormControl isInvalid={!isAtLeastOneSizeSelected}>
              <FormLabel>Size</FormLabel>
              <HStack spacing={2}>
                {data.sizes.map((item) => (
                  <Checkbox
                    key={item._id}
                    value={item.size}
                    onChange={handleSizeChange}
                  >
                    {item.size}
                  </Checkbox>
                ))}
              </HStack>
              {!isAtLeastOneSizeSelected && (
                <FormErrorMessage>
                  At least one size must be selected
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Images</FormLabel>
              <Input
                type="text"
                name="images"
                onChange={handleImageChange}
                placeholder="Enter image URLs separated by commas"
              />
            </FormControl>

            <Button
              colorScheme="teal"
              type="submit"
              width="100%"
              leftIcon={<FaUserShield />}
            >
              Add Product
            </Button>
          </VStack>
        </form>
      </Box>
      <Preview productData={productData} />
    </Box>
  );
};

export default AddProduct;
