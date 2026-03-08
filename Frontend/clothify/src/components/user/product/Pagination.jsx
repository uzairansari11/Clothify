import { Box, Button, HStack } from "@chakra-ui/react";
import { useEffect } from "react";

const Pagination = ({ currentPage, onPageChange, totalPages, totalCount }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  useEffect(() => {
    sessionStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const storedCurrentPage = parseInt(sessionStorage.getItem("currentPage"));

  const startProductIndex = (currentPage - 1) * 6 + 1;
  const endProductIndex = Math.min(currentPage * 6, totalCount);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt="6"
        mb={4}
      >
        <HStack spacing="2">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={isFirstPage}
            borderRadius="full"
            size="sm"
            _hover={{
              transform: "scale(1.05)",
            }}
          >
            Prev
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              borderRadius="full"
              size="sm"
              variant="ghost"
              bg={
                page === storedCurrentPage
                  ? "accent.solid"
                  : page === currentPage
                  ? "accent.solid"
                  : "transparent"
              }
              color={
                page === storedCurrentPage
                  ? "white"
                  : page === currentPage
                  ? "white"
                  : "accent.solid"
              }
              _hover={{
                transform: "scale(1.05)",
                bg: page === currentPage ? "accent.solid" : "gray.200",
                color: page === currentPage ? "white" : "accent.solid",
              }}
            >
              {page}
            </Button>
          ))}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={isLastPage}
            borderRadius="full"
            size="sm"
            _hover={{
              transform: "scale(1.05)",
            }}
          >
            Next
          </Button>
        </HStack>
      </Box>
      <Box ml="4" fontSize="md" color="gray.500" fontStyle="italic">
        {startProductIndex}-{endProductIndex} of {totalCount}
      </Box>
    </>
  );
};

export default Pagination;
