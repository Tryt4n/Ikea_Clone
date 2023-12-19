// React
import { ChangeEvent, useState } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useProduct from "../../context/useProduct";
// Components
import QuantityInput from "../../../../components/QuantityInput/QuantityInput";
import { Btn } from "../../../../components/Btn/Btn";
// Types
import type { ProductDataType } from "../../types/ProductDataType";
// Style
import "./index.scss";

export default function BuyBlock({ product }: { product: ProductDataType }) {
  const { dispatch } = useApp();
  const { path } = useProduct();

  const [quantity, setQuantity] = useState(1);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/\D/g, "");
    const parsedValue = parseInt(filteredValue, 10) || 1;

    setQuantity(parsedValue);
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
        productLink: `/products/${path.collection}/${path.product}/${path.type}/${path.productID}`,
        newTag: product.newTag,
        addedDate: new Date(),
        rating: product.rating,
      },
    });
    setQuantity(1);
  }

  return (
    <form
      className="buy-block"
      onSubmit={(e) => e.preventDefault()}
    >
      <QuantityInput
        quantity={quantity}
        inputFunction={handleInputChange}
        onChangeFunction={handleQuantityChange}
      />

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
