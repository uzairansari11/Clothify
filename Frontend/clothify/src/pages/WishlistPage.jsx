import { Box, Divider, Grid, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import LoadingScreen from "../components/common/LoadingScreen";
import WishlistCard from "../components/user/wishlist/WishlistCard";
import { handleAddToCartData } from "../redux/User_Redux/cart/action";
import { handleDeleteToWishlistData } from "../redux/User_Redux/wishlist/action";

const WishlistPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { wishlistData } = useSelector((store) => store.wishlistReducer);
  const { isAuth } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pageBg = useColorModeValue("white", "gray.900");
  const headingColor = useColorModeValue("gray.800", "white");
  const subtextColor = useColorModeValue("gray.500", "gray.400");

  const handleRemoveItem = (itemId) => {
    dispatch(handleDeleteToWishlistData(itemId));
  };

  const handleAddToCart = (payload) => {
    dispatch(handleAddToCartData(payload));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (!isAuth) {
    return (
      <EmptyState
        icon={FiHeart}
        title="Your Wishlist"
        message="Please log in to view your wishlist."
        actionLabel="Login"
        onAction={() => navigate("/login", { state: { data: "/wishlist" } })}
      />
    );
  }

  if (isLoading) {
    return <LoadingScreen message="Loading your wishlist..." />;
  }

  return (
    <Box p={{ base: 4, md: 6 }} maxW="1200px" mx="auto" bg={pageBg}>
      <Heading size="lg" mb={2} color={headingColor} fontWeight="700">
        My Wishlist
      </Heading>
      <Text color={subtextColor} fontSize="sm" mb={4}>
        {wishlistData?.length || 0} item{wishlistData?.length !== 1 ? "s" : ""} saved
      </Text>
      <Divider mb={6} />

      {wishlistData?.length ? (
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          gap={4}
        >
          {wishlistData.map((ele) => (
            <WishlistCard
              key={ele._id}
              {...ele}
              handleRemoveItem={handleRemoveItem}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </Grid>
      ) : (
        <EmptyState
          icon={FiHeart}
          title="Your wishlist is empty"
          message="Save items you love by clicking the heart icon on any product."
          actionLabel="Browse Products"
          onAction={() => navigate("/men")}
        />
      )}
    </Box>
  );
};

export default WishlistPage;
