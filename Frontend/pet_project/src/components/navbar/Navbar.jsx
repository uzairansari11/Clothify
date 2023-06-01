import React from "react";
import { Box, } from "@chakra-ui/react";
import Logo from "./Logo";
import Container from "../Container";
import Searchbar from "./Searchbar";
import Menuitem from "./Menuitem";
import Options from "./Options";
import AvatarNavbar from "./AvatarNavbar";
const Navbar = () => {
	return (
		<Box
			backgroundColor={"white.200"}
			width={"full"}
			boxShadow={"xl"}
			position={"fixed"}
			px={4}
			py={2}
      zIndex={50}
		>
			<Container>
				<Box
					display={"flex"}
					flexDir={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}
					gap={10}
				>
					{" "}
					<Logo />
          <Options />
					<Searchbar />
					<Menuitem>
						{" "}
						<AvatarNavbar />
					</Menuitem>
				</Box>
			</Container>
		</Box>
	);
};

export default Navbar;
