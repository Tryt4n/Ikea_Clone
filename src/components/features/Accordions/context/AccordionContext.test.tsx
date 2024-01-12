import { describe, it, expect, vi } from "vitest";
import { render, screen, act, renderHook } from "@testing-library/react";
import { AccordionContextProvider } from "./AccordionContext";
import useAccordion from "./useAccordion";

describe("AccordionContext", () => {
  it("should render children inside AccordionContext.Provider", () => {
    // Arrange
    const children = <div>Test Children</div>;

    // Act
    render(<AccordionContextProvider>{children}</AccordionContextProvider>);

    // Assert
    expect(screen.getByText("Test Children")).toBeInTheDocument();
  });

  it("should initialize state for currently opened accordion", () => {
    // Arrange
    const children = <div>Test Children</div>;
    const { result } = renderHook(() => useAccordion(), {
      wrapper: AccordionContextProvider,
    });

    // Act
    render(<AccordionContextProvider>{children}</AccordionContextProvider>);

    // Assert
    expect(result.current.openedAccordion).toBeUndefined();
    expect(result.current.toggleAccordion).toBeInstanceOf(Function);
  });

  it("should open an accordion when toggleAccordion is called with its ID", () => {
    // Arrange
    const children = <div>Test Children</div>;
    const { result } = renderHook(() => useAccordion(), {
      wrapper: AccordionContextProvider,
    });
    result.current.openedAccordion = undefined;
    const spy = vi.spyOn(result.current, "toggleAccordion");

    // Act
    render(<AccordionContextProvider>{children}</AccordionContextProvider>);
    act(() => result.current.toggleAccordion("accordion_1"));

    // Assert
    expect(result.current.openedAccordion).toBe("accordion_1");
    expect(() => result.current.toggleAccordion("accordion_1")).not.toThrow();
    expect(spy).toBeCalledWith("accordion_1");
    expect(spy).toHaveBeenCalledOnce();
  });
});
