import React, { type ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
// Context providers
import { AppContextProvider } from "../context/AppContext/AppContext";
import { ToastContextProvider } from "../context/ToastContext/ToastContext";
import { ModalContextProvider } from "../context/ModalContext/ModalContext";
import { MemoryRouter } from "react-router-dom";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
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

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
