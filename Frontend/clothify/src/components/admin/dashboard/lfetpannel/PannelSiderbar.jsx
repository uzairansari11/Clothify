import { Box, Flex, Icon, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  FiGrid,
  FiUsers,
  FiShield,
  FiPackage,
  FiPlus,
  FiShoppingBag,
  FiLogOut,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { handleLogoutFunction } from "../../../../redux/Admin_Redux/authentication/action";

const menuItems = [
  { label: "Dashboard",   icon: FiGrid,        path: "/admin/dashboard"   },
  { label: "Users",       icon: FiUsers,       path: "/admin/user"        },
  { label: "Admins",      icon: FiShield,      path: "/admin/admin"       },
  { label: "Products",    icon: FiPackage,     path: "/admin/product"     },
  { label: "Add Product", icon: FiPlus,        path: "/admin/addproduct"  },
  { label: "Orders",      icon: FiShoppingBag, path: "/admin/order"       },
];

const PannelSiderbar = ({ onClose }) => {
  const [logoutLoading, setLogoutLoading] = useState(false);

  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const location  = useLocation();
  const { isAuth } = useSelector((store) => store.adminAuthReducer);

  // --- colour tokens (all at top level, never inside callbacks/map) ---
  const sidebarBg     = useColorModeValue("white",      "gray.800");
  const borderColor   = useColorModeValue("gray.100",   "gray.700");
  const brandColor    = useColorModeValue("gray.900",   "white");
  const dotColor      = "accent.solid";

  const itemDefaultColor  = useColorModeValue("gray.500", "gray.400");
  const itemHoverBg       = useColorModeValue("gray.50",  "gray.700");
  const itemHoverColor    = useColorModeValue("gray.800", "gray.100");

  const activeItemBg      = useColorModeValue("accent.bg",  "gray.700");
  const activeItemColor   = "accent.text";
  const activeBorderColor = "accent.solid";

  const logoutColor       = useColorModeValue("gray.500", "gray.400");
  const logoutHoverBg     = useColorModeValue("red.50",   "rgba(254,178,178,0.1)");
  const logoutHoverColor  = useColorModeValue("red.600",  "red.400");

  const sectionLabelColor = useColorModeValue("gray.400", "gray.600");

  // --- logout ---
  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      setTimeout(() => {
        dispatch(handleLogoutFunction());
      }, 1000);
    } catch (_) {
      // intentionally swallowed
    } finally {
      setTimeout(() => {
        setLogoutLoading(false);
      }, 1200);
    }
  };

  useEffect(() => {
    if (isAuth === false) {
      navigate("/admin/login");
    }
  }, [isAuth, navigate]);

  return (
    <Flex
      direction="column"
      h="100%"
      bg={sidebarBg}
      borderRight="1px solid"
      borderColor={borderColor}
      py={6}
      overflow="hidden"
    >
      {/* ── Brand ── */}
      <Box px={6} mb={8}>
        <Link to="/admin/dashboard" onClick={onClose}>
          <Text
            fontSize="xl"
            fontWeight={800}
            color={brandColor}
            letterSpacing="-0.5px"
            _hover={{ opacity: 0.8 }}
            transition="opacity 0.2s"
          >
            Clothify
            <Text as="span" color={dotColor}>.</Text>
          </Text>
          <Text fontSize="xs" color={sectionLabelColor} fontWeight={500} mt={0.5}>
            Admin Panel
          </Text>
        </Link>
      </Box>

      {/* ── Navigation label ── */}
      <Text
        px={6}
        mb={2}
        fontSize="10px"
        fontWeight={700}
        letterSpacing="0.08em"
        textTransform="uppercase"
        color={sectionLabelColor}
      >
        Navigation
      </Text>

      {/* ── Menu items ── */}
      <Flex direction="column" gap={1} px={3} flex={1}>
        {menuItems.map(({ label, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link to={path} key={label} onClick={onClose}>
              <Flex
                align="center"
                gap={3}
                px={3}
                py={2.5}
                borderRadius="lg"
                borderLeft="3px solid"
                borderLeftColor={isActive ? activeBorderColor : "transparent"}
                bg={isActive ? activeItemBg : "transparent"}
                color={isActive ? activeItemColor : itemDefaultColor}
                fontWeight={600}
                fontSize="sm"
                transition="all 0.15s ease"
                _hover={
                  isActive
                    ? {}
                    : {
                        bg: itemHoverBg,
                        color: itemHoverColor,
                        borderLeftColor: "gray.200",
                      }
                }
                cursor="pointer"
              >
                <Icon as={icon} boxSize={4} flexShrink={0} />
                <Text>{label}</Text>
              </Flex>
            </Link>
          );
        })}
      </Flex>

      {/* ── Divider + Logout ── */}
      <Box mt={4} px={3}>
        <Box h="1px" bg={borderColor} mb={4} />
        <Flex
          align="center"
          gap={3}
          px={3}
          py={2.5}
          borderRadius="lg"
          borderLeft="3px solid transparent"
          color={logoutColor}
          fontWeight={600}
          fontSize="sm"
          transition="all 0.15s ease"
          _hover={{ bg: logoutHoverBg, color: logoutHoverColor }}
          cursor="pointer"
          onClick={handleLogout}
        >
          {logoutLoading ? (
            <Spinner size="xs" flexShrink={0} />
          ) : (
            <Icon as={FiLogOut} boxSize={4} flexShrink={0} />
          )}
          <Text>{logoutLoading ? "Logging out..." : "Logout"}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default PannelSiderbar;
