import React from "react";
// Context providers
import { AppContextProvider } from "../context/AppContext/AppContext";
import { ToastContextProvider } from "../context/ToastContext/ToastContext";
import { ModalContextProvider } from "../context/ModalContext/ModalContext";
import { MemoryRouter } from "react-router-dom";

export const AllTheProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AppContextProvider>
      <ToastContextProvider>
        <ModalContextProvider>
          <MemoryRouter>{children}</MemoryRouter>
        </ModalContextProvider>
      </ToastContextProvider>
    </AppContextProvider>
  );
};
