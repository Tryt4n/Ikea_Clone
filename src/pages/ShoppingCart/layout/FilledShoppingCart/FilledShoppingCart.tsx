// Components
import DeliveryOptions from "../../components/DeliveryOptions/DeliveryOptions";
import ProductsList from "../../components/ProductsList/ProductsList";
// Style
import "./index.scss";

export default function FilledShoppingCart() {
  return (
    <>
      <section className="shopping-cart-full">
        <h3>Jak chciałbyś otrzymać swoje zamówienie</h3>
        <DeliveryOptions />

        <div id="info-message-container"></div>
      </section>

      <section>
        <h3 className="visually-hidden">Produkty</h3>
        <ProductsList />
      </section>
    </>
  );
}
