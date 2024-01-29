import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import AdditionalDescriptionInformation from "./AdditionalDescriptionInformation";
import { exampleFetchedProductData } from "../../../../setup-test/test-constants/exampleFetchedProductData";

describe("AdditionalDescriptionInformation", () => {
  it("should render correctly", () => {
    // Act
    render(
      <AdditionalDescriptionInformation
        infoData={exampleFetchedProductData.additionalInfo!}
      />,
    );

    const description = screen.getByTestId("additional-product-description");
    const longDescription = screen.getByTestId(
      "additional-product-description-long",
    );

    // Assert
    expect(description).toBeInTheDocument();
    expect(longDescription).toBeInTheDocument();
  });
});
