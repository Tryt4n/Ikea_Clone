// Import types
import type { CarouselSliderArticleType } from "../variants/CarouselSliderArticle/CarouselSliderArticle";
import type { ImageCardsCollectionSliderType } from "../variants/ImagesCardsCollectionSlider/ImagesCardsCollectionSlider";
import type { ImgCardsArticleType } from "../variants/ImgCardsArticle/ImgCardsArticle";
import type { InspirationImageGalleryArticleType } from "../variants/InspirationImageGalleryArticle/InspirationImageGalleryArticle";
import type { MainArticleType } from "../variants/MainArticle/MainArticle";
import type { TextCardsArticleType } from "../variants/TextCardsArticle/TextCardsArticle";

export type ArticleVariantsTypes =
  | "main-article"
  | "carousel-slider-article"
  | "image-cards-article"
  | "image-cards-collection-slider"
  | "text-cards-article"
  | "images-gallery";

export type ArticleContentsTypes =
  | MainArticleType
  | CarouselSliderArticleType
  | ImgCardsArticleType
  | ImageCardsCollectionSliderType
  | TextCardsArticleType
  | InspirationImageGalleryArticleType;

export type ArticleType = {
  readonly id: string;
  variant: ArticleVariantsTypes;
  content: ArticleContentsTypes;
};

export type ArticlesType = {
  readonly id: string;
  articles: ArticleType[];
};
