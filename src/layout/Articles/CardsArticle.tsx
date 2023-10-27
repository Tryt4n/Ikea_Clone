// Types
import { CardHTMLElementsType, CardVariantsType } from "../../types/cardTypes";
// Components
import Article from "../../components/Article/Article";
import Card from "../../components/Card/Card";
import CardsContainer from "../../components/Card/CardsContainer";

export type CardsArticleType = {
  id: string;
  header?: string;
  cards: CardType[];
};

type CardType = {
  id: string;
  variant: CardVariantsType;
  as?: CardHTMLElementsType;
  heading: string;
  text: string;
  link?: string;
  icon?: string;
};

export default function CardsArticle({ article }: { article: CardsArticleType }) {
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
