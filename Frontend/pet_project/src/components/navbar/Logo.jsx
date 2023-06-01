import { Image } from "@chakra-ui/react";

const Logo = () => {
	return (
		<Image
			src={"/images/Airbnb_Logo.png"}
			alt="Logo"
			width={{ base: "90px", md: "100px", lg: "120px" }}
			cursor={"pointer"}
		/>
	);
};

export default Logo;
