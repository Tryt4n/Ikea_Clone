// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
import useWindowSize from "../../../../hooks/useWindowSize";
// Components
import ListItem from "../../../../components/ui/ListItem/ListItem";
// Types
import type {
  ModalChooseShopType,
  ModalChosenShopType,
  ModalPostalCodeType,
  ModalProductsMenuType,
  ModalRoomsMenuType,
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
  const { setModalData } = useModal();

  const { state } = useApp();

  function openModalByType({
    type,
  }:
    | ModalPostalCodeType
    | ModalChooseShopType
    | ModalChosenShopType
    | ModalProductsMenuType
    | ModalRoomsMenuType) {
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
            {mainNavigationList.map((element) => {
              const onClickFunction =
                element === "Produkty"
                  ? () => openModalByType({ type: "products-menu" })
                  : element === "Pomieszczenia"
                  ? () => openModalByType({ type: "rooms-menu" })
                  : undefined;

              return (
                <ListItem
                  key={element}
                  className=""
                  link="#"
                  as={element === "Produkty" || element === "Pomieszczenia" ? "button" : "a"}
                  onClickFunction={onClickFunction}
                >
                  {element}
                </ListItem>
              );
            })}
          </ul>
        </nav>
      )}

      <div className="navigation-bar__btns-container">
        <button
          className="navigation-bar__btn-wrapper"
          onClick={() => openModalByType({ type: "postal-code" })}
        >
          <TruckIcon />
          <span>{state.postalCode !== "" ? state.postalCode : "Wpisz kod pocztowy"}</span>
        </button>

        <button
          className="navigation-bar__btn-wrapper"
          onClick={() =>
            openModalByType(state.chosenShop ? { type: "chosen-shop" } : { type: "choose-shop" })
          }
        >
          <ShopIcon />
          <span>{state.chosenShop ? state.chosenShop.name.split("IKEA") : "Wybierz sklep"}</span>
        </button>
      </div>
    </div>
  );
}
