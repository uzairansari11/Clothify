import React, { useEffect } from "react";
import { Box, Button, Divider, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { handleProductData } from '../redux/products/action';
import Carousel from '../components/carousel/Carousel';


const Homepage = () => {
    const images = ["https://images.bewakoof.com/t1080/cream-men-s-half-sleeves-shirt-348535-1655834980-1.jpg", "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1662130112_1367320.jpg?format=webp&w=640&dpr=1.5", "https://images.bewakoof.com/t1080/men-s-black-horizontal-striped-slim-fit-shirt-563205-1671685770-1.JPG"]
    const { products } = useSelector((store) => store.productReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(handleProductData())
    }, [])
    console.log(products, "product from home")
    return (
        <Box p={4}>

            <Flex direction="column" align="center" mb={8}>
                <Heading as="h2" mb={4}>
                    New Arrivals
                </Heading>
                {/* <Carousel projects={products} /> */}
                {/* <Carousel projects={products}/> */}
                {/* New Arrivals Section */}
                {/* Your code for displaying new arrival items goes here */}
                <Button colorScheme="teal" size="sm">
                    Explore More
                </Button>
            </Flex>

            <Flex direction="column" align="center" mb={8}>
                <Heading as="h2" mb={4}>
                    Men
                </Heading>
                {/* Men's Section */}
                {/* Your code for displaying men's clothing goes here */}
                <Button colorScheme="teal" size="sm">
                    Explore More
                </Button>
            </Flex>

            <Flex direction="column" align="center" mb={8}>
                <Heading as="h2" mb={4}>
                    Women
                </Heading>
                {/* Women's Section */}
                {/* Your code for displaying women's clothing goes here */}
                <Button colorScheme="teal" size="sm">
                    Explore More
                </Button>
            </Flex>

            <Flex direction="column" align="center" mb={8}>
                <Heading as="h2" mb={4}>
                    Kids
                </Heading>
                {/* Kids' Section */}
                {/* Your code for displaying kids' clothing goes here */}
                <Button colorScheme="teal" size="sm">
                    Explore More
                </Button>
            </Flex>
        </Box>
    );
};

export default Homepage;
