// Import components
import Article from "../../compoundComponents/Article/Article";
import CollectionNameContainer from "../../compoundComponents/CollectionProducts/layout/CollectionNameContainer";
import CollectionProductsList from "./components/CollectionProductsList/CollectionProductsList";
// Import types
import type { ProductType } from "./components/CollectionProductsList/CollectionProductsList";
import type {
  ArticleBtnVariantsType,
  AspectRatioType,
} from "../../types/articleTypes";
import type { BackgroundVariants } from "../../types/colorsVariantsType";

// Main article type
export type MainArticleType = {
  id: string;
  reverseOrder?: boolean;
  textContainerVariant?: BackgroundVariants;
  header?: string;
  headerSrOnly?: boolean;
  subheader?: string;
  text?: string;
  btn: {
    text: string;
    variant: ArticleBtnVariantsType;
    link: string;
  };
  imgSrc: string;
  imgSrcSet: string;
  imgSizes: string;
  imgAlt: string;
  imgAspectRatio?: AspectRatioType;
  imgAspectRatioMobile?: AspectRatioType;
  products?: ProductType[];
  collection?: {
    name: string;
    link: string;
    isNew: boolean;
  };
};

/**
 * MainArticle is a React component that renders an article with optional elements such as a header, subheader, text, button, image, and a list of products.
 * It also supports the option to reverse the order of the elements and to visually hide the header.
 *
 * @param {MainArticleType} props.article - The article to be rendered.
 *
 * @example
 * <MainArticle article={article} />
 */

export default function MainArticle({ article }: { article: MainArticleType }) {
  return (
    <Article key={article.id}>
      {/* The header of the article. It can be visually hidden. */}
      {article.header && (
        <Article.Header
          className={article.headerSrOnly ? "visually-hidden" : undefined}
        >
          {article.header}
        </Article.Header>
      )}

      {/* The body of the article. It contains the image container and the text container. */}
      <Article.Body className={article.reverseOrder ? "col-reverse" : ""}>
        {/* The image container of the article. It contains the image, a list of products, and a collection name container. */}
        <Article.ImgContainer>
          {/* The image of the article. It supports different aspect ratios for mobile and desktop. */}
          <Article.Img
            src={article.imgSrc}
            srcSet={article.imgSrcSet}
            sizes={article.imgSizes}
            alt={article.imgAlt}
            aspectRatio={
              article.imgAspectRatio ? article.imgAspectRatio : "16/9"
            }
            aspectRatioMobile={
              article.imgAspectRatioMobile
                ? article.imgAspectRatioMobile
                : "16/9"
            }
          />

          {/* The list of products in the article. */}
          {article.products && (
            <CollectionProductsList products={article.products} />
          )}

          {/* The collection name container in the article. It contains the name and the link of the collection, and a flag indicating if the collection is new. */}
          {article.collection && (
            <CollectionNameContainer
              collectionName={article.collection.name}
              collectionLink={article.collection.link}
              isNew={article.collection.isNew}
            />
          )}
        </Article.ImgContainer>

        {/* The text container of the article. It contains a subheader, text, and a button. */}
        {(article.text || article.subheader || article.btn) && (
          <Article.TextContainer variant={article.textContainerVariant}>
            {/* The subheader of the article. The heading level depends on whether a header is present. */}
            {article.subheader && (
              <Article.Header headingLevel={article.header ? 3 : 2}>
                {article.subheader}
              </Article.Header>
            )}

            {/* The text of the article. */}
            {article.text && <Article.Text>{article.text}</Article.Text>}

            {/* The button of the article. It contains a link and a variant. */}
            {article.btn && (
              <Article.Btn
                href={article.btn.link}
                variant={article.btn.variant}
              >
                {article.btn.text}
              </Article.Btn>
            )}
          </Article.TextContainer>
        )}
      </Article.Body>
    </Article>
  );
}
