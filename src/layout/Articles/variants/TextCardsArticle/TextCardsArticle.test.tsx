import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import TextCardsArticle, {
  type TextCardsArticleType,
} from "./TextCardsArticle";

describe("TextCardsArticle", () => {
  it("should render an Article component with a CardsContainer component inside", () => {
    // Arrange
    const articleData: TextCardsArticleType = {
      id: "test",
      header: "heading test",
      cards: [],
    };

    // Act
    render(<TextCardsArticle article={articleData} />);
    const articleElement = screen.getByRole("article");
    const cardsContainerElement = screen.getByTestId("cards-container");
    const articleHeader = screen.getByRole("heading");

    // Assert
    expect(articleElement).toBeInTheDocument();
    expect(cardsContainerElement).toBeInTheDocument();
    expect(articleHeader).toBeInTheDocument();
  });

  it("should render a Card component for each card in the article data", () => {
    // Arrange
    const articleData: TextCardsArticleType = {
      id: "test",
      cards: [
        {
          id: "card 1",
          heading: "card heading 1",
          text: "card text 1",
          variant: "violet",
        },
        {
          id: "card 2",
          heading: "card heading 2",
          text: "card text 2",
          variant: "blue",
          link: "https://example.com",
        },
        {
          id: "card 3",
          heading: "card heading 3",
          text: "card text 3",
          variant: "brown",
          as: "section",
        },
        {
          id: "card 4",
          heading: "card heading 4",
          text: "card text 4",
          variant: "orange",
          icon: "<svg></svg>",
        },
      ],
    };

    // Act
    render(<TextCardsArticle article={articleData} />);
    const cardElements = screen.getAllByTestId("card");

    // Assert
    expect(cardElements.length).toBe(articleData.cards.length);

    expect(cardElements[1].querySelector("a")).toBeInTheDocument();

    expect(cardElements[2].tagName).toBe("SECTION");

    expect(cardElements[3].querySelector("svg")).toBeInTheDocument();
  });

  it("should render headers with heading level `3` if article has header", () => {
    // Arrange
    const articleData: TextCardsArticleType = {
      id: "test",
      header: "heading test",
      cards: [
        {
          id: "card 1",
          heading: "card heading 1",
          text: "card text 1",
          variant: "violet",
        },
      ],
    };

    // Act
    render(<TextCardsArticle article={articleData} />);
    const articleElement = screen.getByRole("article");
    const cardsContainerElement = screen.getByTestId("cards-container");
    const articleHeader = screen.getByRole("heading", { level: 2 });
    const cardHeading = screen.getByRole("heading", { level: 3 });

    // Assert
    expect(articleElement).toBeInTheDocument();
    expect(cardsContainerElement).toBeInTheDocument();
    expect(articleHeader).toBeInTheDocument();
    expect(cardHeading).toBeInTheDocument();
  });

  it("should render headers with heading level `2` if article has not header", () => {
    // Arrange
    const articleData: TextCardsArticleType = {
      id: "test",
      cards: [
        {
          id: "card 1",
          heading: "card heading 1",
          text: "card text 1",
          variant: "violet",
        },
      ],
    };

    // Act
    render(<TextCardsArticle article={articleData} />);
    const articleElement = screen.getByRole("article");
    const cardsContainerElement = screen.getByTestId("cards-container");
    const cardHeading = screen.getByRole("heading", { level: 2 });

    // Assert
    expect(articleElement).toBeInTheDocument();
    expect(cardsContainerElement).toBeInTheDocument();
    expect(cardHeading).toBeInTheDocument();
  });
});
