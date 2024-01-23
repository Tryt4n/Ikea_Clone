// Import react dependencies
import { useState } from "react";
// Import components
import Article from "../../../../compoundComponents/Article/Article";
import ImageGallery from "../../../../components/features/ImageGallery/ImageGallery";
import BtnsControl from "../../../../components/features/BtnsControl/BtnsControl";
import { Btn } from "../../../../components/ui/Btn/Btn";
// Import helpers functions
import { startViewTransition } from "../../../../utils/helpers";
// Import constants
import { btnsControlList } from "../../../../constants/btnsControlList";
// Import types
import type { ImageCardsCollectionSliderType } from "../ImagesCardsCollectionSlider/ImagesCardsCollectionSlider";

// Define types for the InspirationImageGalleryArticle component props
export type InspirationImageGalleryArticleType = ImageCardsCollectionSliderType;

/**
 * InspirationImageGalleryArticle.tsx
 *
 * This file contains the definition of the InspirationImageGalleryArticle component. This component serves as an article
 * for the application and is responsible for rendering an image gallery with associated buttons.
 *
 * The InspirationImageGalleryArticle component uses the `useState` hook from React to manage the state of the currently pressed button.
 *
 * The component uses the `Article` component to create the article, the `BtnsControl` component to create the buttons control,
 * the `Btn` component to create the buttons, and the `ImageGallery` component to create the image gallery.
 *
 * The `handleBtnClick` function is used to handle the button click events. It uses the `startViewTransition` helper function to start a view transition
 * and sets the currently pressed button to the clicked button.
 *
 * @param {InspirationImageGalleryArticleType} props.article - The article data.
 * @returns {JSX.Element} The InspirationImageGalleryArticle component.
 */

export default function InspirationImageGalleryArticle({
  article,
}: {
  article: InspirationImageGalleryArticleType;
}) {
  const [pressedBtn, setPressedBtn] = useState("Wszystkie"); // Currently pressed button

  // Define function to handle button click
  function handleBtnClick(index: number) {
    startViewTransition(() => {
      setPressedBtn(btnsControlList[index]); // Set pressed button to the currently clicked button
    });
  }

  return (
    <Article>
      <Article.Header>{article.header}</Article.Header>

      <BtnsControl>
        {/* Map through the buttons list and render a button for each item */}
        {btnsControlList.map((btn, index) => (
          <Btn
            key={btn}
            variant="gray"
            aria-pressed={btn === pressedBtn} // Set aria-pressed attribute to true if the button is currently pressed
            disabled={btn === pressedBtn} // Disable the button if it is currently pressed
            onClick={() => handleBtnClick(index)} // Call the `handleBtnClick` function when the button is clicked
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
