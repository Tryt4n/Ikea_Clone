import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../../../setup-test/test-utils";
import { Header } from "./Header";

describe("ProductPage AdditionalInfo Header", () => {
  it("should render a header", () => {
    // Arrange
    const header = "Product Information";

    // Act
    render(<Header title={header} />);

    const headerElement = screen.getByText(header);

    // Assert;
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass("tx-gray");
  });

  it("should render a header with appropriate class if variant is provided", () => {
    // Arrange
    const header = "Product Information";
    const variant = "black";

    // Act
    render(<Header title={header} variant={variant} />);

    // Assert;
    const headerElement = screen.getByText(header);

    // Assert;
    expect(headerElement).toHaveClass(`tx-${variant}`);
  });
});
