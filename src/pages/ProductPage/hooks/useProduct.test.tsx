import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import useProduct from "./useProduct";
import { ProductProvider } from "../context/ProductContext";

describe("useProduct", () => {
  it("should throw an error if the hook is used outside of the ProductProvider", () => {
    // Arrange
    const errorMessage = "useProduct must be used within ProductProvider";

    // Act & Assert
    expect(() => renderHook(() => useProduct())).toThrow(errorMessage);
  });

  it("useProduct returns toast context", () => {
    // Arrange & Act
    const { result } = renderHook(() => useProduct(), {
      wrapper: ProductProvider,
    });

    // Assert
    expect(result.current).not.toBeNull();
    expect(typeof result.current).toBe("object");
  });
});
