// Import custom hooks
import useApp from "../../hooks/useApp/useApp";
// Import layout components
import Header from "./layout/Header/Header";
import EmptyCart from "./layout/EmptyCart/EmptyCart";
import FilledShoppingCart from "./layout/FilledShoppingCart/FilledShoppingCart";
import AsideMenu from "./layout/AsideMenu/AsideMenu";
// Import styles
import "./index.scss";

/**
 * ShoppingCart is a functional component that renders the shopping cart.
 * It uses the useApp custom hook to get the application state.
 * It determines the heading text based on whether the shopping cart is empty or not.
 * It renders a div containing an article and an aside menu.
 * The article contains a Header component and either an EmptyCart component or a FilledShoppingCart component, depending on whether the shopping cart is empty or not.
 * The aside menu is only rendered if the shopping cart is not empty.
 *
 * @returns {JSX.Element} A div containing an article and an aside menu.
 */

export default function ShoppingCart() {
  const { state } = useApp(); // Get the application state using the useApp custom hook.

  // Determine the heading text based on whether the shopping cart is empty or not.
  const heading =
    state.shoppingCart && state.shoppingCart.length > 0
      ? "Koszyk"
      : "Twój koszyk jest pusty";

  return (
    <div className="shopping-cart">
      <article className="shopping-cart__content-container">
        <Header text={heading} />

        {/* Render either an EmptyCart component or a FilledShoppingCart component, depending on whether the shopping cart is empty or not. */}
        {!state.shoppingCart || state.shoppingCart?.length === 0 ? (
          <EmptyCart />
        ) : (
          <FilledShoppingCart />
        )}
      </article>

      {/* Render an AsideMenu component only if the shopping cart is not empty. */}
      {state.shoppingCart && state.shoppingCart?.length !== 0 && <AsideMenu />}
    </div>
  );
}
