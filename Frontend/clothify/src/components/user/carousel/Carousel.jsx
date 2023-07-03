import { Box, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";

const Carousel = ({ products }) => {
    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    const autoPlayIntervalRef = useRef();

    useEffect(() => {
        autoPlayIntervalRef.current = setInterval(() => {
            setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length);
        }, 3000);

        return () => {
            clearInterval(autoPlayIntervalRef.current);
        };
    }, [products.length]);

    const handleSlideChange = (currentIndex) => {
        if (autoPlayIntervalRef.current) {
            clearInterval(autoPlayIntervalRef.current);
        }
        const nextIndex =
            currentIndex < 0 ? products.length - 1 : currentIndex % products.length;
        setCurrentProductIndex(nextIndex);
    };

    const renderProducts = () => {
        return products.map((product) => (
            <Box
                key={product._id}
                display="flex"
                justifyContent="center" // Center the image horizontally
                alignItems="center" // Center the image vertically
                position="relative"
                overflow="hidden"
                cursor="pointer"
                _hover={{ transform: "scale(1.02)" }}
                transition="transform 0.2s ease-in-out"
                gap={4} // Add a gap of 4 units between the images
            >
                <Link to={`/product/${product._id}`}>
                    <Box width="100%" maxWidth="400px">
                        {/* Limit the width of each item */}
                        <Image
                            src={product.images[0]}
                            alt={product.title}
                            objectFit="cover"
                            width="300px"
                            height="400px" // Limit the maximum height of the image
                            loading="lazy" // Improve image loading performance
                        />
                        <Box
                            position="absolute"
                            bottom={0}
                            left={0}
                            width="100%"
                            p={4}
                            color="teal"
                        >
                            <Text fontSize="xl" fontWeight="bold">
                                {/* {product.title} */}
                            </Text>
                        </Box>
                    </Box>
                </Link>
            </Box>
        ));
    };

    const renderSlideButtons = () => {
        return products.map((_, index) => (
            <Box
                key={index}
                borderRadius="full"
                bg={index === currentProductIndex ? "blue.500" : "gray.500"}
                height="4px"
                width="20px"
                mx={1}
                cursor="pointer"
                onClick={() => handleSlideChange(index)}
            />
        ));
    };

    return (
        <Box position="relative" height="100%">
            <AliceCarousel
                mouseTracking
                items={renderProducts()}
                responsive={{
                    0: { items: 1 },
                    600: { items: 2 },
                    1024: { items: 3 },
                }}
                autoPlay
                autoPlayInterval={2000}
                infinite
                disableDotsControls
                disableButtonsControls
                onSlideChanged={handleSlideChange}
                activeIndex={currentProductIndex}
                duration={500}
                touchTracking={!("ontouchstart" in window)}
                disableSlideInfo
            />
            <Box position="absolute" bottom={4} left="50%" transform="translateX(-50%)">
                <Box display="flex" justifyContent="center" mt={2}>
                    {renderSlideButtons()}
                </Box>
            </Box>
        </Box>
    );
};

export default Carousel;
