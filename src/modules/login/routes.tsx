import { RouteObject } from 'react-router-dom'
import Login from './screens/login'

export enum loginRoutesEnum {
  LOGIN_URL = '/login',
}

export const loginScreensRoutes: RouteObject[] = [
  {
    path: loginRoutesEnum.LOGIN_URL,
    element: <Login />,
  },
]
