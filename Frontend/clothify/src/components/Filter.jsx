import React, { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Checkbox,
  Text,
  Button,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { BiSort, BiCategory, BiBuilding } from "react-icons/bi";
import { BsAlexa } from "react-icons/bs";

const FilterComponent = () => {
  const categories = ["dog", "cat", "tom"];
  const brands = [ "selector", "tommy", ];
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedDiscountRange, setSelectedDiscountRange] = useState([0, 100]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategory((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedCategory((prevSelected) =>
        prevSelected.filter((category) => category !== value)
      );
    }
  };

  const handleBrandChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedBrand((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedBrand((prevSelected) =>
        prevSelected.filter((brand) => brand !== value)
      );
    }
  };

  const handleDiscountRangeChange = (values) => {
    setSelectedDiscountRange(values);
  };

  const handleReset = () => {
    setSelectedCategory([]);
    setSelectedBrand([]);
    setSelectedDiscountRange([0, 100]);
  };

  const buttonColor = useColorModeValue("teal", "teal.300");
  const textColor = useColorModeValue("white", "gray.800");

  const handleAccordionToggle = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <Box
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      backgroundColor={"white"}
    >
      <Accordion
        allowToggle
        display={{ base: "grid", md: "block" }}
        // border={"1px solid red"}
        gridTemplateColumns={{ base: "repeat(2,1fr)" }}
      >
        <AccordionItem>
          <AccordionButton onClick={handleAccordionToggle}>
            <BiSort size={20} color="teal" /> Price
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <FormControl>
              <Checkbox>Low to High</Checkbox>
            </FormControl>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton onClick={handleAccordionToggle}>
            <BiCategory size={20} color="teal" /> Category
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <FormControl>
              {categories.map((category) => (
                <Checkbox
                  key={category}
                  value={category}
                  onChange={handleCategoryChange}
                  isChecked={selectedCategory.includes(category)}
                >
                  {category}
                </Checkbox>
              ))}
            </FormControl>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton onClick={handleAccordionToggle}>
            <BiBuilding size={20} color="teal" /> Brand
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <FormControl>
              {brands.map((brand) => (
                <Checkbox
                  key={brand}
                  value={brand}
                  onChange={handleBrandChange}
                  isChecked={selectedBrand.includes(brand)}
                >
                  {brand}
                </Checkbox>
              ))}
            </FormControl>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton onClick={handleAccordionToggle}>
            <BsAlexa size={20} color="teal" /> Discount
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <FormControl>
              <Slider
                defaultValue={selectedDiscountRange}
                min={0}
                max={100}
                step={1}
                onChange={handleDiscountRangeChange}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Flex justify="space-between" mt={2}>
                <Text>{selectedDiscountRange[0]}%</Text>
                <Text>{selectedDiscountRange[1]}%</Text>
              </Flex>
            </FormControl>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      {/* <Flex justify="flex-end" mt={4}>
        <Button colorScheme={buttonColor} onClick={handleReset}>
          Reset
        </Button>
      </Flex> */}
    </Box>
  );
};

export default FilterComponent;
