// Import components
import DeliveryOptions from "../../components/features/DeliveryOptions/DeliveryOptions";
import ProductsList from "../../components/ui/ProductsList/ProductsList";
// Import styles
import "./index.scss";

/**
 * FilledShoppingCart is a functional component that renders a filled shopping cart.
 * It includes two sections: one for delivery options and one for the list of products.
 * The delivery options section includes a heading and the DeliveryOptions component.
 * The products section includes a visually hidden heading and the ProductsList component.
 *
 * @returns {JSX.Element} A fragment containing the delivery options section and the products section.
 */

export default function FilledShoppingCart() {
  return (
    <>
      <section className="shopping-cart-full">
        <h3>Jak chciałbyś otrzymać swoje zamówienie</h3>
        <DeliveryOptions />

        {/* Render a container for info messages. */}
        <div id="info-message-container"></div>
      </section>

      <section>
        {/* Render a visually hidden heading for accessibility. */}
        <h3 className="visually-hidden">Produkty</h3>
        <ProductsList />
      </section>
    </>
  );
}
