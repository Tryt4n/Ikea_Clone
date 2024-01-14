// Import custom hooks
import useProduct from "../../../../pages/ProductPage/context/useProduct";
import useCurrentProductPath from "../../../../hooks/useCurrentProductPath/useCurrentProductPath";
// Import components
import { Btn } from "../../../../components/ui/Btn/Btn";
// Import types
import type { ProductDataType } from "../../types/ProductDataType";
// Import utilities
import { getThumbnailsData } from "../../../../utils/getThumbnailsData";
// Import constants
import { productLink } from "../../../../constants/links";
// Import styles
import "./index.scss";

// Type for the props of the ThumbnailsImagesContainer component.
type ThumbnailsImagesContainerPropsType = {
  data: ProductDataType; // The product data.
  openModal: (data: ProductDataType) => void; // Function to open the modal.
};

/**
 * ThumbnailsImagesContainer Component
 *
 * This is a React functional component. It displays a list of thumbnail images for the different variants of a product. The component uses custom hooks to get the product data and the current product path. It also uses a utility function to get the data for the thumbnails.
 *
 * @param {ProductDataType} data - The product data.
 * @param {(data: ProductDataType) => void} props.openModal - Function to open the modal.
 *
 * @example
 * <ThumbnailsImagesContainer data={productData} openModal={handleOpenModal} />
 *
 * @returns A JSX element that consists of a `div` with the class name `product-thumbnails`. Inside this `div`, it maps over the `variants` array from the `data` prop and renders either a `div` or an `a` element for each variant, depending on whether the variant is the currently selected one. Each `div` or `a` element contains an `img` element and a `span` element. If the number of variants is greater than the maximum number of visible thumbnails which is 7, it also renders a `Btn` component that displays the number of remaining variants and opens the modal when clicked.
 */

export default function ThumbnailsImagesContainer({
  data,
  openModal,
}: ThumbnailsImagesContainerPropsType) {
  const { path, setDisplayedMainImg } = useProduct(); // Access the product path and the setDisplayedMainImg function from the product context.
  const location = useCurrentProductPath(path); // Get the current product path.

  const { variant, variants, variantsName, name, images } = data; // Destructure the product data.

  const maxVisibleThumbnails = 7; // The maximum number of visible thumbnails.

  return (
    <div
      className="product-thumbnails"
      aria-label="Linki do innych wariantów produktu"
    >
      {/* Map over the variants array and render a div or an a element for each variant, depending on whether the variant is the currently selected one. Each div or a element contains an img element and a span element. */}
      {variants.slice(0, maxVisibleThumbnails).map((productVariant, index) => {
        const { href, imgSrc, imgSrcSet, imgAlt } = getThumbnailsData(
          data,
          path,
          productVariant,
          index,
        ); // Get the data for the thumbnails.

        const Element = location === href ? "div" : "a"; // If the current product path matches the href, render a div element, otherwise render an a element.

        return (
          <Element
            key={productVariant}
            className={`product-thumbnails__link${variant === productVariant ? ` active` : ""}`} // Add variant to the class name if the variant is the currently selected one. If the variant is the currently selected one, add the class name `active`.
            href={Element === "a" ? href : undefined} // If the element is an a element, add the href attribute.
            aria-label={
              Element === "div" ? "Aktualnie wybrany wariant" : undefined
            } // If the element is currently selected, add the aria-label attribute.
            onMouseEnter={() => {
              setDisplayedMainImg({
                src: imgSrc.replace("?f=xu", ""),
                variant: variantsName[index],
              });
            }} // Set the displayed main image to the image for the current variant when the user hovers over the thumbnail.
            onMouseLeave={() => {
              setDisplayedMainImg({
                src: `${productLink}/${path.collection}-${name}-${variant}__${images.main}`,
                variant: path.type ? path.type : variant,
              });
            }} // Set the displayed main image to the image for the currently selected variant when the user stops hovering over the thumbnail.
          >
            <img
              src={imgSrc}
              srcSet={imgSrcSet}
              alt={imgAlt}
              loading="lazy" // Lazy load the image.
            />
            {/* Display the variant name for screen readers. */}
            <span className="visually-hidden">{variantsName[index]}</span>
          </Element>
        );
      })}

      {/* If the number of variants is greater than the maximum number of visible thumbnails, render a Btn component that displays the number of remaining variants and opens the modal when clicked. */}
      {variants.length > maxVisibleThumbnails && (
        <Btn
          variant="light-with-border"
          shape="circle"
          className="product-thumbnails__remaining-thumbnails-count"
          aria-label={`Dostępne są jeszcze ${variants.length - maxVisibleThumbnails} warianty`} // Announce the number of remaining variants to screen readers.
          onClick={() => openModal(data)} // Open the modal when the button is clicked.
        >
          {/* Display the number of remaining variants. */}+
          {variants.length - maxVisibleThumbnails}
        </Btn>
      )}
    </div>
  );
}
