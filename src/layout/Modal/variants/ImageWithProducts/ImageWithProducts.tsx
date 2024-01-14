// Import custom hooks
import useModal from "../../../../hooks/useModal/useModal";
import useWindowSize from "../../../../hooks/useWindowSize/useWindowSize";
// Import compound components
import Article from "../../../../compoundComponents/Article/Article";
import CollectionProductsList from "../../../../layout/Articles/components/CollectionProductsList/CollectionProductsList";
// Import components
import { Btn } from "../../../../components/ui/Btn/Btn";
import { ProductItem } from "./InnerComponents/ProductItem/ProductItem";
// Import types
import type { ProductType } from "../../../../layout/Articles/components/CollectionProductsList/CollectionProductsList";
import type { ModalImageWithProductsType } from "../../types/ModalTypes";
import type { ProductDataType } from "../../../../pages/ProductPage/types/ProductDataType";
import type { ShoppingCartType } from "../../../../context/AppContext/types/ShoppingCartType";
// Import icons
import CloseIcon from "../../../../Icons/CloseIcon";
import InstagramIcon from "../../../../Icons/InstagramIcon";
// Import styles
import "./index.scss";

// Define the props type for the component
export type ImageWithProductsPropsType = {
  data: ModalImageWithProductsType;
};

// Define the props type for the product
export type extendedProductType = ProductType & {
  // The type of the product
  imgSrc?: string; // The image source
  imgHoverSrc?: string; // The image source for the hover state
  rating?: {
    rate: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
    quantity: number;
  }; // The rating
};

/**
 * ImageWithProducts is a React component that displays a modal with an image and a list of products.
 * Each product has a link to its own page, an image, a title, a subtitle, a price, and buttons to add the product to the shopping cart or wishlist.
 * The component uses several custom hooks for managing modal state, toast notifications, app state, and window size.
 * It also fetches product data from a remote server when a product is added to the shopping cart or wishlist.
 *
 * @param {ModalImageWithProductsType} props.data - The data for the modal and the products to display.
 *
 * @example
 * <ImageWithProducts data={data} />
 */

export default function ImageWithProducts({
  data,
}: ImageWithProductsPropsType) {
  const { closeModal } = useModal(); // Get the closeModal from the useModal custom hook
  const { width, height } = useWindowSize(); // Get the window size from the useWindowSize custom hook

  const { productsData } = data; // Get the products data from the props

  /**
   * Fetches product data from a remote server.
   *
   * @async
   * @param {string} productLink - The link to the product page.
   * @returns {Promise<ShoppingCartType|null>} The fetched product data or null if an error occurred.
   */
  async function fetchedData(
    productLink: string,
  ): Promise<ShoppingCartType | null> {
    const URL = `https://tryt4n.github.io/Ikea-data/server/${productLink}/data.json`;

    try {
      const response = await fetch(URL); // Fetch the data
      const fetchedData: ProductDataType = await response.json(); // Convert the response to JSON

      const {
        productNumber,
        collection,
        name,
        nameToDisplay,
        variant,
        variantName,
        size,
        price,
        oldPriceTag,
        images,
        newTag,
        rating,
      } = fetchedData; // Destructure the fetched data

      const product: ShoppingCartType = {
        quantity: 1,
        productNumber,
        collection,
        name,
        nameToDisplay,
        variant,
        variantName,
        size,
        price,
        oldPrice: oldPriceTag,
        images,
        productLink,
        newTag,
        addedDate: new Date(),
        rating: rating,
      }; // Create a product object

      return product; // Return the product object
    } catch (error) {
      console.error("Error fetching data:", error); // Log the error
      return null;
    }
  }

  return (
    <>
      <header className="image-with-products-modal__header">
        <h2 className="image-with-products-modal__heading">Wasze wnętrza</h2>

        <Btn
          variant="light"
          shape="circle"
          type="button"
          onClick={closeModal} // Close the modal
        >
          <span className="visually-hidden">Zamknij</span>
          <CloseIcon />
        </Btn>
      </header>

      {
        // If the window width is less than 1000px or the height is less than 700px and the instagram user exists, display the instagram user
        (width < 1000 || height < 700) && productsData.instagramUser && (
          <div className="image-with-products-modal__instagram-nick-mobile">
            <InstagramIcon />
            <span>{productsData.instagramUser}</span>
          </div>
        )
      }

      <div className="image-with-products-modal__main-content">
        {
          // If the window width is less than 1000px or the height is less than 700px, display the image with products
          width >= 1000 && height >= 700 && (
            <Article.ImgContainer className="image-with-products-modal__img-inner-wrapper">
              <Article.Img
                src={productsData.img.imgSrc}
                srcSet={productsData.img.imgSrcSet}
                alt={productsData.img.imgAlt}
                aspectRatio={productsData.img.imgAspectRatio}
                sizes="(min-width: 900px) 50vw, (max-width: 900px) 100vw, 100vw"
              />
              <CollectionProductsList products={productsData.products} />

              {
                // If the instagram user exists, display the instagram user
                productsData.instagramUser && (
                  <Article.InstagramBadge>
                    {productsData.instagramUser}
                  </Article.InstagramBadge>
                )
              }
            </Article.ImgContainer>
          )
        }

        <ul className="image-with-products-modal__products-list">
          {
            // Map through the products data and display each product
            productsData.products.map((product: extendedProductType) => (
              <ProductItem
                key={product.id}
                product={product}
                fetchedData={fetchedData}
              />
            ))
          }
        </ul>
      </div>
    </>
  );
}
