// Import SwiperJS dependencies
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Keyboard, Zoom, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import "swiper/css/navigation";
// Import custom hooks
import useModal from "../../../../hooks/useModal";
// Import components
import { Btn } from "../../../../components/ui/Btn/Btn";
// Import constants
import { productLink } from "../../../../constants/links";
// Import icons
import CloseIcon from "../../../../Icons/CloseIcon";
// Import types
import type { ModalDataImagePreviewType } from "../../types/ModalTypes";
// Import styles
import "./index.scss";

// Define the props type
export type ImagePreviewPropsType = {
  data: ModalDataImagePreviewType;
};

/**
 * ImagePreview is a React component that renders a modal for previewing images.
 * The modal includes a header with a close button, and a Swiper component for the images.
 * The component uses the useModal custom hook.
 *
 * @param {ModalDataImagePreviewType} props.data - The data of the images.
 *
 * @example
 * <ImagePreview data={data} />
 */

export default function ImagePreview({ data }: ImagePreviewPropsType) {
  const { closeModal } = useModal(); // Use the useModal custom hook to get the closeModal function.

  const { productData, index, path, displayedMainImg } = data; // Destructure the productData, index, path, and displayedMainImg properties from the data object.
  const { images, name, variant } = productData; // Destructure the images, name, and variant properties from the productData object.

  const swiperOptions = {
    slidesPerView: 1, // The number of slides per view.
    slidesPerGroup: 1, // The number of slides per group.
    spaceBetween: 20, // The space between slides (20px).
    navigation: true, // Enable navigation arrows.
    scrollbar: { hide: true }, // Hide the scrollbar.
    initialSlide: index, // The index of the initial slide.
    zoom: true, // Enable zoom with the mousewheel and pinch.
    keyboard: { enabled: true }, // Enable keyboard control.
    modules: [Navigation, Scrollbar, Keyboard, Zoom, A11y], // Enable Swiper modules.
    className: "mySwiper-image-preview",
  };

  return (
    <>
      <header className="image-modal__header">
        {/* visually-hidden is a class that hides the element from the screen, but not from the screen reader. */}
        <h2 className="visually-hidden">Podgląd obrazu</h2>

        <Btn
          variant="light"
          shape="circle"
          type="button"
          onClick={closeModal}
        >
          {/* visually-hidden is a class that hides the element from the screen, but not from the screen reader. */}
          <span className="visually-hidden">Zamknij</span>
          <CloseIcon />
        </Btn>
      </header>

      <div className="image-modal__img-wrapper">
        <Swiper
          {...swiperOptions} // Spread the swiper config.
        >
          {/* Map through the images and render them. */}
          {Object.keys(images).map((key, index) => {
            const imgUrl =
              index > 0 || !displayedMainImg
                ? `${productLink}/${path.collection}-${name}-${variant}__${images[key]}`
                : displayedMainImg.src; // Set base url of the image. If the image is not the main image, use the image from the product page. Otherwise, use the main image.
            const imgSrc = `${imgUrl}?f=l`; // Set the source of the image.
            const imgSrcSet = `${imgUrl}?f=xl 750w, ${imgUrl}?f=l 700w, ${imgUrl}?f=m 600w, ${imgUrl}?f=s 500w, ${imgUrl}?f=xs 400w, ${imgUrl}?f=xxs 300w, ${imgUrl}?f=xxxs 160w`; // Set the source set of the image.

            return (
              <SwiperSlide key={index}>
                {/* If the image is a video, render the Video component. Otherwise, render the Image component. */}
                {key === "video" ? (
                  <Video
                    src={images[key]} // Pass the source of the video.
                  />
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

/**
 * Video is a React component that renders a video.
 * The video has autoplay, controls, plays inline, muted, and no download.
 *
 * @param {string} props.src - The source of the video.
 *
 * @example
 * <Video src={src} />
 */

function Video({ src }: { src: string }) {
  return (
    <video
      src={src}
      autoPlay // Autoplay the video.
      controls // Show the controls.
      playsInline // Play the video inline on mobile devices instead of fullscreen.
      poster={src.replace("mp4?imwidth=800", "jpg?=f=m")} // Set the poster of the video.
      muted // Mute the video.
      controlsList="nodownload" // Disable the download button.
      preload="auto" // Preload the video.
      disablePictureInPicture // Disable the picture-in-picture mode.
    />
  );
}

/**
 * Image is a React component that renders an image.
 * The image is inside a div with a class of "swiper-zoom-container".
 *
 * @param {string} props.imgSrc - The source of the image.
 * @param {string} props.imgSrcSet - The source set of the image.
 *
 * @example
 * <Image imgSrc={imgSrc} imgSrcSet={imgSrcSet} />
 */

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
        loading="lazy" // Lazy load the image.
      />
    </div>
  );
}
