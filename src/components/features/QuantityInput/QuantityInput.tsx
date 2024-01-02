// Import React dependencies
import { ChangeEvent, useId } from "react";
// Import components
import { Btn } from "../../ui/Btn/Btn";
// Import icons
import MinusIcon from "../../../Icons/MinusIcon";
import PlusIcon from "../../../Icons/PlusIcon";
// Import styles
import "./index.scss";

// Defining the type for the QuantityInput props
type QuantityInputPropsType = {
  quantity: number; // The current quantity
  inputFunction: (e: ChangeEvent<HTMLInputElement>) => void; // The function to handle input changes
  onChangeFunction: (delta: 1 | -1) => void; // The function to handle quantity changes
  className?: string; // The class name for the QuantityInput component
  small?: boolean; // A flag indicating if the QuantityInput component should be small
};

/**
 * QuantityInput Component
 *
 * This component displays a quantity input with plus and minus buttons.
 *
 * @param quantity - The current quantity.
 * @param inputFunction - The function to handle input changes.
 * @param onChangeFunction - The function to handle quantity changes.
 * @param className - The class name for the QuantityInput component.
 * @param small - A flag indicating if the QuantityInput component should be small.
 *
 * @returns A div element with a class of "quantity-input" and "quantity-input--small" if the small flag is true, and the class name if provided, containing a Btn component for decreasing the quantity, a div with a label and input for the quantity, and a Btn component for increasing the quantity.
 */
export default function QuantityInput({
  quantity,
  inputFunction,
  onChangeFunction,
  className,
  small,
}: QuantityInputPropsType) {
  const id = useId(); // Generate a unique id

  return (
    <div
      className={`quantity-input${small ? ` quantity-input--small` : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      <Btn
        variant="light"
        shape="circle"
        aria-controls={`product-quantity${id}`}
        disabled={quantity === 1}
        onClick={() => onChangeFunction(-1)}
      >
        <MinusIcon />
        <span className="visually-hidden">Naciśnij aby zmniejszyć ilość</span>
      </Btn>

      <div>
        <label
          htmlFor={`product-quantity${id}`}
          className="visually-hidden"
        >
          Wpisz liczbę lub zmień jej wartość za pomocą znaku plus i minus.
        </label>
        <input
          type="text"
          name={`product-quantity${id}`}
          id={`product-quantity${id}`}
          maxLength={2}
          value={quantity}
          pattern="\d{1,2}"
          autoComplete="off"
          onChange={inputFunction}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <Btn
        variant="light"
        shape="circle"
        aria-controls={`product-quantity${id}`}
        disabled={quantity === 99}
        onClick={() => onChangeFunction(1)}
      >
        <PlusIcon />
        <span className="visually-hidden">Naciśnij aby zwiększyć ilość</span>
      </Btn>
    </div>
  );
}
