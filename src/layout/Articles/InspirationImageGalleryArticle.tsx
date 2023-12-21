// React
import { useState } from "react";
// Components
import Article from "../../compoundComponents/Article/Article";
import ImageGallery from "../../components/features/ImageGallery/ImageGallery";
import BtnsControl from "../../components/features/BtnsControl/BtnsControl";
import { Btn } from "../../components/ui/Btn/Btn";
// Helpers
import { startViewTransition } from "../../utils/helpers";
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
  const [pressedBtn, setPressedBtn] = useState("Wszystkie");

  function handleBtnClick(index: number) {
    startViewTransition(() => {
      setPressedBtn(btnsControlList[index]);
    });
  }

  return (
    <Article>
      <Article.Header>{article.header}</Article.Header>

      <BtnsControl>
        {btnsControlList.map((btn, index) => (
          <Btn
            key={btn}
            variant="gray"
            aria-pressed={btn === pressedBtn}
            disabled={btn === pressedBtn}
            onClick={() => handleBtnClick(index)}
          >
            {btn}
          </Btn>
        ))}
      </BtnsControl>

      <ImageGallery
        data={article.cards}
        onHoverStatus={article.showProductsOnlyOnHover}
      />
    </Article>
  );
}
