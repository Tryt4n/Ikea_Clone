// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
import useWindowSize from "../../../../hooks/useWindowSize";
// Components
import ListElement from "../../../../components/NavigationListElement/ListElement";
// Types
import {
  ModalChooseShopType,
  ModalChosenShopType,
  ModalPostalCodeType,
} from "../../../../pages/ProductPage/types/ModalTypes";
// Constants
import { mainNavigationList } from "../../../../constants/navigationLists";
// Icons
import ShopIcon from "../../../../Icons/ShopIcon";
import TruckIcon from "../../../../Icons/TruckIcon";
// Style
import "./index.scss";

export default function NavigationBar() {
  const { width } = useWindowSize();
  const { setIsModalOpen, setModalData } = useModal();

  const { state } = useApp();

  function openModal({ type }: ModalPostalCodeType | ModalChooseShopType | ModalChosenShopType) {
    setIsModalOpen(true);
    setModalData({
      type: type,
    });
  }

  return (
    <div className="page-container navigation-bar">
      {width >= 1200 && (
        <nav className="navigation-bar__nav">
          <h2 className="visually-hidden">Główna Nawigacja</h2>
          <ul>
            {mainNavigationList.map((element) => (
              <ListElement
                key={element}
                text={element}
              />
            ))}
          </ul>
        </nav>
      )}
      <div className="navigation-bar__btns-container">
        <button
          className="navigation-bar__btn-wrapper"
          onClick={() => openModal({ type: "postal-code" })}
        >
          <TruckIcon />
          <span>{state.postalCode !== "" ? state.postalCode : "Wpisz kod pocztowy"}</span>
        </button>
        <button
          className="navigation-bar__btn-wrapper"
          onClick={() =>
            openModal(state.chosenShop ? { type: "chosen-shop" } : { type: "choose-shop" })
          }
        >
          <ShopIcon />
          <span>{state.chosenShop ? state.chosenShop.name.split("IKEA") : "Wybierz sklep"}</span>
        </button>
      </div>
    </div>
  );
}
