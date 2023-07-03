import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text, useColorModeValue
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiBuilding, BiCategory, BiSort } from "react-icons/bi";
import { BsAlexa } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const FilterComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSortOrder = searchParams.get("sortOrder");
  const initialPage = searchParams.get("page");
  const initialDiscount = searchParams.get("discount");
  const initialSubcategory = searchParams.getAll("subcategory");
  const initialBrand = searchParams.getAll("brand");


  const { products } = useSelector((store) => store.productReducer);

  let brands = products.map((ele) => ele.brand);
  let finalBrand = brands.filter(
    (item, index) => brands.indexOf(item) === index
  );
  let subCategories = products.map((ele) => ele.subcategory);
  let finalSubCategories = subCategories.filter(
    (item, index) => subCategories.indexOf(item) === index
  );

  const [selectedCategory, setSelectedCategory] = useState(
    initialSubcategory || []
  );
  const [selectedBrand, setSelectedBrand] = useState(initialBrand || []);
  const [selectedPriceSort, setSelectedPriceSort] = useState(
    initialSortOrder || ""
  );
  const [selectedDiscountRange, setSelectedDiscountRange] = useState(
    initialDiscount || "gte0"
  );

  const [page, setPage] = useState(initialPage || 1);

  const handleCategoryChange = (selectedCategories) => {
    setSelectedCategory(selectedCategories);
  };

  const handleBrandChange = (selectedBrands) => {
    setSelectedBrand(selectedBrands);

  };

  const handleDiscountRangeChange = (values) => {
    setSelectedDiscountRange("gte" + values);
  };

  const handlePriceSortChange = (value) => {
    setSelectedPriceSort(value);
  };

  const handleReset = () => {
    setSelectedCategory([]);
    setSelectedBrand([]);
    setSelectedDiscountRange("gte0");
    setSelectedPriceSort("");
    setPage(1);
  };

  const buttonColor = useColorModeValue("teal", "teal.300");

  useEffect(() => {
    const params = {};
    if (selectedCategory.length) {
      params.subcategory = selectedCategory;
    }
    if (selectedBrand.length) {
      params.brand = selectedBrand;
    }
    if (selectedPriceSort) {
      params.sortField = "price";
      params.sortOrder = selectedPriceSort;
    }
    if (Number(selectedDiscountRange.slice(3))) {
      params.discount = selectedDiscountRange;
    }

    params.page = page;
    setSearchParams(params);
  }, [
    selectedCategory,
    selectedBrand,
    selectedPriceSort,
    selectedDiscountRange,
    page,
  ]);

  return (
    <Box
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      backgroundColor="white"
    >
      <Accordion
        allowToggle
        display={{ base: "grid", md: "block" }}
        gridTemplateColumns={{ base: "repeat(2,1fr)" }}
      >
        <AccordionItem>
          <AccordionButton>
            <BiSort size={20} color="teal" /> Price
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <FormControl>
              <RadioGroup
                value={selectedPriceSort}
                onChange={handlePriceSortChange}
              >
                <Flex direction="column" mt={2}>
                  <Radio value="asc">Low to High</Radio>
                  <Radio value="desc">High to Low</Radio>
                </Flex>
              </RadioGroup>
            </FormControl>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <BiCategory size={20} color="teal" /> Category
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <FormControl>
              <CheckboxGroup
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                {finalSubCategories.map((category) => (
                  <Checkbox key={category} value={category}>
                    {category}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </FormControl>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <BiBuilding size={20} color="teal" /> Brand
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <FormControl>
              <CheckboxGroup value={selectedBrand} onChange={handleBrandChange}>
                {finalBrand.map((brand) => (
                  <Checkbox key={brand} value={brand}>
                    {brand}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </FormControl>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <BsAlexa size={20} color="teal" /> Discount
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <FormControl>
              <Slider
                defaultValue={selectedDiscountRange.slice(3)}
                min={0}
                max={100}
                step={5}
                onChange={handleDiscountRangeChange}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Flex justify="space-between" mt={2}>
                <Text>0%</Text>
                <Text>100%</Text>
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
