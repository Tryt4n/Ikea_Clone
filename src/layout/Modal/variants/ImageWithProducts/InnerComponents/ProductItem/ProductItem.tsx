// Custom Hooks
import useApp from "../../../../../../hooks/useApp";
import useModal from "../../../../../../hooks/useModal";
import useToast from "../../../../../../hooks/useToast";
// Import compound components
import Collection from "../../../../../../compoundComponents/CollectionProducts/layout/Collection";
// Import components
import RatingBlock from "../../../../../../components/features/RatingBlock/RatingBlock";
import AddToWishListBtn from "../../../../../../components/ui/AddToWishListBtn/AddToWishListBtn";
import { Btn } from "../../../../../../components/ui/Btn/Btn";
// Import constants
import { productLink as imageLink } from "../../../../../../constants/links";
// Import types
import type { extendedProductType } from "../../ImageWithProducts";
import type { ShoppingCartType } from "../../../../../../context/AppContext/types/ShoppingCartType";
// Import icons
import ShoppingCartAddIcon from "../../../../../../Icons/ShoppingCartAddIcon";

type ProductItemPropsType = {
  product: extendedProductType;
  fetchedData: (productLink: string) => Promise<ShoppingCartType | null>;
};

export function ProductItem({ product, fetchedData }: ProductItemPropsType) {
  const { state, dispatch } = useApp(); // Get the app state and dispatch from the useApp custom hook
  const { modalData, setModalData } = useModal(); // Get the modal data and setModalData from the useModal custom hook
  const { setToastData } = useToast(); // Get the toast data from the useToast custom hook

  /**
   * Adds a product to the shopping cart.
   *
   * @async
   * @param {string} productLink - The link to the product page.
   */
  async function addToShoppingCart(productLink: string) {
    const product = await fetchedData(productLink); // Fetch the product data

    // If the product exists, dispatch the addToShoppingCart action with the product as the payload
    if (product) {
      dispatch({
        type: "addToShoppingCart",
        payload: [product],
      });
    }

    // Set the toast notification
    setToastData({
      open: true,
      text: `${product?.collection} dodano do koszyka.`,
      link: "/shoppingcart",
    });
  }

  /**
   * Adds a product to the shopping list.
   *
   * @async
   * @param {string} productLink - The link to the product page.
   */
  async function addToShoppingList(productLink: string) {
    const product = await fetchedData(productLink); // Fetch the product data

    // If the product exists and there are no lists, dispatch the addProductsToList action with the product and a new list id as the payload
    if ((!state.favouriteLists || state.favouriteLists.length === 0) && product) {
      const newListId = crypto.randomUUID(); // Create a new list id

      dispatch({
        type: "addProductsToList",
        payload: {
          products: [product],
          listId: newListId,
        },
      });

      // Set the toast notification
      setToastData({
        open: true,
        text: `${product.collection} został zapisany na liście Moja lista.`,
        link: `/favourites/${newListId}`,
      });
    } else if (product) {
      // If the product exists and there are lists, dispatch the addProductsToList action with the product and the first list id as the payload
      setModalData({
        type: "select-list",
        product: product,
        previousModal: modalData,
      });
    }
  }

  // Checks if the product is already in any list
  function checkIsProductAlreadyInAnyList(productLink: string) {
    const regex = /(\d+)$/; // Create a regex for the product number. Example: https://some-link.com/70434301/
    const matchResult = productLink.match(regex); // Match the product number

    if (matchResult === null) return false; // If the product number is not found, return false
    const productNumber = matchResult[0]; // Get the product number

    // Check if the product is already in any list
    const isProductAlreadyInAnyList =
      state.favouriteLists &&
      state.favouriteLists.some(
        (list) =>
          list.products &&
          list.products.some(
            (product) => product.productNumber.replace(/\./g, "") === productNumber
          )
      );

    return isProductAlreadyInAnyList ? isProductAlreadyInAnyList : false; // Return the result
  }

  const {
    id,
    productLink,
    productHeading,
    productSubHeading,
    topSellerTag,
    newPriceTag,
    productPriceInteger,
    productQuantity,
    productSizeInMeters,
    imgHoverSrc,
    imgSrc,
    productPriceDecimal,
    rating,
  } = product; // Destructure the product data

  const mainImgSrc = `${imageLink}/${imgSrc}_s5.jpg?f=xxs`; // The image source
  const mainImgSrcSet = `${imageLink}/${imgSrc}_s5.jpg?f=m 600w, ${imageLink}/${imgSrc}_s5.jpg?f=xxs 300w, ${imageLink}/${imgSrc}_s5.jpg?f=xxxs 160w, ${imageLink}/${imgSrc}_s5.jpg?f=u 80w`; // The image source set
  const hoverImgSrc = `${imageLink}/${imgHoverSrc}_s5.jpg?f=xxs`; // The image source for the hover state
  const hoverImgSrcSet = `${imageLink}/${imgHoverSrc}_s5.jpg?f=m 600w, ${imageLink}/${imgHoverSrc}_s5.jpg?f=xxs 300w, ${imageLink}/${imgHoverSrc}_s5.jpg?f=xxxs 160w, ${imageLink}/${imgHoverSrc}_s5.jpg?f=u 80w`; // The image source set for the hover state
  const imgSizes = "(max-width: 400px) 80px, (max-width: 1450px) 160px, 300px"; // The image sizes

  return (
    <li key={id}>
      <a
        href={productLink} // Link to the product page
        className="image-with-products-modal__product"
      >
        <div className="image-with-products-modal__product-img-container">
          <div className="image-with-products-modal__thumbnail-wrapper">
            <img
              src={mainImgSrc}
              srcSet={mainImgSrcSet}
              sizes={imgSizes}
              alt={`${productHeading} ${productSubHeading}`}
              className="image-with-products-modal__thumbnail-img"
            />
            <img
              src={hoverImgSrc}
              srcSet={hoverImgSrcSet}
              sizes={imgSizes}
              alt="Zdjęcie produktu pokazujące jego wykorzystanie"
              className="image-with-products-modal__thumbnail-img-hover"
            />
          </div>

          {
            // If the product is a top seller, display the top seller tag
            topSellerTag && <strong className="top-seller">Top Seller</strong>
          }
        </div>

        <div className="image-with-products-modal__product-text-wrapper">
          {
            // If the product has a new price tag, display the new price tag
            newPriceTag && (
              <em className="image-with-products-modal__product-new-price-tag">Nowa niższa cena</em>
            )
          }

          <strong className="image-with-products-modal__product-heading">{productHeading}</strong>
          <p className="image-with-products-modal__product-subheading">{productSubHeading}</p>

          <Collection.ListItemPrice
            price={productPriceInteger}
            priceDecimal={productPriceDecimal}
            quantity={productQuantity}
            sizeInMeters={productSizeInMeters}
          />

          {
            // If the product has a last price tag, display the last price of the product
            newPriceTag && (
              <Collection.ListItemLastPriceDescription
                lastPrice={newPriceTag.lastItemPriceInteger}
                lastPriceDecimal={newPriceTag.lastItemPriceDecimal}
                className="image-with-products-modal__product-last-price-tag"
              />
            )
          }

          {
            // If the product has a rating, display the rating
            rating && <RatingBlock rating={rating} />
          }
        </div>

        <div className="image-with-products-modal__product-btns-wrapper">
          <Btn
            variant="blue"
            shape="circle"
            type="button"
            onClick={(e) => {
              e.preventDefault(); // Prevent the default form submission
              addToShoppingCart(productLink); // Add the product to the shopping cart
            }}
          >
            {/* Visually hidden text used for screen readers and SEO purposes */}
            <span className="visually-hidden">Dodaj produkt do koszyka</span>
            <ShoppingCartAddIcon />
          </Btn>

          <AddToWishListBtn
            variant="light-with-border"
            active={checkIsProductAlreadyInAnyList(productLink)} // Check if the product is already in any list. If it is icon on the button will be filled otherwise it will be outlined.
            onClick={(e) => {
              e.preventDefault(); // Prevent the default form submission
              addToShoppingList(productLink); // Add the product to the shopping list
            }}
          />
        </div>
      </a>
    </li>
  );
}
