import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import useAccordion from "../hooks/useAccordion";
import { renderToString } from "react-dom/server";
import AccordionElement from "../AccordionElement/AccordionElement";
import ChevronRightIcon from "../../../../Icons/ChevronRightIcon";
import ChevronRightSmall from "../../../../Icons/ChevronRightSmall";

vi.mock("../hooks/useAccordion");

describe("AccordionElement", () => {
  const openedAccordion = undefined;
  const toggleAccordion = vi.fn();

  beforeEach(() => {
    (useAccordion as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      openedAccordion: openedAccordion,
      toggleAccordion: toggleAccordion,
    });
  });

  it('should render an li element with class "accordion"', () => {
    // Act
    render(
      <AccordionElement label="Test Label" id="test-id">
        Test Content
      </AccordionElement>,
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
      <AccordionElement label="Test Label" id="test-id" className={customClass}>
        Test Content
      </AccordionElement>,
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
      <AccordionElement label="Test Label" id={id}>
        Test Content
      </AccordionElement>,
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
      <AccordionElement label={labelText} id="test-id">
        Test Content
      </AccordionElement>,
    );
    const headingElement = screen.getByRole("heading", { level: 3 });

    // Assert
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(labelText);
  });

  it("should render a svg icon", () => {
    // Act
    render(
      <AccordionElement label="Test Label" id="test-id">
        Test Content
      </AccordionElement>,
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
      <AccordionElement label="Test Label" id="test-id" chevronSmall>
        Test Content
      </AccordionElement>,
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
      <AccordionElement label="Test Label" id="test-id">
        <span>{childrenText}</span>
      </AccordionElement>,
    );
    const spanElement = screen.getByText(childrenText);
    const childrenWrapper = spanElement.parentNode;

    // Assert
    expect(spanElement).toBeInTheDocument();
    expect(childrenWrapper).toBeInTheDocument();
    expect(childrenWrapper).toHaveAttribute("aria-hidden", "true");
  });

  it("should set proper attributes if accordion is closed", () => {
    // Arrange
    const id = "test-id";

    // Act
    render(
      <AccordionElement label="Test Label" id={id}>
        Test Content
      </AccordionElement>,
    );
    const buttonElement = screen.getByRole("button");
    const childrenWrapper = buttonElement.nextElementSibling;

    // Assert
    expect(childrenWrapper).toBeInTheDocument();
    expect(childrenWrapper).toHaveAttribute("aria-hidden", "true");
    expect(buttonElement).toHaveAttribute("aria-expanded", "false");
  });

  it("should set proper attributes if accordion is opened", () => {
    // Arrange
    const id = "test-id";

    (useAccordion as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      openedAccordion: id,
      toggleAccordion: toggleAccordion,
    });

    // Act
    render(
      <AccordionElement label="Test Label" id={id}>
        Test Content
      </AccordionElement>,
    );
    const buttonElement = screen.getByRole("button");
    const childrenWrapper = buttonElement.nextElementSibling;

    // Assert
    expect(childrenWrapper).toBeInTheDocument();
    expect(childrenWrapper).toHaveAttribute("aria-hidden", "false");
    expect(buttonElement).toHaveAttribute("aria-expanded", "true");
  });

  it("should not open the accordion by default if it has already been toggled", () => {
    // Arrange
    const childrenText = "Test Content";
    const id = "test-id";

    // Act
    render(
      <AccordionElement label="Test Label" id={id} defaultOpened>
        <span>{childrenText}</span>
      </AccordionElement>,
    );
    const spanElement = screen.getByText(childrenText);
    const childrenWrapper = spanElement.parentNode;

    // Assert
    expect(childrenWrapper).toBeInTheDocument();
    expect(toggleAccordion).toHaveBeenCalledOnce();
    expect(toggleAccordion).toHaveBeenCalledWith(id);
  });

  it("should toggle the accordion when the button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    const childrenText = "Test Content";
    const id = "test-id";

    // Act
    render(
      <AccordionElement label="Test Label" id={id}>
        <span>{childrenText}</span>
      </AccordionElement>,
    );
    const spanElement = screen.getByText(childrenText);
    const childrenWrapper = spanElement.parentNode;
    const buttonElement = screen.getByRole("button");

    // Act
    await user.click(buttonElement);

    // Assert
    expect(childrenWrapper).toBeInTheDocument();
    expect(toggleAccordion).toHaveBeenCalledOnce();
    expect(toggleAccordion).toHaveBeenCalledWith(id);
  });
});
