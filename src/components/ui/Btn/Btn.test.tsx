import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import { Btn } from "./Btn";

describe("Btn", () => {
  it("should render a button element with the provided children", () => {
    // Arrange
    const children = "Test Button";

    // Act
    render(<Btn>{children}</Btn>);

    // Assert
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(children);
  });

  it("should render a button element with a children that is not a string", () => {
    // Arrange
    const children = <span>Test Button</span>;

    // Act
    render(<Btn>{children}</Btn>);

    // Assert
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    const spanElement = screen.getByText("Test Button");
    expect(spanElement.tagName).toBe("SPAN");
    expect(button).toContainElement(spanElement);
  });

  it("should apply default values for variant, shape, and size if not provided", () => {
    // Arrange
    const children = "Test Button";

    // Act
    render(<Btn>{children}</Btn>);

    // Assert
    expect(screen.getByRole("button")).toHaveClass("btn--dark");
    expect(screen.getByRole("button")).toHaveClass("btn--oval");
    expect(screen.getByRole("button")).toHaveClass("btn--small");
  });

  it("should apply the provided variant, shape, and size", () => {
    // Arrange
    const children = "Test Button";
    const variant = "light";
    const shape = "circle";
    const size = "big";

    // Act
    render(
      <Btn variant={variant} shape={shape} size={size}>
        {children}
      </Btn>
    );

    // Assert
    expect(screen.getByRole("button")).toHaveClass(`btn--${variant}`);
    expect(screen.getByRole("button")).toHaveClass(`btn--${shape}`);
    expect(screen.getByRole("button")).toHaveClass(`btn--${size}`);
  });

  it("should pass all other provided props to the button element", async () => {
    // Arrange
    const children = "Test Button";
    const id = "some-id";
    const onClick = vi.fn();
    const user = userEvent.setup();

    // Act
    render(
      <Btn id={id} onClick={onClick} disabled={false}>
        {children}
      </Btn>
    );
    await user.click(screen.getByRole("button"));

    // Assert
    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByRole("button")).toHaveAttribute("id", id);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });
});
