import { ChevronRightIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Carousel from '../components/user/carousel/Carousel';
import { handleProductData } from "../redux/User_Redux/products/action";

const Homepage = () => {
    const { products } = useSelector((store) => store.productReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(handleProductData());
    }, []);

    const handleExploreMore = (category) => {
        if (category !== "New Arrival") {
            navigate(`/${category.toLowerCase()}`);
        }
    };

    const renderExploreMoreButton = (category) => {
        if (category !== "New Arrival") {
            return (
                <Button
                    colorScheme="teal"
                    size="sm"
                    mt={6}
                    rightIcon={<ChevronRightIcon />}
                    onClick={() => handleExploreMore(category)}
                >
                    Explore More
                </Button>
            );
        }

        return null;
    };

    const renderCarouselSection = (title, category, description) => {
        return (
            <Flex direction="column" align="center" mb={8}>
                <Heading
                    as="h2"
                    mb={4}
                    size="xl"
                    textAlign="start"
                    color="teal.500"
                    fontFamily="cursive"
                    fontSize="2xl"
                    fontWeight="extrabold"
                >
                    {title}
                </Heading>
                <Text color="gray.600" mb={6}>{description}</Text>
                <Divider mb={8} color="blue" />
                <Box w={"90%"} margin={"auto"}>
                    <Carousel
                        products={products.filter((ele, index) => {
                            if (category === "New Arrival") {
                                return index % 2 === 0;
                            } else {
                                return ele.category === category;
                            }
                        })}
                    />
                </Box>
                {renderExploreMoreButton(category)}
            </Flex>
        );
    };

    return (
        <Box mt={{ base: "20", lg: 0 }} >
            <Box maxW="80%" mx="auto" mt={12} p={6} bg="gray.100" rounded="md" mb={4}>
                <Heading as="h3" size="lg" mb={4} textAlign="center">
                    Welcome to Our Store!
                </Heading>
                <Text fontSize="lg" textAlign="center">
                    Browse through our wide range of products and find the perfect items for yourself and your loved ones. Enjoy a seamless shopping experience and stay fashionable with us!
                </Text>

            </Box>
            <Divider mb={4} />
            {renderCarouselSection(
                "New Arrivals",
                "New Arrival",
                "Check out the latest arrivals in our store."
            )}

            {renderCarouselSection(
                "Men's Section",
                "Men",
                "Discover our trendy collection for men."
            )}

            {renderCarouselSection(
                "Women's Section",
                "Women",
                "Explore our fashionable collection for women."
            )}

            {renderCarouselSection(
                "Kids' Section",
                "Kids",
                "Find adorable and stylish outfits for kids."
            )}


        </Box>
    );
};

export default Homepage;
