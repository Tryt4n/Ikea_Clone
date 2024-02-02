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

/**
 * A helper function for testing dates. It compares two dates and checks if they are within a five-second interval of each other.
 * This function is useful because during testing, the times can slightly differ depending on the speed of the tests execution.
 *
 * @param {Date} date1 - The first date to compare.
 * @param {Date} date2 - The second date to compare.
 * @returns {boolean} - Returns true if the dates are within five seconds of each other, otherwise returns false.
 */
export function isSimilarDate(date1: Date, date2: Date): boolean {
  const diff = Math.abs(date1.getTime() - date2.getTime());
  return diff <= 5000; // 5 seconds
}
