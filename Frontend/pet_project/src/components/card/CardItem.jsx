import React, { useState } from "react";
import {
	Box,
	Image,
	Text,
	Button,
	IconButton,
	useColorModeValue,
	Spinner,
} from "@chakra-ui/react";
import { FiHeart, FiShoppingBag } from "react-icons/fi";

const CartItem = ({ imageSrc, price, description }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const heartColor = useColorModeValue("red.500", "red.200");

	const handleAddToCart = () => {
		setIsLoading(true);
		// Simulating an API call or asynchronous operation
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	};

	return (
		<Box
			maxW="sm"
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			position="relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Image
				src={
					isHovered
						? "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
						: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
				}
				alt="Product"
				width={"100%"}
				height={"200px"}
				objectFit={"fit"}
				transition="0.3s"
			/>
			<Box p="4">
				<Text fontWeight="semibold" fontSize="lg" mb="2">
					${price}
				</Text>
				<Text>{description}</Text>
				<Button
					colorScheme="teal"
					mt="4"
					width="100%"
					leftIcon={<FiShoppingBag />}
					onClick={handleAddToCart}
					disabled={isLoading}
					isLoading={isLoading}
					loadingText="Adding..."
					_hover={{ opacity: "0.8" }}
				>
					Add to Cart
				</Button>
				<IconButton
					icon={<FiHeart />}
					color={heartColor}
					size="md"
					aria-label="Add to Wishlist"
					position="absolute"
					top="2"
					right="2"
					opacity={isHovered ? "1" : "0"}
					transition="opacity 0.3s"
				/>
			</Box>
		</Box>
	);
};

export default CartItem;
