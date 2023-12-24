// react-router-dom
import { ScrollRestoration } from "react-router-dom";
// Custom Hooks
import useApp from "../../hooks/useApp";
// Layout
import Header from "./layout/Header/Header";
import EmptyCart from "./layout/EmptyCart/EmptyCart";
import FilledShoppingCart from "./layout/FilledShoppingCart/FilledShoppingCart";
import AsideMenu from "./layout/AsideMenu/AsideMenu";
// Style
import "./index.scss";

export default function ShoppingCart() {
  const { state } = useApp();

  const heading =
    state.shoppingCart && state.shoppingCart.length > 0 ? "Koszyk" : "Twój koszyk jest pusty";

  return (
    <div className="shopping-cart">
      <ScrollRestoration />

      <article className="shopping-cart__content-container">
        <Header text={heading} />

        {!state.shoppingCart || state.shoppingCart?.length === 0 ? (
          <EmptyCart />
        ) : (
          <FilledShoppingCart />
        )}
      </article>

      {state.shoppingCart && state.shoppingCart?.length !== 0 && <AsideMenu />}
    </div>
  );
}
