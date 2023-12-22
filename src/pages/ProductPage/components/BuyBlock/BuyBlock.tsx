// React
import { ChangeEvent, useState } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useToast from "../../../../hooks/useToast";
import useProduct from "../../context/useProduct";
// Components
import QuantityInput from "../../../../components/features/QuantityInput/QuantityInput";
import { Btn } from "../../../../components/ui/Btn/Btn";
// Types
import type { ProductDataType } from "../../types/ProductDataType";
// Style
import "./index.scss";

export default function BuyBlock({ product }: { product: ProductDataType }) {
  const { dispatch } = useApp();
  const { setToastData } = useToast();
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

  const {
    productNumber,
    collection,
    name,
    nameToDisplay,
    variant,
    variantName,
    size,
    price,
    oldPriceTag,
    images,
    newTag,
    rating,
  } = product;

  function addToShoppingCart() {
    dispatch({
      type: "addToShoppingCart",
      payload: {
        quantity: quantity,
        productNumber: productNumber,
        collection: collection,
        name: name,
        nameToDisplay: nameToDisplay,
        variant: variant,
        variantName: variantName,
        size: size,
        price: price,
        oldPrice: oldPriceTag,
        images: images,
        productLink: `/products/${path.collection}/${path.product}/${path.type}/${path.productID}`,
        newTag: newTag,
        addedDate: new Date(),
        rating: rating,
      },
    });
    setQuantity(1);

    setToastData({
      open: true,
      text: `${collection} dodano do koszyka.`,
      link: "/shoppingcart",
    });
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
