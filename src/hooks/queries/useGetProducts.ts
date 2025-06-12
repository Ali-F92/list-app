import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/products.api";
import { SortTableState } from "../../components/Table/Table";
import { GetProductsConfig } from "../../api/types/products";

export const useGetProducts = ({page, limit, searchText, sort}: GetProductsConfig) => {
  return useSuspenseQuery({
    queryKey: ["products", page, limit, searchText, sort],
    queryFn: () => getProducts({ page, limit, searchText, sort }),
    retry: 2
  });
}