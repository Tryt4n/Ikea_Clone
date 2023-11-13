// Hooks
import useModal from "../../../../hooks/useModal";
// Icons
import ChevronRightSmall from "../../../../Icons/ChevronRightSmall";
import ShopIcon from "../../../../Icons/ShopIcon";
import TruckIcon from "../../../../Icons/TruckIcon";
// Styles
import "./index.scss";

export default function PurchaseOptions() {
  const { modalID } = useModal();

  return (
    <div className="purchase-options">
      <strong className="purchase-options__header">Możliwości zakupu</strong>

      <div className="purchase-options__content-wrapper">
        <button
          className="purchase-options__btn-wrapper"
          aria-controls={modalID}
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
          aria-controls={modalID}
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
    </div>
  );
}
