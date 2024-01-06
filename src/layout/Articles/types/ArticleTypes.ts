// Import types
import type { CarouselSliderArticleType } from "../CarouselSliderArticle";
import type { ImageCardsCollectionSliderType } from "../ImagesCardsCollectionSlider";
import type { ImgCardsArticleType } from "../ImgCardsArticle";
import type { InspirationImageGalleryArticleType } from "../InspirationImageGalleryArticle";
import type { MainArticleType } from "../MainArticle";
import type { TextCardsArticleType } from "../TextCardsArticle";

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
