// Import necessary dependencies from react-router-dom
import { Navigate, createBrowserRouter } from "react-router-dom";
// Import the main layout
import { RootLayout } from "./layout/RootLayout";
// Import pages
import ErrorPage from "./pages/tasks/ErrorPage";
import NotFoundPage from "./pages/tasks/NotFoundPage/NotFoundPage";
import HomePage from "./pages/Home/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import FavouriteLists from "./pages/FavouriteLists/FavouriteLists";
import ListPage from "./pages/ListPage/ListPage";

/**
 * Routes configuration
 *
 * This script defines the routing configuration for the application using react-router-dom.
 *
 * The createBrowserRouter function is used to create a browser router with the specified routes.
 *
 * Each route is an object with a path and an element property.
 * The path property is the URL path for the route.
 * The element property is the React element to render when the route is matched.
 *
 * The children property is an array of nested routes.
 *
 * The index property set to true indicates that the route is the default route for its parent route.
 *
 * The errorElement property is the React element to render when an error occurs.
 *
 * The "*" path is a wildcard path that matches any URL that wasn't matched by any previous routes.
 */

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
