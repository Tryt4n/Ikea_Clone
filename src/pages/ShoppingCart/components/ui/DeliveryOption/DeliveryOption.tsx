// Import custom hooks
import useApp from "../../../../../hooks/useApp/useApp";
import useModal from "../../../../../hooks/useModal/useModal";
// Import constants
import { deliveryOptions } from "../../../../../constants/deliveryOptions";

// Define the type for the props of the DeliveryOption component.
type DeliveryOptionPropsType = {
  item: (typeof deliveryOptions)[number]; // The delivery option item.
  checkedStatus: boolean; // The checked status of the delivery option.
  onChangeFunction: () => void; // The function to call when the delivery option changes.
};

/**
 * DeliveryOption is a functional component that takes in an item, a checked status, and an onChange function as props.
 * It uses the useApp and useModal custom hooks to get the application state and set the modal data, respectively.
 * It renders a label containing a radio input and a span.
 * The radio input is checked if the checked status is true, and calls the onChange function when it changes and the onInputClickFunction when it is clicked.
 * The span contains the icon and text of the delivery option item.
 *
 * @param {DeliveryOptionPropsType} props The props passed to the DeliveryOption component.
 * @returns {JSX.Element} A label containing a radio input and a span.
 */

export function DeliveryOption({
  item,
  checkedStatus,
  onChangeFunction,
}: DeliveryOptionPropsType) {
  const { state } = useApp(); // Get the application state using the useApp custom hook.
  const { setModalData } = useModal(); // Get the setModalData function using the useModal custom hook.

  // Define a function to open the postal code modal.
  function openPostalCodeModal() {
    setModalData({ type: "postal-code" });
  }

  // Define a function to be called when the radio input is clicked.
  function onInputClickFunction() {
    // If the delivery option is home delivery and the postal code is empty, open the postal code modal.
    if (item.option === "homeDelivery" && state.postalCode === "") {
      openPostalCodeModal();
    }
  }

  return (
    <>
      <label
        className="delivery-options__box"
        data-testid={`shopping-cart-delivery-option-${item.option}`}
      >
        <input
          type="radio"
          name="deliveryOption"
          className="visually-hidden"
          checked={checkedStatus} // The radio input is checked if the checked status is true.
          onChange={onChangeFunction}
          onClick={onInputClickFunction}
        />

        <span className="delivery-options__box-inner-wrapper">
          {item.icon}
          <strong>{item.text}</strong>
        </span>
      </label>
    </>
  );
}
