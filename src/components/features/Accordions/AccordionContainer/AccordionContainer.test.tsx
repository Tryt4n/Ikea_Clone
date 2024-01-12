import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AccordionContainer from "./AccordionContainer";
import AccordionElement from "../AccordionElement/AccordionElement";

describe("AccordionContainer", () => {
  it('should render a ul element with class "accordions-container"', () => {
    // Act
    render(
      <AccordionContainer>
        <AccordionElement
          id="accordion-id"
          label="accordion-label"
          children="accordion"
        />
      </AccordionContainer>
    );
    const ulElement = screen.getByRole("list");

    // Assert
    expect(ulElement).toBeInTheDocument();
    expect(ulElement).toHaveClass("accordions-container");
  });
});
