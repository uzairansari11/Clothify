import { Flex, ScaleFade, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);
  const handlePageChange = (e) => {
    const selectedPage = parseInt(e.target.value);
    onPageChange(selectedPage);
  };

  return (
    <Flex justify="center" mt={4}>
      <ScaleFade in={isMounted} initialScale={0.9}>
        <Select
          value={currentPage}
          onChange={handlePageChange}
          width="fit-content"
          fontSize="sm"
          fontWeight="semibold"
          _focus={{ boxShadow: "none" }}
          transition="all 0.3s"
        >
          {pageOptions.map((page) => (
            <option key={page} value={page}>
              Page {page}
            </option>
          ))}
        </Select>
      </ScaleFade>
    </Flex>
  );
};

export default Pagination;
