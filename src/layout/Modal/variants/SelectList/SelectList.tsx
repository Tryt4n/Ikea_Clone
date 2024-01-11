// Import custom hooks
import useApp from "../../../../hooks/useApp/useApp";
import useModal from "../../../../hooks/useModal/useModal";
// Import helpers functions
import { startViewTransition } from "../../../../utils/helpers";
// Import components
import { Btn } from "../../../../components/ui/Btn/Btn";
import { List } from "./InnerComponents/List/List";
// Import styles
import "./index.scss";

/**
 * `SelectList` is a React component that displays a list selection interface.
 * It uses several custom hooks (`useApp`, `useModal`) to manage state and actions.
 * It also uses the `Btn` and `List` components to create the interface.
 *
 * @returns {JSX.Element} The rendered `SelectList` component.
 */

export default function SelectList() {
  const { state } = useApp(); // Get state from useApp custom hook
  const { modalData, setModalData } = useModal(); // Get modalData and setModalData from custom useModal hook

  /**
   * `createNewList` is a function that handles the creation of a new list.
   * It uses the `startViewTransition` helper function to start a view transition.
   * If `modalData` exists, it uses a switch statement to handle different types of actions based on the `modalData.type`.
   * The function uses the `setModalData` function from the `useModal` hook to set the modal data after an action is performed.
   */
  function createNewList() {
    startViewTransition(() => {
      if (modalData) {
        switch (modalData.type) {
          case "select-list":
            setModalData({
              type: "create-list",
              product: modalData.product,
            });
            break;

          case "move-to-other-list":
            // If the state has an editingList and the editingList has products, set the modalData to create a list with the editingList products
            if (state.editingList && state.editingList.products) {
              setModalData({
                type: "create-list-with-products",
                products: state.editingList.products,
              });
            }
            break;

          case "move-product-from-one-list-to-another":
            setModalData({
              type: "create-list-with-products",
              products: modalData.products,
            });
            break;

          case "select-list-with-products":
            setModalData({
              type: "create-list-with-products",
              products: modalData.products,
            });
            break;
        }
      }
    });
  }

  // Check if the product is already in any list
  const isProductAlreadyInAnyList =
    modalData &&
    modalData.type === "select-list" &&
    state.favouriteLists &&
    state.favouriteLists.some(
      (list) =>
        list.products &&
        list.products.some((product) => product.productNumber === modalData.product.productNumber)
    );

  const Element = isProductAlreadyInAnyList ? "form" : "div"; // If the product is already in any list, use a form element, otherwise use a div element

  return (
    <Element
      className="select-list-modal"
      onSubmit={Element === "form" ? (e) => e.preventDefault() : undefined} // Prevent form submission if the product is already in any list
    >
      {modalData &&
        (modalData.type === "move-to-other-list" ||
          modalData.type === "move-product-from-one-list-to-another" ||
          modalData.type === "select-list-with-products") && (
          <p className="select-list-modal__other-list-text">
            Wybierz listę, na którą chcesz przenieść{" "}
            {/* Display different text based on the modalData.type (the number of products) */}
            {modalData.type === "move-product-from-one-list-to-another"
              ? "ten produkt"
              : "te produkty"}
            .
          </p>
        )}

      {
        // if there are favouriteLists in the state, render a list of lists
        state.favouriteLists && (
          <ul className="select-list-modal__list">
            {/* Map through the favouriteLists and render a List component for each list */}
            {state.favouriteLists.map((list) => (
              <List
                key={list.id}
                list={list}
                isProductAlreadyInAnyList={isProductAlreadyInAnyList}
              />
            ))}
          </ul>
        )
      }

      <div className="select-list-modal__btns-wrapper">
        <Btn
          size="big"
          type="button"
          variant={isProductAlreadyInAnyList ? "white-with-border" : "dark"} // If the product is already in any list, use a white button with a border, otherwise use a dark button
          onClick={createNewList} // Call the createNewList function when the button is clicked
        >
          {/* Display different text based on the modalData.type */}
          {modalData?.type === "move-to-other-list" ? "Utwórz nową listę" : "Stwórz listę"}
        </Btn>
      </div>
    </Element>
  );
}
