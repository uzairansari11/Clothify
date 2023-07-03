import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Heading,
  ScaleFade,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/user/spinner/Spinner";
import WishlistCard from "../components/user/wishlist/WishlistCard";
import { handleAddToCartData } from "../redux/User_Redux/cart/action";
import {
  handleDeleteToWishlistData,
} from "../redux/User_Redux/wishlist/action";

const WishlistPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { wishlistData } = useSelector((store) => store.wishlistReducer);
  const { isAuth } = useSelector((store) => store.authReducer);

  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    dispatch(handleDeleteToWishlistData(itemId));
  };

  const handleAddToCart = (payload) => {
    dispatch(handleAddToCartData(payload));
  };
  useEffect(() => {

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  if (!isAuth) {
    // Redirect or display message indicating that the user needs to log in
    return (
      <Box p={4}>
        <Heading
          as="h1"
          mb={4}
          size="xl"
          textAlign="center"
          color="teal.500"
          fontFamily={"cursive"}
          fontSize={"xl"}
          fontWeight={"extrabold"}
        >
          Your Wishlist
        </Heading>
        <Divider my={4} />
        <Flex justifyContent="center" alignItems="center" minHeight="200px">
          <Text fontSize="xl" textAlign="center" color="gray.500">
            Please log in to view your wishlist.
          </Text>
        </Flex>
      </Box>
    );
  }
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
      ) : wishlistData?.length ? (
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
                <WishlistCard
                  key={ele._id}
                  {...ele}
                  handleRemoveItem={handleRemoveItem}
                  handleAddToCart={handleAddToCart}
                />
              ))}
          </Grid>
        </Flex>
      ) : (
        <Flex justifyContent="center" alignItems="center" minHeight="200px">
          <ScaleFade initialScale={0.9} in>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 150,
              }}
            >
              <Text fontSize="xl" textAlign="center" color="gray.500">
                Your Wishlist Is Empty !
              </Text>
            </motion.div>
          </ScaleFade>
        </Flex>
      )}
    </Box>
  );
};

export default WishlistPage;
