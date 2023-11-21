// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
import useSideMenu from "../../../../hooks/useSideMenu";
import useWindowSize from "../../../../hooks/useWindowSize";
// Components
import { ListElement } from "../../../../components/NavigationListElement/ListElement";
// Types
import {
  ModalChooseShopType,
  ModalZipCodeType,
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
  const { isMenuOpen } = useSideMenu();
  const { setIsModalOpen, setModalData } = useModal();

  // const getPostalCode = localStorage.getItem("postalCode");
  // const postalCode = getPostalCode ? JSON.parse(getPostalCode) : undefined;
  const { state } = useApp();

  function openModal({ type, header }: ModalZipCodeType | ModalChooseShopType) {
    setIsModalOpen(true);
    setModalData({
      type: type,
      header: header,
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
                menuOpen
              />
            ))}
          </ul>
        </nav>
      )}
      <div className="navigation-bar__btns-container">
        <button
          className="navigation-bar__btn-wrapper"
          onClick={() => openModal({ type: "zip-code", header: "Użyj swojej lokalizacji" })}
          tabIndex={isMenuOpen ? -1 : 0}
        >
          <TruckIcon />
          {/* <span key={postalCode}>{postalCode ? postalCode : "Wpisz kod pocztowy"}</span> */}
          <span>{state.postalCode !== "" ? state.postalCode : "Wpisz kod pocztowy"}</span>
        </button>
        <button
          className="navigation-bar__btn-wrapper"
          onClick={() =>
            openModal({ type: "choose-shop", header: "Znajdź swój preferowany sklep" })
          }
          tabIndex={isMenuOpen ? -1 : 0}
        >
          <ShopIcon />
          <span>Wybierz sklep</span>
        </button>
      </div>
    </div>
  );
}
