import { RouteObject } from 'react-router-dom'
import Home from './screens/home'

export enum homeRoutesEnum {
  HOME_URL = '/',
}

export const homeScreensRoutes: RouteObject[] = [
  {
    path: homeRoutesEnum.HOME_URL,
    element: <Home />,
  },
]
