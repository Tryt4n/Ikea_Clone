import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import { FooterAccordions } from "./FooterAccordions";
import { footerLists } from "../../../../constants/footerLists";

describe("FooterAccordions", () => {
  it("should render a component with lists", () => {
    // Arrange
    window.innerWidth = 900;

    // Act
    render(<FooterAccordions />);

    const footerList = screen.getByTestId("footer-lists-wrapper");

    // Assert
    expect(footerList).toBeInTheDocument();
  });

  it("should render a component with accordions", () => {
    // Arrange
    window.innerWidth = 899;

    // Act
    render(<FooterAccordions />);

    const accordionsList = screen.getByRole("list");
    const accordionButtons = screen.getAllByRole("button");
    const accordionHiddenContents = screen.getAllByRole("region", {
      hidden: true,
    });

    // Assert
    expect(accordionsList).toBeInTheDocument();
    expect(accordionsList.children).toHaveLength(footerLists.length);

    accordionButtons.forEach((button, index) => {
      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(button).toHaveAttribute(
        "aria-controls",
        `accordion-${index}1-content`,
      );
    });

    accordionHiddenContents.forEach((content, index) => {
      expect(content).toHaveAttribute("id", `accordion-${index}1-content`);
      expect(content).toHaveAttribute("aria-hidden", "true");

      const contentLinks = content.querySelectorAll("a");
      contentLinks.forEach((link) => {
        expect(link).toHaveAttribute("tabindex", "-1");
      });
    });
  });

  it("should properly open accordions", async () => {
    // Arrange
    window.innerWidth = 899;
    const user = userEvent.setup();

    // Act
    render(<FooterAccordions />);

    const accordionButtons = screen.getAllByRole("button");
    const accordionHiddenContents = screen.getAllByRole("region", {
      hidden: true,
    });

    // Assert
    accordionButtons.forEach((button, index) => {
      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(button).toHaveAttribute(
        "aria-controls",
        `accordion-${index}1-content`,
      );
    });

    accordionHiddenContents.forEach((content, index) => {
      expect(content).toHaveAttribute("id", `accordion-${index}1-content`);
      expect(content).toHaveAttribute("aria-hidden", "true");

      const contentLinks = content.querySelectorAll("a");
      contentLinks.forEach((link) => {
        expect(link).toHaveAttribute("tabindex", "-1");
      });
    });

    // Act - open first accordion
    await user.click(accordionButtons[0]);

    // Assert - first accordion is open
    expect(accordionButtons[0]).toHaveAttribute("aria-expanded", "true");
    expect(accordionHiddenContents[0]).toHaveAttribute("aria-hidden", "false");
    accordionHiddenContents[0].querySelectorAll("a").forEach((link) => {
      expect(link).toHaveAttribute("tabindex", "0");
    });

    accordionHiddenContents.forEach((content, index) => {
      if (index !== 0) {
        expect(content).toHaveAttribute("id", `accordion-${index}1-content`);
        expect(content).toHaveAttribute("aria-hidden", "true");

        const contentLinks = content.querySelectorAll("a");
        contentLinks.forEach((link) => {
          expect(link).toHaveAttribute("tabindex", "-1");
        });
      }
    });

    // Act - open second accordion
    await user.click(accordionButtons[1]);

    // Assert - second accordion is open
    expect(accordionButtons[1]).toHaveAttribute("aria-expanded", "true");
    expect(accordionHiddenContents[1]).toHaveAttribute("aria-hidden", "false");
    accordionHiddenContents[1].querySelectorAll("a").forEach((link) => {
      expect(link).toHaveAttribute("tabindex", "0");
    });

    accordionHiddenContents.forEach((content, index) => {
      if (index !== 1) {
        expect(content).toHaveAttribute("id", `accordion-${index}1-content`);
        expect(content).toHaveAttribute("aria-hidden", "true");

        const contentLinks = content.querySelectorAll("a");
        contentLinks.forEach((link) => {
          expect(link).toHaveAttribute("tabindex", "-1");
        });
      }
    });
  });
});
