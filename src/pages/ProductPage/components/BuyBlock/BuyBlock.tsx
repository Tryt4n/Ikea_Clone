// React
import { ChangeEvent, useState } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
// Components
import Btn from "../../../../components/Btn/Btn";
// Icons
import MinusIcon from "../../../../Icons/MinusIcon";
import PlusIcon from "../../../../Icons/PlusIcon";
// Types
import type { ProductDataType } from "../../types/ProductDataType";
// Style
import "./index.scss";

export default function BuyBlock({ product }: { product: ProductDataType }) {
  const { dispatch } = useApp();
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

  function addToShoppingCart() {
    dispatch({
      type: "addToShoppingCart",
      payload: {
        quantity: quantity,
        productNumber: product.productNumber,
        collection: product.collection,
        name: product.name,
        nameToDisplay: product.nameToDisplay,
        variant: product.variant,
        variantName: product.variantName,
        size: product.size,
        price: product.price,
        oldPrice: product.oldPriceTag,
        images: product.images,
      },
    });
    setQuantity(1);
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
        onClick={addToShoppingCart}
      >
        Dodaj {quantity > 1 && `${quantity} szt. `}do koszyka
      </Btn>
    </form>
  );
}
