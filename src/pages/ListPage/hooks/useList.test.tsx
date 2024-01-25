import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import useList from "./useList";
import { ListContextProvider } from "../context/ListContext";

describe("useList", () => {
  it("should throw an error if the hook is used outside of the ListContextProvider", () => {
    // Arrange
    const errorMessage = "useList must be used within ListContextProvider";

    // Act and Assert
    expect(() => renderHook(() => useList())).toThrow(errorMessage);
  });

  it("useList returns list context", () => {
    // Arrange & Act
    const { result } = renderHook(() => useList(), {
      wrapper: ListContextProvider,
    });

    // Assert
    expect(result.current).not.toBeNull();
    expect(typeof result.current).toBe("object");
  });
});
