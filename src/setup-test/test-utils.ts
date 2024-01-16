import type { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
// Context providers
import { AllTheProviders } from "./AllTheProviders";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
