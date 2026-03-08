import { Box, Flex, IconButton, Tooltip, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { getQuantity } from '../../../utils/getquanity';
import Container from '../Container';
import PreferenceDrawer from '../PreferenceDrawer';
import AvatarNavbar from './AvatarNavbar';
import DrawerComponent from './DrawerComponent';
import HamburgerOptions from './Hamburger';
import Logo from './Logo';
import Menuitem from './Menuitem';
import OtherOptions from './OtherOptions';
import Options from './ProductOptions';
import Searchbar from './Searchbar';

const Navbar = () => {
  const { cartData } = useSelector((store) => store.cartReducer);
  const { wishlistData } = useSelector((store) => store.wishlistReducer);
  const authDetails = useSelector((store) => store.authReducer);
  const { orderData } = useSelector((store) => store.orderReducer);
  const totalCartQuantity = getQuantity(cartData);
  const totalWishlistQuantity = getQuantity(wishlistData);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navBg = useColorModeValue("rgba(255, 255, 255, 0.95)", "rgba(26, 32, 44, 0.95)");
  const navBorderColor = useColorModeValue("gray.100", "gray.700");
  const iconColor = useColorModeValue("gray.500", "gray.400");
  const settingsHoverBg = "accent.bg";

  return (
    <>
      <Box
        width="full"
        position="fixed"
        top={0}
        left={0}
        zIndex={50}
        px={{ base: 3, md: 5 }}
        py={2}
        backdropFilter="blur(20px) saturate(180%)"
        backgroundColor={navBg}
        borderBottom="1px solid"
        borderColor={navBorderColor}
        boxShadow="0 1px 12px rgba(0,0,0,0.04)"
        transition="all 0.3s ease"
      >
        <Container>
          <Flex justify="space-between" align="center" gap={3}>
            {/* Logo */}
            <Box flexShrink={0}>
              <Logo />
            </Box>

            {/* Nav Links - Desktop */}
            <Box display={{ base: 'none', lg: 'flex' }}>
              <Options />
            </Box>

            {/* Search */}
            <Box flex="1" maxW={{ md: "360px" }} display={{ base: 'none', md: 'block' }}>
              <Searchbar />
            </Box>

            {/* Right section */}
            <Flex align="center" gap={1}>
              {/* Cart/Wishlist/Orders - Desktop */}
              <Box display={{ base: 'none', lg: 'flex' }}>
                <OtherOptions />
              </Box>

              {/* Settings */}
              <Tooltip label="Settings" hasArrow placement="bottom">
                <IconButton
                  icon={<FiSettings />}
                  size="sm"
                  variant="ghost"
                  color={iconColor}
                  borderRadius="lg"
                  _hover={{ color: "accent.solid", bg: settingsHoverBg }}
                  onClick={onOpen}
                  aria-label="Settings"
                  display={{ base: 'none', md: 'flex' }}
                />
              </Tooltip>

              {/* Avatar Menu */}
              <Menuitem isAuth={authDetails.isAuth}>
                <AvatarNavbar authDetails={authDetails} />
              </Menuitem>

              {/* Hamburger - Mobile */}
              <Box display={{ base: 'flex', lg: 'none' }} alignItems="center">
                <DrawerComponent
                  totalCartQuantity={totalCartQuantity}
                  totalWishlistQuantity={totalWishlistQuantity}
                  isAuth={authDetails.isAuth}
                  orderData={orderData}
                  onOpenPreferences={onOpen}
                >
                  <HamburgerOptions />
                </DrawerComponent>
              </Box>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Preference Drawer */}
      <PreferenceDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Navbar;
