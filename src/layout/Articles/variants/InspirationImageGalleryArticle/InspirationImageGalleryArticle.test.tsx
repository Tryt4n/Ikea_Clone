import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import InspirationImageGalleryArticle, {
  type InspirationImageGalleryArticleType,
} from "./InspirationImageGalleryArticle";
import { cardCollection } from "../../../../setup-test/test-constants/cardCollection";
import { btnsControlList } from "../../../../constants/btnsControlList";

describe("InspirationImageGalleryArticle", () => {
  it("should render the article header when article data is provided", () => {
    // Arrange
    const header = "article header";

    const articleData: InspirationImageGalleryArticleType = {
      id: "1",
      header: header,
      cards: cardCollection,
    };

    // Act
    render(<InspirationImageGalleryArticle article={articleData} />);

    const article = screen.getByRole("article");
    const articleHeader = screen.getByRole("heading", { name: header });
    const articleButtons = screen.getAllByTestId(
      "inspiration-image-gallery-article-btn",
    );
    const articleImagesGallery = screen.getByTestId("images-gallery");

    // Assert
    expect(article).toBeInTheDocument();

    expect(articleHeader).toBeInTheDocument();

    expect(articleButtons).toHaveLength(btnsControlList.length);
    expect(articleButtons[0]).toHaveAttribute("aria-pressed", "true");
    expect(articleButtons[0]).toBeDisabled();
    for (let i = 1; i < articleButtons.length; i++) {
      expect(articleButtons[i]).toHaveAttribute("aria-pressed", "false");
      expect(articleButtons[i]).toBeEnabled();
    }

    expect(articleImagesGallery).toBeInTheDocument();
  });

  it("should change the pressed button when a button is clicked", async () => {
    // Arrange
    const articleData: InspirationImageGalleryArticleType = {
      id: "1",
      header: "article header",
      cards: cardCollection,
      showProductsOnlyOnHover: true,
    };

    const user = userEvent.setup();

    // Act
    render(<InspirationImageGalleryArticle article={articleData} />);

    const articleButtons = screen.getAllByTestId(
      "inspiration-image-gallery-article-btn",
    );

    // Assert
    expect(articleButtons).toHaveLength(btnsControlList.length);
    expect(articleButtons[0]).toHaveAttribute("aria-pressed", "true");
    expect(articleButtons[0]).toBeDisabled();
    for (let i = 1; i < articleButtons.length; i++) {
      expect(articleButtons[i]).toHaveAttribute("aria-pressed", "false");
      expect(articleButtons[i]).toBeEnabled();
    }

    // Act - click the second button
    await user.click(articleButtons[1]);

    // Assert - check if the second button is pressed and disabled and the rest of the buttons are not pressed and enabled
    expect(articleButtons[1]).toHaveAttribute("aria-pressed", "true");
    expect(articleButtons[1]).toBeDisabled();
    for (let i = 0; i < articleButtons.length; i++) {
      if (i !== 1) {
        expect(articleButtons[i]).toHaveAttribute("aria-pressed", "false");
        expect(articleButtons[i]).toBeEnabled();
      }
    }
  });
});
