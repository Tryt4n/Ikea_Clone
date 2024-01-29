import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../../../setup-test/test-utils";
import { DescriptionSection } from "./DescriptionSection";

describe("ProductPage AdditionalInfo DescriptionSection", () => {
  it("should render component with subdescription", () => {
    // Arrange
    const subdescription = "subdescription text";

    const additionalInfo = {
      title: "Additional Information",
      variant: "red",
      header: "Header",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, iusto.",
      subDescription: subdescription,
    };

    // Act
    // @ts-expect-error - data does not have all the required properties for AdditionalInfo type
    render(<DescriptionSection data={additionalInfo} />);

    // Assert
    expect(screen.getByText(subdescription)).toBeInTheDocument();
  });
});
