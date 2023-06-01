import React, { useState } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Checkbox,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
// { categories, brands }
const FilterComponent = () => {
  const categories=["dog","cat","tom"]
  const brands=["tommy","selector"]
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedDiscount, setSelectedDiscount] = useState(false);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleDiscountChange = (event) => {
    setSelectedDiscount(event.target.checked);
  };

  const handleReset = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setSelectedDiscount(false);
  };

  const buttonColor = useColorModeValue('teal', 'teal.300');
  const textColor = useColorModeValue('white', 'gray.800');

  return (
    <Box p="4" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Flex flexWrap="wrap" justifyContent="space-between">
        <FormControl mb="4">
          <FormLabel>Sort by Price:</FormLabel>
          <Select placeholder="Select option">
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </Select>
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Filter by Category:</FormLabel>
          <Select value={selectedCategory} onChange={handleCategoryChange} placeholder="Select option">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Filter by Brand:</FormLabel>
          <Select value={selectedBrand} onChange={handleBrandChange} placeholder="Select option">
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Filter by Discount:</FormLabel>
          <Checkbox
            isChecked={selectedDiscount}
            onChange={handleDiscountChange}
          >
            Show Only Discounted Products
          </Checkbox>
        </FormControl>
        <Box>
          <Button
            colorScheme={buttonColor}
            onClick={handleReset}
            mb="4"
          >
            Reset
          </Button>
        </Box>
      </Flex>
      <Text color={textColor}>
        Displaying products based on selected filters...
      </Text>
    </Box>
  );
};

export default FilterComponent;