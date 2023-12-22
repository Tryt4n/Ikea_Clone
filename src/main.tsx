// React
// import React from "react";
import ReactDOM from "react-dom/client";
// Router
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
// Context
import { AppContextProvider } from "./context/AppContext";
import { ToastContextProvider } from "./context/ToastContext";
import { ModalContextProvider } from "./context/ModalContext";
// Style
import "./style.scss";

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
