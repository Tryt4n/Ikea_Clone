// React
import { ChangeEvent, useState } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
// Components
import Input from "../../../../components/Input/Input";
import QuantityInput from "../../../../components/QuantityInput/QuantityInput";
import Btn from "../../../../components/Btn/Btn";
// Types
import type { ShoppingCartType } from "../../../../context/AppContext";
// Style
import "./index.scss";

export default function AddProductByNumber() {
  const { dispatch } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [inputText, setInputText] = useState("");

  function changeQuantity(delta: -1 | 1) {
    setQuantity((prevValue) => (prevValue += delta));
  }

  function changeQuantityByInputValue(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/\D/g, "");
    const parsedValue = parseInt(filteredValue, 10) || 1;

    setQuantity(parsedValue);
  }

  function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const isValidInput = /^\d{0,3}(\.\d{0,3}(\.\d{0,2})?)?$/.test(value);

    if (isValidInput) {
      setInputText(value);
    }
  }

  function addToShoppingCart(productNumber: ShoppingCartType["productNumber"]) {
    dispatch({ type: "addProductByNumber", payload: productNumber });
  }

  return (
    <form
      className="add-product-by-number"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        id=""
        label="np.: 103.242.78"
        type="text"
        inputProps={{
          value: inputText,
          onChange: handleTextChange,
          maxLength: 10,
          pattern: "^\\d{0,3}(\\.\\d{0,3}(\\.\\d{0,2})?)?$",
          title: "Wprowadzona wartość powinna mieć taki format: 103.242.78",
        }}
      />
      <div className="add-product-by-number__inner-wrapper">
        <QuantityInput
          quantity={quantity}
          onChangeFunction={changeQuantity}
          inputFunction={changeQuantityByInputValue}
        />
        <Btn
          variant="blue"
          type="button"
          onClick={() => addToShoppingCart(inputText)}
        >
          Dodaj do koszyka
        </Btn>
      </div>
    </form>
  );
}
