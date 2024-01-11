// Import custom hooks
import useApp from "../../../../../../hooks/useApp/useApp";
import useModal from "../../../../../../hooks/useModal/useModal";
import useToast from "../../../../../../hooks/useToast/useToast";
// Import date-fns dependencies
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import pl from "date-fns/locale/pl";
// Import components
import Input from "../../../../../../components/features/Input/Input";
// Import helpers functions
import { startViewTransition } from "../../../../../../utils/helpers";
// Import constants
import { productLink } from "../../../../../../constants/links";
// Import types
import type { FavouritesListType } from "../../../../../../context/AppContext/types/FavouritesListType";
// Import icons
import NoImageIcon from "../../../../../../Icons/NoImageIcon";
import HeartIcon from "../../../../../../Icons/HeartIcon";

// Define props type for the component
type ListPropsType = {
  list: FavouritesListType; // The list to display
  isProductAlreadyInAnyList?: boolean; // Whether the product is already in any list
};

/**
 * `List` is a React component that displays a list of favourite products.
 * It uses several custom hooks (`useApp`, `useModal`, `useToast`) to manage state and actions.
 * It also uses the `Input` component to create a checkbox for each list item.
 * The component receives two props: `list` (the list to display) and `isProductAlreadyInAnyList` (whether the product is already in any list).
 *
 * @param {FavouritesListType} props.list - The list to display.
 * @param {boolean} props.isProductAlreadyInAnyList - Whether the product is already in any list.
 * @returns {JSX.Element} The rendered `List` component.
 */

export function List({ list, isProductAlreadyInAnyList }: ListPropsType) {
  const { state, dispatch } = useApp(); // Get the state and dispatch function from the `useApp` hook
  const { modalData, closeModal } = useModal(); // Get the modal data and the `closeModal` function from the `useModal` hook
  const { setToastData } = useToast(); // Get the `setToastData` function from the `useToast` hook

  // Check if the product is already in the current list
  const isProductAlreadyInCurrentList =
    modalData &&
    modalData.type === "select-list" &&
    list.products &&
    list.products.some(
      (product) => modalData.product && product.productNumber === modalData.product.productNumber
    );

  /**
   * `handleListActions` is a function that handles the actions for the list items.
   * It uses a switch statement to handle different types of actions based on the `modalData.type`.
   * The function uses the `dispatch` function from the `useApp` hook to dispatch actions to the state.
   * It also uses the `closeModal` function from the `useModal` hook to close the modal after an action is performed.
   * Finally, it uses the `setToastData` function from the `useToast` hook to display a toast message after an action is performed.
   */
  function handleListActions() {
    startViewTransition(() => {
      if (modalData) {
        switch (modalData.type) {
          case "move-to-other-list":
            if (!state.editingList || !list.products) break; // If there is no editing list or no products in the list, break out of the switch statement

            dispatch({
              type: "moveProductsFromOneListToAnother",
              payload: {
                products: state.editingList.products!, // Move all products from the currently editing list
                listWhereProductIsMovedID: list.id, // To the list where the product is moved
                originalListId: state.editingList.id, // From the original list
              },
            });

            closeModal();

            setToastData({
              open: true,
              text: `Pomyślnie przeniesiono produkty z listy ${state.editingList.name} na listę ${list.name}.`,
            });
            break;

          case "select-list":
            isProductAlreadyInCurrentList ? removeFromList() : addToList(); // If the product is already in the current list, remove it, otherwise add it
            break;

          case "move-product-from-one-list-to-another":
            dispatch({
              type: "moveProductsFromOneListToAnother",
              payload: {
                products: modalData.products, // Move all products from the current list
                originalListId: modalData.originalListId, // From the original list
                listWhereProductIsMovedID: list.id, // To the list where the product is moved
              },
            });

            closeModal();

            setToastData({
              open: true,
              text:
                modalData.products.length > 1
                  ? `Artykuły w ilości: (${modalData.products.length}) zostały przeniesione na listę ${list.name}.`
                  : `Pomyślnie przeniesiono ${modalData.products[0].collection} na listę ${list.name}.`, // Display a different toast message depending on the number of products moved
              link: `/favourites/${list.id}`, // Link to the list where the product is moved
            });
            break;

          case "select-list-with-products":
            dispatch({
              type: "addProductsToList",
              payload: {
                products: modalData.products, // Add all products from the current list
                listId: list.id, // To the list where the product is moved
              },
            });

            closeModal();

            setToastData({
              open: true,
              text: `Produkty (${modalData.products.length}) zostały zapisane na liście ${list.name}.`,
            });
            break;

          default:
            break;
        }
      }
    });
  }

  /**
   * `addToList` is a function that adds a product to the list.
   * It dispatches an action to the state with the `dispatch` function from the `useApp` hook.
   * It also displays a toast message with the `setToastData` function from the `useToast` hook.
   */
  function addToList() {
    if (modalData?.type === "select-list") {
      dispatch({
        type: "addProductsToList",
        payload: {
          products: [modalData.product], // Add the product to the list
          listId: list.id, // To the list where the product is moved
        },
      });

      setToastData({
        open: true,
        text: `${modalData.product.collection} został zapisany na liście ${list.name}`,
        link: `/favourites/${list.id}`, // Link to the list where the product is moved
        alignLeft: true, // Align the toast message to the left
      });
    }
  }

  /**
   * `removeFromList` is a function that removes a product from the list.
   * It dispatches an action to the state with the `dispatch` function from the `useApp` hook.
   * It also displays a toast message with the `setToastData` function from the `useToast` hook.
   */
  function removeFromList() {
    if (modalData?.type === "select-list") {
      dispatch({
        type: "deleteProductsFromList",
        payload: {
          productNumbers: [modalData.product.productNumber],
          listId: list.id,
        },
      });

      setToastData({
        open: true,
        text: `${modalData.product.collection} został usunięty z listy ${list.name}`,
        alignLeft: true,
      });
    }
  }

  const firstListProduct = list.products && list.products[0]; // Get the first product from the list
  const imgSrc =
    firstListProduct &&
    `${productLink}/${firstListProduct.collection}-${firstListProduct.name}-${firstListProduct.variant}__${firstListProduct.images.main}`; // Create the image source for the first product from the list

  return (
    <>
      {modalData &&
        // If the modal type is proper and the list ID is not the same as the editing list ID
        (modalData.type === "select-list" ||
          ((modalData.type === "move-to-other-list" ||
            modalData.type === "move-product-from-one-list-to-another" ||
            modalData.type === "select-list-with-products") &&
            list.id !== state.editingList?.id)) && (
          <li>
            <button
              className="select-list-modal__list-item"
              onClick={handleListActions} // Handle the list actions on click
              type="button"
            >
              <div className="select-list-modal__list-wrapper">
                {/* If the list has products and the first product has an image, display the image */}
                {list.products && list.products.length > 0 && (
                  <img
                    alt="Jeden z produktów na liście"
                    src={imgSrc}
                    loading="lazy" // Lazy load the image
                    className="select-list-modal__list-item-img"
                  />
                )}

                {
                  // If the list has no products and the modal type is not "move-to-other-list", display the svg icon
                  modalData.type !== "move-to-other-list" &&
                    list.products &&
                    list.products.length === 0 &&
                    isProductAlreadyInAnyList && (
                      <div className="select-list-modal__list-item-img">
                        <NoImageIcon />
                      </div>
                    )
                }

                <div className="select-list-modal__list-text-wrapper">
                  <strong>{list.name}</strong>
                  <time
                    dateTime={list.lastEdit.toString()} // Convert the date to a string with date-fns
                  >
                    Zaktualizowano&nbsp;
                    {
                      // Display the date in a human-readable format with date-fns
                      formatDistanceToNow(new Date(list.lastEdit), {
                        addSuffix: true, // Add the "ago" suffix
                        locale: pl, // Use the Polish locale
                      })
                    }
                  </time>
                </div>
              </div>

              {modalData.type !== "move-to-other-list" && (
                <>
                  {
                    // If the product is already in any list, display the heart icon, otherwise display the checkbox to add the product to the list
                    !isProductAlreadyInAnyList ? (
                      <HeartIcon className={isProductAlreadyInAnyList ? "active" : undefined} />
                    ) : (
                      <div className="select-list-modal__input-wrapper">
                        <Input
                          type="checkbox" // Set the input type to checkbox
                          id={list.id}
                          label={`Naciśnij aby ${
                            isProductAlreadyInCurrentList ? "usunąć produkt z" : "dodać produkt do"
                          } listy "${list.name}"`} // Set the label text depending on whether the product is already in the list or not
                          inputProps={{
                            checked: isProductAlreadyInCurrentList, // Set the checked attribute depending on whether the product is already in the list or not
                            onChange: handleListActions, // Handle the list actions on change
                            tabIndex: -1, // Set the tab index to -1 to prevent the checkbox from being focused because it is handled by other elements
                          }}
                          labelProps={{
                            className: "visually-hidden", // Hide the label text, but it is still accessible for screen readers
                          }}
                        />
                      </div>
                    )
                  }
                </>
              )}
            </button>
          </li>
        )}
    </>
  );
}
