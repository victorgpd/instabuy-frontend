import axios from 'axios'
import { ProductType } from '../types/ProductType'

export async function fetchProducts(): Promise<ProductType[]> {
  try {
    const response = await axios.get<{ products: ProductType[] }>(
      `http://localhost:3000/api/products/searchall`
    )
    return response.data.products
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }
}

export async function searchProducts(page: number = 1): Promise<ProductType[]> {
  try {
    const response = await axios.get<{ products: ProductType[] }>(
      `http://localhost:3000/api/products/search?page=${page}`
    )
    return response.data.products
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }
}

export async function searchProductsDB(
  product: string,
  page: number = 1
): Promise<ProductType[]> {
  try {
    const response = await axios.get<{ products: ProductType[] }>(
      `http://localhost:3000/api/products/searchdb?search=${product}&page=${page}`
    )
    return response.data.products
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }
}
