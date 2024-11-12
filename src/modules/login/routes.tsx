import { RouteObject } from 'react-router-dom'
import Login from './screens/login'

export enum loginRoutesEnum {
  SEARCH_URL = '/login',
}

export const loginScreensRoutes: RouteObject[] = [
  {
    path: loginRoutesEnum.SEARCH_URL,
    element: <Login />,
  },
]
