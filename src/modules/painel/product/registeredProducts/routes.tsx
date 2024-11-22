import { RouteObject } from 'react-router-dom'
import RegisteredProducts from './screens/registeredProducts'

export enum registeredProductsRoutesEnum {
  REGISTERED_PRODUCT_URL = '/painel/produtos/cadastrados',
}

export const registeredProductsScreensRoutes: RouteObject[] = [
  {
    path: registeredProductsRoutesEnum.REGISTERED_PRODUCT_URL,
    element: <RegisteredProducts />,
  },
]
