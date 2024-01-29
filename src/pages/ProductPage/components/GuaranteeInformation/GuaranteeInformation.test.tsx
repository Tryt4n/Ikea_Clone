import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import GuaranteeInformation from "./GuaranteeInformation";

describe("ProductPage GuaranteeInformation", () => {
  it("should render a component", () => {
    // Arrange
    const guarantee = 2;

    // Act
    render(<GuaranteeInformation guarantee={guarantee} />);

    const guaranteeBadge = screen.getByRole("presentation", {
      hidden: true,
    });
    const guaranteeText = screen.getByText(`${guarantee}-letnia gwarancja`);

    // Assert
    expect(guaranteeBadge).toBeInTheDocument();
    expect(guaranteeText).toBeInTheDocument();
  });
});
