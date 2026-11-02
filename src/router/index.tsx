import Category from "@/pages/Category";
import Favorites from "@/pages/Favorites";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Layout from "@/components/Layout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "c/:categoryId", element: <Category /> },
      { path: "favorites", element: <Favorites /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;

export const HOME_PATHNAME = "/";
