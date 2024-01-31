import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import useAccordion from "./useAccordion";
import { AccordionContextProvider } from "../context/AccordionContext";

describe("useAccordion", () => {
  it("should throw an error if the hook is used outside of the AccordionContextProvider", () => {
    // Arrange
    const errorMessage =
      "useAccordion must be used within AccordionContextProvider";

    // Act & Assert
    expect(() => renderHook(() => useAccordion())).toThrow(errorMessage);
  });

  it("useAccordion returns toast context", () => {
    // Arrange & Act
    const { result } = renderHook(() => useAccordion(), {
      wrapper: AccordionContextProvider,
    });

    // Assert
    expect(result.current).not.toBeNull();
    expect(typeof result.current).toBe("object");
  });
});
