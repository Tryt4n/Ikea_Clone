import * as matchers from "@testing-library/jest-dom/matchers";
import { beforeEach, afterEach, expect, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { useInView } from "react-intersection-observer";

// Add jest-dom's custom assertions.
expect.extend(matchers);

// Mock the useInView hook
vi.mock("react-intersection-observer");

beforeEach(() => {
  // Mock the showModal and close methods of HTMLDialogElement
  window.HTMLDialogElement.prototype.showModal = vi.fn();
  window.HTMLDialogElement.prototype.close = vi.fn();

  (useInView as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
    vi.fn(),
    false,
  ]);
});

afterEach(() => {
  vi.restoreAllMocks(); // Restore all mocks back to their original value.

  cleanup(); // Clean up after each test.
});
