import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import ImgCardsArticle, { type ImgCardsArticleType } from "./ImgCardsArticle";

describe("ImgCardsArticle", () => {
  it("should properly render component", () => {
    // Arrange
    window.innerWidth = 899;

    const article: ImgCardsArticleType = {
      id: "1",
      header: "article header",
      imgSizes: "500px",
      cards: [
        {
          id: "1",
          link: "/card-1",
          variant: "brown",
          img: {
            imgSrc: "/img/1.jpg",
            imgSrcSet: "/img/1.jpg 1x, /img/2.jpg 2x",
            imgAlt: "img alt",
          },
          heading: "card heading",
          text: "card text",
        },
        {
          id: "2",
          link: "/card-2",
          variant: "blue",
          img: {
            imgSrc: "/img/1.jpg",
            imgSrcSet: "/img/1.jpg 1x, /img/2.jpg 2x",
            imgAlt: "img alt",
          },
          heading: "card heading",
          text: "card text",
          btnVariant: "warn",
        },
      ],
    };

    // Act
    render(<ImgCardsArticle article={article} />);

    const articleHeader = screen.getByRole("heading", {
      name: article.header,
      level: 2,
    });
    const articleCards = screen.getAllByTestId("card");

    // Assert
    expect(articleHeader).toBeInTheDocument();

    expect(articleCards).toHaveLength(article.cards.length);
  });

  it("should add special class for cards container if `breakOnMobile` is true", () => {
    window.innerWidth = 600;

    // Arrange
    const article: ImgCardsArticleType = {
      id: "1",
      header: "article header",
      breakOnMobile: true,
      imgSizes: "500px",
      cards: [
        {
          id: "1",
          link: "/card-1",
          variant: "brown",
          img: {
            imgSrc: "/img/1.jpg",
            imgSrcSet: "/img/1.jpg 1x, /img/2.jpg 2x",
            imgAlt: "img alt",
          },
          heading: "card heading",
          text: "card text",
        },
        {
          id: "2",
          link: "/card-2",
          variant: "blue",
          img: {
            imgSrc: "/img/1.jpg",
            imgSrcSet: "/img/1.jpg 1x, /img/2.jpg 2x",
            imgAlt: "img alt",
          },
          heading: "card heading",
          text: "card text",
          btnVariant: "warn",
        },
      ],
    };

    // Act
    render(<ImgCardsArticle article={article} />);

    const cardsContainer = screen.getByTestId("cards-container");

    // Assert
    expect(cardsContainer).toHaveClass("breakOnMobile");
  });
});
