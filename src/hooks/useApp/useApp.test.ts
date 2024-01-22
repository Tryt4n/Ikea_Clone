import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useApp from "./useApp";

describe("useApp", () => {
  it("should throw an error if the hook is used outside of the AppContextProvider", () => {
    // Arrange
    const errorMessage = "useApp must be used within AppContextProvider";

    // Act and Assert
    expect(() => renderHook(() => useApp())).toThrow(errorMessage);
  });
});
