import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ToastContext, ToastContextProvider } from "./ToastContext";
import userEvent from "@testing-library/user-event";

describe("ToastContext", () => {
  it("should render children and Toast component", () => {
    // Arrange
    const children = <div>Test Children</div>;

    render(<ToastContextProvider>{children}</ToastContextProvider>);

    // Act & Assert
    expect(screen.getByText("Test Children")).toBeInTheDocument();
    expect(screen.getByTestId("toast-notification")).toBeInTheDocument();
    expect(screen.queryByTestId("toast-notification")).not.toBeVisible();
  });

  it("should open toast notification", async () => {
    // Arrange
    render(
      <ToastContextProvider>
        <ToastContext.Consumer>
          {(context) =>
            context && (
              <button
                onClick={() =>
                  context.setToastData({ open: true, text: "Test toast" })
                }
                data-testid="open-button"
              >
                Open toast
              </button>
            )
          }
        </ToastContext.Consumer>
      </ToastContextProvider>,
    );

    const user = userEvent.setup();

    // Assert
    expect(screen.queryByTestId("toast-notification")).not.toBeVisible();

    // Act
    await user.click(screen.getByTestId("open-button"));

    // Assert
    expect(screen.getByTestId("toast-notification")).toBeVisible();
    expect(screen.getByText("Test toast")).toBeInTheDocument();
  });

  it("should close toast notification if it's open", async () => {
    // Arrange
    render(
      <ToastContextProvider>
        <ToastContext.Consumer>
          {(context) =>
            context && (
              <>
                <button
                  onClick={() =>
                    context.setToastData({ open: true, text: "Test toast" })
                  }
                  data-testid="open-button"
                >
                  Open toast
                </button>
                <button
                  onClick={() => context.closeToast()}
                  data-testid="close-button"
                >
                  Close toast
                </button>
              </>
            )
          }
        </ToastContext.Consumer>
      </ToastContextProvider>,
    );

    const user = userEvent.setup();

    // Assert
    expect(screen.queryByTestId("toast-notification")).not.toBeVisible();

    // Act - open toast
    await user.click(screen.getByTestId("open-button"));

    // Assert - toast is visible
    expect(screen.getByTestId("toast-notification")).toBeVisible();

    // Act - close toast
    await user.click(screen.getByTestId("close-button"));

    // Assert - toast is not visible
    expect(screen.queryByTestId("toast-notification")).not.toBeVisible();
  });
});
