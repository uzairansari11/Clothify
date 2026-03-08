import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";

/**
 * SearchInput — debounced search with clear button.
 *
 * Props:
 *  value      — controlled search string
 *  onChange    — (newValue: string) => void  (called immediately for display)
 *  onSearch   — (debouncedValue: string) => void  (called after delay)
 *  delay      — debounce delay in ms (default 500)
 *  placeholder
 *  maxW       — max width (default "320px")
 */
const SearchInput = ({
  value,
  onChange,
  onSearch,
  delay = 500,
  placeholder = "Search...",
  maxW = "320px",
}) => {
  const timeoutRef = useRef(null);

  const iconColor = useColorModeValue("gray.400", "gray.500");
  const inputBg = useColorModeValue("gray.50", "gray.700");
  const inputBorder = useColorModeValue("gray.200", "gray.600");

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onSearch(val);
    }, delay);
  };

  const handleClear = () => {
    onChange("");
    onSearch("");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <InputGroup maxW={maxW} size="sm">
      <InputLeftElement pointerEvents="none">
        <Icon as={FiSearch} color={iconColor} boxSize={3.5} />
      </InputLeftElement>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        bg={inputBg}
        border="1px solid"
        borderColor={inputBorder}
        borderRadius="lg"
        fontSize="sm"
        _focus={{
          borderColor: "accent.solid",
          boxShadow: "0 0 0 1px var(--chakra-colors-accent-solid)",
        }}
      />
      {value && (
        <InputRightElement>
          <IconButton
            aria-label="Clear search"
            icon={<FiX size={12} />}
            size="xs"
            variant="ghost"
            onClick={handleClear}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default SearchInput;
