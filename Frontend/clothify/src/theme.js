import { extendTheme } from "@chakra-ui/react";

// Map radius preference names to Chakra radii overrides
const RADIUS_MAP = {
  sharp:   { none: "0", base: "2px", sm: "2px", md: "4px", lg: "6px", xl: "8px", "2xl": "10px", full: "9999px" },
  rounded: { none: "0", base: "6px", sm: "4px", md: "8px", lg: "12px", xl: "16px", "2xl": "20px", full: "9999px" },
  full:    { none: "0", base: "10px", sm: "8px", md: "14px", lg: "20px", xl: "24px", "2xl": "28px", full: "9999px" },
};

export function createTheme(accentColor = "purple", radiusName = "rounded") {
  const radii = RADIUS_MAP[radiusName] || RADIUS_MAP.rounded;

  return extendTheme({
    config: {
      initialColorMode: "light",
      useSystemColorMode: false,
    },
    radii,
    semanticTokens: {
      colors: {
        // Page backgrounds
        "page.bg":    { default: "white",    _dark: "gray.900" },
        "page.bgAlt": { default: "gray.50",  _dark: "gray.800" },

        // Card / Surface
        "card.bg":          { default: "white",              _dark: "gray.800" },
        "card.border":      { default: "gray.100",           _dark: "gray.700" },
        "card.hoverBorder": { default: `${accentColor}.200`, _dark: `${accentColor}.600` },
        "card.shadow":      { default: "rgba(0,0,0,0.04)",   _dark: "rgba(0,0,0,0.3)" },

        // Text
        "text.primary":   { default: "gray.800", _dark: "white"     },
        "text.secondary": { default: "gray.600", _dark: "gray.300"  },
        "text.muted":     { default: "gray.500", _dark: "gray.400"  },
        "text.subtle":    { default: "gray.400", _dark: "gray.500"  },

        // Input
        "input.bg":      { default: "gray.100", _dark: "gray.700" },
        "input.focusBg": { default: "white",    _dark: "gray.600" },

        // Section
        "section.bg":     { default: "gray.50",  _dark: "gray.700" },
        "section.border": { default: "gray.200", _dark: "gray.600" },

        // Accent — dynamic based on selected color
        "accent.bg":     { default: `${accentColor}.50`,  _dark: `${accentColor}.900` },
        "accent.subtle": { default: `${accentColor}.100`, _dark: `${accentColor}.800` },
        "accent.solid":  { default: `${accentColor}.500`, _dark: `${accentColor}.400` },
        "accent.text":   { default: `${accentColor}.600`, _dark: `${accentColor}.300` },

        // Nav
        "nav.bg":     { default: "rgba(255,255,255,0.95)", _dark: "rgba(26,32,44,0.95)" },
        "nav.border": { default: "gray.100",               _dark: "gray.700"             },

        // Icon
        "icon.default": { default: "gray.500", _dark: "gray.400" },
      },
    },
    styles: {
      global: (props) => ({
        body: {
          bg:    props.colorMode === "dark" ? "gray.900" : "white",
          color: props.colorMode === "dark" ? "white"    : "gray.800",
        },
      }),
    },
    fonts: {
      heading: `'Playfair Display', 'Georgia', serif`,
      body:    `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    },
    components: {
      Button:    { defaultProps: { colorScheme: accentColor } },
      Badge:     { defaultProps: { colorScheme: accentColor } },
      Checkbox:  { defaultProps: { colorScheme: accentColor } },
      Radio:     { defaultProps: { colorScheme: accentColor } },
      Slider:    { defaultProps: { colorScheme: accentColor } },
      Switch:    { defaultProps: { colorScheme: accentColor } },
      Tabs:      { defaultProps: { colorScheme: accentColor } },
      Tag:       { defaultProps: { colorScheme: accentColor } },
      Spinner:   { defaultProps: { colorScheme: accentColor } },
    },
  });
}

// Convenience default export for places that do not need dynamic theming.
export default createTheme("purple", "rounded");
