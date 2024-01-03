// Importing React dependencies
// import React from "react";
import ReactDOM from "react-dom/client";

// Importing Router dependencies
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

// Importing Context providers
import { AppContextProvider } from "./context/AppContext";
import { ToastContextProvider } from "./context/ToastContext";
import { ModalContextProvider } from "./context/ModalContext";

// Importing global styles
import "./style.scss";

/**
 * Main entry point of the application
 *
 * This script is responsible for rendering the root component of the React application.
 * It wraps the application with necessary context providers and the router provider.
 *
 * The application is rendered in strict mode, which can highlight potential problems in an application.
 *
 * The root component is rendered into a DOM element with the id of "root".
 */

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <AppContextProvider>
    <ToastContextProvider>
      <ModalContextProvider>
        <RouterProvider router={routes} />
      </ModalContextProvider>
    </ToastContextProvider>
  </AppContextProvider>
  // </React.StrictMode>
);
