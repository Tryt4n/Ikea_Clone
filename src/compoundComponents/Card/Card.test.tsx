import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "./Card";
import CardsContainer from "./CardsContainer";

describe("Card", () => {
  it("should render all components without any additional props", () => {
    // Arrange
    const headingText = "Test heading";
    const imgSrc = "testSrc";
    const imgSrcSet = "testSrcSet";
    const imgAlt = "testAlt";
    const text = "Test text";

    // Act
    render(
      <CardsContainer>
        <Card>
          <Card.Heading>{headingText}</Card.Heading>

          <Card.Img src={imgSrc} srcSet={imgSrcSet} alt={imgAlt} />

          <Card.TextContainer>
            <Card.Text>{text}</Card.Text>
            <Card.Btn />
          </Card.TextContainer>
        </Card>
      </CardsContainer>,
    );

    const card = screen.getByTestId("card");
    const cardsContainer = card.parentNode;
    const heading = screen.getByRole("heading", { level: 2 });
    const cardImg = screen.getByRole("img");
    const textContainer = screen.getByTestId("card-text-container");
    const cardText = screen.getByText(text);
    const cardBtn = screen.getByRole("button", { hidden: true });

    // Assert
    expect(cardsContainer).toBeInTheDocument();
    expect(cardsContainer?.children).toHaveLength(1);

    expect(card).toBeInTheDocument();
    expect(card.tagName).toBe("DIV");

    expect(heading).toBeInTheDocument();

    expect(cardImg).toBeInTheDocument();
    expect(cardImg).toHaveAttribute("src", "testSrc");
    expect(cardImg).toHaveAttribute("srcSet", "testSrcSet");
    expect(cardImg).toHaveAttribute("alt", "testAlt");
    expect(cardImg).not.toHaveClass("aspect-ratio-3-4");

    expect(textContainer).toBeInTheDocument();

    expect(cardText).toBeInTheDocument();

    expect(cardBtn).toBeInTheDocument();
    expect(cardBtn).toHaveClass("btn--light");
    expect(cardBtn).toHaveAttribute("aria-hidden", "true");
  });

  it("should render all components with all additional props", () => {
    // Arrange
    const headingText = "Test heading";
    const imgSrc = "testSrc";
    const imgSrcSet = "testSrcSet";
    const imgAlt = "testAlt";
    const text = "Test text";

    const cardLink = "https://www.test.com";
    const cardAdditionalClass = "card-class";
    const headingLevel = 3;
    const textContainerAdditionalClass = "text-container-class";

    // Act
    render(
      <CardsContainer breakOnMobile={true}>
        <Card
          as="link"
          variant="brown"
          className={cardAdditionalClass}
          href={cardLink}
        >
          <Card.Heading headingLevel={headingLevel}>{headingText}</Card.Heading>

          <Card.Img
            src={imgSrc}
            srcSet={imgSrcSet}
            alt={imgAlt}
            aspectRatio="3/4"
          />

          <Card.TextContainer className={textContainerAdditionalClass}>
            <Card.Text>{text}</Card.Text>
            <Card.Btn variant="blue" />
          </Card.TextContainer>
        </Card>
      </CardsContainer>,
    );

    const card = screen.getByTestId("card");
    const cardsContainer = card.parentNode;
    const heading = screen.getByRole("heading", { level: headingLevel });
    const cardImg = screen.getByRole("img");
    const textContainer = screen.getByTestId("card-text-container");
    const cardText = screen.getByText(text);
    const cardBtn = screen.getByRole("button", { hidden: true });

    // Assert
    expect(cardsContainer).toBeInTheDocument();
    expect(cardsContainer?.children).toHaveLength(1);
    expect(cardsContainer).toHaveClass("breakOnMobile");

    expect(card).toBeInTheDocument();
    expect(card.tagName).toBe("A");
    expect(card).toHaveAttribute("href", cardLink);
    expect(card).toHaveClass("bg-brown");
    expect(card).toHaveClass(cardAdditionalClass);

    expect(heading).toBeInTheDocument();

    expect(cardImg).toBeInTheDocument();
    expect(cardImg).toHaveAttribute("src", "testSrc");
    expect(cardImg).toHaveAttribute("srcSet", "testSrcSet");
    expect(cardImg).toHaveAttribute("alt", "testAlt");
    expect(cardImg).toHaveClass("aspect-ratio-3-4");

    expect(textContainer).toBeInTheDocument();
    expect(textContainer).toHaveClass(textContainerAdditionalClass);

    expect(cardText).toBeInTheDocument();

    expect(cardBtn).toBeInTheDocument();
    expect(cardBtn).toHaveClass("btn--blue");
    expect(cardBtn).toHaveAttribute("aria-hidden", "true");
  });

  it("should render card as a section if as is set to section", () => {
    // Act
    render(
      <Card as="section">
        <Card.Heading>Test heading</Card.Heading>
      </Card>,
    );

    // Assert
    expect(screen.getByTestId("card").tagName).toBe("SECTION");
  });
});
