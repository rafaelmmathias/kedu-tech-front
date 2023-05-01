import { useEffect, useState } from "react";

export const useFilters = <T>(defaultFilters?: T) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [skip, setSkip] = useState(0);
  const [filters, setFilters] = useState<T | undefined>(defaultFilters);

  useEffect(() => {
    setSkip(page > 0 ? page * pageSize - pageSize : 0);
  }, [page, pageSize]);

  const onSubmitFilter = (filters: T) => {
    setPage(1);
    setFilters(filters);
  };

  return {
    page,
    setPage,
    filters,
    onSubmitFilter,
    pageSize,
    setPageSize,
    skip,
  };
};
