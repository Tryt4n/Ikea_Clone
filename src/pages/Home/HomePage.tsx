// React
import React from "react";
// react-router-dom
import { ScrollRestoration } from "react-router-dom";
// Custom Hooks
import useFetch from "../../hooks/useFetch";
// Articles Variants
import MainArticle from "../../layout/Articles/MainArticle";
import CarouselSliderArticle from "../../layout/Articles/CarouselSliderArticle";
import ImgCardsArticle from "../../layout/Articles/ImgCardsArticle";
import ImageCardsCollectionSlider from "../../layout/Articles/ImagesCardsCollectionSlider";
import TextCardsArticle from "../../layout/Articles/TextCardsArticle";
import InspirationImageGalleryArticle from "../../layout/Articles/InspirationImageGalleryArticle";
// Components
import PageLoadingSpinner from "../../components/ui/LazyLoadPageLoadingSpinner/PageLoadingSpinner";
// Types
import type { MainArticleType } from "../../layout/Articles/MainArticle";
import type { CarouselSliderArticleType } from "../../layout/Articles/CarouselSliderArticle";
import type { ImgCardsArticleType } from "../../layout/Articles/ImgCardsArticle";
import type { ImageCardsCollectionSliderType } from "../../layout/Articles/ImagesCardsCollectionSlider";
import type { TextCardsArticleType } from "../../layout/Articles/TextCardsArticle";
import type { InspirationImageGalleryArticleType } from "../../layout/Articles/InspirationImageGalleryArticle";
import type {
  ArticleContentsTypes,
  ArticleType,
  ArticlesType,
} from "../../layout/Articles/types/ArticleTypes";
// Style
import "./index.scss";

const componentMap = {
  "main-article": (content: ArticleContentsTypes) => (
    <MainArticle article={content as MainArticleType} />
  ),
  "carousel-slider-article": (content: ArticleContentsTypes) => (
    <CarouselSliderArticle article={content as CarouselSliderArticleType} />
  ),
  "image-cards-article": (content: ArticleContentsTypes) => (
    <ImgCardsArticle article={content as ImgCardsArticleType} />
  ),
  "image-cards-collection-slider": (content: ArticleContentsTypes) => (
    <ImageCardsCollectionSlider article={content as ImageCardsCollectionSliderType} />
  ),
  "text-cards-article": (content: ArticleContentsTypes) => (
    <TextCardsArticle article={content as TextCardsArticleType} />
  ),
  "images-gallery": (content: ArticleContentsTypes) => (
    <InspirationImageGalleryArticle article={content as InspirationImageGalleryArticleType} />
  ),
};

function componentMapper(article: ArticleType) {
  const { variant, content } = article;
  const Component = componentMap[variant];

  if (Component) {
    return Component(content);
  }

  return null;
}

export default function HomePage() {
  const URL = "https://tryt4n.github.io/Ikea-data/server/pages/homePage.json";
  const articles = useFetch(URL);
  const homePageArticles = articles.data as ArticlesType;

  return (
    <>
      {articles.isLoading && !articles.isError ? (
        <PageLoadingSpinner />
      ) : articles.isError ? (
        <ErrorFallback />
      ) : (
        <div className="articles">
          <ScrollRestoration />

          {homePageArticles.articles.map((article) => (
            <React.Fragment key={article.id}>{componentMapper(article)}</React.Fragment>
          ))}
        </div>
      )}
    </>
  );
}

function ErrorFallback() {
  return (
    <div className="message-container">
      <h2 className="message message--error">
        <strong>Nie można załadować strony!</strong> Spróbuj ponownie.
      </h2>
      <button onClick={() => window.location.reload()}>
        Naciśnij aby załadować stronę jeszcze raz
      </button>
    </div>
  );
}
