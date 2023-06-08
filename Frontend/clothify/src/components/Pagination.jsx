import React, { useEffect } from "react";
import { Box, Button, HStack } from "@chakra-ui/react";

// totalPages
const Pagination = ({ currentPage, onPageChange, totalPages }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page) => {
    onPageChange(page);
  };
  return (
    <Box display="flex" justifyContent="center" mt="6" mb={4}>
      <HStack spacing="2">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={isFirstPage}
          borderRadius="full"
          colorScheme="teal"
          animate
          _hover={{
            transform: "scale(1.1)",
          }}
        >
          Prev
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            borderRadius="full"
            colorScheme={page === currentPage ? "teal" : "gray"}
            animate
            _hover={{
              transform: "scale(1.1)",
            }}
          >
            {page}
          </Button>
        ))}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={isLastPage}
          borderRadius="full"
          colorScheme="teal"
          animate
          _hover={{
            transform: "scale(1.1)",
          }}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default Pagination;
