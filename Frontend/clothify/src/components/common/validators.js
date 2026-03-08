// ── Pure validation rule factories ────────────────────────────────────────────
// Each returns a function: (value) => errorMessage | ""

export const required = (msg = "This field is required") => (value) =>
  !value && value !== 0 ? msg : typeof value === "string" && !value.trim() ? msg : "";

export const isEmail = (msg = "Please enter a valid email") => (value) =>
  value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? msg : "";

export const minLength = (len, msg) => (value) =>
  value && value.length < len ? msg || `Must be at least ${len} characters` : "";

export const maxLength = (len, msg) => (value) =>
  value && value.length > len ? msg || `Must be at most ${len} characters` : "";

export const isPhone = (msg = "Must be a valid 10-digit number") => (value) =>
  value && !/^\d{10}$/.test(value) ? msg : "";

export const minValue = (min, msg) => (value) =>
  value !== "" && value !== undefined && Number(value) < min
    ? msg || `Must be at least ${min}`
    : "";

export const maxValue = (max, msg) => (value) =>
  value !== "" && value !== undefined && Number(value) > max
    ? msg || `Must be at most ${max}`
    : "";

export const isPositive = (msg = "Must be a positive number") => (value) =>
  value !== "" && value !== undefined && Number(value) <= 0 ? msg : "";

export const isUrl = (msg = "Must be a valid URL") => (value) => {
  if (!value) return "";
  try {
    new URL(value);
    return "";
  } catch {
    return msg;
  }
};

// ── Run a value through an array of rules ─────────────────────────────────────
export const validate = (value, rules = []) => {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return "";
};
