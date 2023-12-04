// Components
import ClubInfoDiscount from "../../../../components/ClubInfoDiscount/ClubInfoDiscount";
import Input from "../../../../components/Input/Input";
// Icons
import ChevronRightSmall from "../../../../Icons/ChevronRightSmall";
import DiscountIcon from "../../../../Icons/DiscountIcon";
import ArrowRightIcon from "../../../../Icons/ArrowRightIcon";
import ReturnIcon from "../../../../Icons/ReturnIcon";
import LockIcon from "../../../../Icons/LockIcon";
// Style
import "./index.scss";
import Btn from "../../../../components/Btn/Btn";

export default function AsideMenu() {
  //TODO change to valid value
  const finalPrice = (1234.56).toLocaleString();

  return (
    <aside className="shopping-cart-menu">
      <h2 className="shopping-cart-menu__heading">Podsumowanie</h2>

      <div className="shopping-cart-menu__price-wrapper">
        <span>Wartość produktów</span>
        <strong>{finalPrice}</strong>
      </div>

      <div className="shopping-cart-menu__delivery-text-wrapper">
        <div>
          <span>Dostawa</span>
          <span>-</span>
        </div>
        <small>Koszt dostawy poznasz na dalszym etapie zamówienia</small>
      </div>

      <hr />

      <div className="shopping-cart-menu__price-wrapper shopping-cart-menu__price-wrapper--big">
        <p>Wartość produktów</p>
        <strong>{finalPrice}</strong>
      </div>

      <ClubInfoDiscount />

      <section className="shopping-cart-menu__discount-code-container">
        <button
          type="button"
          className="shopping-cart-menu__discount-code-btn"
        >
          <div className="shopping-cart-menu__discount-code-inner-wrapper">
            <DiscountIcon />
            <h3>Masz kod rabatowy?</h3>
          </div>
          <div>
            <ChevronRightSmall />
          </div>
        </button>

        <form onSubmit={(e) => e.preventDefault()}>
          <p id="discount-code-label">
            W jednym zamówieniu można użyć tylko jednego kuponu/kodu. Wpisz kod bez spacji między
            znakami i zwróć uwagę na wielkość liter. Masz kartę upominkową? Możesz ją wykorzystać na
            dalszym etapie.
          </p>

          <div className="shopping-cart-menu__discount-code-form-inner-wrapper">
            <Input
              id="discount-code"
              type="text"
              label="W jednym zamówieniu można użyć tylko jednego kuponu/kodu. Wpisz kod bez spacji między
            znakami i zwróć uwagę na wielkość liter. Masz kartę upominkową? Możesz ją wykorzystać na
            dalszym etapie."
              labelProps={{
                className: "visually-hidden",
                "aria-hidden": true,
                "aria-labelledby": "discount-code-label",
              }}
            />
            <Btn variant="white-with-border">Zastosuj</Btn>
          </div>
        </form>
      </section>

      <button
        type="button"
        className="shopping-cart-menu__next-btn"
      >
        <span>Dalej</span>
        <span className="shopping-cart-menu__next-btn-svg-wrapper">
          <ArrowRightIcon />
        </span>
      </button>

      <button
        type="button"
        className="shopping-cart-menu__btn-wrapper"
      >
        <ReturnIcon />
        <span>365 dni na zwrot gdy zmienisz zdanie</span>
      </button>

      <button
        type="button"
        className="shopping-cart-menu__btn-wrapper"
      >
        <LockIcon />
        <span>
          Bezpieczne zakupy z technologią szyfrowania danych SSL oraz zabezpieczenia transakcji 3D
          Secure
        </span>
      </button>
    </aside>
  );
}
