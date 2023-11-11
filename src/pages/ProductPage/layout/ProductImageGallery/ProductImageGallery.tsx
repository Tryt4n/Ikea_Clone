// Hooks
import { useState } from "react";
import useProduct from "../../context/useProduct";
// Components
import Btn from "../../../../components/Btn/Btn";
// Types
import { ProductDataType } from "../../types/ProductDataType";
// Styles
import "./index.scss";
import useModal from "../../../../hooks/useModal";

export default function ProductImageGallery({ data }: { data: ProductDataType }) {
  const { displayedMainImg, path } = useProduct();
  const { setIsModalOpen, setModalData } = useModal();
  const [visibleImages, setVisibleImages] = useState(8);

  const { images, name, variant, topSeller } = data;

  function handleShowMoreClick() {
    if (visibleImages === Object.keys(images).length) {
      setVisibleImages(8);
    } else {
      setVisibleImages((prevVisibleImages) =>
        Math.min(prevVisibleImages + 8, Object.keys(images).length)
      );
    }
  }

  function openImagePreviewModal(imgSrc: string, imgSrcSet: string) {
    setIsModalOpen(true);
    setModalData({
      type: "image-preview",
      imgSrc: imgSrc,
      imgSrcSet: imgSrcSet,
    });
  }

  return (
    <div className="product-image-gallery">
      {Object.keys(images).map((key, index) => {
        if (index < visibleImages) {
          const imgUrl =
            index > 0
              ? `https://www.ikea.com/pl/pl/images/products/${path.collection}-${name}-${variant}__${images[key]}`
              : displayedMainImg.src;
          const imgSrc = `${imgUrl}?f=s`;
          const imgSrcSet = `${imgUrl}?f=xl 750w, ${imgUrl}?f=l 700w, ${imgUrl}?f=m 600w, ${imgUrl}?f=s 500w, ${imgUrl}?f=xs 400w, ${imgUrl}?f=xxs 300w, ${imgUrl}?f=xxxs 160w`;
          const imgSizes =
            "(max-width: 900px) 100vw, (max-width: 1200px) 160px, (max-width: 1400px) 300px, (max-width: 1700px) 400px, 500px";

          return (
            <button
              key={key}
              className="product-image-gallery__btn"
              onClick={() => openImagePreviewModal(imgSrc, imgSrcSet)}
            >
              <img
                src={imgSrc}
                srcSet={imgSrcSet}
                sizes={imgSizes}
                alt=""
                loading="lazy"
              />
              {topSeller && index === 0 && <strong className="top-seller">Top Seller</strong>}
              <span className="visually-hidden">Naciśnij aby powiększyć</span>
            </button>
          );
        } else {
          return null;
        }
      })}
      {Object.keys(images).length > 8 && (
        <Btn
          variant="light-with-border"
          className="product-image-gallery__show-more-btn"
          onClick={handleShowMoreClick}
        >
          {visibleImages === Object.keys(images).length ? "Pokaż mniej" : "Pokaż więcej zdjęć"}
        </Btn>
      )}
    </div>
  );
}
