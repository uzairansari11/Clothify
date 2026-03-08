import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { FiMenu, FiSettings } from "react-icons/fi";
import PannelSiderbar from "./lfetpannel/PannelSiderbar";
import AdminTable from "./rigthpannel/AdminTable";
import Statistics from "./rigthpannel/Statistics";
import UserTable from "./rigthpannel/UserTable";
import { useSelector } from "react-redux";
import AdminAvatar from "../authentication/AdminAvatar";
import PreferenceDrawer from "../../user/PreferenceDrawer";
import { Products } from "./rigthpannel/Products";
import AddProduct from "./rigthpannel/addproduct/AddProduct";
import OrderTable from "./rigthpannel/OrderTable";

const SIDEBAR_WIDTH = "240px";

const SECTION_TITLES = {
  dashboard:  "Dashboard",
  user:       "Users",
  admin:      "Admins",
  product:    "Products",
  addproduct: "Add Product",
  order:      "Orders",
};

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isPrefOpen, onOpen: onPrefOpen, onClose: onPrefClose } = useDisclosure();

  const location = useLocation();
  const finalPath = location.pathname.split("/")[2];

  const { adminDetails } = useSelector((store) => store.adminAuthReducer);

  // --- colour tokens ---
  const pageBg      = useColorModeValue("gray.50",  "gray.900");
  const headerBg    = useColorModeValue("white",    "gray.800");
  const headerBorder = useColorModeValue("gray.100", "gray.700");
  const titleColor  = useColorModeValue("gray.800", "white");
  const subtitleColor = useColorModeValue("gray.400", "gray.500");
  const menuBtnColor = useColorModeValue("gray.600", "gray.300");

  const sectionTitle = SECTION_TITLES[finalPath] ?? "Dashboard";

  return (
    <Flex h="100vh" overflow="hidden" bg={pageBg}>

      {/* ═══════════════════════════════════════════
          DESKTOP SIDEBAR  — always visible ≥ md
      ═══════════════════════════════════════════ */}
      <Box
        display={{ base: "none", md: "flex" }}
        flexDirection="column"
        w={SIDEBAR_WIDTH}
        flexShrink={0}
        h="100vh"
        position="sticky"
        top={0}
      >
        <PannelSiderbar />
      </Box>

      {/* ═══════════════════════════════════════════
          MOBILE DRAWER  — slide-in < md
      ═══════════════════════════════════════════ */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent maxW={SIDEBAR_WIDTH} p={0}>
          <DrawerCloseButton zIndex={10} />
          <DrawerBody p={0} h="100%">
            <PannelSiderbar onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* ═══════════════════════════════════════════
          RIGHT COLUMN  (header + scrollable content)
      ═══════════════════════════════════════════ */}
      <Flex direction="column" flex={1} minW={0} h="100vh">

        {/* ── Top header ── */}
        <Flex
          as="header"
          align="center"
          justify="space-between"
          px={{ base: 4, md: 6 }}
          py={2}
          bg={headerBg}
          borderBottom="1px solid"
          borderColor={headerBorder}
          flexShrink={0}
          position="sticky"
          top={0}
          zIndex={10}
        >
          {/* Left: hamburger (mobile) + breadcrumb title */}
          <Flex align="center" gap={3} minW={0}>
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<FiMenu />}
              aria-label="Open navigation menu"
              variant="ghost"
              color={menuBtnColor}
              size="sm"
              onClick={onOpen}
              flexShrink={0}
            />
            <Box minW={0}>
              <Flex align="center" gap={1.5}>
                <Text
                  fontSize="11px"
                  fontWeight={500}
                  color={subtitleColor}
                  textTransform="uppercase"
                  letterSpacing="0.06em"
                  flexShrink={0}
                >
                  Admin /
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight={700}
                  color={titleColor}
                  isTruncated
                >
                  {sectionTitle}
                </Text>
              </Flex>
            </Box>
          </Flex>

          {/* Right: settings + admin avatar */}
          <Flex align="center" gap={1} flexShrink={0} ml={4}>
            <Tooltip label="Preferences" hasArrow placement="bottom">
              <IconButton
                icon={<FiSettings />}
                size="sm"
                variant="ghost"
                color={menuBtnColor}
                borderRadius="lg"
                _hover={{ color: "accent.solid", bg: "accent.bg" }}
                onClick={onPrefOpen}
                aria-label="Preferences"
              />
            </Tooltip>
            <AdminAvatar adminDetails={adminDetails} />
          </Flex>
        </Flex>

        {/* ── Scrollable content area ── */}
        <Box
          flex={1}
          overflowY="auto"
          px={{ base: 4, md: 6, lg: 8 }}
          py={{ base: 3, md: 4 }}
        >
          {finalPath === "dashboard"  && <Statistics />}
          {finalPath === "user"       && <UserTable />}
          {finalPath === "admin"      && <AdminTable />}
          {finalPath === "addproduct" && <AddProduct />}
          {finalPath === "product"    && <Products />}
          {finalPath === "order"      && <OrderTable />}
        </Box>
      </Flex>

      {/* Preference Drawer */}
      <PreferenceDrawer isOpen={isPrefOpen} onClose={onPrefClose} />
    </Flex>
  );
};

export default Dashboard;
