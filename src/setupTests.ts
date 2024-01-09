import * as matchers from "@testing-library/jest-dom/matchers";
import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";

// Add jest-dom's custom assertions.
expect.extend(matchers);

// Clean up after each test.
afterEach(() => {
  cleanup();
});
