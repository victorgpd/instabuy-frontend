import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import type { Router as RemixRouter } from '@remix-run/router'
import { searchScreensRoutes } from './modules/search/routes'
import { homeScreensRoutes } from './modules/home/routes'
import { insertScreensRoutes } from './modules/painel/product/insertProduct/routes'
import { loginScreensRoutes } from './modules/login/routes'
import { useNotification } from './shared/hooks/useNotification'
import { verifyLoggedIn } from './shared/functions/auth'
import { dashboardScreensRoutes } from './modules/painel/dashboard/routes'

function App() {
  const { contextHolder } = useNotification()

  const routes: RouteObject[] = [
    ...homeScreensRoutes,
    ...searchScreensRoutes,
    ...loginScreensRoutes,
  ]
  const routesLoggedIn: RouteObject[] = [
    ...dashboardScreensRoutes,
    ...insertScreensRoutes,
  ].map((route) => ({
    ...route,
    loader: verifyLoggedIn,
  }))

  const router: RemixRouter = createBrowserRouter([
    ...routes,
    ...routesLoggedIn,
  ])

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  )
}

export default App
