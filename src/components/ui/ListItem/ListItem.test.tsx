import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import ListItem from "./ListItem";

describe("ListItem", () => {
  it("should render a list item element with provided content", () => {
    // Arrange
    const content = "Test Content";

    // Act
    render(<ListItem>{content}</ListItem>);

    // Assert
    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.getByText(content).tagName).toBe("A");
  });

  it("should render a list item with additional class if provided", () => {
    // Arrange
    const content = "Test Content";
    const additionalClass = "test-class";

    // Act
    render(<ListItem className={additionalClass}>{content}</ListItem>);

    const listItemElement = screen.getByText(content).parentElement;

    // Assert
    expect(listItemElement).toBeInTheDocument();
    expect(listItemElement).toHaveClass(additionalClass);
  });

  it("should render a link element if 'as' prop is set to 'a'", () => {
    // Arrange
    const content = "Test Content";
    const link = "https://example.com";

    // Act
    render(
      <ListItem as="a" link={link}>
        {content}
      </ListItem>
    );

    // Assert
    expect(screen.getByText(content).tagName).toBe("A");
  });

  it("should render a button element if 'as' prop is set to 'button'", () => {
    // Arrange
    const content = "Test Content";

    // Act
    render(<ListItem as="button">{content}</ListItem>);

    // Assert
    expect(screen.getByText(content).tagName).toBe("BUTTON");
  });

  it("should not render a link element if 'as' prop is not set to 'a'", () => {
    // Arrange
    const content = "Test Content";
    const link = "https://example.com";

    // Act
    render(
      <ListItem as="button" link={link}>
        {content}
      </ListItem>
    );

    // Assert
    expect(screen.getByText(content).tagName).toBe("BUTTON");
    expect(screen.queryByText(content)).not.toHaveAttribute("href");
  });

  it("should call the click handler function when clicked", async () => {
    // Arrange
    const content = "Test Content";
    const clickHandler = vi.fn();

    // Act
    render(
      <ListItem as="button" onClickFunction={clickHandler}>
        {content}
      </ListItem>
    );
    const button = screen.getByRole("button", { name: content });

    await userEvent.click(button);

    // Assert
    expect(clickHandler).toHaveBeenCalled();
  });
});
