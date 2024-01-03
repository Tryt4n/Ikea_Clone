// Import React hooks
import { useState } from "react";
// Import components
import { DeliveryOption } from "../../ui/DeliveryOption/DeliveryOption";
import { InfoMessage } from "../../ui/InfoMessage/InfoMessage";
// Import constants
import { deliveryOptions } from "../../../../../constants/deliveryOptions";
// Import styles
import "./index.scss";

/**
 * DeliveryOptions is a functional component that maintains a state for the selected delivery option.
 * It renders a fieldset containing a legend and a list of DeliveryOption components, one for each item in the deliveryOptions array.
 * If the selected delivery option is "otherOptions", it also renders an InfoMessage component.
 *
 * @returns {JSX.Element} A fieldset containing a legend and a list of DeliveryOption components, and an InfoMessage component if the selected delivery option is "otherOptions".
 */

export default function DeliveryOptions() {
  // Define a state for the selected delivery option.
  const [deliveryOption, setDeliveryOption] = useState<
    (typeof deliveryOptions)[number]["option"] | null
  >(null);

  return (
    <fieldset className="delivery-options">
      <legend className="visually-hidden">Opcje dostawy</legend>

      {/* Render a DeliveryOption component for each item in the deliveryOptions array. */}
      {deliveryOptions.map((item) => (
        <DeliveryOption
          key={item.option}
          item={item}
          checkedStatus={deliveryOption === item.option}
          onChangeFunction={() => setDeliveryOption(item.option)}
        />
      ))}

      {/* If the selected delivery option is "otherOptions", render an InfoMessage component. */}
      {deliveryOption === "otherOptions" && <InfoMessage />}
    </fieldset>
  );
}
