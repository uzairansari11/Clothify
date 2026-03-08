import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Icon,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiPlus, FiPackage, FiDollarSign, FiFileText, FiMaximize, FiImage, FiCheck } from "react-icons/fi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { handleAddProductData } from "../../../../../redux/Admin_Redux/admin_products/action";
import { data } from "../../../../../utils/data";
import Preview from "./Preview";
import { productInitialState } from "./productinitialState";
import FormField from "../../../../common/FormField";
import SectionCard from "../../../../common/SectionCard";
import { useFormValidation } from "../../../../common/useFormValidation";
import { required, minValue, maxValue } from "../../../../common/validators";

// ── Main component ───────────────────────────────────────────────────────────
const AddProduct = () => {
  const dispatch = useDispatch();

  const helperColor      = useColorModeValue("gray.400", "gray.500");
  const sizeActiveBg     = "accent.solid";
  const sizeActiveText   = "white";
  const sizeIdleBg       = useColorModeValue("gray.50", "gray.700");
  const sizeIdleText     = useColorModeValue("gray.700", "gray.200");
  const sizeIdleBorder   = useColorModeValue("gray.200", "gray.600");

  const { values, errors, handleChange, handleBlur, validateAll, setValues, resetForm } =
    useFormValidation(productInitialState, {
      title:        [required("Product title is required")],
      category:     [required("Category is required")],
      subcategory:  [required("Subcategory is required")],
      brand:        [required("Brand is required")],
      price:        [required("Price is required"), minValue(0.01, "Price must be greater than 0")],
      discount:     [
        required("Discount is required"),
        minValue(0, "Discount cannot be negative"),
        maxValue(100, "Discount cannot exceed 100%"),
      ],
      description:  [required("Description is required")],
      rating:       [
        required("Rating is required"),
        minValue(1, "Rating must be at least 1"),
        maxValue(5, "Rating cannot exceed 5"),
      ],
      total_rating: [required("Total ratings is required"), minValue(0, "Cannot be negative")],
      quantity:     [required("Stock quantity is required"), minValue(0, "Cannot be negative")],
    });

  const isAtLeastOneSizeSelected = values.sizes.length > 0;

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      sizes: checked ? [...prev.sizes, value] : prev.sizes.filter((s) => s !== value),
    }));
  };

  const handleImageChange = (e) => {
    const imageUrls = e.target.value.split(",").map((url) => url.trim());
    setValues((prev) => ({ ...prev, images: imageUrls }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    if (values.sizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }
    dispatch(handleAddProductData(values));
    toast.success("Product added successfully");
    resetForm();
  };

  const subcategories = data.subcategories?.[values.category.toLowerCase()] || [];
  const brands        = data.brands?.[values.category.toLowerCase()] || [];

  return (
    <Box>
      {/* Two-column layout: form + preview */}
      <Flex
        direction={{ base: "column", xl: "row" }}
        gap={5}
        align="flex-start"
      >
        {/* ── LEFT: Form ── */}
        <Box flex="1" minW={0}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={5} align="stretch">

              {/* ─── Basic Info ─── */}
              <SectionCard icon={FiPackage} label="Basic Information">
                <VStack spacing={4} align="stretch">
                  <FormField
                    label="Product Title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.title}
                    placeholder="e.g. Classic Slim Fit Shirt"
                    isRequired
                  />

                  <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
                    <GridItem>
                      <FormField
                        label="Category"
                        name="category"
                        type="select"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.category}
                        isRequired
                      >
                        <option value="">Select Category</option>
                        {data.categories.map((item) => (
                          <option key={item._id} value={item.category}>
                            {item.category}
                          </option>
                        ))}
                      </FormField>
                    </GridItem>

                    <GridItem>
                      <FormField
                        label="Subcategory"
                        name="subcategory"
                        type="select"
                        value={values.subcategory}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.subcategory}
                        isDisabled={!values.category}
                        isRequired
                      >
                        <option value="">
                          {values.category ? "Select Subcategory" : "Select category first"}
                        </option>
                        {subcategories.map((item) => (
                          <option key={item._id} value={item.subcategory}>
                            {item.subcategory}
                          </option>
                        ))}
                      </FormField>
                    </GridItem>

                    <GridItem>
                      <FormField
                        label="Brand"
                        name="brand"
                        type="select"
                        value={values.brand}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.brand}
                        isDisabled={!values.category}
                        isRequired
                      >
                        <option value="">
                          {values.category ? "Select Brand" : "Select category first"}
                        </option>
                        {brands.map((item) => (
                          <option key={item._id} value={item.brand}>
                            {item.brand}
                          </option>
                        ))}
                      </FormField>
                    </GridItem>
                  </Grid>
                </VStack>
              </SectionCard>

              {/* ─── Pricing ─── */}
              <SectionCard icon={FiDollarSign} label="Pricing">
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <GridItem>
                    <FormField
                      label="Price ($)"
                      name="price"
                      type="number"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.price}
                      placeholder="0.00"
                      isRequired
                    />
                  </GridItem>
                  <GridItem>
                    <FormField
                      label="Discount (%)"
                      name="discount"
                      type="number"
                      value={values.discount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.discount}
                      placeholder="0"
                      isRequired
                    />
                  </GridItem>
                </Grid>
              </SectionCard>

              {/* ─── Details ─── */}
              <SectionCard icon={FiFileText} label="Product Details">
                <VStack spacing={4} align="stretch">
                  <FormField
                    label="Description"
                    name="description"
                    type="textarea"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.description}
                    placeholder="Describe the product — material, fit, features..."
                    rows={4}
                    isRequired
                  />

                  <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
                    <GridItem>
                      <FormField
                        label="Rating"
                        name="rating"
                        type="number"
                        value={values.rating}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.rating}
                        placeholder="1 - 5"
                        min={1}
                        max={5}
                        isRequired
                      />
                    </GridItem>
                    <GridItem>
                      <FormField
                        label="Total Ratings"
                        name="total_rating"
                        type="number"
                        value={values.total_rating}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.total_rating}
                        placeholder="e.g. 1200"
                        isRequired
                      />
                    </GridItem>
                    <GridItem>
                      <FormField
                        label="Stock Quantity"
                        name="quantity"
                        type="number"
                        value={values.quantity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.quantity}
                        placeholder="Available stock"
                        isRequired
                      />
                    </GridItem>
                  </Grid>
                </VStack>
              </SectionCard>

              {/* ─── Sizes ─── */}
              <SectionCard icon={FiMaximize} label="Available Sizes">
                <FormControl isInvalid={!isAtLeastOneSizeSelected}>
                  <Flex wrap="wrap" gap={2}>
                    {data.sizes.map((item) => {
                      const isSelected = values.sizes.includes(item.size);
                      return (
                        <Box
                          as="label"
                          key={item._id}
                          cursor="pointer"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          minW="44px"
                          h="38px"
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
                          position="relative"
                        >
                          <Checkbox
                            value={item.size}
                            isChecked={isSelected}
                            onChange={handleSizeChange}
                            display="none"
                          />
                          {item.size}
                          {isSelected && (
                            <Box
                              position="absolute"
                              top="-4px"
                              right="-4px"
                              w="14px"
                              h="14px"
                              bg="accent.solid"
                              borderRadius="full"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Icon as={FiCheck} boxSize="8px" color="white" strokeWidth={3} />
                            </Box>
                          )}
                        </Box>
                      );
                    })}
                  </Flex>
                  {!isAtLeastOneSizeSelected && (
                    <FormErrorMessage mt={2} fontSize="xs">
                      Select at least one size
                    </FormErrorMessage>
                  )}
                  {isAtLeastOneSizeSelected && (
                    <Text fontSize="xs" color={helperColor} mt={2}>
                      {values.sizes.length} size{values.sizes.length !== 1 ? "s" : ""} selected
                    </Text>
                  )}
                </FormControl>
              </SectionCard>

              {/* ─── Images ─── */}
              <SectionCard icon={FiImage} label="Product Images">
                <FormField
                  label="Image URLs"
                  name="images"
                  value={values.images.join(", ")}
                  onChange={handleImageChange}
                  placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                  isRequired
                />
                <Text fontSize="xs" color={helperColor} mt={1.5}>
                  Separate multiple URLs with a comma
                </Text>
              </SectionCard>

              {/* ─── Submit ─── */}
              <Button
                type="submit"
                size="lg"
                width="100%"
                borderRadius="xl"
                bg="accent.solid"
                color="white"
                fontWeight="700"
                fontSize="md"
                h={12}
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
          top="80px"
        >
          <Preview productData={values} />
        </Box>
      </Flex>
    </Box>
  );
};

export default AddProduct;
