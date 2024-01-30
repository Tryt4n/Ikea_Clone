import { render, screen } from "../../../../../setup-test/test-utils";
import { describe, expect, it } from "vitest";
import { InfoMessage } from "./InfoMessage";

describe("ShoppingCart InfoMessage", () => {
  it("should render info message", () => {
    // Arrange
    const container = document.createElement("div");
    container.id = "info-message-container";
    document.body.appendChild(container);

    // Act
    render(<InfoMessage />);

    expect(
      screen.getByText(
        /przejdź dalej, aby sprawdzić dostępność opcji odbioru/i,
      ),
    ).toBeInTheDocument();
  });
});
