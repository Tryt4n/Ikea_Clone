// Import custom hooks
import useModal from "../../../../../hooks/useModal/useModal";
// Import types
import type { ShoppingCartAsideMenuInformationList } from "../../../../../layout/Modal/types/ModalTypes";
// Import icons
import LockIcon from "../../../../../Icons/LockIcon";
import ReturnIcon from "../../../../../Icons/ReturnIcon";

/**
 * AdditionalInformationsList is a functional component that renders a list of additional information items.
 * Each item is a button that opens a modal with information when clicked.
 *
 * @returns {JSX.Element} A list of additional information items.
 */

export function AdditionalInformationsList() {
  const { setModalData } = useModal(); // useModal hook is used to manage the state of the modal

  // The openModalByType function takes a type as an argument and sets the modal data.
  function openModalByType(type: ShoppingCartAsideMenuInformationList["type"]) {
    setModalData({
      type: type,
    });
  }

  // The component returns a list of information items. Each item is a button that opens a modal with information when clicked.
  return (
    <ul>
      <li>
        <button
          type="button"
          className="shopping-cart-menu__btn-wrapper"
          // When the button is clicked, the openModalByType function is called with the "refund" type
          onClick={() => openModalByType("refund")}
          data-testid="shopping-cart-refund-btn"
        >
          <ReturnIcon />
          <span>365 dni na zwrot gdy zmienisz zdanie</span>
        </button>
      </li>
      <li>
        <button
          type="button"
          className="shopping-cart-menu__btn-wrapper"
          // When the button is clicked, the openModalByType function is called with the "data-encryption" type
          onClick={() => openModalByType("data-encryption")}
          data-testid="shopping-cart-data-encryption-btn"
        >
          <LockIcon />
          <span>
            Bezpieczne zakupy z technologią szyfrowania danych SSL oraz
            zabezpieczenia transakcji 3D Secure
          </span>
        </button>
      </li>
    </ul>
  );
}
