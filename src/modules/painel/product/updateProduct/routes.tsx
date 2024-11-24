import { RouteObject } from 'react-router-dom'
import UpdateProductScreen from './screens/updateProduct'

export enum updateRoutesEnum {
  UPDATE_URL = '/painel/produtos/editar',
}

export const updateScreensRoutes: RouteObject[] = [
  {
    path: updateRoutesEnum.UPDATE_URL,
    element: <UpdateProductScreen />,
  },
]
