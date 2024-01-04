// Import react router dependencies
import { useParams } from "react-router-dom";
// Import constants
import { productLink } from "../../../../../../constants/links";

/**
 * ImgContainer Component
 *
 * This is a React functional component. It displays an image within a div container. The image source is constructed based on the URL parameters and the `img` prop. The image is lazy loaded for performance optimization.
 *
 * @param {string} img - The name of the image file.
 *
 * @example
 * <ImgContainer img="product-image.jpg" />
 *
 * @returns A JSX element that consists of a `div` with the class name `additional-info__img-wrapper`. Inside this `div`, it renders an `img` element. The `src` attribute of the `img` element is set to the medium size of the image, and the `srcset` attribute is set to different sizes of the image for responsive loading. The `sizes` attribute is set to determine the image size based on the viewport width. The `alt` attribute is left empty, and the `loading` attribute is set to "lazy" to lazy load the image.
 */

export function ImgContainer({ img }: { img: string }) {
  const params = useParams(); // Get the params from the URL.
  const imgLink = `${productLink}/${params.collection}-${params.product}-${params.type}__${img}`; // Create the base link to the image.
  const imgSrc = `${imgLink}?f=m`; // Set the default image size to medium.
  const imgSrcSet = `${imgLink}?f=xxxl 1100w, ${imgLink}?f=xxl 900w, ${imgLink}?f=xl 750w, ${imgLink}?f=l 700w, ${imgLink}?f=m 600w, ${imgLink}?f=s 500w, ${imgLink}?f=xs 400w, ${imgLink}?f=xxs 300w, ${imgLink}?f=xxxs 160w, ${imgLink}?f=u 80w, ${imgLink}?f=xu 40w`; // Set the image sizes for the srcset attribute.

  return (
    <div className="additional-info__img-wrapper">
      <img
        src={imgSrc}
        srcSet={imgSrcSet}
        sizes="(max-width: 599px) 100vw, (max-width: 899px) 80vw, (max-width: 1400px) 33vw,  600px"
        alt=""
        loading="lazy" // Lazy load the image.
      />
    </div>
  );
}
