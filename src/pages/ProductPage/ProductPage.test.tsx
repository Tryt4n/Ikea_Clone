import { describe, expect, it } from "vitest";
import { render, screen } from "../../setup-test/test-utils";
import ProductPage from "./ProductPage";

describe("ProductPage", () => {
  it("should render a component with loading state at the beginning", () => {
    // Act
    render(<ProductPage />);

    // Assert
    expect(
      screen.getByRole("heading", {
        name: /ładowanie strony/i,
        level: 2,
        hidden: true,
      }),
    ).toBeInTheDocument();
  });
});
