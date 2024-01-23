import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import MainArticle, { type MainArticleType } from "./MainArticle";
import { exampleProducts } from "../../../../setup-test/test-constants/exampleProducts";

describe("MainArticle", () => {
  it("should render an article with all required elements", () => {
    // Arrange
    const article: MainArticleType = {
      id: "1",
      header: "Header",
      btn: {
        text: "Button",
        variant: "dark",
        link: "/button-link",
      },
      imgSrc: "image.jpg",
      imgSrcSet: "image.jpg 1x, image@2x.jpg 2x",
      imgSizes: "(max-width: 600px) 100vw, 50vw",
      imgAlt: "Image",
    };

    // Act
    render(<MainArticle article={article} />);

    const articleHeader = screen.getByRole("heading", { name: /header/i });
    const articleWrapper = screen.getByTestId(
      "article-img-container",
    ).parentElement;
    const articleImg = screen.getByRole("img");
    const articleButton = screen.getByRole("link", { name: /button/i });

    // Assert
    expect(articleHeader).toBeInTheDocument();

    expect(articleWrapper).not.toHaveClass("col-reverse");

    expect(articleImg).toBeInTheDocument();
    expect(articleImg).toHaveClass("aspect-ratio-16-9");
    expect(articleImg).toHaveClass("mobile-aspect-ratio-16-9");

    expect(articleButton).toBeInTheDocument();
    expect(articleButton).toHaveAttribute("href", "/button-link");
    expect(articleButton).toHaveClass("btn--dark");
  });

  it("should render an article with all possible elements", () => {
    // Arrange
    const articleHeader = "Header";
    const articleSubHeader = "Subheader";
    const articleText = "Text";
    const articleImgSrc = "image.jpg";
    const articleImgSrcSet = "image.jpg 1x, image@2x.jpg 2x";
    const articleImgSizes = "(max-width: 600px) 100vw, 50vw";
    const articleImgAlt = "Image";
    const collectionName = "Collection";
    const collectionLink = "/collection-link";
    const buttonText = "Button";

    const article: MainArticleType = {
      id: "1",
      reverseOrder: true,
      textContainerVariant: "blue",
      header: articleHeader,
      headerSrOnly: true,
      subheader: articleSubHeader,
      text: articleText,
      btn: {
        text: buttonText,
        variant: "dark",
        link: "/button-link",
      },
      imgSrc: articleImgSrc,
      imgSrcSet: articleImgSrcSet,
      imgSizes: articleImgSizes,
      imgAlt: articleImgAlt,
      imgAspectRatio: "3/4",
      imgAspectRatioMobile: "1/1",
      products: exampleProducts,
      collection: {
        name: collectionName,
        link: collectionLink,
        isNew: false,
      },
    };

    // Act
    render(<MainArticle article={article} />);

    const articleHeaderElement = screen.getByRole("heading", {
      name: articleHeader,
      level: 2,
    });
    const articleWrapper = screen.getByTestId(
      "article-img-container",
    ).parentElement;
    const articleImg = screen.getByRole("img");
    const articleProductsList = screen.getByRole("list");
    const articleCollectionLink = screen.getByRole("link", {
      name: /collection/i,
    });
    const articleSubHeaderElement = screen.getByRole("heading", {
      name: articleSubHeader,
      level: 3,
    });
    const articleTextElement = screen.getByText(articleText);
    const articleTextContainer = articleTextElement.parentElement;
    const articleButton = screen.getByRole("link", { name: buttonText });

    // Assert
    expect(articleHeaderElement).toBeInTheDocument();
    expect(articleHeaderElement).toHaveClass("visually-hidden");

    expect(articleWrapper).toHaveClass("col-reverse");

    expect(articleImg).toBeInTheDocument();
    expect(articleImg).toHaveAttribute("src", articleImgSrc);
    expect(articleImg).toHaveAttribute("srcset", articleImgSrcSet);
    expect(articleImg).toHaveAttribute("sizes", articleImgSizes);
    expect(articleImg).toHaveAttribute("alt", articleImgAlt);
    expect(articleImg).toHaveClass("aspect-ratio-3-4");
    expect(articleImg).toHaveClass("mobile-aspect-ratio-1-1");

    expect(articleProductsList).toBeInTheDocument();
    expect(articleProductsList.children).toHaveLength(exampleProducts.length);

    expect(articleCollectionLink).toBeInTheDocument();
    expect(articleCollectionLink).toHaveAttribute("href", collectionLink);

    expect(articleSubHeaderElement).toBeInTheDocument();

    expect(articleTextContainer).toHaveClass("bg-blue");

    expect(articleTextElement).toBeInTheDocument();

    expect(articleButton).toBeInTheDocument();
    expect(articleButton).toHaveAttribute("href", "/button-link");
    expect(articleButton).toHaveClass("btn--dark");
  });

  it("should render a subheader with heading level `2` if header does not exist", () => {
    // Arrange
    const articleSubHeader = "Subheader";
    const buttonText = "Button";

    const article: MainArticleType = {
      id: "1",
      subheader: articleSubHeader,
      btn: {
        text: buttonText,
        variant: "dark",
        link: "/button-link",
      },
      imgSrc: "image.jpg",
      imgSrcSet: "image.jpg 1x, image@2x.jpg 2x",
      imgSizes: "(max-width: 600px) 100vw, 50vw",
      imgAlt: "Image",
    };

    // Act
    render(<MainArticle article={article} />);

    const articleSubHeaderElement = screen.getByRole("heading", {
      name: articleSubHeader,
      level: 2,
    });

    // Assert
    expect(articleSubHeaderElement).toBeInTheDocument();
  });

  it("should render a subheader with heading level `2` if header does not exist", () => {
    // Arrange
    const articleSubHeader = "Subheader";
    const buttonText = "Button";

    const article: MainArticleType = {
      id: "1",
      subheader: articleSubHeader,
      btn: {
        text: buttonText,
        variant: "dark",
        link: "/button-link",
      },
      imgSrc: "image.jpg",
      imgSrcSet: "image.jpg 1x, image@2x.jpg 2x",
      imgSizes: "(max-width: 600px) 100vw, 50vw",
      imgAlt: "Image",
      collection: {
        name: "Collection",
        link: "/collection-link",
        isNew: true,
      },
    };

    // Act
    render(<MainArticle article={article} />);

    const articleSubHeaderElement = screen.getByRole("heading", {
      name: articleSubHeader,
      level: 2,
    });
    const newTag = screen.getByText(/nowość/i);

    // Assert
    expect(articleSubHeaderElement).toBeInTheDocument();

    expect(newTag).toBeInTheDocument();
  });
});
