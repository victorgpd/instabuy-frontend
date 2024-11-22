import { RouteObject } from 'react-router-dom'
import SearchNewProduct from './screen/searchNewProduct'

export enum searchNewProductRoutesEnum {
  SEARCH_NEW_PRODUCT_URL = '/painel/produtos/search',
}

export const searchNewProductsScreensRoutes: RouteObject[] = [
  {
    path: searchNewProductRoutesEnum.SEARCH_NEW_PRODUCT_URL,
    element: <SearchNewProduct />,
  },
]
