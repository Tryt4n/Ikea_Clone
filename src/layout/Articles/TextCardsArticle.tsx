// Import components
import Article from "../../compoundComponents/Article/Article";
import Card from "../../compoundComponents/Card/Card";
import CardsContainer from "../../compoundComponents/Card/CardsContainer";
// Import types
import type { CardHTMLElementsType } from "../../types/cardTypes";
import type { BackgroundVariants } from "../../types/colorsVariantsType";

// Define types for the TextCardsArticle component props
export type TextCardsArticleType = {
  id: string; // Unique ID for the article
  header?: string; // Header for the article
  cards: CardType[]; // Array of cards
};

// Define types for the Card component props
type CardType = {
  id: string;
  variant: BackgroundVariants;
  as?: CardHTMLElementsType;
  heading: string;
  text: string;
  link?: string;
  icon?: string;
};

/**
 * TextCardsArticle.tsx
 *
 * This file contains the definition of the TextCardsArticle component. This component serves as an article
 * for the application and is responsible for rendering a collection of text cards.
 *
 * The TextCardsArticle component uses the `Article`, `Card`, and `CardsContainer` components to create the article structure and the text cards.
 *
 * The `TextCardsArticleType` type is used to define the structure of the article data, and the `CardType` type is used to define the structure of the card data.
 *
 * The `TextCardsArticle` function is the main component function. It takes an article object as a prop and renders an `Article` component with a header (if provided)
 * and a `CardsContainer` component that contains a `Card` component for each card in the article data.
 *
 * Each `Card` component contains a `Card.TextContainer` component that contains an icon (if provided), a heading, a text, and a link (if provided).
 *
 * @param {Object} props - The props for the component.
 * @param {TextCardsArticleType} props.article - The article data.
 * @returns {JSX.Element} The TextCardsArticle component.
 */

export default function TextCardsArticle({ article }: { article: TextCardsArticleType }) {
  return (
    <Article>
      {/* Render the header if provided */}
      {article.header && <Article.Header>{article.header}</Article.Header>}

      <CardsContainer>
        {/* Map through the cards list and render a card for each item */}
        {article.cards.map((card) => {
          const { id, variant, as, icon, heading, text, link } = card; // Destructure card data

          return (
            <Card
              key={id}
              variant={variant}
              as={as} // Render the card as a different HTML element if provided
            >
              <Card.TextContainer>
                {/* Render the icon if provided */}
                {icon && <div dangerouslySetInnerHTML={{ __html: icon }} />}

                <Card.Heading headingLevel={article.header ? 3 : 2}>{heading}</Card.Heading>

                <Card.Text>{text}</Card.Text>

                {/* Render the link if provided */}
                {link && <Article.Link href={link} />}
              </Card.TextContainer>
            </Card>
          );
        })}
      </CardsContainer>
    </Article>
  );
}
