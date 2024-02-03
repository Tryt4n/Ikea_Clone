import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LocationBtn from "./LocationBtn";

describe("LocationBtn Modal component", () => {
  it("should render component with additional class if provided", () => {
    // Arrange
    const className = "some-class";

    // Act
    render(<LocationBtn className={className} />);

    // Assert
    expect(screen.getByRole("button")).toHaveClass("current-location-btn");
  });
});
