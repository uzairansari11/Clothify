import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiPlus, FiPackage } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { handleAddProductData } from "../../../../../redux/Admin_Redux/admin_products/action";
import { data } from "../../../../../utils/data";
import Preview from "./Preview";
import { productInitialState } from "./productinitialState";

const AddProduct = () => {
  const [productData, setProductData] = useState(productInitialState);
  const dispatch = useDispatch();

  // --- Color tokens (all at top level, no conditional hook calls) ---
  const cardBg        = useColorModeValue("white", "gray.800");
  const cardBorder    = useColorModeValue("gray.200", "gray.700");
  const sectionLabel  = "accent.text";
  const inputBg       = useColorModeValue("gray.100", "gray.700");
  const inputHoverBg  = useColorModeValue("gray.200", "gray.600");
  const labelColor    = useColorModeValue("gray.600", "gray.300");
  const placeholderColor = useColorModeValue("gray.400", "gray.500");
  const dividerColor  = useColorModeValue("gray.200", "gray.700");
  const helperColor   = useColorModeValue("gray.400", "gray.500");
  const sizeActiveBg  = "accent.solid";
  const sizeActiveText = useColorModeValue("white", "white");
  const sizeIdleBg    = useColorModeValue("gray.100", "gray.700");
  const sizeIdleText  = useColorModeValue("gray.700", "gray.200");
  const sizeIdleBorder = useColorModeValue("gray.200", "gray.600");
  const headerBg      = "accent.bg";

  // --- Handlers (identical logic to original) ---
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

  // --- Shared input style object ---
  const inputStyles = {
    bg: inputBg,
    border: "1px solid",
    borderColor: cardBorder,
    borderRadius: "lg",
    _hover: { bg: inputHoverBg },
    _focus: {
      bg: cardBg,
      borderColor: "accent.solid",
      boxShadow: "0 0 0 1px var(--chakra-colors-accent-solid)",
    },
    _placeholder: { color: placeholderColor },
  };

  // --- Section header helper ---
  const SectionHeader = ({ icon: Icon, label }) => (
    <Flex align="center" gap={2} mb={3}>
      <Flex
        align="center"
        justify="center"
        w={7}
        h={7}
        borderRadius="md"
        bg={headerBg}
      >
        <Icon size={14} color="var(--chakra-colors-accent-solid)" />
      </Flex>
      <Text
        fontSize="xs"
        fontWeight="700"
        letterSpacing="wider"
        textTransform="uppercase"
        color={sectionLabel}
      >
        {label}
      </Text>
    </Flex>
  );

  return (
    <Box>
      {/* Page heading */}
      <Flex align="center" gap={3} mb={6}>
        <Flex
          align="center"
          justify="center"
          w={10}
          h={10}
          borderRadius="xl"
          bg="accent.solid"
        >
          <FiPackage color="white" size={20} />
        </Flex>
        <Box>
          <Text fontSize="xl" fontWeight="700" lineHeight="shorter">
            Add New Product
          </Text>
          <Text fontSize="sm" color={helperColor}>
            Fill in the details and watch the live preview update
          </Text>
        </Box>
      </Flex>

      {/* Two-column layout: form (wider) + preview */}
      <Flex
        direction={{ base: "column", xl: "row" }}
        gap={6}
        align="flex-start"
      >
        {/* ── LEFT: Form ── */}
        <Box
          flex="1"
          bg={cardBg}
          border="1px solid"
          borderColor={cardBorder}
          borderRadius="2xl"
          p={{ base: 5, md: 7 }}
          shadow="sm"
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={0} align="stretch">

              {/* ─── SECTION: Basic Info ─── */}
              <SectionHeader icon={FiPackage} label="Basic Info" />
              <VStack spacing={4} align="stretch" mb={6}>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={labelColor} mb={1}>
                    Product Title
                  </FormLabel>
                  <Input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="e.g. Classic Slim Fit Shirt"
                    {...inputStyles}
                  />
                </FormControl>

                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel fontSize="sm" fontWeight="600" color={labelColor} mb={1}>
                        Category
                      </FormLabel>
                      <Select
                        name="category"
                        onChange={handleChange}
                        {...inputStyles}
                      >
                        <option value="">Select Category</option>
                        {data.categories.map((item) => (
                          <option key={item._id} value={item.category}>
                            {item.category}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel fontSize="sm" fontWeight="600" color={labelColor} mb={1}>
                        Subcategory
                      </FormLabel>
                      <Select
                        name="subcategory"
                        onChange={handleChange}
                        {...inputStyles}
                      >
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
                  </GridItem>

                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel fontSize="sm" fontWeight="600" color={labelColor} mb={1}>
                        Brand
                      </FormLabel>
                      <Select
                        name="brand"
                        onChange={handleChange}
                        {...inputStyles}
                      >
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
                  </GridItem>
                </Grid>
              </VStack>

              <Divider borderColor={dividerColor} mb={6} />

              {/* ─── SECTION: Pricing ─── */}
              <SectionHeader icon={FiPackage} label="Pricing" />
              <HStack spacing={4} align="flex-start" mb={6}>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={labelColor} mb={1}>
                    Price ($)
                  </FormLabel>
                  <Input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    placeholder="0.00"
                    {...inputStyles}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={labelColor} mb={1}>
                    Discount (%)
                  </FormLabel>
                  <Input
                    type="number"
                    name="discount"
                    onChange={handleChange}
                    placeholder="0"
                    {...inputStyles}
                  />
                </FormControl>
              </HStack>

              <Divider borderColor={dividerColor} mb={6} />

              {/* ─── SECTION: Details ─── */}
              <SectionHeader icon={FiPackage} label="Details" />
              <VStack spacing={4} align="stretch" mb={6}>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="600" color={labelColor} mb={1}>
                    Description
                  </FormLabel>
                  <Textarea
                    name="description"
                    onChange={handleChange}
                    placeholder="Describe the product — material, fit, features..."
                    rows={4}
                    resize="vertical"
                    {...inputStyles}
                  />
                </FormControl>

                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel fontSize="sm" fontWeight="600" color={labelColor} mb={1}>
                        Rating
                      </FormLabel>
                      <Input
                        type="number"
                        name="rating"
                        onChange={handleChange}
                        placeholder="1 – 5"
                        {...inputStyles}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel fontSize="sm" fontWeight="600" color={labelColor} mb={1}>
                        Total Ratings
                      </FormLabel>
                      <Input
                        type="number"
                        name="total_rating"
                        onChange={handleChange}
                        placeholder="e.g. 1200"
                        {...inputStyles}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel fontSize="sm" fontWeight="600" color={labelColor} mb={1}>
                        Quantity
                      </FormLabel>
                      <Input
                        type="number"
                        name="quantity"
                        onChange={handleChange}
                        placeholder="Stock count"
                        {...inputStyles}
                      />
                    </FormControl>
                  </GridItem>
                </Grid>
              </VStack>

              <Divider borderColor={dividerColor} mb={6} />

              {/* ─── SECTION: Sizes ─── */}
              <SectionHeader icon={FiPackage} label="Sizes" />
              <FormControl isInvalid={!isAtLeastOneSizeSelected} mb={6}>
                <Flex wrap="wrap" gap={2}>
                  {data.sizes.map((item) => {
                    const isSelected = productData.sizes.includes(item.size);
                    return (
                      <Box
                        as="label"
                        key={item._id}
                        cursor="pointer"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        minW="44px"
                        h="36px"
                        px={3}
                        borderRadius="lg"
                        border="1.5px solid"
                        borderColor={isSelected ? "accent.solid" : sizeIdleBorder}
                        bg={isSelected ? sizeActiveBg : sizeIdleBg}
                        color={isSelected ? sizeActiveText : sizeIdleText}
                        fontWeight={isSelected ? "700" : "500"}
                        fontSize="sm"
                        transition="all 0.15s ease"
                        _hover={{
                          borderColor: "accent.solid",
                          transform: "translateY(-1px)",
                          shadow: "sm",
                        }}
                      >
                        <Checkbox
                          value={item.size}
                          isChecked={isSelected}
                          onChange={handleSizeChange}
                          display="none"
                        />
                        {item.size}
                      </Box>
                    );
                  })}
                </Flex>
                {!isAtLeastOneSizeSelected && (
                  <FormErrorMessage mt={2}>
                    At least one size must be selected
                  </FormErrorMessage>
                )}
              </FormControl>

              <Divider borderColor={dividerColor} mb={6} />

              {/* ─── SECTION: Images ─── */}
              <SectionHeader icon={FiPackage} label="Images" />
              <FormControl isRequired mb={8}>
                <FormLabel fontSize="sm" fontWeight="600" color={labelColor} mb={1}>
                  Image URLs
                </FormLabel>
                <Input
                  type="text"
                  name="images"
                  onChange={handleImageChange}
                  placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                  {...inputStyles}
                />
                <Text fontSize="xs" color={helperColor} mt={1.5}>
                  Separate multiple URLs with a comma
                </Text>
              </FormControl>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                width="100%"
                borderRadius="xl"
                bg="accent.solid"
                color="white"
                fontWeight="700"
                fontSize="md"
                leftIcon={<FiPlus size={18} />}
                _hover={{
                  opacity: 0.9,
                  transform: "translateY(-1px)",
                  shadow: "lg",
                }}
                _active={{
                  opacity: 0.85,
                  transform: "translateY(0px)",
                }}
                transition="all 0.2s ease"
              >
                Add Product
              </Button>
            </VStack>
          </form>
        </Box>

        {/* ── RIGHT: Live Preview ── */}
        <Box
          w={{ base: "100%", xl: "340px" }}
          flexShrink={0}
          position={{ base: "static", xl: "sticky" }}
          top="24px"
        >
          <Preview productData={productData} />
        </Box>
      </Flex>
    </Box>
  );
};

export default AddProduct;
