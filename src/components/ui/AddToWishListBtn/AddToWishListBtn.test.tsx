import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import AddToWishListBtn from "./AddToWishListBtn";

describe("AddToWishListBtn", () => {
  it("should render correctly", () => {
    // Arrange
    render(<AddToWishListBtn />);
    const button = screen.getByRole("button");

    // Assert
    expect(button).toBeInTheDocument();
  });

  it('should render a Btn component with a "circle" shape', () => {
    // Arrange
    render(<AddToWishListBtn />);

    // Assert
    expect(screen.getByRole("button")).toHaveClass("btn--circle");
  });

  it('should render a visually hidden "Dodaj do ulubionych" label', () => {
    // Arrange
    render(<AddToWishListBtn />);

    // Assert
    expect(screen.getByText("Dodaj do ulubionych")).toHaveClass(
      "visually-hidden"
    );
  });

  it("should render a HeartIcon component with no active state specified", () => {
    // Arrange
    render(<AddToWishListBtn />);
    const svg = document.querySelector("svg");

    // Assert
    expect(svg?.children[0]).toHaveClass("heart-icon");
    expect(svg?.children[0]).toHaveAttribute("stroke", "#111");
    expect(svg?.children[0]).toHaveAttribute("fill", "transparent");
    expect(svg?.children[0]).toHaveAttribute("stroke-width", "2");
  });

  it("should render a HeartIcon component with the specified active state", () => {
    // Arrange
    render(<AddToWishListBtn active={true} />);
    const svg = document.querySelector("svg");

    // Assert
    expect(svg).toBeInTheDocument();
    expect(svg?.children[0]).toHaveClass("heart-icon");
    expect(svg?.children[0]).toHaveAttribute("stroke", "#111");
    expect(svg?.children[0]).toHaveAttribute("fill", "#111");
    expect(svg?.children[0]).toHaveAttribute("stroke-width", "0");
  });
});
