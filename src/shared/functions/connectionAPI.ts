import axios from 'axios'
import { ProductType } from '../types/ProductType'
import { CategoriesType } from '../types/CategoriesType'
import {
  URL_API_CATEGORIES_ALL,
  URL_API_NEW_PRODUCTS,
  URL_API_PRODUCT_SEARCH,
  URL_API_PRODUCTS_ALL,
  URL_API_SUBCATEGORIES_SEARCH,
} from '../constants'
import { SubCategoriesType } from '../types/SubCategoriesType'

export async function fetchProducts(): Promise<ProductType[]> {
  try {
    const response = await axios.get<{ products: ProductType[] }>(
      URL_API_PRODUCTS_ALL
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
      `${URL_API_PRODUCT_SEARCH}${page}`
    )

    return response.data.products
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }
}

export async function searchProductsMlQ(q: string): Promise<ProductType[]> {
  try {
    let products = []
    const response = await axios.get(
      `https://backend-instabuy-7i9x.vercel.app/api/products/searchmlq?q=${q}`
    )

    for (let product of response.data.results) {
      products.push({
        id: product.id,
        name: product.title,
        image: product.thumbnail,
        category: product.category_id,
        linkOriginal: product.permalink,
        linkAffiliate: '',
        store: 'Mercado Livre',
        price: product.price,
        priceOld: product.original_price,
        cupom: '',
      })
    }

    return products
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
      `https://backend-instabuy-7i9x.vercel.app/api/products/searchdb?search=${product}&page=${page}`
    )

    return response.data.products
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }
}

export async function fetchCategories(): Promise<CategoriesType[]> {
  try {
    const response = await axios.get<{ categories: CategoriesType[] }>(
      URL_API_CATEGORIES_ALL
    )

    return response.data.categories
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }
}

export async function fetchSubCategories(): Promise<SubCategoriesType[]> {
  try {
    const response = await axios.get<{ subcategories: SubCategoriesType[] }>(
      URL_API_SUBCATEGORIES_SEARCH
    )

    return response.data.subcategories
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }
}

export async function fetchNewProducts(
  category: string
): Promise<ProductType[]> {
  try {
    let products = []
    const response = await axios.get(URL_API_NEW_PRODUCTS + category)

    for (let product of response.data.results.results) {
      products.push({
        id: product.id,
        name: product.title,
        image: product.thumbnail,
        category: product.category_id,
        linkOriginal: product.permalink,
        linkAffiliate: '',
        store: 'Mercado Livre',
        price: product.price,
        priceOld: product.original_price,
        cupom: '',
      })
    }

    return products
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }
}

export async function fetchDeleteProducts(id: string) {
  try {
    await axios.delete(
      `https://backend-instabuy-7i9x.vercel.app/api/products/${id}`
    )
  } catch (error) {
    console.log(error)
  }
}
