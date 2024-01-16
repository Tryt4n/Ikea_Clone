import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useCollection from "./useCollection";

describe("useCollection", () => {
  it("should throw an error if the hook is used outside of the CollectionContextProvider", () => {
    // Arrange
    const errorMessage =
      "useCollection must be used within CollectionContextProvider";

    // Act and Assert
    expect(() => renderHook(() => useCollection())).toThrow(errorMessage);
  });
});
