// React-Router
import { Navigate, createBrowserRouter } from "react-router-dom";
// Layout
import { RootLayout } from "./layout/RootLayout";
// Pages
import ErrorPage from "./pages/tasks/ErrorPage";
import NotFoundPage from "./pages/tasks/NotFoundPage/NotFoundPage";
import HomePage from "./pages/Home/HomePage";
import CollectionPage from "./pages/Collection/CollectionPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import FavouriteLists from "./pages/FavouriteLists/FavouriteLists";
import ListPage from "./pages/ListPage/ListPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "collection",
            children: [
              { index: true, element: <Navigate to="/" /> },
              {
                path: ":collectionId",
                element: <CollectionPage />,
              },
            ],
          },
          {
            path: "products",
            children: [
              { index: true, element: <Navigate to="/" /> },
              {
                path: ":collection/:product/:type/:productID",
                element: <ProductPage />,
              },
            ],
          },
          {
            path: "shoppingcart",
            children: [
              {
                index: true,
                element: <ShoppingCart />,
              },
              {
                path: "*",
                element: <Navigate to="/shoppingcart" />,
              },
            ],
          },
          {
            path: "favourites",
            children: [
              {
                index: true,
                element: <FavouriteLists />,
              },
              {
                path: ":listId",
                element: <ListPage />,
              },
            ],
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
