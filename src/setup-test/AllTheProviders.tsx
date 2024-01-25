import { ReactNode } from "react";
// Router dependencies
import { MemoryRouter, RouterProvider } from "react-router-dom";
// Context providers
import { AppContextProvider } from "../context/AppContext/AppContext";
import { ToastContextProvider } from "../context/ToastContext/ToastContext";
import { ModalContextProvider } from "../context/ModalContext/ModalContext";
// routes
import { routes } from "../routes";

export const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ContextProviders>
      <MemoryRouter>{children}</MemoryRouter>
    </ContextProviders>
  );
};

export const AllTheProvidersWithRoutes = () => {
  return (
    <ContextProviders>
      <RouterProvider router={routes} />
    </ContextProviders>
  );
};

const ContextProviders = ({ children }: { children: ReactNode }) => (
  <AppContextProvider>
    <ToastContextProvider>
      <ModalContextProvider>{children}</ModalContextProvider>
    </ToastContextProvider>
  </AppContextProvider>
);
