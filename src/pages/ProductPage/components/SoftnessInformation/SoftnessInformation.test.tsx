import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import SoftnessInformation from "./SoftnessInformation";

describe("ProductPage SoftnessInformation", () => {
  it("should render a component", () => {
    // Arrange
    const softnessIndex = "średnio twardy";

    // Act
    render(<SoftnessInformation softnessIndex={softnessIndex} />);

    expect(screen.getByText(softnessIndex)).toBeInTheDocument();
  });
});
