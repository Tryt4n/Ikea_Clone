import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import ImagesCardsCollectionSlider, {
  type ImageCardsCollectionSliderType,
} from "./ImagesCardsCollectionSlider";
import { cardCollection } from "../../../../setup-test/test-constants/cardCollection";

describe("ImagesCardsCollectionSlider", () => {
  it("should properly render component", () => {
    // Arrange
    const article: ImageCardsCollectionSliderType = {
      id: "1",
      header: "article header",
      cards: cardCollection,
    };

    // Act
    render(<ImagesCardsCollectionSlider article={article} />);

    const articleHeader = screen.getByRole("heading", { level: 2 });

    // Assert
    expect(articleHeader).toBeInTheDocument();
  });

  it("should properly render component with subheader if passed", () => {
    // Arrange
    const subheader = "article subheader";

    const article: ImageCardsCollectionSliderType = {
      id: "1",
      header: "article header",
      subheader: subheader,
      showProductsOnlyOnHover: true,
      cards: cardCollection,
    };

    // Act
    render(<ImagesCardsCollectionSlider article={article} />);

    const articleSubHeader = screen.getByText(subheader);

    // Assert
    expect(articleSubHeader).toBeInTheDocument();
  });
});
