import { RouteObject } from 'react-router-dom'
import Dashboard from './screens/dashboard'

export enum dashboardRoutesEnum {
  DASHBOARD_URL = '/painel/dashboard',
}

export const dashboardScreensRoutes: RouteObject[] = [
  {
    path: dashboardRoutesEnum.DASHBOARD_URL,
    element: <Dashboard />,
  },
]
