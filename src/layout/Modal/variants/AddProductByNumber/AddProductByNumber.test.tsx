import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import useApp from "../../../../hooks/useApp/useApp";
import AddProductByNumber from "./AddProductByNumber";

vi.mock("../../../../hooks/useApp/useApp");

describe("Modal AdditionalInformations variant", () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      dispatch: dispatch,
    });
  });

  it("should type correct product number into textbox", async () => {
    // Arrange
    const user = userEvent.setup();

    const typedValue = "111.111.11";

    // Act
    render(<AddProductByNumber />);

    const input = screen.getByRole("textbox", { name: /np.: 103.242.78/i });

    // Assert
    expect(input).toHaveValue("");

    // Act - type the input
    await user.type(input, typedValue);

    // Assert - check if the input value is correct
    expect(input).toHaveValue(typedValue);
  });

  it("should type incorrect product number into textbox", async () => {
    // Arrange
    const user = userEvent.setup();

    const typedValue = "ag1gas222";

    // Act
    render(<AddProductByNumber />);

    const input = screen.getByRole("textbox", { name: /np.: 103.242.78/i });

    // Assert
    expect(input).toHaveValue("");

    // Act - type the input
    await user.type(input, typedValue);

    // Assert - check if the input value is correct
    expect(input).not.toHaveValue(typedValue);
    expect(input).toHaveValue("122"); // Expected input value should be 122, because the input value should have the format: 103.242.78 and typed value is "ag1gas222" so all non-numeric characters are removed and after first 3 digits there should be a dot but in this case there is a number 2 so it also should be removed.
  });

  it("should call dispatch action on button click", async () => {
    // Arrange
    const user = userEvent.setup();

    const typedValue = "111.111.11";

    // Act
    render(<AddProductByNumber />);

    const input = screen.getByRole("textbox", { name: /np.: 103.242.78/i });
    const button = screen.getByRole("button", { name: /dodaj do koszyka/i });

    // Act - type the input
    await user.type(input, typedValue);
    // Act - click the button
    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "addProductByNumber",
      payload: typedValue,
    });
  });

  it("should change quantity by 1 on buttons click", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<AddProductByNumber />);

    const input = screen.getByRole("textbox", {
      name: /wpisz liczbę lub zmień jej wartość za pomocą znaku plus i minus/i,
    });
    const plusButton = screen.getByRole("button", {
      name: /naciśnij aby zwiększyć ilość/i,
    });
    const minusButton = screen.getByRole("button", {
      name: /naciśnij aby zmniejszyć ilość/i,
    });

    // Assert
    expect(input).toHaveValue("1");

    // Act - click plus button
    await user.click(plusButton);

    // Assert - check if the input value increased by 1
    expect(input).toHaveValue("2");

    // Act - click minus button
    await user.click(minusButton);

    // Assert - check if the input value decreased by 1
    expect(input).toHaveValue("1");
  });

  it("should not change quantity when input value is 1 and minus button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<AddProductByNumber />);

    const input = screen.getByRole("textbox", {
      name: /wpisz liczbę lub zmień jej wartość za pomocą znaku plus i minus/i,
    });
    const minusButton = screen.getByRole("button", {
      name: /naciśnij aby zmniejszyć ilość/i,
    });

    // Assert
    expect(input).toHaveValue("1");

    // Act
    await user.click(minusButton);

    // Assert - check if the input value is still 1
    expect(input).toHaveValue("1");
  });

  it("should change input quantity value on type", async () => {
    // Arrange
    const user = userEvent.setup();

    const typedValue = "10";

    // Act
    render(<AddProductByNumber />);

    const input = screen.getByRole("textbox", {
      name: /wpisz liczbę lub zmień jej wartość za pomocą znaku plus i minus/i,
    });

    // Assert
    expect(input).toHaveValue("1");

    // Act
    await user.type(input, typedValue);

    // Assert
    expect(input).toHaveValue(typedValue);
  });

  it("should change input value by max value 99", async () => {
    // Arrange
    const user = userEvent.setup();

    const incorrectTypedValue = "999";

    // Act
    render(<AddProductByNumber />);

    const input = screen.getByRole("textbox", {
      name: /wpisz liczbę lub zmień jej wartość za pomocą znaku plus i minus/i,
    });

    // Assert
    expect(input).toHaveValue("1");

    // Act
    await user.type(input, incorrectTypedValue);

    // Assert
    expect(input).not.toHaveValue(incorrectTypedValue);
    expect(input).toHaveValue("99");
  });
});
