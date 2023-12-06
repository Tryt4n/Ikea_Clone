// React
import { useState } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
import useWindowSize from "../../../../hooks/useWindowSize";
// Components
import ClubInfoDiscount from "../../../../components/ClubInfoDiscount/ClubInfoDiscount";
import Input from "../../../../components/Input/Input";
import Btn from "../../../../components/Btn/Btn";
// Icons
import ChevronRightSmall from "../../../../Icons/ChevronRightSmall";
import DiscountIcon from "../../../../Icons/DiscountIcon";
import ArrowRightIcon from "../../../../Icons/ArrowRightIcon";
import ReturnIcon from "../../../../Icons/ReturnIcon";
import LockIcon from "../../../../Icons/LockIcon";
// Types
import type { ShoppingCartAsideMenuInformationList } from "../../../ProductPage/types/ModalTypes";
// Style
import "./index.scss";

export default function AsideMenu() {
  const { state } = useApp();

  const calculatePrice = state.shoppingCart?.reduce((accumulator, product) => {
    const decimalValue = product.price.decimal ? product.price.decimal / 100 : 0;
    const value = product.price.integer + decimalValue;
    const result = value * product.quantity;

    return accumulator + result;
  }, 0);

  const totalPrice = calculatePrice ? calculatePrice.toLocaleString() : "-";

  return (
    <aside className="shopping-cart-menu">
      <h2 className="shopping-cart-menu__heading">Podsumowanie</h2>
      <Summary price={totalPrice} />

      <hr />

      <FinalPrice price={totalPrice} />

      <ClubInfoDiscount />

      <DiscountCodeFormAccordion />

      <GoNextStep />

      <AdditionalInformationsList />
    </aside>
  );
}

function Summary({ price }: { price: string }) {
  return (
    <>
      <div className="shopping-cart-menu__price-wrapper">
        <span>Wartość produktów</span>
        <strong>{price}</strong>
      </div>

      <div className="shopping-cart-menu__delivery-text-wrapper">
        <div>
          <span>Dostawa</span>
          <span>-</span>
        </div>
        <small>Koszt dostawy poznasz na dalszym etapie zamówienia</small>
      </div>
    </>
  );
}

function FinalPrice({ price }: { price: string }) {
  return (
    <div className="shopping-cart-menu__price-wrapper shopping-cart-menu__price-wrapper--big">
      <p>Wartość produktów</p>
      <strong>{price}</strong>
    </div>
  );
}

function DiscountCodeFormAccordion() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <section className="shopping-cart-menu__discount-code-container">
      <button
        type="button"
        className="shopping-cart-menu__discount-code-btn"
        onClick={() => setAccordionOpen(!accordionOpen)}
      >
        <div className="shopping-cart-menu__discount-code-inner-wrapper">
          <DiscountIcon />
          <h3>Masz kod rabatowy?</h3>
        </div>
        <div>
          <ChevronRightSmall />
        </div>
      </button>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="shopping-cart-menu__discount-code-hidden-content-container"
        aria-hidden={!accordionOpen}
      >
        <div>
          <p
            id="discount-code-label"
            className="shopping-cart-menu__discount-code-label"
          >
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
        </div>
      </form>
    </section>
  );
}

function GoNextStep() {
  const { setIsModalOpen, setModalData } = useModal();
  const { width } = useWindowSize();

  function openModal() {
    setIsModalOpen(true);
    setModalData({
      type: "next-step",
    });
  }

  return (
    <Btn
      type="button"
      variant="blue"
      className="shopping-cart-menu__next-btn"
      onClick={openModal}
    >
      <span>Dalej</span>
      {width >= 900 && (
        <span className="shopping-cart-menu__next-btn-svg-wrapper">
          <ArrowRightIcon />
        </span>
      )}
    </Btn>
  );
}

function AdditionalInformationsList() {
  const { setIsModalOpen, setModalData } = useModal();

  function openModal(type: ShoppingCartAsideMenuInformationList["type"]) {
    setIsModalOpen(true);
    setModalData({
      type: type,
    });
  }

  return (
    <ul>
      <li>
        <button
          type="button"
          className="shopping-cart-menu__btn-wrapper"
          onClick={() => openModal("refund")}
        >
          <ReturnIcon />
          <span>365 dni na zwrot gdy zmienisz zdanie</span>
        </button>
      </li>
      <li>
        <button
          type="button"
          className="shopping-cart-menu__btn-wrapper"
          onClick={() => openModal("data-encryption")}
        >
          <LockIcon />
          <span>
            Bezpieczne zakupy z technologią szyfrowania danych SSL oraz zabezpieczenia transakcji 3D
            Secure
          </span>
        </button>
      </li>
    </ul>
  );
}
