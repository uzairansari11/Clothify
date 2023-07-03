import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Checkbox,
	CheckboxGroup,
	Flex,
	FormControl,
	Grid,
	Icon,
	Radio,
	RadioGroup,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiBuilding, BiCategory, BiSort } from "react-icons/bi";
import { BsAlexa } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { handleProductData } from "../../../redux/User_Redux/products/action";
import CardItem from "../card/CardItem";
import Pagination from "../product/Pagination";
import LoadingSpinner from "../spinner/Spinner";
import NotFound from "./NotFound";

const Product = ({ category, subcategory, brands }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const initialSortOrder = searchParams.get("sortOrder");
	const initialPage = searchParams.get("page");
	const initialDiscount = searchParams.get("discount");
	const initialSubcategory = searchParams.getAll("subcategory");
	const initialBrand = searchParams.getAll("brand");
	const { products, totalCount } = useSelector((store) => store.productReducer);

	const [page, setPage] = useState(initialPage || 1);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);

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

	const handleCategoryChange = (selectedCategories) => {
		setSelectedCategory(selectedCategories);
		setPage(1);
	};

	const handleBrandChange = (selectedBrands) => {
		setSelectedBrand(selectedBrands);
		setPage(1);
	};

	const handleDiscountRangeChange = (values) => {
		setSelectedDiscountRange("gte" + values);
		setPage(1);
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

	const handlePageChange = (clickedPage) => {
		setPage(clickedPage);
	};
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
		products,
	]);

	useEffect(() => {
		window.scrollTo(0, 0);
		const params = {
			category: category,
			subcategory: searchParams.getAll("subcategory"),
			brand: searchParams.getAll("brand"),
			sortField: searchParams.get("sortField"),
			sortOrder: searchParams.get("sortOrder"),
			discount: searchParams.get("discount"),
			page: page,
			limit: 6,
		};

		dispatch(handleProductData(params));
	}, [category, searchParams, page, dispatch, setSearchParams]);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 300);
	}, []);

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<Box display="flex" flexDirection={{ base: "column", md: "row" }}>
				<Box
					width={{ base: "100%", md: "20%" }}
					position={{ base: "fixed", md: "fixed" }}
					height={{ base: "auto", md: "100vh" }}
					overflowY={{ base: "auto", md: "scroll" }}
					zIndex={3}
					sx={{
						"&::-webkit-scrollbar": {
							width: "0.4em",
							background: "transparent",
						},
						"&::-webkit-scrollbar-thumb": {
							background: "transparent",
						},
					}}
				>
					<Box
						p="4"
						borderWidth="1px"
						borderRadius="lg"
						overflow="hidden"
						backgroundColor="white"
						mb={20}
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
								<AccordionPanel pb={4} textAlign={"left"}>
									<FormControl>
										<Flex flexDir={"column"}>
											<CheckboxGroup
												value={selectedCategory}
												onChange={handleCategoryChange}
											>
												{subcategory.map((item) => (
													<Checkbox key={item._id} value={item.subcategory}>
														{item.subcategory}
													</Checkbox>
												))}
											</CheckboxGroup>
										</Flex>
									</FormControl>
								</AccordionPanel>
							</AccordionItem>
							<AccordionItem>
								<AccordionButton>
									<BiBuilding size={20} color="teal" /> Brand
									<AccordionIcon />
								</AccordionButton>
								<AccordionPanel pb={4} textAlign={"left"}>
									<FormControl>
										<Flex flexDir={"column"}>
											<CheckboxGroup
												value={selectedBrand}
												onChange={handleBrandChange}
											>
												{brands.map((item) => (
													<Checkbox key={item._id} value={item.brand}>
														{item.brand}
													</Checkbox>
												))}
											</CheckboxGroup>
										</Flex>
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
						<Flex justify="flex-end" mt={4}>
							<Button
								colorScheme="teal"
								onClick={handleReset}
								width="full"
								leftIcon={<Icon as={FiRefreshCcw} />}
							>
								Reset
							</Button>
						</Flex>
					</Box>
				</Box>

				<Box
					width={{ base: "80%", sm: "100%" }}
					paddingLeft={{ base: 0, md: "20px" }}
					marginTop={{ base: "200px", md: 0 }}
					paddingBottom="50px"
					marginLeft={{ base: 0, md: "20%" }}
					overflow="auto"
					marginX={"auto"}
					sx={{
						"&::-webkit-scrollbar": {
							width: "0.4em",
							background: "transparent",
						},
						"&::-webkit-scrollbar-thumb": {
							background: "transparent",
						},
					}}
				>
					{products.length > 0 ? (
						<Grid
							templateColumns={{
								base: "repeat(1, 1fr)",
								sm: "repeat(2, 1fr)",
								lg: "repeat(3, 1fr)",
							}}
							gap={5}
							justifyContent="center"
						>
							{products.length > 0 &&
								products.map((ele) => {
									return <CardItem key={ele._id} {...ele} />;
								})}
						</Grid>
					) : (
						<NotFound />
					)}
				</Box>
			</Box>
			{products.length ? (
				<Pagination
					onPageChange={handlePageChange}
					currentPage={page}
					totalPages={Math.ceil(totalCount / 6)}
					totalCount={totalCount}
				/>
			) : (
				<></>
			)}
		</>
	);
};

export default Product;
