import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import QuantityInput from "./QuantityInput";

describe("QuantityInput", () => {
  it('should render an element with class "quantity-input" and the correct components', () => {
    // Arrange
    const quantity = 1;
    const inputFunction = vi.fn();
    const onChangeFunction = vi.fn();

    // Act
    render(
      <QuantityInput
        quantity={quantity}
        inputFunction={inputFunction}
        onChangeFunction={onChangeFunction}
      />,
    );
    const container = screen.getByTestId("quantity-input");
    const minusBtn = screen.getByRole("button", {
      name: "Naciśnij aby zmniejszyć ilość",
    });
    const plusBtn = screen.getByRole("button", {
      name: "Naciśnij aby zwiększyć ilość",
    });
    const textInput = screen.getByRole("textbox", {
      name: "Wpisz liczbę lub zmień jej wartość za pomocą znaku plus i minus.",
    });

    // Assert
    expect(container).toBeInTheDocument();
    expect(minusBtn).toBeInTheDocument();
    expect(plusBtn).toBeInTheDocument();
    expect(textInput).toBeInTheDocument();
  });

  it("should render a container with additional classes if they are provided or it is small variant", () => {
    // Arrange
    const quantity = 1;
    const inputFunction = vi.fn();
    const onChangeFunction = vi.fn();
    const additionalClasses = "additional-class";

    // Act
    render(
      <QuantityInput
        quantity={quantity}
        inputFunction={inputFunction}
        onChangeFunction={onChangeFunction}
        className={additionalClasses}
        small={true}
      />,
    );
    const container = screen.getByTestId("quantity-input");

    // Assert
    expect(container).toHaveClass(additionalClasses);
    expect(container).toHaveClass("quantity-input--small");
  });

  it("should disable the Btn component for decreasing the quantity when the quantity is 1", () => {
    // Arrange
    const quantity = 1;
    const inputFunction = vi.fn();
    const onChangeFunction = vi.fn();

    // Act
    render(
      <QuantityInput
        quantity={quantity}
        inputFunction={inputFunction}
        onChangeFunction={onChangeFunction}
      />,
    );

    // Assert
    expect(
      screen.getByRole("button", { name: "Naciśnij aby zmniejszyć ilość" }),
    ).toBeDisabled();
  });

  it("should disable the Btn component for increasing the quantity when the quantity is 99", () => {
    // Arrange
    const quantity = 99;
    const inputFunction = vi.fn();
    const onChangeFunction = vi.fn();

    // Act
    render(
      <QuantityInput
        quantity={quantity}
        inputFunction={inputFunction}
        onChangeFunction={onChangeFunction}
      />,
    );

    // Assert
    expect(
      screen.getByRole("button", { name: "Naciśnij aby zwiększyć ilość" }),
    ).toBeDisabled();
  });

  it("should call the inputFunction when the input value changes", async () => {
    // Arrange
    const user = userEvent.setup();
    const quantity = 1;
    const inputFunction = vi.fn();
    const onChangeFunction = vi.fn();

    // Act
    render(
      <QuantityInput
        quantity={quantity}
        inputFunction={inputFunction}
        onChangeFunction={onChangeFunction}
      />,
    );
    const textInput = screen.getByRole("textbox", {
      name: "Wpisz liczbę lub zmień jej wartość za pomocą znaku plus i minus.",
    });
    await user.type(textInput, "2");

    // Assert
    expect(inputFunction).toHaveBeenCalled();
  });

  it("should call the onChangeFunction with 1 when the plus Btn is clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    const quantity = 1;
    const inputFunction = vi.fn();
    const onChangeFunction = vi.fn();

    // Act
    render(
      <QuantityInput
        quantity={quantity}
        inputFunction={inputFunction}
        onChangeFunction={onChangeFunction}
      />,
    );
    const plusBtn = screen.getByRole("button", {
      name: "Naciśnij aby zwiększyć ilość",
    });
    await user.click(plusBtn);

    // Assert
    expect(onChangeFunction).toHaveBeenCalledWith(1);
  });

  it("should call the onChangeFunction with -1 when the minus Btn is clicked and quantity is bigger than 1", async () => {
    // Arrange
    const user = userEvent.setup();
    const quantity = 2;
    const inputFunction = vi.fn();
    const onChangeFunction = vi.fn();

    // Act
    render(
      <QuantityInput
        quantity={quantity}
        inputFunction={inputFunction}
        onChangeFunction={onChangeFunction}
      />,
    );
    const minusBtn = screen.getByRole("button", {
      name: "Naciśnij aby zmniejszyć ilość",
    });
    await user.click(minusBtn);

    // Assert
    expect(onChangeFunction).toHaveBeenCalledWith(-1);
  });

  it("should not call the onChangeFunction when the plus Btn is clicked and quantity is 99", async () => {
    // Arrange
    const user = userEvent.setup();
    const quantity = 99;
    const inputFunction = vi.fn();
    const onChangeFunction = vi.fn();

    // Act
    render(
      <QuantityInput
        quantity={quantity}
        inputFunction={inputFunction}
        onChangeFunction={onChangeFunction}
      />,
    );
    const plusBtn = screen.getByRole("button", {
      name: "Naciśnij aby zwiększyć ilość",
    });
    await user.click(plusBtn);

    // Assert
    expect(onChangeFunction).not.toHaveBeenCalled();
  });

  it("should not call the onChangeFunction when the minus Btn is clicked and quantity is 1", async () => {
    // Arrange
    const user = userEvent.setup();
    const quantity = 1;
    const inputFunction = vi.fn();
    const onChangeFunction = vi.fn();

    // Act
    render(
      <QuantityInput
        quantity={quantity}
        inputFunction={inputFunction}
        onChangeFunction={onChangeFunction}
      />,
    );
    const minusBtn = screen.getByRole("button", {
      name: "Naciśnij aby zmniejszyć ilość",
    });
    await user.click(minusBtn);

    // Assert
    expect(onChangeFunction).not.toHaveBeenCalled();
  });
});
