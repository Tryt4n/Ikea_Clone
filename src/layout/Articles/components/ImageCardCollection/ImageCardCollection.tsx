// Import custom hooks
import useModal from "../../../../hooks/useModal/useModal";
// Import components
import Article from "../../../../compoundComponents/Article/Article";
import CollectionProductsList from "../CollectionProductsList/CollectionProductsList";
// Import types
import type { AspectRatioType } from "../../../../types/articleTypes";
import type { ProductType } from "../CollectionProductsList/CollectionProductsList";

// Define type for component props
export type ImageCardCollectionType = {
  card: CardCollectionType; // Card data
  onHoverStatus?: boolean; // Whether the hover status is enabled
  hideTooltips?: boolean; // Whether the tooltips should be hidden
};

// Define type for card data
export type CardCollectionType = {
  id: string; // Card ID
  img: {
    imgSrc: string; // Image source
    imgSrcSet: string; // Image source set
    imgAlt: string; // Image alt
    imgAspectRatio: AspectRatioType; // Image aspect ratio
  }; // Image data
  instagramUser?: string; // Instagram user
  favoriteIcon?: boolean; // Whether the favorite icon should be displayed
  addToWishlistIcon?: boolean; // Whether the add to wishlist icon should be displayed
  products: ProductType[]; // Products data
};

/**
 * ImageCardCollection.tsx
 *
 * This file contains the definition of the ImageCardCollection component. This component serves as a card collection
 * for the application and is responsible for rendering an image card with associated products.
 *
 * The ImageCardCollection component uses the `useModal` custom hook to manage the modal state.
 *
 * The component uses the `Article` component to create the card and the `CollectionProductsList` component to render the products.
 *
 * The `checkIfIsListItem` function is used to determine whether a given HTML element is a list item or a button.
 * The `openImageModal` function is used to open the modal with the image and products when the card is clicked, unless the click was on a list item or a button.
 *
 * @param {CardCollectionType} props.card - The card data.
 * @param {boolean} props.onHoverStatus - Whether the hover status is enabled.
 * @param {boolean} props.hideTooltips - Whether the tooltips should be hidden.
 * @returns {JSX.Element} `ImageCardCollection` component.
 */

export default function ImageCardCollection({
  card,
  onHoverStatus,
  hideTooltips,
}: ImageCardCollectionType) {
  const { modalID, setModalData } = useModal(); // Get modal ID and setter function from the `useModal` custom hook

  const { id, img, instagramUser, products } = card; // Destructure card data

  // Define function to check if the element is a list item or a button
  function checkIfIsListItem(element: HTMLElement) {
    // Check if the element is a list item or a button
    if (element.tagName === "LI" || element.tagName === "BUTTON") {
      return true;
    } else {
      // If not, check if the element has a parent node
      if (element.parentNode) {
        return checkIfIsListItem(element.parentNode as HTMLElement); // Return the result of the function called on the parent node
      }
    }

    return false;
  }

  // Define function to open the modal with the image and products
  function openImageModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const isListItem = !hideTooltips
      ? checkIfIsListItem(e.target as HTMLElement)
      : false; // Check if the click was on a list item or a button

    if (isListItem) return; // If the click was on a list item or a button, return

    // Set the modal data
    setModalData({
      type: "image-with-products",
      productsData: card,
    });
  }

  return (
    <Article.Section
      key={id}
      aria-controls={modalID} // Set the modal ID as the value of the `aria-controls` attribute
      onClick={(e) => openImageModal(e)} // Call the `openImageModal` function when the card is clicked
    >
      <Article.ImgContainer>
        <Article.Img
          src={img.imgSrc}
          srcSet={img.imgSrcSet}
          alt={img.imgAlt}
          aspectRatio={img.imgAspectRatio}
          sizes="(min-width: 1824px) 508.333px, (min-width: 1200px) calc(((100vw - (2.8125rem + 3.125rem)) - (((100vw - (2.8125rem + 3.125rem)) / 13) + 1.25rem))/3 - (1.25rem / 2)), (min-width: 900px) calc(33.333vw - ((1.25rem * 2) / 3) - ((3.125rem * 2) / 3)), (min-width: 600px) calc((100vw - 3.75rem - (0.9375rem * 2)) / 3), calc(50vw - 2.5rem + (0.625rem))"
        />

        {/* Render the Instagram badge if the Instagram user is provided */}
        {instagramUser && (
          <Article.InstagramBadge nickVisible={false}>
            {instagramUser}
          </Article.InstagramBadge>
        )}

        <CollectionProductsList
          products={products}
          onHoverStatus={onHoverStatus}
          hideTooltips={hideTooltips}
        />
      </Article.ImgContainer>
    </Article.Section>
  );
}
