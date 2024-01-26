import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import BuySwitch from "./BuySwitch";
import { ListContextProvider } from "../../../context/ListContext";
import type { ReactNode } from "react";

describe("BuySwitch", () => {
  const contextWrapper = (children: ReactNode) => {
    render(<ListContextProvider>{children}</ListContextProvider>);
  };

  it("should render a Switch component with two buttons", () => {
    // Act
    contextWrapper(<BuySwitch />);

    const button1 = screen.getByRole("button", { name: /kup przez internet/i });
    const button2 = screen.getByRole("button", { name: /lista zakupów/i });

    // Assert
    expect(button1).toBeInTheDocument();
    expect(button1).toBeDisabled();
    expect(button2).toBeInTheDocument();
    expect(button2).toBeEnabled();
  });

  it("should switch the selected display when buttons are clicked", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    contextWrapper(<BuySwitch />);

    const button1 = screen.getByRole("button", { name: /kup przez internet/i });
    const button2 = screen.getByRole("button", { name: /lista zakupów/i });

    await user.click(button2);

    // Assert - second button is clicked
    expect(button1).toBeEnabled();
    expect(button2).toBeDisabled();

    // Act - click first button
    await user.click(button1);

    // Assert - first button is clicked
    expect(button1).toBeDisabled();
    expect(button2).toBeEnabled();
  });
});
