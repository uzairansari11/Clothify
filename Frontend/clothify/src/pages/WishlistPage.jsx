import React, { useEffect, useState } from "react";
import {
    Box,
    Heading,
    Text,
    Divider,
    Flex,
    ScaleFade,
    Fade,
    Center,
    Spinner,
    Grid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { handleWishlistCartData } from "../redux/wishlist/action";
import LoadingSpinner from "../components/spinner/Spinner";
import WishlistCard from "../components/wishlist/WishlistCard";

const WishlistPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { wishlistData } = useSelector((store) => store.wishlistReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(handleWishlistCartData());
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <Box p={4}>
            <Heading
                as="h1"
                mb={4}
                size="xl"
                textAlign="center"
                color="teal.500"
                fontFamily="cursive"
                fontSize="xl"
                fontWeight="extrabold"
            >
                Your Wishlist
            </Heading>
            <Divider my={4} />

            {isLoading ? (
                <Center minHeight="200px">
                    <LoadingSpinner />
                </Center>
            ) : wishlistData.length ? (
                <Flex
                    flexDirection="row"
                    flexWrap="wrap"
                    justifyContent="center"
                    alignItems="flex-start"
                >
                    <Grid
                        gridTemplateColumns={{
                            base: "repeat(1,1fr)",
                            md: "repeat(2,1fr)",
                            lg: "repeat(3,1fr)",
                        }}


                        gap={{ sm: "4" }}
                    >
                        {wishlistData.length &&
                            wishlistData.map((ele) => (
                                <WishlistCard key={ele._id} {...ele} />
                            ))}
                    </Grid>
                </Flex>
            ) : (
                <Center minHeight="200px">
                    <ScaleFade initialScale={0.9} in>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Text fontSize="xl" textAlign="center" color="gray.500">
                                Your wishlist is empty.
                            </Text>
                        </motion.div>
                    </ScaleFade>
                </Center>
            )}
        </Box>
    );
};

export default WishlistPage;
