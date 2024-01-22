import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import useToast from "./useToast";
import { ToastContextProvider } from "../../context/ToastContext/ToastContext";

describe("useToast", () => {
  it("should throw an error if the hook is used outside of the ToastContextProvider", () => {
    // Arrange
    const errorMessage = "useToast must be used within ToastContextProvider";

    // Act & Assert
    expect(() => renderHook(() => useToast())).toThrow(errorMessage);
  });

  it("useToast returns toast context", () => {
    // Arrange & Act
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastContextProvider,
    });

    // Assert
    expect(result.current).not.toBeNull();
    expect(typeof result.current).toBe("object");
  });
});
