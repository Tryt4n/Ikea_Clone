import React from "react";
// Custom Hooks
import useWindowSize from "../../hooks/useWindowSize";
// Components
import Article from "../../components/Article/Article";
import Collection from "../../components/CollectionProducts/components/Collection";
import CollectionNameContainer from "../../components/CollectionProducts/components/CollectionNameContainer";
// Types
import {
  ArticleBtnVariantsType,
  AspectRatioType,
  TextContainerVariantsType,
} from "../../types/articleTypes";
import {
  ListItemDescriptionPlacementTypes,
  ListItemTagVariantsType,
} from "../../types/collectionTypes";

export type MainArticleType = {
  id: string;
  reverseOrder?: boolean;
  textContainerVariant?: TextContainerVariantsType;
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

type ProductType = {
  id: string;
  placement: {
    top: string;
    right: string;
    bottom: string;
    left: string;
    topMobile?: string;
    rightMobile?: string;
    bottomMobile?: string;
    leftMobile?: string;
  };
  newTag: {
    variant: ListItemTagVariantsType;
  };
  topSellerTag?: {
    variant: ListItemTagVariantsType;
  };
  newPriceTag?: {
    variant: ListItemTagVariantsType;
    lastItemPriceInteger: number;
    lastItemPriceDecimal?: number;
  };
  descriptionPlacement: ListItemDescriptionPlacementTypes;
  productHeading: string;
  productSubHeading: string;
  productLink: string;
  productPriceInteger: number;
  productPriceDecimal?: number;
  hideOnMobile?: boolean;
};

export default function MainArticle({ article }: { article: MainArticleType }) {
  const { width } = useWindowSize();

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
            sizes={article.imgSizes}
            srcSet={article.imgSrcSet}
            src={article.imgSrc}
            alt={article.imgAlt}
            aspectRatio={article.imgAspectRatio ? article.imgAspectRatio : "16/9"}
            aspectRatioMobile={article.imgAspectRatioMobile ? article.imgAspectRatioMobile : "16/9"}
          />

          {article.products && (
            <Collection>
              {article.products.map((product: ProductType) => {
                const {
                  placement,
                  id,
                  productLink,
                  descriptionPlacement,
                  topSellerTag,
                  newTag,
                  newPriceTag,
                  productHeading,
                  productSubHeading,
                  productPriceInteger,
                  productPriceDecimal,
                  hideOnMobile,
                } = product;

                if (hideOnMobile && width < 600) {
                  return <React.Fragment key={id}></React.Fragment>;
                } else {
                  return (
                    <Collection.ListItem
                      key={id}
                      descriptionContainerId={id}
                      top={
                        placement.topMobile
                          ? width >= 600
                            ? placement.top
                            : placement.topMobile
                          : placement.top
                      }
                      right={
                        placement.rightMobile
                          ? width >= 600
                            ? placement.right
                            : placement.rightMobile
                          : placement.right
                      }
                      bottom={
                        placement.bottomMobile
                          ? width >= 600
                            ? placement.bottom
                            : placement.bottomMobile
                          : placement.bottom
                      }
                      left={
                        placement.leftMobile
                          ? width >= 600
                            ? placement.left
                            : placement.leftMobile
                          : placement.left
                      }
                    >
                      <Collection.ListItemDescriptionContainer
                        id={id}
                        linkToProduct={productLink}
                        placement={descriptionPlacement}
                      >
                        {newTag && (
                          <Collection.ListItemTag variant={newTag.variant}>
                            Nowość
                          </Collection.ListItemTag>
                        )}
                        {topSellerTag && (
                          <Collection.ListItemTag variant={topSellerTag.variant}>
                            Top Seller
                          </Collection.ListItemTag>
                        )}
                        {newPriceTag && (
                          <Collection.ListItemTag variant={newPriceTag.variant}>
                            Nowa niższa cena
                          </Collection.ListItemTag>
                        )}
                        <Collection.ListItemHeadingContainer>
                          <Collection.ListItemHeading>{productHeading} </Collection.ListItemHeading>
                          <Collection.ListItemSubHeading>
                            {productSubHeading}
                          </Collection.ListItemSubHeading>
                        </Collection.ListItemHeadingContainer>
                        <Collection.ListItemPrice
                          price={productPriceInteger}
                          priceDecimal={productPriceDecimal}
                        />
                        {newPriceTag && (
                          <Collection.ListItemLastPriceDescription
                            lastPrice={newPriceTag.lastItemPriceInteger}
                            lastPriceDecimal={newPriceTag.lastItemPriceDecimal}
                          />
                        )}
                      </Collection.ListItemDescriptionContainer>
                    </Collection.ListItem>
                  );
                }
              })}
            </Collection>
          )}

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
