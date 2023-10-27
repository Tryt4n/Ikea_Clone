import React from "react";
// React-Router
import { Navigate, createBrowserRouter } from "react-router-dom";
// Layout
import { RootLayout } from "./layout/RootLayout";
// Pages
import ErrorPage from "./pages/tasks/ErrorPage";
import NotFoundPage from "./pages/tasks/NotFoundPage/NotFoundPage";
import HomePage from "./pages/Home/HomePage";
import CollectionPage from "./pages/Collection/CollectionPage";
// Context
import { ModalContextProvider } from "./context/ModalContext";

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
            // element: <HomePage />,
            element: (
              <ModalContextProvider>
                <HomePage />
              </ModalContextProvider>
            ),
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
