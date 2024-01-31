import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useEventListener from "./useEventListener";

describe("useEventListener", () => {
  it("should add event listener to element for specified event type", async () => {
    // Arrange
    const eventType = "click";
    const callback = vi.fn();
    const element = document.createElement("div");

    const user = userEvent.setup();

    renderHook(() => useEventListener(eventType, callback, element));

    // Act
    await user.click(element);

    // Assert
    expect(callback).toHaveBeenCalledOnce();
  });

  it("should not call callback after unmount", async () => {
    // Arrange
    const eventType = "click";
    const callback = vi.fn();
    const element = document.createElement("div");

    const user = userEvent.setup();

    const { unmount } = renderHook(() =>
      useEventListener(eventType, callback, element),
    );

    // Act
    unmount();
    await user.click(element);

    // Assert
    expect(callback).not.toHaveBeenCalled();
  });

  it("should do nothing when element does not exist", async () => {
    // Arrange
    const eventType = "click";
    const callback = vi.fn();
    const element = null;

    const user = userEvent.setup();

    // @ts-expect-error - element is null for testing purposes
    renderHook(() => useEventListener(eventType, callback, element));

    // Act
    // @ts-expect-error - element is null for testing purposes
    await user.click(element);

    // Assert
    expect(callback).not.toHaveBeenCalled();
  });
});
