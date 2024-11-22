import { RouteObject } from 'react-router-dom'
import InsertProductScreen from './screens/insertProduct'

export enum insertRoutesEnum {
  INSERT_URL = '/painel/produtos/cadastrar',
}

export const insertScreensRoutes: RouteObject[] = [
  {
    path: insertRoutesEnum.INSERT_URL,
    element: <InsertProductScreen />,
  },
]
