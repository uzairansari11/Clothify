import React, { createContext, useCallback, useContext, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

export const COLOR_OPTIONS = [
  { name: "purple", label: "Purple", hex: "#805AD5" },
  { name: "blue",   label: "Blue",   hex: "#3182CE" },
  { name: "teal",   label: "Teal",   hex: "#319795" },
  { name: "pink",   label: "Pink",   hex: "#D53F8C" },
  { name: "orange", label: "Orange", hex: "#DD6B20" },
  { name: "green",  label: "Green",  hex: "#38A169" },
];

export const RADIUS_OPTIONS = [
  { name: "sharp",   label: "Sharp",   px: "4px"  },
  { name: "rounded", label: "Rounded", px: "12px" },
  { name: "full",    label: "Full",    px: "24px" },
];

const LS_ACCENT  = "clothify_accentColor";
const LS_RADIUS  = "clothify_borderRadius";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readLS(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function writeLS(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // silently ignore (e.g. private browsing)
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const PreferenceContext = createContext(null);

export function PreferenceProvider({ children }) {
  const [accentColor, setAccentColorState] = useState(
    () => readLS(LS_ACCENT, "purple")
  );

  const [borderRadius, setBorderRadiusState] = useState(
    () => readLS(LS_RADIUS, "rounded")
  );

  const setAccentColor = useCallback((colorName) => {
    const valid = COLOR_OPTIONS.some((c) => c.name === colorName);
    if (!valid) return;
    writeLS(LS_ACCENT, colorName);
    setAccentColorState(colorName);
  }, []);

  const setBorderRadius = useCallback((radiusName) => {
    const valid = RADIUS_OPTIONS.some((r) => r.name === radiusName);
    if (!valid) return;
    writeLS(LS_RADIUS, radiusName);
    setBorderRadiusState(radiusName);
  }, []);

  return (
    <PreferenceContext.Provider
      value={{ accentColor, setAccentColor, borderRadius, setBorderRadius }}
    >
      {children}
    </PreferenceContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferenceContext);
  if (!ctx) {
    throw new Error("usePreferences must be used inside <PreferenceProvider>");
  }
  return ctx;
}
