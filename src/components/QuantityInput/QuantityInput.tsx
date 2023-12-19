// React
import { ChangeEvent } from "react";
// Components
import { Btn } from "../Btn/Btn";
// Icons
import MinusIcon from "../../Icons/MinusIcon";
import PlusIcon from "../../Icons/PlusIcon";
// Style
import "./index.scss";

type QuantityInputPropsType = {
  quantity: number;
  inputFunction: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFunction: (delta: 1 | -1) => void;
  className?: string;
  small?: boolean;
};

export default function QuantityInput({
  quantity,
  inputFunction,
  onChangeFunction,
  className,
  small,
}: QuantityInputPropsType) {
  return (
    <div
      className={`quantity-input${small ? ` quantity-input--small` : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      <Btn
        variant="light"
        shape="circle"
        aria-controls="product-quantity"
        disabled={quantity === 1}
        onClick={() => onChangeFunction(-1)}
      >
        <MinusIcon />
        <span className="visually-hidden">Naciśnij aby zmniejszyć ilość</span>
      </Btn>
      <div>
        <label
          htmlFor="product-quantity"
          className="visually-hidden"
        >
          Wpisz liczbę lub zmień jej wartość za pomocą znaku plus i minus.
        </label>
        <input
          type="text"
          name="product-quantity"
          id="product-quantity"
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
        aria-controls="product-quantity"
        disabled={quantity === 99}
        onClick={() => onChangeFunction(1)}
      >
        <PlusIcon />
        <span className="visually-hidden">Naciśnij aby zwiększyć ilość</span>
      </Btn>
    </div>
  );
}
