// Types
import { CarouselSliderArticleType } from "../CarouselSliderArticle";
import { ImageCardsCollectionSliderType } from "../ImagesCardsCollectionSlider";
import { ImgCardsArticleType } from "../ImgCardsArticle";
import { InspirationImageGalleryArticleType } from "../InspirationImageGalleryArticle";
import { MainArticleType } from "../MainArticle";
import { TextCardsArticleType } from "../TextCardsArticle";

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
  id: string;
  variant: ArticleVariantsTypes;
  content: ArticleContentsTypes;
};

export type ArticlesType = {
  id: string;
  articles: ArticleType[];
};
