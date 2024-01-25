// Import react dependencies
import { ChangeEvent } from "react";
// Import custom hooks
import useApp from "../../../../../hooks/useApp/useApp";
import useList from "../../../hooks/useList";
// Import helper function
import { startViewTransition } from "../../../../../utils/helpers";
// Import components
import QuantityInput from "../../../../../components/features/QuantityInput/QuantityInput";
// Import types
import type { ShoppingCartType } from "../../../../../context/AppContext/types/ShoppingCartType";

/**
 * QuantityBlock is a functional component that receives a productNumber and quantity as props.
 * It uses the useApp and useList custom hooks to manage app state and list data respectively.
 * It renders a form with a QuantityInput component that allows the user to change the quantity of the product.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {ShoppingCartType["productNumber"]} props.productNumber - The product number of the product for which the quantity is to be changed.
 * @param {ShoppingCartType["quantity"]} props.quantity - The current quantity of the product.
 *
 * @returns {JSX.Element} A form with a QuantityInput component that allows the user to change the quantity of the product.
 */

export function QuantityBlock({
  productNumber,
  quantity,
}: {
  productNumber: ShoppingCartType["productNumber"];
  quantity: ShoppingCartType["quantity"];
}) {
  const { dispatch } = useApp(); // Destructure dispatch from the useApp hook.
  const { listId } = useList(); // Destructure listId from the useList hook.

  // changeQuantity is a function that dispatches an action to change the quantity of the product on the list by a delta of -1 or 1.
  function changeQuantity(delta: -1 | 1) {
    startViewTransition(() =>
      dispatch({
        type: "changeProductQuantityOnList",
        payload: {
          listId: listId,
          value: delta === -1 ? "subtract" : "add",
          productNumber: productNumber,
        },
      }),
    );
  }

  // changeQuantityByInputValue is a function that dispatches an action to change the quantity of the product on the list to the value entered by the user.
  function changeQuantityByInputValue(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/\D/g, "");
    const parsedValue = parseInt(filteredValue, 10) || 1;

    startViewTransition(() =>
      dispatch({
        type: "changeProductQuantityOnList",
        payload: {
          listId: listId,
          value: parsedValue,
          productNumber: productNumber,
        },
      }),
    );
  }

  // The component returns a form with a QuantityInput component that allows the user to change the quantity of the product.
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <QuantityInput
        className="list-product__quantity-input-wrapper"
        quantity={quantity}
        onChangeFunction={changeQuantity}
        inputFunction={changeQuantityByInputValue}
        small
      />
    </form>
  );
}
