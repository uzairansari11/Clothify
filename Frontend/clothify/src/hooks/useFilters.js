import { useQuery } from "@tanstack/react-query";
import API from "../api/axiosInstance";

const fetchFilters = async (category) => {
  const response = await API.get("/product/filters", {
    params: category ? { category } : {},
  });
  return response.data.data;
};

/**
 * Fetches subcategories and brands from the backend for a given category.
 * Data is cached for 10 minutes since categories/brands rarely change.
 */
const useFilters = (category) => {
  const { data, isLoading } = useQuery({
    queryKey: ["filters", category],
    queryFn: () => fetchFilters(category),
    staleTime: 10 * 60 * 1000,
  });

  return {
    subcategories: data?.subcategories ?? [],
    brands: data?.brands ?? [],
    isLoading,
  };
};

export default useFilters;
