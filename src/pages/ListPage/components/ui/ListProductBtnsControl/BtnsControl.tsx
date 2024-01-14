// Import custom hooks
import useApp from "../../../../../hooks/useApp/useApp";
import useList from "../../../context/useList";
import useToast from "../../../../../hooks/useToast/useToast";
// Import helper function
import { startViewTransition } from "../../../../../utils/helpers";
// Import components
import { Btn } from "../../../../../components/ui/Btn/Btn";
// Import types
import type { ShoppingCartType } from "../../../../../context/AppContext/types/ShoppingCartType";
// Import icons
import ShoppingCartAddIcon from "../../../../../Icons/ShoppingCartAddIcon";
import TrashIcon from "../../../../../Icons/TrashIcon";

/**
 * BtnsControl is a functional component that receives a product of type ShoppingCartType as a prop.
 * It uses the useApp, useList, and useToast custom hooks to manage app state, list data, and toast notifications respectively.
 * It renders two buttons: one for adding the product to the shopping cart and another for deleting the product from the list.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {ShoppingCartType} props.product - The product for which the buttons are to be displayed.
 *
 * @returns {JSX.Element} A div containing two buttons: one for adding the product to the shopping cart and another for deleting the product from the list.
 */

export function BtnsControl({ product }: { product: ShoppingCartType }) {
  const { state, dispatch } = useApp(); // Destructure state and dispatch from the useApp hook.
  const { setToastData } = useToast(); // Destructure setToastData from the useToast hook.
  const { listId } = useList(); // Destructure listId from the useList hook.

  // addToShoppingCart is a function that dispatches an action to add the product to the shopping cart and sets the toast data to notify the user of the action.
  function addToShoppingCart() {
    dispatch({ type: "addToShoppingCart", payload: [product] });

    setToastData({
      open: true,
      text: `${product.collection} dodano do koszyka.`,
      link: "/shoppingcart",
    });
  }

  // deleteFromList is a function that dispatches an action to delete the product from the list and sets the toast data to notify the user of the action and restore the previous state if the user wants to undo the action.
  function deleteFromList() {
    setToastData({
      open: true,
      text: `Usunięto ${product.collection} z twojej listy.`,
      prevState: () =>
        startViewTransition(() => {
          dispatch({
            type: "restoreList",
            payload: state.editingList!,
          }); // Restore the list to its previous state
        }),
    });

    startViewTransition(() => {
      dispatch({
        type: "deleteProductsFromList",
        payload: { listId: listId, productNumbers: [product.productNumber] },
      });
    });
  }

  // The component returns a div containing two buttons: one for adding the product to the shopping cart and another for deleting the product from the list.
  return (
    <div className="list-product__btns-wrapper">
      <Btn shape="circle" variant="blue" onClick={addToShoppingCart}>
        <span className="visually-hidden">Dodaj do koszyka</span>
        <ShoppingCartAddIcon />
      </Btn>

      <Btn shape="circle" variant="light" onClick={deleteFromList}>
        <span className="visually-hidden">Usuń produkt z tej listy</span>
        <TrashIcon />
      </Btn>
    </div>
  );
}
