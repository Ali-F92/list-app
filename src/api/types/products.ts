import { BaseApiModel } from "./base-api";
import { SortTableState } from "../../components/Table/Table";

export interface ProductModel {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  discountPercentage: number;
  rating: number;
  returnPolicy: string;
  warrantyInformation: string;
  thumbnail: string;
}

export interface GetProductsResponse extends BaseApiModel {
  products: ProductModel[];
}

export interface GetProductsConfig {
  page: number;
  limit: number;
  searchText: string;
  sort: SortTableState;
}