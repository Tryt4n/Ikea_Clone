import * as matchers from "@testing-library/jest-dom/matchers";
import { beforeEach, afterEach, expect, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Add jest-dom's custom assertions.
expect.extend(matchers);

beforeEach(() => {
  // Mock the showModal and close methods of HTMLDialogElement
  window.HTMLDialogElement.prototype.showModal = vi.fn();
  window.HTMLDialogElement.prototype.close = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks(); // Restore all mocks back to their original value.

  cleanup(); // Clean up after each test.
});
