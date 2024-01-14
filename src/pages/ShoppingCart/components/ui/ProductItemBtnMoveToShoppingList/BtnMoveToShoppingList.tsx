// Import custom hooks
import useModal from "../../../../../hooks/useModal/useModal";
// Import types
import type { ShoppingCartType } from "../../../../../context/AppContext/types/ShoppingCartType";

/**
 * BtnMoveToShoppingList is a functional component that takes in a product as a prop.
 * It uses the useModal custom hook to get the setModalData function.
 * It renders a button with a "fs-sm" class that calls the addToShoppingList function when it is clicked.
 * The addToShoppingList function sets the modal data to a "select-list" type and the product.
 *
 * @param {ShoppingCartType} product The product passed to the BtnMoveToShoppingList component.
 * @returns {JSX.Element} A button with a "fs-sm" class.
 */

export function BtnMoveToShoppingList({
  product,
}: {
  product: ShoppingCartType;
}) {
  const { setModalData } = useModal(); // Get the setModalData function using the useModal custom hook.

  // Define a function to add the product to the shopping list.
  function addToShoppingList() {
    // Set the modal data to a "select-list" type and the product.
    setModalData({
      type: "select-list",
      product: product,
    });
  }

  return (
    <button type="button" className="fs-sm" onClick={addToShoppingList}>
      Przenieś do listy zakupów
    </button>
  );
}
