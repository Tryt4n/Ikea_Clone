import React from "react";
// Custom Hooks
import useFetch from "../../hooks/useFetch";
// Articles Variants
import MainArticle, { MainArticleType } from "../../layout/Articles/MainArticle";
import TextCardsArticle, { TextCardsArticleType } from "../../layout/Articles/TextCardsArticle";
import CarouselSliderArticle, {
  CarouselSliderArticleType,
} from "../../layout/Articles/CarouselSliderArticle";
import ImgCardsArticle, { ImgCardsArticleType } from "../../layout/Articles/ImgCardsArticle";
import ImageCardsCollectionSlider, {
  ImageCardsCollectionSliderType,
} from "../../layout/Articles/ImagesCardsCollectionSlider";
import InspirationImageGalleryArticle, {
  InspirationImageGalleryArticleType,
} from "../../layout/Articles/InspirationImageGalleryArticle";
// Components
import PageLoadingSpinner from "../../components/LazyLoadPageLoadingSpinner/PageLoadingSpinner";
// Types
import { ArticleType, ArticlesType } from "../../layout/Articles/types/ArticleTypes";
// Style
import "./index.scss";

function componentMapper(article: ArticleType) {
  const { variant, content } = article;

  switch (variant) {
    case "main-article":
      return <MainArticle article={content as MainArticleType} />;
    case "carousel-slider-article":
      return <CarouselSliderArticle article={content as CarouselSliderArticleType} />;
    case "image-cards-article":
      return <ImgCardsArticle article={content as ImgCardsArticleType} />;
    case "image-cards-collection-slider":
      return <ImageCardsCollectionSlider article={content as ImageCardsCollectionSliderType} />;
    case "text-cards-article":
      return <TextCardsArticle article={content as TextCardsArticleType} />;
    case "images-gallery":
      return (
        <InspirationImageGalleryArticle article={content as InspirationImageGalleryArticleType} />
      );
    default:
      return null;
  }
}

export default function HomePage() {
  const URL = "https://tryt4n.github.io/Ikea-data/server/pages/homePage.json";
  const articles = useFetch(URL);
  const homePageArticles = articles.data;

  return (
    <>
      {articles.isLoading && !articles.isError ? (
        <PageLoadingSpinner />
      ) : articles.isError ? (
        <div className="message-container">
          <h2 className="message message--error">
            <strong>Nie można załadować strony!</strong> Spróbuj ponownie.
          </h2>
          <button onClick={() => window.location.reload()}>
            Naciśnij aby załadować stronę jeszcze raz
          </button>
        </div>
      ) : (
        <div className="articles">
          {(homePageArticles as ArticlesType).articles.map((article) => (
            <React.Fragment key={article.id}>{componentMapper(article)}</React.Fragment>
          ))}
        </div>
      )}
    </>
  );
}
