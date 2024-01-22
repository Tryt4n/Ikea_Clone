import { describe, expect, it, vi } from "vitest";
import { fireEvent, renderHook } from "@testing-library/react";
import useWindowSize from "./useWindowSize";

describe("useWindowSize", () => {
  it("should return an object with width and height properties representing the current window size", () => {
    // Arrange
    const expectedSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Act
    const { result } = renderHook(() => useWindowSize());

    // Assert
    expect(result.current).toEqual(expectedSize);
  });

  it("should listen for the resize event and update the window size whenever the window is resized", () => {
    // Arrange
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");

    // Act
    renderHook(() => useWindowSize());

    // Assert
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });

  it("should update the state with the new window size when the window is resized", () => {
    // Arrange
    window.innerWidth = 1000;
    window.innerHeight = 500;

    const changedWidth = 700;
    const changedHeight = 400;

    // Act
    const { result } = renderHook(() => useWindowSize());

    window.innerWidth = changedWidth;
    window.innerHeight = changedHeight;
    fireEvent.resize(window);

    // Assert
    expect(result.current).toEqual({
      width: changedWidth,
      height: changedHeight,
    });
  });

  it("should remove the resize event listener when the component is unmounted", () => {
    // Arrange
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useWindowSize());

    // Act
    unmount();

    // Assert
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });
});
