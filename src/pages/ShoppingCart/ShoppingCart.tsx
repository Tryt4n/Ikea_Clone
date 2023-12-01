// Components
import Btn from "../../components/Btn/Btn";
// Icons
import TripleDotsMenuIcon from "../../Icons/TripleDotsMenuIcon";
import AvatarIcon from "../../Icons/AvatarIcon";
// Style
import "./index.scss";

export default function ShoppingCart() {
  return (
    <article className="shopping-cart">
      <header className="shopping-cart__header">
        <h2>Twój koszyk jest pusty</h2>

        <Btn
          shape="circle"
          variant="light"
        >
          <span className="visually-hidden">Otwórz menu koszyka</span>
          <TripleDotsMenuIcon />
        </Btn>
      </header>

      <section className="shopping-cart__empty-cart">
        <div className="shopping-cart__empty-cart-inner-wrapper">
          <h3>Masz konto?</h3>
          <div>
            <a
              href="#"
              className="shopping-cart__login-link"
            >
              Dołącz lub zaloguj się
            </a>
            &nbsp;aby szybko i sprawnie dokonywać zakupów i uzyskać dostęp do historii zamówień.
          </div>
        </div>

        <div className="shopping-cart__empty-cart-svg-wrapper">
          <AvatarIcon />
        </div>
      </section>
    </article>
  );
}
