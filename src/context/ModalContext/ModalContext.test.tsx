import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ModalContext, ModalContextProvider } from "./ModalContext";
import userEvent from "@testing-library/user-event";

describe("ModalContext", () => {
  it("provides the modal context", () => {
    // Arrange
    let contextValues;

    // Act
    render(
      <ModalContextProvider>
        <ModalContext.Consumer>
          {(context) => {
            contextValues = context;
            return null;
          }}
        </ModalContext.Consumer>
      </ModalContextProvider>,
    );

    // Assert
    expect(contextValues).toHaveProperty("modalID");
    expect(contextValues).toHaveProperty("closeModal");
    expect(contextValues).toHaveProperty("modalData");
    expect(contextValues).toHaveProperty("setModalData");
  });

  it("opens the modal", async () => {
    // Arrange
    render(
      <ModalContextProvider>
        <ModalContext.Consumer>
          {(context) =>
            context && (
              <button
                //@ts-expect-error - The "test" type does not exist on modal data type
                onClick={() => context.setModalData({ type: "test" })}
                data-testid="open-button"
              >
                Open Modal
              </button>
            )
          }
        </ModalContext.Consumer>
      </ModalContextProvider>,
    );

    const user = userEvent.setup();

    const openButton = screen.getByTestId("open-button");
    const modal = screen.getByTestId("modal");

    // Act
    await user.click(openButton);

    // Assert
    expect(modal).toHaveClass("show");
  });

  it("closes the modal", async () => {
    // Arrange
    render(
      <ModalContextProvider>
        <ModalContext.Consumer>
          {(context) =>
            context && (
              <>
                <button
                  //@ts-expect-error - The "test" type does not exist on modal data type
                  onClick={() => context.setModalData({ type: "test" })}
                  data-testid="open-button"
                >
                  Open Modal
                </button>
                <button onClick={context.closeModal} data-testid="close-button">
                  Close Modal
                </button>
              </>
            )
          }
        </ModalContext.Consumer>
      </ModalContextProvider>,
    );

    const user = userEvent.setup();

    const openButton = screen.getByTestId("open-button");
    const closeButton = screen.getByTestId("close-button");
    const modal = screen.getByTestId("modal");

    // Act - open the modal
    await user.click(openButton);

    // Assert - modal is open
    expect(modal).toHaveClass("show");

    // Act - close the modal
    await user.click(closeButton);

    // Assert - modal is closed
    expect(modal).not.toHaveClass("show");
  });

  it("closes the modal on backdrop click", async () => {
    // Arrange
    render(
      <ModalContextProvider>
        <ModalContext.Consumer>
          {(context) =>
            context && (
              <button
                //@ts-expect-error - The "test" type does not exist on modal data type
                onClick={() => context.setModalData({ type: "test" })}
                data-testid="open-button"
              >
                Open Modal
              </button>
            )
          }
        </ModalContext.Consumer>
      </ModalContextProvider>,
    );

    const user = userEvent.setup();

    const openButton = screen.getByTestId("open-button");
    const modal = screen.getByTestId("modal");

    const dialogDimensions = modal.getBoundingClientRect();

    // Act - open the modal
    await user.click(openButton);

    // Assert - modal is open
    expect(modal).toHaveClass("show");

    // Act - close the modal on backdrop click
    await user.pointer({
      target: modal,
      coords: {
        clientX: dialogDimensions.right + 10,
        clientY: dialogDimensions.bottom + 10,
      },
      keys: "[MouseLeft]",
    });

    // Assert - modal is closed
    expect(modal).not.toHaveClass("show");

    // Act - open the modal
    await user.click(openButton);

    // Assert - modal is open
    expect(modal).toHaveClass("show");

    // Act - close the modal on backdrop touch
    await user.pointer({
      target: modal,
      coords: {
        clientX: dialogDimensions.left + 10,
        clientY: dialogDimensions.top + 10,
      },
      keys: "[TouchA>], [/TouchA]",
    });

    // Assert - modal is closed
    expect(modal).not.toHaveClass("show");

    // Act - open the modal
    await user.click(openButton);

    // Assert - modal is open
    expect(modal).toHaveClass("show");

    // Act - close the modal on backdrop click above the dialog
    await user.pointer({
      target: modal,
      coords: {
        clientX: dialogDimensions.left + 10,
        clientY: dialogDimensions.top - 10,
      },
      keys: "[MouseLeft]",
    });

    // Assert - modal is closed
    expect(modal).not.toHaveClass("show");

    // Act - open the modal
    await user.click(openButton);

    // Assert - modal is open
    expect(modal).toHaveClass("show");

    // Act - close the modal on backdrop click below the dialog
    await user.pointer({
      target: modal,
      coords: {
        clientX: dialogDimensions.left + 10,
        clientY: dialogDimensions.bottom + 10,
      },
      keys: "[MouseLeft]",
    });

    // Assert - modal is closed
    expect(modal).not.toHaveClass("show");
  });

  it("closes the modal on escape key press", async () => {
    // Arrange
    render(
      <ModalContextProvider>
        <ModalContext.Consumer>
          {(context) =>
            context && (
              <button
                //@ts-expect-error - The "test" type does not exist on modal data type
                onClick={() => context.setModalData({ type: "test" })}
                data-testid="open-button"
              >
                Open Modal
              </button>
            )
          }
        </ModalContext.Consumer>
      </ModalContextProvider>,
    );

    const user = userEvent.setup();

    const openButton = screen.getByTestId("open-button");
    const modal = screen.getByTestId("modal");

    // Act - open the modal
    await user.click(openButton);

    // Assert - modal is open
    expect(modal).toHaveClass("show");

    // Act - close the modal on escape key press
    fireEvent.keyDown(modal, { key: "Escape", code: "Escape" });

    // Assert - modal is closed
    expect(modal).not.toHaveClass("show");
  });
});
