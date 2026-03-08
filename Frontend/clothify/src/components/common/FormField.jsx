import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

/**
 * FormField — a single reusable form field with label, validation error, and
 * optional left icon / password toggle.
 *
 * Props:
 *  label        — field label text
 *  name         — input name / form key
 *  value        — controlled value
 *  onChange      — change handler
 *  onBlur       — blur handler (for validation)
 *  error        — error message string (falsy = no error)
 *  type         — "text" | "email" | "password" | "number" | "tel" | "textarea" | "select"
 *  placeholder  — placeholder text
 *  icon         — left icon component (e.g. FiMail)
 *  isRequired   — adds Chakra required asterisk
 *  isDisabled   — disables the input
 *  children     — for "select" type: <option> elements
 *  rows         — for "textarea" type
 *  min, max     — for "number" type
 *  variant      — "auth" (tall with icon) | "default" (standard form)
 *  inputProps   — extra props spread onto the underlying Input
 */
const FormField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  placeholder,
  icon,
  isRequired = false,
  isDisabled = false,
  children,
  rows = 4,
  min,
  max,
  variant = "default",
  inputProps = {},
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Shared colour tokens
  const inputBg = useColorModeValue("gray.50", "gray.700");
  const inputBorder = useColorModeValue("gray.200", "gray.600");
  const placeholderColor = useColorModeValue("gray.400", "gray.500");
  const labelColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "gray.800");

  const isAuth = variant === "auth";
  const height = isAuth ? "48px" : undefined;

  const sharedInputStyles = {
    bg: inputBg,
    border: "1px solid",
    borderColor: inputBorder,
    borderRadius: isAuth ? "xl" : "lg",
    fontSize: "sm",
    _hover: { borderColor: "gray.400" },
    _focus: {
      borderColor: "accent.solid",
      boxShadow: "0 0 0 1px var(--chakra-colors-accent-solid)",
      bg: cardBg,
    },
    _placeholder: { color: placeholderColor, fontSize: "sm" },
    ...(height ? { h: height } : {}),
    ...inputProps,
  };

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type === "textarea" || type === "select" ? undefined : type;

  // ── Label ──
  const renderLabel = () => {
    if (!label) return null;
    if (isAuth) {
      return (
        <Text
          fontSize="xs"
          fontWeight="600"
          color={labelColor}
          mb={1.5}
          textTransform="uppercase"
          letterSpacing="0.05em"
        >
          {label}
        </Text>
      );
    }
    return (
      <FormLabel fontSize="sm" fontWeight="600" color={labelColor} mb={1.5}>
        {label}
      </FormLabel>
    );
  };

  // ── Textarea ──
  if (type === "textarea") {
    return (
      <FormControl isRequired={isRequired} isInvalid={!!error} isDisabled={isDisabled}>
        {renderLabel()}
        <Textarea
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows}
          resize="vertical"
          {...sharedInputStyles}
        />
        {error && <FormErrorMessage fontSize="xs">{error}</FormErrorMessage>}
      </FormControl>
    );
  }

  // ── Select ──
  if (type === "select") {
    return (
      <FormControl isRequired={isRequired} isInvalid={!!error} isDisabled={isDisabled}>
        {renderLabel()}
        <Select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...sharedInputStyles}
          opacity={isDisabled ? 0.6 : 1}
        >
          {children}
        </Select>
        {error && <FormErrorMessage fontSize="xs">{error}</FormErrorMessage>}
      </FormControl>
    );
  }

  // ── Input (with optional icon and password toggle) ──
  const needsGroup = icon || isPassword;

  const inputElement = (
    <Input
      type={inputType}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      min={min}
      max={max}
      {...sharedInputStyles}
    />
  );

  return (
    <FormControl isRequired={isRequired} isInvalid={!!error} isDisabled={isDisabled}>
      {renderLabel()}
      {needsGroup ? (
        <InputGroup>
          {icon && (
            <InputLeftElement pointerEvents="none" h={height || "100%"}>
              <Icon as={icon} color={placeholderColor} boxSize={4} />
            </InputLeftElement>
          )}
          {inputElement}
          {isPassword && (
            <InputRightElement h={height || "100%"}>
              <IconButton
                size="sm"
                variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
                icon={showPassword ? <FiEyeOff /> : <FiEye />}
                aria-label={showPassword ? "Hide password" : "Show password"}
                color={placeholderColor}
              />
            </InputRightElement>
          )}
        </InputGroup>
      ) : (
        inputElement
      )}
      {error && <FormErrorMessage fontSize="xs">{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormField;
