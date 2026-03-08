import { Button, Flex, HStack, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [isMounted, setIsMounted] = useState(false);

  // All useColorModeValue calls at top level
  const activeBg = "accent.text";
  const activeColor = useColorModeValue("white", "white");
  const inactiveBg = useColorModeValue("white", "gray.800");
  const inactiveColor = useColorModeValue("gray.600", "gray.300");
  const inactiveBorder = useColorModeValue("gray.200", "gray.600");
  const inactiveHoverBg = useColorModeValue("gray.50", "gray.700");
  const arrowColor = useColorModeValue("gray.600", "gray.300");
  const arrowBorderColor = useColorModeValue("gray.200", "gray.600");
  const arrowBg = useColorModeValue("white", "gray.800");
  const arrowHoverBg = useColorModeValue("gray.50", "gray.700");
  const arrowDisabledColor = useColorModeValue("gray.300", "gray.600");
  const metaColor = useColorModeValue("gray.500", "gray.400");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || totalPages <= 0) return null;

  // Build the list of page buttons to display.
  // Show at most 5 page numbers, centered around the current page.
  const buildPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);

    // Adjust start if we are near the end
    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = buildPageNumbers();
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
      {/* Page meta text */}
      <Text fontSize="sm" color={metaColor} fontWeight="500" flexShrink={0}>
        Page {currentPage} of {totalPages}
      </Text>

      <HStack spacing={1}>
        {/* Previous button */}
        <IconButton
          aria-label="Previous page"
          icon={<FiChevronLeft size={16} />}
          size="sm"
          variant="outline"
          isDisabled={isFirst}
          onClick={() => onPageChange(currentPage - 1)}
          borderRadius="lg"
          bg={arrowBg}
          borderColor={arrowBorderColor}
          color={isFirst ? arrowDisabledColor : arrowColor}
          _hover={{ bg: isFirst ? arrowBg : arrowHoverBg }}
          _disabled={{
            opacity: 0.4,
            cursor: "not-allowed",
          }}
        />

        {/* Page number buttons */}
        {pageNumbers.map((pageNum) => {
          const isActive = pageNum === currentPage;
          return (
            <Button
              key={pageNum}
              size="sm"
              variant={isActive ? "solid" : "outline"}
              onClick={() => !isActive && onPageChange(pageNum)}
              borderRadius="lg"
              minW="36px"
              h="36px"
              fontSize="sm"
              fontWeight={isActive ? "700" : "500"}
              bg={isActive ? activeBg : inactiveBg}
              color={isActive ? activeColor : inactiveColor}
              borderColor={isActive ? activeBg : inactiveBorder}
              _hover={{
                bg: isActive ? activeBg : inactiveHoverBg,
                cursor: isActive ? "default" : "pointer",
              }}
              transition="all 0.15s"
            >
              {pageNum}
            </Button>
          );
        })}

        {/* Next button */}
        <IconButton
          aria-label="Next page"
          icon={<FiChevronRight size={16} />}
          size="sm"
          variant="outline"
          isDisabled={isLast}
          onClick={() => onPageChange(currentPage + 1)}
          borderRadius="lg"
          bg={arrowBg}
          borderColor={arrowBorderColor}
          color={isLast ? arrowDisabledColor : arrowColor}
          _hover={{ bg: isLast ? arrowBg : arrowHoverBg }}
          _disabled={{
            opacity: 0.4,
            cursor: "not-allowed",
          }}
        />
      </HStack>
    </Flex>
  );
};

export default Pagination;
