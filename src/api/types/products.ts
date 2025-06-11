import { BaseApiModel } from "./base-api";

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