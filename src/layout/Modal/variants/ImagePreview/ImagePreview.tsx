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
// Icons
import CloseIcon from "../../../../Icons/CloseIcon";
// Types
import { ModalDataImagePreviewType } from "../../../../pages/ProductPage/types/ModalTypes";

export default function ImagePreview({ data }: { data: ModalDataImagePreviewType }) {
  const { closeModal } = useModal();

  const { productData, index, path, displayedMainImg } = data;
  const { images, name, variant } = productData;

  return (
    <>
      <div className="image-modal__header">
        <Btn
          variant="light"
          shape="circle"
          type="button"
          onClick={closeModal}
        >
          <span className="visually-hidden">Zamknij</span>
          <CloseIcon />
        </Btn>
        <h2 className="visually-hidden">Podgląd obrazu</h2>
      </div>

      <div className="image-modal__img-wrapper">
        <Swiper
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={20}
          navigation={true}
          scrollbar={{ hide: true }}
          initialSlide={index}
          zoom={true}
          keyboard={{
            enabled: true,
          }}
          modules={[Navigation, Scrollbar, Keyboard, Zoom, A11y]}
          className={`mySwiper-image-preview`}
        >
          {Object.keys(images).map((key, index) => {
            const imgUrl =
              index > 0
                ? `https://www.ikea.com/pl/pl/images/products/${path.collection}-${name}-${variant}__${images[key]}`
                : displayedMainImg.src;
            const imgSrc = `${imgUrl}?f=l`;
            const imgSrcSet = `${imgUrl}?f=xl 750w, ${imgUrl}?f=l 700w, ${imgUrl}?f=m 600w, ${imgUrl}?f=s 500w, ${imgUrl}?f=xs 400w, ${imgUrl}?f=xxs 300w, ${imgUrl}?f=xxxs 160w`;
            const imgSizes = "(max-width: 900px) 100vw, (max-width: 1200px) 700px, 800px";

            return (
              <SwiperSlide key={index}>
                {key === "video" ? (
                  <video
                    src={images[key]}
                    autoPlay
                    controls
                    playsInline
                    poster={images[key].replace("mp4?imwidth=800", "jpg?=f=m")}
                    muted
                    controlsList="nodownload"
                    preload="auto"
                    disablePictureInPicture
                  />
                ) : (
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
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
