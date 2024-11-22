import { RouteObject } from 'react-router-dom'
import SearchPage from './screens/search'

export enum searchRoutesEnum {
  SEARCH_URL = '/search',
}

export const searchScreensRoutes: RouteObject[] = [
  {
    path: searchRoutesEnum.SEARCH_URL,
    element: <SearchPage />,
  },
]
