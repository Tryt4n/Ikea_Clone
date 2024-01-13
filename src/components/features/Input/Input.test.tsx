import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

describe("Input", () => {
  it("should render an input element with a label element", () => {
    // Arrange
    const type = "text";
    const label = "Label";

    // Act
    render(<Input type={type} id="input" label={label} />);
    const inputElement = screen.getByRole("textbox");
    const labelElement = screen.getByText(label);

    // Assert
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", type);

    expect(labelElement).toBeInTheDocument();
  });

  it("should render a custom checkbox if the type is checkbox", () => {
    // Arrange
    const type = "checkbox";
    const label = "Label";

    // Act
    render(<Input type={type} id="input" label={label} />);
    const inputElement = screen.getByRole(type);
    const labelElement = screen.getByText(label);
    const customCheckbox = screen.getByRole("presentation", { hidden: true });

    // Assert
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", type);

    expect(labelElement).toBeInTheDocument();

    expect(customCheckbox).toBeInTheDocument();
    expect(customCheckbox).toHaveAttribute("aria-hidden", "true");
  });

  it("should render container with additional class if className prop is provided", () => {
    // Arrange
    const type = "text";
    const additionalClass = "additional-class";

    // Act
    render(
      <Input type={type} id="input" label="Label" className={additionalClass} />
    );
    const inputElement = screen.getByRole("textbox");
    const containerElement = inputElement.parentElement;

    // Assert
    expect(containerElement).toHaveClass(`${type}-input`);
    expect(containerElement).toHaveClass(additionalClass);
  });

  it("should render input with additional props if there are provided", async () => {
    // Arrange
    const user = userEvent.setup();
    const onChangeMock = vi.fn();

    const type = "text";
    const additionalProps = {
      className: "additional-class",
      value: "value",
      onChange: onChangeMock,
    };

    // Act
    render(
      <Input
        type={type}
        id="input"
        label="Label"
        inputProps={additionalProps}
      />
    );
    const inputElement = screen.getByRole("textbox");

    await user.type(inputElement, "some value");

    // Assert
    expect(inputElement).toHaveClass(`${type}-input__input`);
    expect(inputElement).toHaveClass(additionalProps.className);
    expect(inputElement).toHaveAttribute("value", additionalProps.value);
    expect(onChangeMock).toHaveBeenCalled();
  });

  it("should render label with additional props if there are provided", () => {
    // Arrange
    const type = "text";
    const additionalProps = {
      className: "additional-class",
    };

    // Act
    render(
      <Input
        type={type}
        id="input"
        label="Label"
        labelProps={additionalProps}
      />
    );
    const labelElement = screen.getByText("Label");

    // Assert
    expect(labelElement).toHaveClass(`${type}-input__label`);
    expect(labelElement).toHaveClass(additionalProps.className);
  });
});
