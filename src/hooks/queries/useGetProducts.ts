import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/products.api";
import { SortTableState } from "../../components/Table/Table";

export const useGetProducts = (page: number, limit: number, searchText: string, sort: SortTableState) => {
  return useSuspenseQuery({
    queryKey: ["products", page, limit, searchText, sort],
    queryFn: () => getProducts(page, limit, searchText, sort),
  });
}