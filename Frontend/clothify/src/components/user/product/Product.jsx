import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  Grid,
  Heading,
  Icon,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiFilter, FiRefreshCcw, FiChevronDown, FiChevronUp, FiAlertCircle } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import useProducts from "../../../hooks/useProducts";
import useFilters from "../../../hooks/useFilters";
import CardItem from "../card/CardItem";
import Pagination from "../product/Pagination";
import LoadingSpinner from "../spinner/Spinner";
import NotFound from "./NotFound";
import EmptyState from "../../common/EmptyState";

const Product = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSortOrder = searchParams.get("sortOrder");
  const initialPage = searchParams.get("page");
  const initialDiscount = searchParams.get("discount");
  const initialSubcategory = searchParams.getAll("subcategory");
  const initialBrand = searchParams.getAll("brand");

  const [page, setPage] = useState(initialPage || 1);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

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

  // Dynamic filters from API
  const { subcategories, brands, isLoading: filtersLoading, isError: filtersError } = useFilters(category);

  // Products via React Query
  const { products, totalCount, isLoading: productsLoading, isError: productsError, refetch } = useProducts({
    category,
    subcategory: selectedCategory,
    brand: selectedBrand,
    sortField: selectedPriceSort ? "price" : undefined,
    sortOrder: selectedPriceSort || undefined,
    discount: Number(selectedDiscountRange.slice(3)) ? selectedDiscountRange : undefined,
    page,
    limit: 12,
  });

  // Color tokens
  const mainBg = useColorModeValue("gray.50", "gray.900");
  const sidebarBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const mutedColor = useColorModeValue("gray.500", "gray.400");
  const sliderTrackBg = useColorModeValue("gray.200", "gray.600");
  const accordionHoverBg = "accent.bg";
  const resultCountBg = "accent.bg";

  const activeFilterCount =
    selectedCategory.length +
    selectedBrand.length +
    (selectedPriceSort ? 1 : 0) +
    (selectedDiscountRange !== "gte0" ? 1 : 0);

  const handleCategoryChange = (v) => { setSelectedCategory(v); setPage(1); };
  const handleBrandChange = (v) => { setSelectedBrand(v); setPage(1); };
  const handleDiscountRangeChange = (v) => { setSelectedDiscountRange("gte" + v); setPage(1); };
  const handlePriceSortChange = (v) => { setSelectedPriceSort(v); setPage(1); };
  const handleReset = () => {
    setSelectedCategory([]);
    setSelectedBrand([]);
    setSelectedDiscountRange("gte0");
    setSelectedPriceSort("");
    setPage(1);
  };
  const handlePageChange = (p) => { setPage(p); };

  useEffect(() => {
    const params = {};
    if (selectedCategory.length) params.subcategory = selectedCategory;
    if (selectedBrand.length) params.brand = selectedBrand;
    if (selectedPriceSort) {
      params.sortField = "price";
      params.sortOrder = selectedPriceSort;
    }
    if (Number(selectedDiscountRange.slice(3)))
      params.discount = selectedDiscountRange;
    params.page = page;
    setSearchParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedBrand, selectedPriceSort, selectedDiscountRange, page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const filterContent = (
    <>
      {/* Header */}
      <Flex align="center" justify="space-between" mb={5}>
        <Flex align="center" gap={2}>
          <Flex
            align="center"
            justify="center"
            w="28px"
            h="28px"
            bg="accent.solid"
            borderRadius="lg"
          >
            <Icon as={FiFilter} color="white" boxSize={3.5} />
          </Flex>
          <Heading size="sm" color={textColor} fontWeight="700">
            Filters
          </Heading>
          {activeFilterCount > 0 && (
            <Badge
                            borderRadius="full"
              fontSize="10px"
              px={1.5}
            >
              {activeFilterCount}
            </Badge>
          )}
        </Flex>
        <Badge
          bg="accent.solid"
          color="white"
          fontSize="10px"
          px={2.5}
          py={0.5}
          borderRadius="full"
          fontWeight="700"
          letterSpacing="0.5px"
        >
          {category}
        </Badge>
      </Flex>

      {/* Result count */}
      <Box bg={resultCountBg} borderRadius="xl" px={3} py={2} mb={4}>
        <Text fontSize="xs" fontWeight="600" color="accent.solid">
          {totalCount || 0} products found
        </Text>
      </Box>

      <Accordion allowMultiple defaultIndex={[0]}>
        {/* Sort by Price */}
        <AccordionItem border="none" mb={1}>
          <AccordionButton
            px={3}
            py={2.5}
            borderRadius="xl"
            _hover={{ bg: accordionHoverBg }}
            _expanded={{ bg: accordionHoverBg }}
          >
            <Text flex="1" textAlign="left" fontWeight="600" fontSize="13px" color={textColor}>
              Sort by Price
            </Text>
            <AccordionIcon color={mutedColor} />
          </AccordionButton>
          <AccordionPanel px={3} pb={3} pt={2}>
            <FormControl>
              <RadioGroup value={selectedPriceSort} onChange={handlePriceSortChange}>
                <Flex direction="column" gap={2}>
                  <Radio value="asc" size="sm">
                    <Text fontSize="13px">Low to High</Text>
                  </Radio>
                  <Radio value="desc" size="sm">
                    <Text fontSize="13px">High to Low</Text>
                  </Radio>
                </Flex>
              </RadioGroup>
            </FormControl>
          </AccordionPanel>
        </AccordionItem>

        {/* Category */}
        <AccordionItem border="none" mb={1}>
          <AccordionButton
            px={3}
            py={2.5}
            borderRadius="xl"
            _hover={{ bg: accordionHoverBg }}
            _expanded={{ bg: accordionHoverBg }}
          >
            <Text flex="1" textAlign="left" fontWeight="600" fontSize="13px" color={textColor}>
              Category
            </Text>
            {selectedCategory.length > 0 && (
              <Badge borderRadius="full" fontSize="10px" mr={2} px={1.5}>
                {selectedCategory.length}
              </Badge>
            )}
            <AccordionIcon color={mutedColor} />
          </AccordionButton>
          <AccordionPanel px={3} pb={3} pt={2}>
            {filtersError ? (
              <Text fontSize="12px" color="red.400" textAlign="center" py={2}>
                Failed to load categories
              </Text>
            ) : filtersLoading ? (
              <Text fontSize="12px" color={mutedColor} textAlign="center" py={2}>
                Loading...
              </Text>
            ) : subcategories.length === 0 ? (
              <Text fontSize="12px" color={mutedColor} textAlign="center" py={2}>
                No categories available
              </Text>
            ) : (
              <FormControl>
                <CheckboxGroup value={selectedCategory} onChange={handleCategoryChange}>
                  <Flex direction="column" gap={1.5}>
                    {subcategories.map((item) => (
                      <Checkbox key={item} value={item} size="sm">
                        <Text fontSize="13px">{item}</Text>
                      </Checkbox>
                    ))}
                  </Flex>
                </CheckboxGroup>
              </FormControl>
            )}
          </AccordionPanel>
        </AccordionItem>

        {/* Brand */}
        <AccordionItem border="none" mb={1}>
          <AccordionButton
            px={3}
            py={2.5}
            borderRadius="xl"
            _hover={{ bg: accordionHoverBg }}
            _expanded={{ bg: accordionHoverBg }}
          >
            <Text flex="1" textAlign="left" fontWeight="600" fontSize="13px" color={textColor}>
              Brand
            </Text>
            {selectedBrand.length > 0 && (
              <Badge borderRadius="full" fontSize="10px" mr={2} px={1.5}>
                {selectedBrand.length}
              </Badge>
            )}
            <AccordionIcon color={mutedColor} />
          </AccordionButton>
          <AccordionPanel px={3} pb={3} pt={2} maxH="180px" overflowY="auto">
            {filtersError ? (
              <Text fontSize="12px" color="red.400" textAlign="center" py={2}>
                Failed to load brands
              </Text>
            ) : filtersLoading ? (
              <Text fontSize="12px" color={mutedColor} textAlign="center" py={2}>
                Loading...
              </Text>
            ) : brands.length === 0 ? (
              <Text fontSize="12px" color={mutedColor} textAlign="center" py={2}>
                No brands available
              </Text>
            ) : (
              <FormControl>
                <CheckboxGroup value={selectedBrand} onChange={handleBrandChange}>
                  <Flex direction="column" gap={1.5}>
                    {brands.map((item) => (
                      <Checkbox key={item} value={item} size="sm">
                        <Text fontSize="13px">{item}</Text>
                      </Checkbox>
                    ))}
                  </Flex>
                </CheckboxGroup>
              </FormControl>
            )}
          </AccordionPanel>
        </AccordionItem>

        {/* Discount */}
        <AccordionItem border="none" mb={1}>
          <AccordionButton
            px={3}
            py={2.5}
            borderRadius="xl"
            _hover={{ bg: accordionHoverBg }}
            _expanded={{ bg: accordionHoverBg }}
          >
            <Text flex="1" textAlign="left" fontWeight="600" fontSize="13px" color={textColor}>
              Discount
            </Text>
            <AccordionIcon color={mutedColor} />
          </AccordionButton>
          <AccordionPanel px={3} pb={3} pt={2}>
            <FormControl>
              <Flex align="center" justify="center" mb={2}>
                <Badge variant="subtle" borderRadius="full" px={3} py={0.5}>
                  {selectedDiscountRange.slice(3)}% +
                </Badge>
              </Flex>
              <Slider
                defaultValue={Number(selectedDiscountRange.slice(3))}
                min={0}
                max={100}
                step={5}
                onChange={handleDiscountRangeChange}
                              >
                <SliderTrack bg={sliderTrackBg} h="4px" borderRadius="full">
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb
                  boxSize={4}
                  border="2px solid"
                  borderColor="accent.solid"
                  _focus={{ boxShadow: "0 0 0 3px rgba(128,90,213,0.3)" }}
                />
              </Slider>
              <Flex justify="space-between" mt={1}>
                <Text fontSize="10px" color={mutedColor}>0%</Text>
                <Text fontSize="10px" color={mutedColor}>100%</Text>
              </Flex>
            </FormControl>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/* Reset Button */}
      {activeFilterCount > 0 && (
        <Button
          onClick={handleReset}
          width="full"
          mt={4}
          size="sm"
          variant="ghost"
          color="red.500"
          leftIcon={<Icon as={FiRefreshCcw} boxSize={3.5} />}
          borderRadius="xl"
          fontWeight="600"
          fontSize="xs"
          _hover={{ bg: "red.50" }}
        >
          Clear all filters
        </Button>
      )}
    </>
  );

  return (
    <Box minH="100vh" bg={mainBg}>
      {/* Mobile Filter Toggle */}
      <Box display={{ base: "block", md: "none" }} p={3} bg={sidebarBg} position="sticky" top="56px" zIndex={4}>
        <Button
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          size="sm"
          width="100%"
          variant="outline"
          borderRadius="xl"
          leftIcon={<FiFilter />}
          rightIcon={showMobileFilter ? <FiChevronUp /> : <FiChevronDown />}
          fontWeight="600"
          fontSize="xs"
        >
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </Button>
        {showMobileFilter && (
          <Box mt={3} pb={2}>
            {filterContent}
          </Box>
        )}
      </Box>

      <Flex direction={{ base: "column", md: "row" }}>
        {/* Desktop Sidebar */}
        <Box
          display={{ base: "none", md: "block" }}
          width="280px"
          minW="280px"
          position="sticky"
          top="72px"
          height="calc(100vh - 72px)"
          overflowY="auto"
          bg={sidebarBg}
          p={4}
          css={{
            "&::-webkit-scrollbar": { width: "3px" },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(128,90,213,0.3)",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": { background: "transparent" },
          }}
        >
          {filterContent}
        </Box>

        {/* Product Grid */}
        <Box flex="1" p={{ base: 3, md: 5 }} minH="100vh">
          {productsError ? (
            <EmptyState
              variant="error"
              icon={FiAlertCircle}
              title="Failed to load products"
              message="We couldn't reach the server. Please check your internet connection and try again."
              actionLabel="Try Again"
              onAction={refetch}
            />
          ) : productsLoading ? (
            <LoadingSpinner />
          ) : products?.length > 0 ? (
            <>
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
                gap={{ base: 3, md: 4 }}
              >
                {products.map((ele) => (
                  <CardItem key={ele._id} {...ele} />
                ))}
              </Grid>

              <Box pt={6} pb={4}>
                <Pagination
                  onPageChange={handlePageChange}
                  currentPage={page}
                  totalPages={Math.ceil(totalCount / 12)}
                  totalCount={totalCount}
                />
              </Box>
            </>
          ) : (
            <NotFound />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Product;
