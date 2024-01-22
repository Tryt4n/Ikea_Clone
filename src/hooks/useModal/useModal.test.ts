import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useModal from "./useModal";

describe("useModal", () => {
  it("should throw an error if the hook is used outside of the ModalContextProvider", () => {
    // Arrange
    const errorMessage = "useModal must be used within ModalContextProvider";

    // Act and Assert
    expect(() => renderHook(() => useModal())).toThrow(errorMessage);
  });
});
