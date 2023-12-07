// SwiperJS
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Keyboard, Zoom, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import "swiper/css/navigation";
// Custom Hooks
import useModal from "../../../../hooks/useModal";
// Components
import Btn from "../../../../components/Btn/Btn";
// Constants
import { productLink } from "../../../../constants/links";
// Icons
import CloseIcon from "../../../../Icons/CloseIcon";
// Types
import type { ModalDataImagePreviewType } from "../../../../pages/ProductPage/types/ModalTypes";
// Style
import "./index.scss";

export type ImagePreviewPropsType = {
  data: ModalDataImagePreviewType;
};

export default function ImagePreview({ data }: ImagePreviewPropsType) {
  const { closeModal } = useModal();

  const { productData, index, path, displayedMainImg } = data;
  const { images, name, variant } = productData;

  const swiperOptions = {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    navigation: true,
    scrollbar: { hide: true },
    initialSlide: index,
    zoom: true,
    keyboard: { enabled: true },
    modules: [Navigation, Scrollbar, Keyboard, Zoom, A11y],
    className: "mySwiper-image-preview",
  };

  return (
    <>
      <header className="image-modal__header">
        <h2 className="visually-hidden">Podgląd obrazu</h2>
        <Btn
          variant="light"
          shape="circle"
          type="button"
          onClick={closeModal}
        >
          <span className="visually-hidden">Zamknij</span>
          <CloseIcon />
        </Btn>
      </header>

      <div className="image-modal__img-wrapper">
        <Swiper {...swiperOptions}>
          {Object.keys(images).map((key, index) => {
            const imgUrl =
              index > 0 || !displayedMainImg
                ? `${productLink}/${path.collection}-${name}-${variant}__${images[key]}`
                : displayedMainImg.src;
            const imgSrc = `${imgUrl}?f=l`;
            const imgSrcSet = `${imgUrl}?f=xl 750w, ${imgUrl}?f=l 700w, ${imgUrl}?f=m 600w, ${imgUrl}?f=s 500w, ${imgUrl}?f=xs 400w, ${imgUrl}?f=xxs 300w, ${imgUrl}?f=xxxs 160w`;

            return (
              <SwiperSlide key={index}>
                {key === "video" ? (
                  <Video src={images[key]} />
                ) : (
                  <Image
                    imgSrc={imgSrc}
                    imgSrcSet={imgSrcSet}
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}

function Video({ src }: { src: string }) {
  return (
    <video
      src={src}
      autoPlay
      controls
      playsInline
      poster={src.replace("mp4?imwidth=800", "jpg?=f=m")}
      muted
      controlsList="nodownload"
      preload="auto"
      disablePictureInPicture
    />
  );
}

function Image({ imgSrc, imgSrcSet }: { imgSrc: string; imgSrcSet: string }) {
  const imgSizes = "(max-width: 900px) 100vw, (max-width: 1200px) 700px, 800px";

  return (
    <div
      className="swiper-zoom-container"
      aria-label="Naciśnij dwukrotnie aby przybliżyć"
    >
      <img
        src={imgSrc}
        srcSet={imgSrcSet}
        sizes={imgSizes}
        alt=""
        loading="lazy"
      />
    </div>
  );
}
