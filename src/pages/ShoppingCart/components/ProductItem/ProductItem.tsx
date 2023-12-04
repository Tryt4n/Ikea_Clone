// React
import { ChangeEvent } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
// Components
import Tag from "../../../ProductPage/components/Tag/Tag";
import QuantityInput from "../../../../components/QuantityInput/QuantityInput";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Constants
import { productLink as imageLink } from "../../../../constants/links";
// Types
import type { ShoppingCartType } from "../../../../context/AppContext";
// Style
import "./index.scss";

export default function ProductItem({ product }: { product: ShoppingCartType }) {
  const { dispatch } = useApp();

  const {
    collection,
    images,
    name,
    nameToDisplay,
    price,
    productNumber,
    quantity,
    size,
    variant,
    variantName,
    oldPrice,
    productLink,
  } = product;

  function calculatePrice(multiplier: number, integer: number, decimal?: number) {
    const decimalValue = decimal ? decimal / 100 : 0;
    const value = integer + decimalValue;
    const result = value * multiplier;

    if (Number.isInteger(result)) {
      return `${result.toLocaleString("pl-PL")},-`;
    } else {
      return result.toLocaleString("pl-PL");
    }
  }

  function changeQuantity(delta: -1 | 1) {
    startViewTransition(() =>
      dispatch({
        type: "changeProductQuantity",
        payload: { value: delta === -1 ? "subtract" : "add", productNumber: productNumber },
      })
    );
  }

  function changeQuantityByInputValue(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/\D/g, "");
    const parsedValue = parseInt(filteredValue, 10) || 1;

    startViewTransition(() =>
      dispatch({
        type: "changeProductQuantity",
        payload: { value: parsedValue, productNumber: productNumber },
      })
    );
  }

  function removeProductFromShoppingCart() {
    startViewTransition(() =>
      dispatch({
        type: "removeProductFromShoppingCart",
        payload: productNumber,
      })
    );
  }

  return (
    <li className="shopping-cart-product-item">
      <div className="shopping-cart-product-item__img-wrapper">
        <button>
          <span className="visually-hidden">Naciśnij aby zobaczyć galerię zdjęć produktu</span>
          <img
            src={`${imageLink}/${collection.toLowerCase()}-${name}-${variant}__${images.main}`}
            alt=""
            loading="lazy"
          />
        </button>

        <small className="shopping-cart-product-item__product-number">
          <span className="visually-hidden">Numer produktu:</span>
          {productNumber}
        </small>
      </div>

      <section className="shopping-cart-product-item__text-container">
        <header className="shopping-cart-product-item__header-wrapper">
          <div>
            {oldPrice && (
              <Tag
                variant={oldPrice.variant}
                className="shopping-cart-product-item__tag"
              >
                Nowa niższa cena
              </Tag>
            )}
            <h3>
              <a href={productLink}>{collection}</a>
            </h3>
          </div>
          <strong>{calculatePrice(quantity, price.integer, price.decimal)}</strong>
        </header>

        <div>
          <p>
            {nameToDisplay}, {variantName}
          </p>
          {price.quantity && <p>{price.quantity} szt./opak.</p>}
          <p>{size !== "universal" && size}</p>
          {quantity > 1 && (
            <p className="fs-sm">
              {price.integer},{price.decimal ? price.decimal : "-"}/szt.
            </p>
          )}
          {oldPrice && (
            <p className="fs-sm">
              Najniższa cena z ostatnich 30 dni: {oldPrice.integer},
              {oldPrice.decimal ? oldPrice.decimal : "-"}
            </p>
          )}

          <form
            className="shopping-cart-product-item__product-controls"
            onSubmit={(e) => e.preventDefault()}
          >
            <QuantityInput
              quantity={quantity}
              onChangeFunction={changeQuantity}
              inputFunction={changeQuantityByInputValue}
              className="shopping-cart-product-item__quantity"
            />
            <button
              type="button"
              className="fs-sm"
              onClick={removeProductFromShoppingCart}
            >
              Usuń produkt
            </button>
            <button
              type="button"
              className="fs-sm"
            >
              Przenieś do listy zakupów
            </button>
          </form>
        </div>
      </section>
    </li>
  );
}
