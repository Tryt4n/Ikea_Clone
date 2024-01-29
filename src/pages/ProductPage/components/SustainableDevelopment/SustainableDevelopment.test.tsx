import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import SustainableDevelopment from "./SustainableDevelopment";
import { useInView } from "react-intersection-observer";

describe("ProductPage SustainableDevelopment", () => {
  it("should render a component", () => {
    // Act
    render(<SustainableDevelopment />);

    const container = screen.getByTestId("product-page-sustainability");

    // Assert
    expect(container).not.toHaveClass("sustainability--inView");
  });

  it("should add class if component is in view", () => {
    (useInView as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      vi.fn(),
      true,
    ]);

    // Act
    render(<SustainableDevelopment />);

    const container = screen.getByTestId("product-page-sustainability");

    // Assert
    expect(container).toHaveClass("sustainability--inView");
  });
});
