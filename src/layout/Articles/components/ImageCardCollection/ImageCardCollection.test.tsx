import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import ImageCardCollection, {
  type CardCollectionType,
} from "./ImageCardCollection";
import { exampleProducts } from "../../../../setup-test/test-constants/exampleProducts";
import { cardCollection } from "../../../../setup-test/test-constants/cardCollection";

describe("ImageCardCollection", () => {
  it("should render an image card with associated products", () => {
    // Arrange
    const card: CardCollectionType = {
      ...cardCollection[0],
      products: exampleProducts,
      instagramUser: "test user",
    };

    // Act
    render(<ImageCardCollection card={card} />);

    const imageCardSection = screen.getByTestId("article-section");
    const imageCardWrapper = screen.getByTestId("article-img-container");
    const imageCard = screen.getByRole("img");
    const collectionProductList = screen.getByRole("list");

    // Assert
    expect(imageCardSection).toBeInTheDocument();

    expect(imageCardWrapper).toBeInTheDocument();

    expect(imageCard).toBeInTheDocument();

    if (card.instagramUser) {
      expect(screen.getByText(card.instagramUser)).toBeInTheDocument();
    }

    expect(collectionProductList).toBeInTheDocument();
  });

  it("should open image modal when the card is clicked", async () => {
    // Arrange
    const card: CardCollectionType = {
      ...cardCollection[0],
      products: [{ ...exampleProducts[0] }],
      instagramUser: "test user",
    };

    const user = userEvent.setup();

    // Act
    render(<ImageCardCollection card={card} />);

    const cardElement = screen.getByTestId("article-section");
    const cardModal = screen.getByTestId("modal");

    // Assert
    expect(cardModal).not.toHaveClass("show");

    // Act - open modal
    await user.click(cardElement);

    // Assert - modal is open
    expect(cardModal).toHaveClass("show");
  });

  it("should not open image modal when a list item or button is clicked", async () => {
    // Arrange
    const card: CardCollectionType = {
      ...cardCollection[0],
      products: [{ ...exampleProducts[0] }],
      instagramUser: "test user",
    };

    const user = userEvent.setup();

    // Act
    render(<ImageCardCollection card={card} />);

    const cardElement = screen.getByTestId("article-section");
    const listItem = screen.getByRole("listitem");
    const button = screen.getByRole("button");
    const cardModal = screen.getByTestId("modal");

    // Assert
    expect(cardModal).not.toHaveClass("show");

    // Act - click on list item
    await user.click(listItem);

    // Assert - modal is not open
    expect(cardModal).not.toHaveClass("show");

    // Act - click on button
    await user.click(button);

    // Assert - modal is not open
    expect(cardModal).not.toHaveClass("show");

    // Act - open modal
    await user.click(cardElement);

    // Assert - modal is open
    expect(cardModal).toHaveClass("show");
  });

  it("should not check if the click was on a list item or a button when hideTooltips is true", async () => {
    // Arrange
    const card: CardCollectionType = {
      ...cardCollection[0],
      products: [{ ...exampleProducts[0] }],
      instagramUser: "test user",
    };

    const user = userEvent.setup();

    // Act
    render(<ImageCardCollection card={card} hideTooltips={true} />);

    const cardElement = screen.getByTestId("article-section");
    const cardModal = screen.getByTestId("modal");

    // Assert
    expect(cardModal).not.toHaveClass("show");

    // Act - open modal
    await user.click(cardElement);

    // Assert - modal is open
    expect(cardModal).toHaveClass("show");
  });
});
