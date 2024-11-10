import axios from "axios";
import { ProductType } from "../types/ProductType";

export async function fetchProducts(page: number = 1): Promise<ProductType[]> {
  try {
    const response = await axios.get<{ products: ProductType[] }>(
      `http://localhost:3000/products-db`,
      {
        params: { page },
      }
    );
    return response.data.products;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}
