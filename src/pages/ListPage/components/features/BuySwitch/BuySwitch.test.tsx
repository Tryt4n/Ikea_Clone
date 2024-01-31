import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import BuySwitch from "./BuySwitch";
import useList from "../../../hooks/useList";

vi.mock("../../../hooks/useList");

describe("BuySwitch", () => {
  const selectedDisplay = "buy-online";
  const setSelectedDisplay = vi.fn();

  beforeEach(() => {
    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedDisplay: selectedDisplay,
      setSelectedDisplay: setSelectedDisplay,
    });
  });

  it("should render a Switch component with two buttons", () => {
    // Act
    render(<BuySwitch />);

    const button1 = screen.getByRole("button", { name: /kup przez internet/i });
    const button2 = screen.getByRole("button", { name: /lista zakupów/i });

    // Assert
    expect(button1).toBeInTheDocument();
    expect(button1).toBeDisabled();
    expect(button2).toBeInTheDocument();
    expect(button2).toBeEnabled();
  });

  it("should switch the selected display when button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<BuySwitch />);

    const button1 = screen.getByRole("button", { name: /kup przez internet/i });
    const button2 = screen.getByRole("button", { name: /lista zakupów/i });

    // Act - click disabled button
    await user.click(button1);

    // Assert - nothing should happen
    expect(setSelectedDisplay).not.toHaveBeenCalled();

    // Act - click active button
    await user.click(button2);

    // Assert - should change display
    expect(button1).toBeDisabled();
    expect(button2).toBeEnabled();
    expect(setSelectedDisplay).toHaveBeenCalledOnce();
    expect(setSelectedDisplay).toHaveBeenCalledWith("shopping-list");
  });

  it(`should select "buy-online" button when is clicked and current display is "shopping-list"`, async () => {
    // Arrange
    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedDisplay: "shopping-list",
      setSelectedDisplay: setSelectedDisplay,
    });

    const user = userEvent.setup();

    // Act
    render(<BuySwitch />);

    const button1 = screen.getByRole("button", { name: /kup przez internet/i });
    const button2 = screen.getByRole("button", { name: /lista zakupów/i });

    // Act - click disabled button
    await user.click(button2);

    // Assert - nothing should happen
    expect(setSelectedDisplay).not.toHaveBeenCalled();

    // Act - click active button
    await user.click(button1);

    // Assert - should change display
    expect(button1).toBeEnabled();
    expect(button2).toBeDisabled();
    expect(setSelectedDisplay).toHaveBeenCalledOnce();
    expect(setSelectedDisplay).toHaveBeenCalledWith("buy-online");
  });
});
