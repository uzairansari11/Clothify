import { useQuery } from "@tanstack/react-query";
import API from "../api/axiosInstance";

/**
 * Fetch products from the API with the given filter params.
 * Returns the full data shape: { products, totalCount, page, limit }
 *
 * @param {Object} params
 * @param {string}   params.category
 * @param {string[]} params.subcategory
 * @param {string[]} params.brand
 * @param {string}   params.sortField
 * @param {string}   params.sortOrder
 * @param {string}   params.discount
 * @param {number}   params.page
 * @param {number}   params.limit
 */
const fetchProducts = async (params) => {
  const response = await API.get("/product", { params });
  // response.data.data => { products, totalCount, page, limit }
  return response.data.data;
};

/**
 * Custom hook that fetches a paginated, filtered product list using React Query.
 *
 * @param {Object} params - Filter and pagination parameters
 * @returns {{ products: Array, totalCount: number, isLoading: boolean, isError: boolean }}
 */
const useProducts = (params = {}) => {
  const {
    category,
    subcategory,
    brand,
    sortField,
    sortOrder,
    discount,
    page = 1,
    limit = 6,
  } = params;

  const { data, isLoading, isError, refetch } = useQuery({
    // Include every param in the key so the query refetches whenever any filter changes.
    queryKey: [
      "products",
      { category, subcategory, brand, sortField, sortOrder, discount, page, limit },
    ],
    queryFn: () =>
      fetchProducts({
        category,
        subcategory,
        brand,
        sortField,
        sortOrder,
        discount,
        page,
        limit,
      }),
    // Keep previous data visible while the next page/filter loads.
    placeholderData: (previousData) => previousData,
  });

  return {
    products: data?.products ?? [],
    totalCount: data?.totalCount ?? 0,
    isLoading,
    isError,
    refetch,
  };
};

export default useProducts;
