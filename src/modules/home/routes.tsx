import { RouteObject } from 'react-router-dom'
import Home from './screens/home'
import PageNotFound from '../pageNotFound/screens/PageNotFound'

export enum homeRoutesEnum {
  HOME_URL = '/',
}

export const homeScreensRoutes: RouteObject[] = [
  {
    path: homeRoutesEnum.HOME_URL,
    element: <Home />,
    errorElement: <PageNotFound />,
  },
]
