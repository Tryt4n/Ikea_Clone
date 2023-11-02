// Components
import { useMemo, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import ImageCardCollection, {
  CardCollectionType,
} from "../../layout/Articles/components/ImageCardCollection/ImageCardCollection";
// Style
import "./index.scss";
import Btn from "../Btn/Btn";

type ImageGalleryPropsType = {
  data: CardCollectionType[];
  onHoverStatus?: boolean;
};

export default function ImageGallery({ data, onHoverStatus }: ImageGalleryPropsType) {
  const [countOfVisibleImages, setCountOfVisibleImages] = useState(6);

  const { width } = useWindowSize();

  const shuffledData = useMemo(() => shuffleArray(data), [data]);

  function shuffleArray(array: CardCollectionType[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function showMoreImages() {
    setCountOfVisibleImages((prevState) => prevState + 6);
  }

  return (
    <div className="images-gallery">
      <div className="images-gallery__container">
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
          Pokaż 6 kolejnych inspiracji
        </Btn>
      </div>
    </div>
  );
}
