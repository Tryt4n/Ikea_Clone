// Import react dependencies
import { useState } from "react";
// Import SwiperJS dependencies
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Keyboard, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
// Import custom hooks
import useProduct from "../../hooks/useProduct";
import useModal from "../../../../hooks/useModal/useModal";
import useWindowSize from "../../../../hooks/useWindowSize/useWindowSize";
// Import inner components
import { Video } from "./InnerComponents/Video/Video";
import { Image } from "./InnerComponents/Image/Image";
import { ShowMoreImagesBtn } from "./InnerComponents/ShowMoreImagesBtn/ShowMoreImagesBtn";
// Import types
import type { ProductDataType } from "../../types/ProductDataType";
// Import constants
import { productLink } from "../../../../constants/links";
// Import styles
import "./index.scss";

/**
 * ProductImageGallery Component
 *
 * This is a React functional component. It displays a gallery of product images and videos. The gallery uses the SwiperJS library for a responsive and accessible carousel slider. The number of visible images in the gallery is controlled by the `visibleImages` state. The component also includes a button to show more images, which is displayed only if there are more than 8 images and the viewport width is greater than or equal to 900px.
 *
 * @param {Object} props.data - An object that contains the data for the product.
 *
 * @example
 * <ProductImageGallery data={productData} />
 *
 * @returns A JSX element that consists of a `SwiperContainer` component (which is either a `Swiper` element from SwiperJS library or a `section` depending on the viewport width), and a `ShowMoreImagesBtn` component if there are more than 8 images and the viewport width is greater than or equal to 900px. Inside the `SwiperContainer`, it maps over the `images` object and renders a `SwiperItem` component (which is either a `SwiperSlide` element from SwiperJS library or a `div` depending on the viewport width) for each image or video.
 */

export default function ProductImageGallery({
  data,
}: {
  data: ProductDataType;
}) {
  const { displayedMainImg, path } = useProduct(); // Get the displayed main image and the path from the useProduct custom hook
  const { setModalData } = useModal(); // Get the setModalData function from the useModal custom hook
  const { width } = useWindowSize(); // Get the current window size from the useWindowSize custom hook
  const [visibleImages, setVisibleImages] = useState(8); // Set the initial number of visible images to 8

  const { images, name, variant, topSeller, limitedEdition } = data; // Destructure the data object

  // Open the modal with the image preview
  function openModalPreview(index: number) {
    setModalData({
      type: "image-preview",
      productData: data,
      index: index,
      path: path,
      displayedMainImg: displayedMainImg,
    });
  }

  const SwiperContainer = width < 900 ? Swiper : "section"; // If the viewport width is less than 900px, use the Swiper element from SwiperJS library. Otherwise, use a section element.
  const SwiperItem = width < 900 ? SwiperSlide : "div"; // If the viewport width is less than 900px, use the SwiperSlide element from SwiperJS library. Otherwise, use a div element.
  const swiperContainerOptions = {
    className: `product-image-gallery${
      width < 900 ? " mySwiper-product-mobile-carousel-slider" : ""
    }`, // Set the class name of the SwiperContainer element
    pagination: width < 900 ? true : undefined, // Set pagination only when SwiperJS is used
    loop: width < 900 ? true : undefined, // Set loop only when SwiperJS is used
    keyboard:
      width < 900
        ? {
            enabled: true,
          }
        : undefined, // Set keyboard navigation only when SwiperJS element is used
    modules: width < 900 ? [Pagination, Keyboard, A11y] : undefined, // Set modules only when SwiperJS is used
  };

  return (
    // Spread the swiperContainerOptions object
    <SwiperContainer {...swiperContainerOptions}>
      {/* Set heading for accessibility and SEO purposes */}
      <h3 className="visually-hidden">Galeria</h3>

      {/* Map over the images object and render a SwiperItem component for each image or video */}
      {Object.keys(images).map((key, index) => {
        // If SwiperJS is used or the index is less than the number of visible images, render the image or video
        if (width < 900 || index < visibleImages) {
          const imgUrl =
            index > 0
              ? `${productLink}/${path.collection}-${name}-${variant}__${images[key]}`
              : displayedMainImg.src; // If the index is greater than 0, set the base image URL to the URL of the image. Otherwise, set the base image URL to the URL of the displayed main image.
          const imgSrc = `${imgUrl}?f=s`; // Set the image source
          const imgSrcSet = `${imgUrl}?f=xl 750w, ${imgUrl}?f=l 700w, ${imgUrl}?f=m 600w, ${imgUrl}?f=s 500w, ${imgUrl}?f=xs 400w, ${imgUrl}?f=xxs 300w, ${imgUrl}?f=xxxs 160w`; // Set the image source set

          const InnerElement = key === "video" ? "div" : "button"; // If the image is a video, use a div element. Otherwise, use a button element.

          return (
            <SwiperItem
              key={key}
              className="product-image-gallery__item-wrapper"
            >
              <InnerElement
                className="product-image-gallery__btn"
                onClick={
                  width >= 900 && key !== "video"
                    ? () => openModalPreview(index)
                    : undefined
                } // If SwiperJs is not used and the image is not a video, open the modal with the image preview when the button is clicked
              >
                {/* If product is a top seller and is not limited edition set the top seller label for the first image */}
                {!limitedEdition && topSeller && index === 0 && (
                  <strong className="top-seller">Top Seller</strong>
                )}

                {/* If product is limited edition set the limited edition label for the first image */}
                {limitedEdition && index === 0 && (
                  <strong className="limited-edition">
                    Kolekcja limitowana
                  </strong>
                )}

                {/* If the image is a video, render the Video component. Otherwise, render the Image component. */}
                {key === "video" ? (
                  <Video
                    src={images[key]} // Set the video source
                    openModal={() => openModalPreview(index)} // Open the modal with the video preview when the video is clicked
                  />
                ) : (
                  <Image imgSrc={imgSrc} imgSrcSet={imgSrcSet} />
                )}
              </InnerElement>
            </SwiperItem>
          );
        } else {
          return null;
        }
      })}

      {/* // If the viewport width is greater than or equal to 900px and there are more than value in visibleImages, render the ShowMoreImagesBtn component */}
      {width >= 900 && Object.keys(images).length > 8 && (
        <ShowMoreImagesBtn
          images={images}
          visibleImages={visibleImages}
          setVisibleImages={setVisibleImages} // Increase the number of visible images when the button is clicked
        />
      )}
    </SwiperContainer>
  );
}
