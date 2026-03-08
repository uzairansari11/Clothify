import { Box, Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

/**
 * Builds the page-number sequence to render, inserting null as an ellipsis
 * sentinel. Always shows: first, last, and up to `siblings` pages on each
 * side of the current page — with ellipsis gaps in between.
 *
 * Examples (siblings = 1):
 *   totalPages=5, current=3  →  [1, 2, 3, 4, 5]
 *   totalPages=14, current=1 →  [1, 2, 3, null, 14]
 *   totalPages=14, current=7 →  [1, null, 6, 7, 8, null, 14]
 *   totalPages=14, current=14→  [1, null, 12, 13, 14]
 */
function buildPageRange(currentPage, totalPages, siblings = 1) {
  // If the total is small enough to fit without any ellipsis, show everything.
  // Max visible slots: first + siblings*2 + current + 2 ellipses + last = 7
  const maxVisible = siblings * 2 + 5;
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingStart = Math.max(currentPage - siblings, 2);
  const rightSiblingEnd   = Math.min(currentPage + siblings, totalPages - 1);

  const showLeftEllipsis  = leftSiblingStart > 2;
  const showRightEllipsis = rightSiblingEnd  < totalPages - 1;

  const pages = [1];

  if (showLeftEllipsis) {
    pages.push(null); // left ellipsis
  } else {
    // No ellipsis on left — fill the gap between 1 and leftSiblingStart
    for (let p = 2; p < leftSiblingStart; p++) pages.push(p);
  }

  for (let p = leftSiblingStart; p <= rightSiblingEnd; p++) pages.push(p);

  if (showRightEllipsis) {
    pages.push(null); // right ellipsis
  } else {
    // No ellipsis on right — fill the gap between rightSiblingEnd and last
    for (let p = rightSiblingEnd + 1; p < totalPages; p++) pages.push(p);
  }

  pages.push(totalPages);
  return pages;
}

const PRODUCTS_PER_PAGE = 6;

const Pagination = ({ currentPage, onPageChange, totalPages, totalCount }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage  = currentPage === totalPages;

  // Persist current page across navigations
  useEffect(() => {
    sessionStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  // Range indicator text
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE + 1;
  const endIndex   = Math.min(currentPage * PRODUCTS_PER_PAGE, totalCount);

  // Build the page sequence (memoised — only recomputes when page/total changes)
  const pages = useMemo(
    () => buildPageRange(currentPage, totalPages),
    [currentPage, totalPages]
  );

  // ── Design tokens (light / dark) ──────────────────────────────────────────
  const containerBg    = useColorModeValue("white",     "gray.800");
  const borderColor    = useColorModeValue("gray.200",  "gray.700");
  const mutedText      = useColorModeValue("gray.500",  "gray.400");
  const ellipsisColor  = useColorModeValue("gray.400",  "gray.500");

  // Nav button (Prev / Next)
  const navBg          = useColorModeValue("gray.100",  "gray.700");
  const navHoverBg     = useColorModeValue("accent.bg", "gray.600");
  const navColor       = useColorModeValue("gray.600",  "gray.300");
  const navDisabledBg  = useColorModeValue("gray.50",   "gray.800");
  const navDisabledClr = useColorModeValue("gray.300",  "gray.600");

  // Inactive page button
  const pageBg         = useColorModeValue("transparent", "transparent");
  const pageHoverBg    = useColorModeValue("accent.bg",   "gray.700");
  const pageColor      = useColorModeValue("gray.700",    "gray.200");
  const pageHoverColor = "accent.text";

  // Active page button
  const activeBg       = "accent.solid";
  const activeColor    = "white";
  // ─────────────────────────────────────────────────────────────────────────

  if (!totalPages || totalPages < 1) return null;

  return (
    <Flex
      direction="column"
      align="center"
      gap={3}
      mt={8}
      mb={4}
    >
      {/* ── Main pagination row ── */}
      <Flex
        align="center"
        gap={{ base: 1, md: 1.5 }}
        bg={containerBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="lg"
        px={{ base: 2, md: 3 }}
        py={2}
        boxShadow="sm"
      >
        {/* Previous button */}
        <IconButton
          aria-label="Previous page"
          icon={<FiChevronLeft size={16} />}
          size="sm"
          variant="unstyled"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="32px"
          h="32px"
          minW="32px"
          borderRadius="md"
          bg={isFirstPage ? navDisabledBg : navBg}
          color={isFirstPage ? navDisabledClr : navColor}
          isDisabled={isFirstPage}
          onClick={() => onPageChange(currentPage - 1)}
          transition="background 0.18s ease, color 0.18s ease"
          _hover={
            isFirstPage
              ? {}
              : { bg: navHoverBg, color: "accent.text" }
          }
          _disabled={{ cursor: "not-allowed", opacity: 1 }}
        />

        {/* Page number buttons */}
        {pages.map((page, index) => {
          // Ellipsis slot
          if (page === null) {
            return (
              <Flex
                key={`ellipsis-${index}`}
                w="32px"
                h="32px"
                align="center"
                justify="center"
                flexShrink={0}
              >
                <Text
                  fontSize="sm"
                  fontWeight="500"
                  color={ellipsisColor}
                  letterSpacing="0.05em"
                  lineHeight="1"
                  userSelect="none"
                >
                  &hellip;
                </Text>
              </Flex>
            );
          }

          const isActive = page === currentPage;

          return (
            <Box
              key={page}
              as="button"
              w="32px"
              h="32px"
              minW="32px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="md"
              fontSize="sm"
              fontWeight={isActive ? "700" : "400"}
              bg={isActive ? activeBg : pageBg}
              color={isActive ? activeColor : pageColor}
              onClick={() => !isActive && onPageChange(page)}
              cursor={isActive ? "default" : "pointer"}
              transition="background 0.18s ease, color 0.18s ease, transform 0.12s ease"
              flexShrink={0}
              userSelect="none"
              _hover={
                isActive
                  ? {}
                  : {
                      bg: pageHoverBg,
                      color: pageHoverColor,
                      transform: "translateY(-1px)",
                    }
              }
              _active={isActive ? {} : { transform: "scale(0.95)" }}
              aria-label={`Page ${page}`}
              aria-current={isActive ? "page" : undefined}
            >
              {page}
            </Box>
          );
        })}

        {/* Next button */}
        <IconButton
          aria-label="Next page"
          icon={<FiChevronRight size={16} />}
          size="sm"
          variant="unstyled"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="32px"
          h="32px"
          minW="32px"
          borderRadius="md"
          bg={isLastPage ? navDisabledBg : navBg}
          color={isLastPage ? navDisabledClr : navColor}
          isDisabled={isLastPage}
          onClick={() => onPageChange(currentPage + 1)}
          transition="background 0.18s ease, color 0.18s ease"
          _hover={
            isLastPage
              ? {}
              : { bg: navHoverBg, color: "accent.text" }
          }
          _disabled={{ cursor: "not-allowed", opacity: 1 }}
        />
      </Flex>

      {/* ── Range info line ── */}
      {totalCount > 0 && (
        <Text
          fontSize="xs"
          color={mutedText}
          letterSpacing="0.02em"
          lineHeight="1"
          userSelect="none"
        >
          {startIndex}&ndash;{endIndex} of {totalCount} products
        </Text>
      )}
    </Flex>
  );
};

export default Pagination;
