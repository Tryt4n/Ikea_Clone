// React
import { ChangeEvent, useState } from "react";
// Components
import Btn from "../../../../components/Btn/Btn";
// Icons
import MinusIcon from "../../../../Icons/MinusIcon";
import PlusIcon from "../../../../Icons/PlusIcon";
// Style
import "./index.scss";

export default function BuyBlock() {
  const [quantity, setQuantity] = useState(1);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/\D/g, "");

    setQuantity(filteredValue === "" ? 1 : parseInt(filteredValue, 10));
  }

  function handleQuantityChange(delta: -1 | 1) {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + delta;

      return Math.min(Math.max(newQuantity, 1), 99);
    });
  }

  return (
    <form
      className="buy-block"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="buy-block__input-wrapper">
        <Btn
          variant="light"
          shape="circle"
          aria-controls="product-quantity"
          disabled={quantity === 1}
          onClick={() => handleQuantityChange(-1)}
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
            onChange={handleInputChange}
            onFocus={(e) => e.target.select()}
          />
        </div>
        <Btn
          variant="light"
          shape="circle"
          aria-controls="product-quantity"
          disabled={quantity === 99}
          onClick={() => handleQuantityChange(1)}
        >
          <PlusIcon />
          <span className="visually-hidden">Naciśnij aby zwiększyć ilość</span>
        </Btn>
      </div>

      <Btn
        variant="blue"
        type="submit"
        aria-live="polite"
      >
        Dodaj {quantity > 1 && `${quantity} szt. `}do koszyka
      </Btn>
    </form>
  );
}
