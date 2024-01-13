// Import React dependencies
import { useMemo, useState } from "react";
// Import custom hooks
import useWindowSize from "../../../hooks/useWindowSize/useWindowSize";
// Import components
import ImageCardCollection, {
  CardCollectionType,
} from "../../../layout/Articles/components/ImageCardCollection/ImageCardCollection";
import { Btn } from "../../ui/Btn/Btn";
// Import styles
import "./index.scss";

// Defining the type for the ImageGallery props
type ImageGalleryPropsType = {
  data: CardCollectionType[]; // The data for the image cards
  onHoverStatus?: boolean; // A flag indicating if the hover status is on
};

/**
 * ImageGallery Component
 *
 * This component displays a gallery of image cards.
 *
 * @param data - The data for the image cards.
 * @param onHoverStatus - A flag indicating if the hover status is on.
 *
 * @returns A div element with a class of "images-gallery", containing a div with a class of "images-gallery__container" and ImageCardCollection components for each image card, and a div with a class of "images-gallery__btn-wrapper" and a button for showing more images.
 */
export default function ImageGallery({
  data,
  onHoverStatus,
}: ImageGalleryPropsType) {
  const [countOfVisibleImages, setCountOfVisibleImages] = useState(6); // State for the count of visible images

  const { width } = useWindowSize(); // Get the window width

  // Shuffle the data
  const shuffledData = useMemo(() => shuffleArray(data), [data]);

  // Define a function to shuffle an array
  function shuffleArray(array: CardCollectionType[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Define a function to show more images
  function showMoreImages() {
    setCountOfVisibleImages((prevState) => prevState + 6);
  }

  return (
    <div className="images-gallery" data-testid="images-gallery">
      <div
        className="images-gallery__container"
        data-testid="images-gallery-container"
      >
        {shuffledData.map((card, index) => {
          if (index > countOfVisibleImages - 1) return;

          return (
            <ImageCardCollection
              key={card.id}
              card={card}
              onHoverStatus={onHoverStatus}
              hideTooltips={width < 600}
            />
          );
        })}
      </div>

      <div className="images-gallery__btn-wrapper">
        <Btn
          onClick={showMoreImages}
          disabled={countOfVisibleImages >= shuffledData.length}
        >
          Pokaż {countOfVisibleImages} kolejnych inspiracji
        </Btn>
      </div>
    </div>
  );
}
