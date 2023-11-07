// React
import React from "react";
import ReactDOM from "react-dom/client";
// Router
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
// Context
import { ModalContextProvider } from "./context/ModalContext";
import { ImgModalContextProvider } from "./context/ImgModalContext";
// Style
import "./style.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ImgModalContextProvider>
      <ModalContextProvider>
        <RouterProvider router={routes} />
      </ModalContextProvider>
    </ImgModalContextProvider>
  </React.StrictMode>
);
