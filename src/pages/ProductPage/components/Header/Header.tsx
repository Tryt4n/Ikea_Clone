// Import custom hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
import useToast from "../../../../hooks/useToast";
// Import components
import AddToWishListBtn from "../../../../components/ui/AddToWishListBtn/AddToWishListBtn";
// Import types
import type { ProductDataType } from "../../types/ProductDataType";
import type { ShoppingCartType } from "../../../../context/AppContext/AppContext";
// Import styles
import "./index.scss";

/**
 * Header Component
 *
 * This is a React functional component. It displays the header for a product page, including the product name, variant, size, and an "Add to Wishlist" button.
 *
 * @param {ProductDataType} data - The product data to be displayed in the header.
 *
 * @example
 * <Header data={productData} />
 *
 * @returns A JSX element that consists of a `header` with the class name `product-header`. Inside this `header`, it renders a `h3` element that displays the product name, variant, and size, and an `AddToWishListBtn` component that allows users to add the product to their wishlist.
 */

export default function Header({ data }: { data: ProductDataType }) {
  const { state, dispatch } = useApp(); // Access the global app state and dispatch function.
  const { setModalData } = useModal(); // Access the setModalData function to manage modal data.
  const { setToastData } = useToast(); // Access the setToastData function to manage toast notifications.

  // Destructure the product data.
  const {
    collection,
    nameToDisplay,
    variantName,
    size,
    images,
    name,
    price,
    productNumber,
    variant,
    oldPriceTag,
    newTag,
    rating,
  } = data;

  // Construct the product data for the shopping cart.
  const product: ShoppingCartType = {
    collection,
    images,
    name,
    nameToDisplay,
    price,
    productNumber,
    size,
    variant,
    variantName,
    oldPrice: oldPriceTag,
    quantity: 1,
    productLink: `/products/${collection}/${name}/${variant}/${productNumber.replace(/\./g, "")}`, // Replace all dots in the `productNumber` with empty strings.
    newTag,
    addedDate: new Date(),
    rating: rating,
  };

  // Function to add the product to the wishlist.
  function addProductToList() {
    if (!state.favouriteLists || state.favouriteLists.length === 0) {
      // If there are no lists, create a new list.
      const newListId = crypto.randomUUID(); // Generate a random UUID for the new list.

      dispatch({
        type: "addProductsToList",
        payload: {
          listId: newListId,
          products: [product],
        },
      });

      // Show a toast notification that the product has been added to the wishlist.
      setToastData({
        open: true,
        text: `${product.collection} został zapisany na liście Moja lista.`,
        link: `/favourites/${newListId}`,
      });
    } else {
      openSelectListModal(); // Else open the modal for selecting a wishlist.
    }
  }

  // Function to open the modal for selecting a wishlist.
  function openSelectListModal() {
    setModalData({
      type: "select-list",
      product: product,
    });
  }

  // Check if the product is already in any wishlist.
  const isProductAlreadyInAnyList =
    state.favouriteLists &&
    state.favouriteLists.some(
      (list) =>
        list.products && list.products.some((product) => product.productNumber === productNumber)
    );

  return (
    <header className="product-header">
      <h3>
        <strong>{collection}</strong>
        <span>
          {" "}
          {nameToDisplay}, {variantName}
          {/* Display the size if it is not "universal". */}
          {size !== "universal" && (
            <>
              , &nbsp;<button>{size}</button>
            </>
          )}
        </span>
      </h3>

      <AddToWishListBtn
        variant="light"
        onClick={addProductToList}
        active={isProductAlreadyInAnyList} // Set the button to active if the product is already in any wishlist. Visually icon is filled instead of outlined.
      />
    </header>
  );
}
