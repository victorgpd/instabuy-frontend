import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { Router as RemixRouter } from "@remix-run/router";
import { searchScreensRoutes } from "./modules/search/routes";

const router: RemixRouter = createBrowserRouter([...searchScreensRoutes]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
