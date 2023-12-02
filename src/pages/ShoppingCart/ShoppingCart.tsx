// Custom Hooks
import useApp from "../../hooks/useApp";
// Components
import Btn from "../../components/Btn/Btn";
// Icons
import TripleDotsMenuIcon from "../../Icons/TripleDotsMenuIcon";
import AvatarIcon from "../../Icons/AvatarIcon";
// Style
import "./index.scss";
import TruckIcon from "../../Icons/TruckIcon";
import Shop2Icon from "../../Icons/Shop2Icon";
import { useState } from "react";

export default function ShoppingCart() {
  const { state } = useApp();

  //!
  const [deliveryOption, setDeliveryOption] = useState<string | null>(null);

  const handleOptionChange = (option: string) => {
    setDeliveryOption(option);
  };
  //!

  const heading = state.shoppingCart ? "Koszyk" : "Twój koszyk jest pusty";

  function openModal() {}

  return (
    <div className="shopping-cart">
      <article className="shopping-cart__content-container">
        <header className="shopping-cart__header">
          <h2>{heading}</h2>

          <Btn
            shape="circle"
            variant="light"
            //TODO ADD MODAL FUNCTIONALITY
            onClick={openModal}
          >
            <span className="visually-hidden">Otwórz menu koszyka</span>
            <TripleDotsMenuIcon />
          </Btn>
        </header>

        {!state.shoppingCart || state.shoppingCart?.length === 0 ? (
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
        ) : (
          <>
            <section className="shopping-cart__delivery-container">
              <h3>Jak chciałbyś otrzymać swoje zamówienie</h3>

              <div className="shopping-cart__delivery-boxes-wrapper">
                <label className="shopping-cart__delivery-box">
                  <input
                    type="radio"
                    name="deliveryOption"
                    className="visually-hidden"
                    checked={deliveryOption === "homeDelivery"}
                    onChange={() => handleOptionChange("homeDelivery")}
                  />

                  <span className="shopping-cart__delivery-box-inner-wrapper">
                    <TruckIcon />
                    <strong>Dostawa do domu</strong>
                  </span>
                </label>

                <label className="shopping-cart__delivery-box">
                  <input
                    type="radio"
                    name="deliveryOption"
                    className="visually-hidden"
                    checked={deliveryOption === "otherOptions"}
                    onChange={() => handleOptionChange("otherOptions")}
                  />

                  <span className="shopping-cart__delivery-box-inner-wrapper">
                    <Shop2Icon />
                    <strong>Opcje odbioru: Sklep, InPost, Punkt Odbioru</strong>
                  </span>
                </label>
              </div>
            </section>

            <section>
              <h3 className="visually-hidden">Produkty</h3>

              <ul>
                {state.shoppingCart.map((product) => {
                  return (
                    <li
                      key={product.name}
                      className="shopping-cart__product"
                    >
                      {product.name}
                    </li>
                  );
                })}
              </ul>
            </section>
          </>
        )}
      </article>

      <aside className="shopping-cart__aside">Aside Menu</aside>
    </div>
  );
}
