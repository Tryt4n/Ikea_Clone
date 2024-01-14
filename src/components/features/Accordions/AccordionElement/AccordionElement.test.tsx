import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import AccordionContainer, {
  type AccordionContainerPropsType,
} from "../AccordionContainer/AccordionContainer";
import AccordionElement from "../AccordionElement/AccordionElement";
import ChevronRightIcon from "../../../../Icons/ChevronRightIcon";
import ChevronRightSmall from "../../../../Icons/ChevronRightSmall";

describe("AccordionElement", () => {
  const contextWrapper = (
    children: AccordionContainerPropsType["children"],
  ) => <AccordionContainer children={children} />;

  it('should render an li element with class "accordion"', () => {
    // Act
    render(
      contextWrapper(
        <AccordionElement label="Test Label" id="test-id">
          Test Content
        </AccordionElement>,
      ),
    );
    const accordionElement = screen.getByRole("listitem");

    // Assert
    expect(accordionElement).toBeInTheDocument();
    expect(accordionElement).toHaveClass("accordion");
  });

  it("should render a component with the specified additional class", () => {
    // Arrange
    const customClass = "test-class";

    // Act
    render(
      contextWrapper(
        <AccordionElement
          label="Test Label"
          id="test-id"
          className={customClass}
        >
          Test Content
        </AccordionElement>,
      ),
    );
    const accordionElement = screen.getByRole("listitem");

    // Assert
    expect(accordionElement).toBeInTheDocument();
    expect(accordionElement).toHaveClass(customClass);
  });

  it("should render a button with specified attributes", () => {
    // Assert
    const id = "test-id";

    // Act
    render(
      contextWrapper(
        <AccordionElement label="Test Label" id={id}>
          Test Content
        </AccordionElement>,
      ),
    );
    const buttonElement = screen.getByRole("button");

    // Assert
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute(
      "aria-controls",
      `accordion-${id + 1}-content`,
    );
    expect(buttonElement).toHaveAttribute("aria-expanded", "false");
  });

  it("should render a heading with the specified label text", () => {
    // Assert
    const labelText = "Test Label";

    // Act
    render(
      contextWrapper(
        <AccordionElement label={labelText} id="test-id">
          Test Content
        </AccordionElement>,
      ),
    );
    const headingElement = screen.getByRole("heading", { level: 3 });

    // Assert
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(labelText);
  });

  it("should render a svg icon", () => {
    // Act
    render(
      contextWrapper(
        <AccordionElement label="Test Label" id="test-id">
          Test Content
        </AccordionElement>,
      ),
    );
    const iconElement = document.querySelector("svg");
    const iconString = renderToString(<ChevronRightIcon />); // Render ChevronRightIcon to a string

    // Assert
    expect(iconElement).toBeInTheDocument();
    expect(iconElement!.outerHTML).toBe(iconString);
  });

  it("should render a small svg icon when specified", () => {
    // Act
    render(
      contextWrapper(
        <AccordionElement label="Test Label" id="test-id" chevronSmall>
          Test Content
        </AccordionElement>,
      ),
    );
    const iconElement = document.querySelector("svg");
    const iconString = renderToString(<ChevronRightSmall />); // Render ChevronRightSmall to a string

    // Assert
    expect(iconElement).toBeInTheDocument();
    expect(iconElement!.outerHTML).toBe(iconString);
  });

  it("should render a children wrapper with proper aria-hidden attribute", () => {
    // Assert
    const childrenText = "Test Content";

    // Act
    render(
      contextWrapper(
        <AccordionElement label="Test Label" id="test-id">
          <span>{childrenText}</span>
        </AccordionElement>,
      ),
    );
    const spanElement = screen.getByText(childrenText);
    const childrenWrapper = spanElement.parentNode;

    // Assert
    expect(spanElement).toBeInTheDocument();
    expect(childrenWrapper).toBeInTheDocument();
    expect(childrenWrapper).toHaveAttribute("aria-hidden", "true");
  });

  it("should throw an error if useAccordion hook is not used within AccordionContextProvider", () => {
    // Arrange
    const consoleErrorSpy = vi.spyOn(console, "error");
    consoleErrorSpy.mockImplementation(() => {});

    // Act & Assert
    expect(() => {
      render(
        <AccordionElement label="Test Label" id="test-id">
          Test Content
        </AccordionElement>,
      );
    }).toThrowError(
      "useAccordion must be used within AccordionContextProvider",
    );

    consoleErrorSpy.mockRestore();
  });

  it("should not open the accordion by default if it has already been toggled", () => {
    // Arrange
    const childrenText = "Test Content";

    // Act
    render(
      contextWrapper(
        <AccordionElement label="Test Label" id="test-id" defaultOpened>
          <span>{childrenText}</span>
        </AccordionElement>,
      ),
    );
    const spanElement = screen.getByText(childrenText);
    const childrenWrapper = spanElement.parentNode;
    const buttonElement = screen.getByRole("button");

    // Assert
    expect(childrenWrapper).toBeInTheDocument();
    expect(childrenWrapper).toHaveAttribute("aria-hidden", "false");
    expect(buttonElement).toHaveAttribute("aria-expanded", "true");
  });

  it("should toggle the accordion when the button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    const childrenText = "Test Content";

    // Act
    render(
      contextWrapper(
        <AccordionElement label="Test Label" id="test-id">
          <span>{childrenText}</span>
        </AccordionElement>,
      ),
    );
    const spanElement = screen.getByText(childrenText);
    const childrenWrapper = spanElement.parentNode;
    const buttonElement = screen.getByRole("button");

    // Assert
    expect(childrenWrapper).toBeInTheDocument();
    expect(childrenWrapper).toHaveAttribute("aria-hidden", "true");
    expect(buttonElement).toHaveAttribute("aria-expanded", "false");

    // Act
    await user.click(buttonElement);

    // Assert
    expect(childrenWrapper).toBeInTheDocument();
    expect(childrenWrapper).toHaveAttribute("aria-hidden", "false");
    expect(buttonElement).toHaveAttribute("aria-expanded", "true");
  });
});
