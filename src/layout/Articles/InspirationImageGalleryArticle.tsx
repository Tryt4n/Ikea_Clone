// Components
import Article from "../../compoundComponents/Article/Article";
import BtnsControl from "../../components/BtnsControl/BtnsControl";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
// Const
import { btnsControlList } from "../../constants/btnsControlList";
//Types
import type { ImageCardsCollectionSliderType } from "./ImagesCardsCollectionSlider";

export type InspirationImageGalleryArticleType = ImageCardsCollectionSliderType;

export default function InspirationImageGalleryArticle({
  article,
}: {
  article: InspirationImageGalleryArticleType;
}) {
  return (
    <Article>
      <Article.Header>{article.header}</Article.Header>

      <BtnsControl buttonsList={btnsControlList} />

      <ImageGallery
        data={article.cards}
        onHoverStatus={article.showProductsOnlyOnHover}
      />
    </Article>
  );
}
