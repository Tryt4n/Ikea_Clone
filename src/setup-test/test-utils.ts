import type { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
// Context providers
import { AllTheProviders, AllTheProvidersWithRoutes } from "./AllTheProviders";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Render with routes because <ScrollRestoration /> component from `react-router-dom` cannot be used outside a <Router /> component so wrapping in <MemoryRouter> would not work
const renderWithRoutes = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProvidersWithRoutes, ...options });

export * from "@testing-library/react";
export { customRender as render, renderWithRoutes };

export function areDatesEqual(date1: Date, date2: Date): boolean {
  return date1.toISOString().slice(0, 19) === date2.toISOString().slice(0, 19);
}
