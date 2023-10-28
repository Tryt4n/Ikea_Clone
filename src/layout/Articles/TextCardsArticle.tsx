// Types
import { CardHTMLElementsType } from "../../types/cardTypes";
import { BackgroundVariants } from "../../types/colorsVariantsType";
// Components
import Article from "../../compoundComponents/Article/Article";
import Card from "../../compoundComponents/Card/Card";
import CardsContainer from "../../compoundComponents/Card/CardsContainer";

export type TextCardsArticleType = {
  id: string;
  header?: string;
  cards: CardType[];
};

type CardType = {
  id: string;
  variant: BackgroundVariants;
  as?: CardHTMLElementsType;
  heading: string;
  text: string;
  link?: string;
  icon?: string;
};

export default function TextCardsArticle({ article }: { article: TextCardsArticleType }) {
  return (
    <Article>
      {article.header && <Article.Header>{article.header}</Article.Header>}

      <CardsContainer>
        {article.cards.map((card) => {
          const { id, variant, as, icon, heading, text, link } = card;

          return (
            <Card
              key={id}
              variant={variant}
              as={as}
            >
              <Card.TextContainer>
                {icon && <div dangerouslySetInnerHTML={{ __html: icon }} />}
                <Card.Heading headingLevel={article.header ? 3 : 2}>{heading}</Card.Heading>
                <Card.Text>{text}</Card.Text>
                {link && <Article.Link href={link} />}
              </Card.TextContainer>
            </Card>
          );
        })}
      </CardsContainer>
    </Article>
  );
}
