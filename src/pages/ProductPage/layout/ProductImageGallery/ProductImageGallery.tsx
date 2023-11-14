// React
import { useRef, useState } from "react";
// SwiperJS
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Keyboard, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
// Custom Hooks
import useProduct from "../../context/useProduct";
import useModal from "../../../../hooks/useModal";
import useWindowSize from "../../../../hooks/useWindowSize";
// Components
import Btn from "../../../../components/Btn/Btn";
// Icons
import PlayIcon from "../../../../Icons/PlayIcon";
import PauseIcon from "../../../../Icons/PauseIcon";
// Types
import { ProductDataType } from "../../types/ProductDataType";
// Styles
import "./index.scss";

export default function ProductImageGallery({ data }: { data: ProductDataType }) {
  const { displayedMainImg, path } = useProduct();
  const { setIsModalOpen, setModalData } = useModal();
  const { width } = useWindowSize();
  const [visibleImages, setVisibleImages] = useState(8);
  const [videoControl, setVideoControl] = useState({
    isFirstPlayback: true,
    isPlaying: false,
  });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { images, name, variant, topSeller, limitedEdition } = data;

  function handleShowMoreClick() {
    if (visibleImages === Object.keys(images).length) {
      setVisibleImages(8);
    } else {
      setVisibleImages((prevVisibleImages) =>
        Math.min(prevVisibleImages + 8, Object.keys(images).length)
      );
    }
  }

  function openModalPreview(index: number) {
    setIsModalOpen(true);
    setModalData({
      type: "image-preview",
      productData: data,
      index: index,
      path: path,
      displayedMainImg: displayedMainImg,
    });
  }

  function handleVideoPlayPause() {
    if (!videoRef.current) return;

    if (videoControl.isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setVideoControl((prevState) => ({
      isFirstPlayback: false,
      isPlaying: !prevState.isPlaying,
    }));
  }

  const SwiperContainer = width < 900 ? Swiper : "div";
  const SwiperItem = width < 900 ? SwiperSlide : "div";

  return (
    <SwiperContainer
      className={`product-image-gallery${
        width < 900 ? " mySwiper-product-mobile-carousel-slider" : ""
      }`}
      pagination={width < 900 ? true : undefined}
      loop={width < 900 ? true : undefined}
      keyboard={
        width < 900
          ? {
              enabled: true,
            }
          : undefined
      }
      modules={width < 900 ? [Pagination, Keyboard, A11y] : undefined}
    >
      {Object.keys(images).map((key, index) => {
        if (width < 900 || index < visibleImages) {
          // if (index < visibleImages) {
          const imgUrl =
            index > 0
              ? `https://www.ikea.com/pl/pl/images/products/${path.collection}-${name}-${variant}__${images[key]}`
              : displayedMainImg.src;
          const imgSrc = `${imgUrl}?f=s`;
          const imgSrcSet = `${imgUrl}?f=xl 750w, ${imgUrl}?f=l 700w, ${imgUrl}?f=m 600w, ${imgUrl}?f=s 500w, ${imgUrl}?f=xs 400w, ${imgUrl}?f=xxs 300w, ${imgUrl}?f=xxxs 160w`;
          const imgSizes =
            "(max-width: 900px) 100vw, (max-width: 1200px) 160px, (max-width: 1400px) 300px, (max-width: 1700px) 400px, 500px";

          const InnerElement = key === "video" ? "div" : "button";

          return (
            <SwiperItem
              key={key}
              className="product-image-gallery__item-wrapper"
            >
              <InnerElement
                className="product-image-gallery__btn"
                onClick={
                  width >= 900 && key !== "video" ? () => openModalPreview(index) : undefined
                }
              >
                {!limitedEdition && topSeller && index === 0 && (
                  <strong className="top-seller">Top Seller</strong>
                )}

                {limitedEdition && index === 0 && (
                  <strong className="limited-edition">Kolekcja limitowana</strong>
                )}

                {key === "video" ? (
                  <>
                    <video
                      ref={videoRef}
                      src={images[key]}
                      playsInline
                      loop
                      poster={images[key].replace("mp4?imwidth=800", "jpg?=f=m")}
                      muted
                    />
                    <button
                      className="product-image-gallery__video-preview-btn"
                      onClick={width >= 900 ? () => openModalPreview(index) : undefined}
                    >
                      <span className="visually-hidden">Naciśnij aby powiększyć wideo</span>
                    </button>

                    <button
                      className={`product-image-gallery__video-btn-control${
                        videoControl.isFirstPlayback ? ` firstPlayback` : ""
                      }`}
                      onClick={handleVideoPlayPause}
                    >
                      <span className="visually-hidden">
                        {videoControl.isPlaying ? "Zatrzymaj" : "Odtwórz"} wideo
                      </span>
                      {videoControl.isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                  </>
                ) : (
                  <>
                    <img
                      src={imgSrc}
                      srcSet={imgSrcSet}
                      sizes={imgSizes}
                      alt=""
                      loading="lazy"
                    />
                    <span className="visually-hidden">Naciśnij aby powiększyć</span>
                  </>
                )}
              </InnerElement>
            </SwiperItem>
          );
        } else {
          return null;
        }
      })}

      {width >= 900 && Object.keys(images).length > 8 && (
        <div className="product-image-gallery__btn-wrapper">
          <Btn
            variant="light-with-border"
            className="product-image-gallery__show-more-btn"
            onClick={handleShowMoreClick}
          >
            {visibleImages === Object.keys(images).length ? "Pokaż mniej" : "Pokaż więcej zdjęć"}
          </Btn>
        </div>
      )}
    </SwiperContainer>
  );
}
