import { BASE_URL } from "./base-url";
import { GetProductsConfig, GetProductsResponse } from "./types/products";

export const getProducts = async ({page, limit, searchText, sort}: GetProductsConfig): Promise<GetProductsResponse> => {
  let url: string = '';
  if (searchText) {
    url = `${BASE_URL}/products/search?q=${searchText}&skip=${(page - 1) * limit}&limit=${limit}`;
  } else {
    url = `${BASE_URL}/products?skip=${(page - 1) * limit}&limit=${limit}`;
  }

  if (sort) {
    url += `&sortBy=${sort.key}&order=${sort.type}`
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('خطایی در دریافت اطلاعات محصولات رخ داده است.');
  }
  const data = await response.json();
  return data;
}