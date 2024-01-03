// Import article components and their types
import CarouselSliderArticle, {
  type CarouselSliderArticleType,
} from "../../../layout/Articles/CarouselSliderArticle";
import ImageCardsCollectionSlider, {
  type ImageCardsCollectionSliderType,
} from "../../../layout/Articles/ImagesCardsCollectionSlider";
import ImgCardsArticle, {
  type ImgCardsArticleType,
} from "../../../layout/Articles/ImgCardsArticle";
import InspirationImageGalleryArticle, {
  type InspirationImageGalleryArticleType,
} from "../../../layout/Articles/InspirationImageGalleryArticle";
import MainArticle, { type MainArticleType } from "../../../layout/Articles/MainArticle";
import TextCardsArticle, {
  type TextCardsArticleType,
} from "../../../layout/Articles/TextCardsArticle";
// Import article types
import type {
  ArticleContentsTypes,
  ArticleType,
} from "../../../layout/Articles/types/ArticleTypes";

/**
 * componentMap is an object that maps article variant names to their corresponding components.
 *
 * Each property of the object is a function that takes an article content object and returns a JSX element.
 * The article content object is cast to the appropriate type based on the article variant.
 */
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

/**
 * componentMapper is a function that takes an article object and returns the corresponding component based on the article variant.
 *
 * The function destructures the article object to get the variant and content.
 * It then uses the variant to get the corresponding component from the componentMap.
 * If a component is found, it is returned with the article content passed as a prop.
 * If no component is found, the function returns null.
 *
 * @param {ArticleType} article - The article object.
 * @returns {JSX.Element|null} The corresponding component with the article content passed as a prop, or null if no component is found.
 */
export function componentMapper(article: ArticleType) {
  const { variant, content } = article;
  const Component = componentMap[variant];

  if (Component) {
    return Component(content);
  }

  return null;
}
