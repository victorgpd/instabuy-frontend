import { RouteObject } from "react-router-dom";
import SearchPage from "./screens/search";
import PageNotFound from "../pageNotFound/screens/PageNotFound";

export enum searchRoutesEnum {
  SEARCH_URL = "/search",
}

export const searchScreensRoutes: RouteObject[] = [
  {
    path: searchRoutesEnum.SEARCH_URL,
    element: <SearchPage />,
    errorElement: <PageNotFound />,
  },
];
