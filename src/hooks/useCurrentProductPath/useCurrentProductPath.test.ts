import { describe, expect, it } from "vitest";
import useCurrentProductPath from "./useCurrentProductPath";
import { renderHook } from "@testing-library/react";

describe("useCurrentProductPath", () => {
  it("should return an empty string if the path object is empty", () => {
    // Arrange
    const path = {};

    // Act
    const { result } = renderHook(() => useCurrentProductPath(path));

    // Assert
    expect(result.current).toBe("");
  });

  it("should return the correct product path when given valid parameters", () => {
    // Arrange
    const path = {
      collection: "shoes",
      product: "sneakers",
      type: "men",
      productID: "123",
    };

    // Act
    const { result } = renderHook(() => useCurrentProductPath(path));

    // Assert
    expect(result.current).toBe("/products/shoes/sneakers/men/123");
  });

  it("should return an empty string when given a null parameter", () => {
    // Arrange
    const path = null;

    // Act
    // @ts-expect-error - We're intentionally passing null to test the hook's behavior
    const { result } = renderHook(() => useCurrentProductPath(path));

    // Assert
    expect(result.current).toBe("");
  });

  it("should return an empty string when given a parameter object with empty string values", () => {
    // Arrange
    const path = {
      collection: "",
      product: "",
      type: "",
      productID: "",
    };

    // Act
    const { result } = renderHook(() => useCurrentProductPath(path));

    // Assert
    expect(result.current).toBe("");
  });

  it("should return an empty string when given a parameter object with undefined values", () => {
    // Arrange
    const path = {
      collection: undefined,
      product: undefined,
      type: undefined,
      productID: undefined,
    };

    // Act
    const { result } = renderHook(() => useCurrentProductPath(path));

    // Assert
    expect(result.current).toBe("");
  });
});
