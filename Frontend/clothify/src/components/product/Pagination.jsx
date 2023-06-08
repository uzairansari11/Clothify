import { Box, Button, HStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const location = useLocation();
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  useEffect(() => {
    sessionStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const storedCurrentPage = parseInt(sessionStorage.getItem("currentPage"));

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
            bg={
              page === storedCurrentPage
                ? "teal.500"
                : page === currentPage
                ? "teal.500"
                : "transparent"
            }
            color={
              page === storedCurrentPage
                ? "white"
                : page === currentPage
                ? "white"
                : "teal.500"
            }
            animate
            _hover={{
              transform: "scale(1.1)",
              bg: page === currentPage ? "teal.500" : "gray.200",
              color: page === currentPage ? "white" : "teal.500",
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
