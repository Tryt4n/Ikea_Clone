import { Navigate, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";

import ErrorPage from "./pages/tasks/ErrorPage";
import NotFoundPage from "./pages/tasks/NotFoundPage";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";

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
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
