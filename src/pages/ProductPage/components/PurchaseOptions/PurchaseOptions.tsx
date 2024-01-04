// Import custom hooks
import useModal from "../../../../hooks/useModal";
// Import icons
import ChevronRightSmall from "../../../../Icons/ChevronRightSmall";
import ShopIcon from "../../../../Icons/ShopIcon";
import TruckIcon from "../../../../Icons/TruckIcon";
// Import styles
import "./index.scss";

/**
 * PurchaseOptions Component
 *
 * This is a React functional component. It displays the purchase options for a product, including delivery and in-store availability.
 *
 * @returns A JSX element that consists of a `section` with the class name `purchase-options`. Inside this `section`, it renders a `h3` element that displays the heading "Możliwości zakupu", and a `div` that contains two `button` elements. Each `button` represents a purchase option and includes an icon, a heading, and a description.
 */

export default function PurchaseOptions() {
  const { modalID } = useModal(); // Access the modalID to manage modal data.

  return (
    <section className="purchase-options">
      <h3 className="purchase-options__header">Możliwości zakupu</h3>

      <div className="purchase-options__content-wrapper">
        <button
          className="purchase-options__btn-wrapper"
          aria-controls={modalID} // The modal that displays the delivery options
        >
          <TruckIcon />
          <div className="purchase-options__btn-inner-wrapper">
            <div>
              <strong>Dostawa</strong>
              <span>Sprawdź możliwości dostawy</span>
            </div>
            <ChevronRightSmall />
          </div>
        </button>

        <button
          className="purchase-options__btn-wrapper"
          aria-controls={modalID} // The modal that displays the in-store availability options
        >
          <ShopIcon />
          <div className="purchase-options__btn-inner-wrapper">
            <div>
              <strong>W magazynie</strong>
              <span>Sprawdź dostępność w sklepie</span>
            </div>
            <ChevronRightSmall />
          </div>
        </button>
      </div>
    </section>
  );
}
