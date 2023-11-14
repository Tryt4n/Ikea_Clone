// Components
import Article from "../../compoundComponents/Article/Article";
import CollectionNameContainer from "../../compoundComponents/CollectionProducts/components/CollectionNameContainer";
import CollectionProductsList from "./components/CollectionProductsList/CollectionProductsList.1";
// Types
import { ProductType } from "./components/CollectionProductsList/CollectionProductsList";
import { ArticleBtnVariantsType, AspectRatioType } from "../../types/articleTypes";
import { BackgroundVariants } from "../../types/colorsVariantsType";

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

export default function MainArticle({ article }: { article: MainArticleType }) {
  return (
    <Article key={article.id}>
      {article.header && (
        <Article.Header className={article.headerSrOnly ? "visually-hidden" : undefined}>
          {article.header}
        </Article.Header>
      )}
      <Article.Body className={article.reverseOrder ? "col-reverse" : ""}>
        <Article.ImgContainer>
          <Article.Img
            src={article.imgSrc}
            srcSet={article.imgSrcSet}
            sizes={article.imgSizes}
            alt={article.imgAlt}
            aspectRatio={article.imgAspectRatio ? article.imgAspectRatio : "16/9"}
            aspectRatioMobile={article.imgAspectRatioMobile ? article.imgAspectRatioMobile : "16/9"}
          />

          {article.products && <CollectionProductsList products={article.products} />}

          {article.collection && (
            <CollectionNameContainer
              collectionName={article.collection.name}
              collectionLink={article.collection.link}
              isNew={article.collection.isNew}
            />
          )}
        </Article.ImgContainer>

        {(article.text || article.subheader || article.btn) && (
          <Article.TextContainer variant={article.textContainerVariant}>
            {article.subheader && (
              <Article.Header headingLevel={article.header ? 3 : 2}>
                {article.subheader}
              </Article.Header>
            )}
            {article.text && <Article.Text>{article.text}</Article.Text>}
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
