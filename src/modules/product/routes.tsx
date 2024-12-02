import { RouteObject } from 'react-router-dom'
import Product from './screens/product'

export enum productRoutesEnum {
  PRODUCT_URL = '/product/:id',
}

export const productScreensRoutes: RouteObject[] = [
  {
    path: productRoutesEnum.PRODUCT_URL,
    element: <Product />,
  },
]
