import { BaseApiModel } from "./base-api";

export interface ProductModel {
  id: number;
  title: string;
  description: string;
  price: number;
}

export interface GetProductsResponse extends BaseApiModel {
  products: ProductModel[];
}