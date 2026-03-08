import React from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiCheck, FiMoon, FiSettings, FiSun } from "react-icons/fi";
import {
  COLOR_OPTIONS,
  RADIUS_OPTIONS,
  usePreferences,
} from "../../context/PreferenceContext";

// ─── Color-swatch component ───────────────────────────────────────────────────
// Defined outside the drawer so it does not violate the hooks-at-top rule.
// It receives all derived colors as plain props — no hooks inside.
function ColorSwatch({ option, isSelected, activeBorderColor, onClick }) {
  return (
    <Tooltip label={option.label} hasArrow placement="top">
      <Box
        as="button"
        w="36px"
        h="36px"
        borderRadius="xl"
        bg={option.hex}
        border={isSelected ? "3px solid" : "2px solid transparent"}
        borderColor={isSelected ? activeBorderColor : "transparent"}
        transition="all 0.15s"
        _hover={{ transform: "scale(1.15)", boxShadow: "md" }}
        position="relative"
        onClick={() => onClick(option.name)}
        aria-label={`Select ${option.label} accent`}
        aria-pressed={isSelected}
      >
        {isSelected && (
          <Flex
            position="absolute"
            top="-1px"
            right="-1px"
            w="14px"
            h="14px"
            bg="white"
            borderRadius="full"
            align="center"
            justify="center"
            boxShadow="sm"
          >
            <Icon as={FiCheck} boxSize="9px" color={option.hex} strokeWidth={3} />
          </Flex>
        )}
      </Box>
    </Tooltip>
  );
}

// ─── Main drawer component ────────────────────────────────────────────────────

const PreferenceDrawer = ({ isOpen, onClose }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { accentColor, setAccentColor, borderRadius, setBorderRadius } =
    usePreferences();

  // ALL useColorModeValue calls at top-level, never inside callbacks or .map()
  const drawerBg       = useColorModeValue("white",    "gray.800");
  const sectionBg      = useColorModeValue("gray.50",  "gray.700");
  const textColor      = useColorModeValue("gray.700", "gray.200");
  const mutedColor     = useColorModeValue("gray.500", "gray.400");
  const borderColor    = useColorModeValue("gray.200", "gray.600");
  const activeBorderColor = useColorModeValue("gray.800", "white");
  const inactiveBtnBg  = useColorModeValue("white",    "gray.600");
  const activeBtnColor = useColorModeValue("white",    "white");
  const toggleTrackBg  = useColorModeValue("gray.200", "gray.600");

  // Derive the currently selected color option so we can display its name.
  const selectedColor = COLOR_OPTIONS.find((c) => c.name === accentColor)
    ?? COLOR_OPTIONS[0];

  // Derive the currently selected radius option.
  const selectedRadius = RADIUS_OPTIONS.find((r) => r.name === borderRadius)
    ?? RADIUS_OPTIONS[1];

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
      <DrawerOverlay bg="blackAlpha.400" backdropFilter="blur(4px)" />
      <DrawerContent bg={drawerBg} borderLeftRadius="2xl">
        {/* Accent-color top bar — uses the live accentColor from context */}
        <Box
          h="3px"
          bgGradient={`linear(to-r, ${accentColor}.400, ${accentColor}.600)`}
        />
        <DrawerCloseButton top={4} borderRadius="full" />

        <DrawerHeader pt={5} pb={2}>
          <Flex align="center" gap={2}>
            <Flex
              align="center"
              justify="center"
              w="32px"
              h="32px"
              bg={`${accentColor}.500`}
              borderRadius="lg"
            >
              <Icon as={FiSettings} color="white" boxSize={4} />
            </Flex>
            <Box>
              <Heading size="sm" color={textColor}>
                Preferences
              </Heading>
              <Text fontSize="xs" color={mutedColor}>
                Customize your experience
              </Text>
            </Box>
          </Flex>
        </DrawerHeader>

        <DrawerBody pt={4}>
          {/* ── Appearance ─────────────────────────────────────────────── */}
          <Box mb={6}>
            <Text
              fontSize="10px"
              fontWeight="700"
              color={mutedColor}
              textTransform="uppercase"
              letterSpacing="1.2px"
              mb={3}
            >
              Appearance
            </Text>

            <Box
              bg={sectionBg}
              borderRadius="xl"
              p={4}
              border="1px solid"
              borderColor={borderColor}
            >
              <Flex align="center" justify="space-between" mb={1}>
                <Box>
                  <Text fontSize="sm" fontWeight="600" color={textColor}>
                    Theme
                  </Text>
                  <Text fontSize="xs" color={mutedColor}>
                    Currently using {colorMode === "light" ? "light" : "dark"} mode
                  </Text>
                </Box>

                {/* Light / Dark toggle pill */}
                <Flex
                  bg={toggleTrackBg}
                  borderRadius="full"
                  p={0.5}
                  gap={0.5}
                >
                  <IconButton
                    icon={<FiSun />}
                    size="sm"
                    borderRadius="full"
                    variant={colorMode === "light" ? "solid" : "ghost"}
                    colorScheme={colorMode === "light" ? accentColor : "gray"}
                    onClick={colorMode === "dark" ? toggleColorMode : undefined}
                    aria-label="Light mode"
                    fontSize="sm"
                  />
                  <IconButton
                    icon={<FiMoon />}
                    size="sm"
                    borderRadius="full"
                    variant={colorMode === "dark" ? "solid" : "ghost"}
                    colorScheme={colorMode === "dark" ? accentColor : "gray"}
                    onClick={colorMode === "light" ? toggleColorMode : undefined}
                    aria-label="Dark mode"
                    fontSize="sm"
                  />
                </Flex>
              </Flex>
            </Box>
          </Box>

          {/* ── Accent Color ────────────────────────────────────────────── */}
          <Box mb={6}>
            <Text
              fontSize="10px"
              fontWeight="700"
              color={mutedColor}
              textTransform="uppercase"
              letterSpacing="1.2px"
              mb={3}
            >
              Accent Color
            </Text>

            <Box
              bg={sectionBg}
              borderRadius="xl"
              p={4}
              border="1px solid"
              borderColor={borderColor}
            >
              <Text fontSize="sm" fontWeight="600" color={textColor} mb={3}>
                Primary Color
              </Text>

              <Flex gap={2} flexWrap="wrap">
                {COLOR_OPTIONS.map((option) => (
                  <ColorSwatch
                    key={option.name}
                    option={option}
                    isSelected={accentColor === option.name}
                    activeBorderColor={activeBorderColor}
                    onClick={setAccentColor}
                  />
                ))}
              </Flex>

              <Text fontSize="10px" color={mutedColor} mt={2}>
                Selected: {selectedColor.label}
              </Text>
            </Box>
          </Box>

          {/* ── Border Radius ───────────────────────────────────────────── */}
          <Box mb={6}>
            <Text
              fontSize="10px"
              fontWeight="700"
              color={mutedColor}
              textTransform="uppercase"
              letterSpacing="1.2px"
              mb={3}
            >
              Shape
            </Text>

            <Box
              bg={sectionBg}
              borderRadius="xl"
              p={4}
              border="1px solid"
              borderColor={borderColor}
            >
              <Text fontSize="sm" fontWeight="600" color={textColor} mb={3}>
                Border Radius
              </Text>

              <Flex gap={2}>
                {RADIUS_OPTIONS.map((r) => {
                  const isActive = borderRadius === r.name;
                  return (
                    <Box
                      key={r.name}
                      as="button"
                      flex="1"
                      py={2.5}
                      bg={isActive ? `${accentColor}.500` : inactiveBtnBg}
                      color={isActive ? activeBtnColor : textColor}
                      borderRadius={r.px}
                      border="1px solid"
                      borderColor={
                        isActive ? `${accentColor}.500` : borderColor
                      }
                      fontSize="xs"
                      fontWeight="600"
                      transition="all 0.15s"
                      _hover={{
                        borderColor: `${accentColor}.400`,
                        transform: "translateY(-1px)",
                      }}
                      onClick={() => setBorderRadius(r.name)}
                      aria-label={`Border radius: ${r.label}`}
                      aria-pressed={isActive}
                    >
                      {r.label}
                    </Box>
                  );
                })}
              </Flex>

              <Text fontSize="10px" color={mutedColor} mt={2}>
                Selected: {selectedRadius.label} ({selectedRadius.px})
              </Text>
            </Box>
          </Box>

          {/* ── Brand footer ────────────────────────────────────────────── */}
          <Box textAlign="center" py={4}>
            <Text fontSize="xs" color={mutedColor}>
              Clothify v2.0 &middot; Fashion Redefined
            </Text>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default PreferenceDrawer;
