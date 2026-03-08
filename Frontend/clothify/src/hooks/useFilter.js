import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const useFilter = (category) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    subcategory: searchParams.getAll("subcategory") || [],
    brand: searchParams.getAll("brand") || [],
    sortOrder: searchParams.get("sortOrder") || "",
    discount: searchParams.get("discount") || "gte0",
    page: parseInt(searchParams.get("page")) || 1,
    limit: 6,
  });

  const setSubcategory = useCallback((value) => {
    setFilters((prev) => ({ ...prev, subcategory: value, page: 1 }));
  }, []);

  const setBrand = useCallback((value) => {
    setFilters((prev) => ({ ...prev, brand: value, page: 1 }));
  }, []);

  const setSortOrder = useCallback((value) => {
    setFilters((prev) => ({ ...prev, sortOrder: value }));
  }, []);

  const setDiscount = useCallback((value) => {
    setFilters((prev) => ({ ...prev, discount: "gte" + value, page: 1 }));
  }, []);

  const setPage = useCallback((value) => {
    setFilters((prev) => ({ ...prev, page: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      subcategory: [],
      brand: [],
      sortOrder: "",
      discount: "gte0",
      page: 1,
      limit: 6,
    });
  }, []);

  // Sync filters to URL search params
  useEffect(() => {
    const params = {};
    if (filters.subcategory.length) params.subcategory = filters.subcategory;
    if (filters.brand.length) params.brand = filters.brand;
    if (filters.sortOrder) {
      params.sortField = "price";
      params.sortOrder = filters.sortOrder;
    }
    if (Number(filters.discount.slice(3))) params.discount = filters.discount;
    params.page = filters.page;
    setSearchParams(params);
  }, [filters, setSearchParams]);

  // Build API params from current filters
  const getApiParams = useCallback(() => {
    return {
      category,
      subcategory: filters.subcategory,
      brand: filters.brand,
      sortField: filters.sortOrder ? "price" : undefined,
      sortOrder: filters.sortOrder || undefined,
      discount: Number(filters.discount.slice(3)) ? filters.discount : undefined,
      page: filters.page,
      limit: filters.limit,
    };
  }, [category, filters]);

  return {
    filters,
    setSubcategory,
    setBrand,
    setSortOrder,
    setDiscount,
    setPage,
    resetFilters,
    getApiParams,
  };
};

export default useFilter;
