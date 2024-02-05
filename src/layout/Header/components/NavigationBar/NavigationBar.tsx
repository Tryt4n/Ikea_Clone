// Import custom hooks
import useApp from "../../../../hooks/useApp/useApp";
import useModal from "../../../../hooks/useModal/useModal";
import useWindowSize from "../../../../hooks/useWindowSize/useWindowSize";
// Import components
import ListItem from "../../../../components/ui/ListItem/ListItem";
// Import types
import type {
  ModalChooseShopType,
  ModalChosenShopType,
  ModalPostalCodeType,
  ModalProductsMenuType,
  ModalRoomsMenuType,
} from "../../../Modal/types/ModalTypes";
// Import constants
import { mainNavigationList } from "../../../../constants/navigationLists";
// Import icons
import ShopIcon from "../../../../Icons/ShopIcon";
import TruckIcon from "../../../../Icons/TruckIcon";
// Import styles
import "./index.scss";

/**
 * NavigationBar
 *
 * Component that serves as the navigation bar for the application. It renders the main navigation items and buttons for postal code and shop selection.
 *
 * The component uses custom hooks for application state (`useApp`), modal management (`useModal`), and window size (`useWindowSize`).
 * It also uses the `ListItem` component to render each navigation item.
 *
 * @returns {JSX.Element} The NavigationBar component.
 */

export default function NavigationBar() {
  const { state } = useApp(); // Get the application state from the `useApp` custom hook
  const { setModalData } = useModal(); // Get the `setModalData` function from the `useModal` custom hook
  const { width } = useWindowSize(); // Get window width from the `useWindowSize` custom hook

  /**
   * openModalByType
   *
   * Function to open a modal of a specific type. It uses the `setModalData` function from the `useModal` hook to set the modal data.
   *
   * @param {ModalPostalCodeType | ModalChooseShopType | ModalChosenShopType | ModalProductsMenuType | ModalRoomsMenuType} type - The type of the modal to open.
   */
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
    <div
      className="page-container navigation-bar"
      data-testid="navigation-bar-container"
    >
      {/* Render the list of navigation items only on bigger screens (>= 1200px) */}
      {width >= 1200 && (
        <nav className="navigation-bar__nav">
          {/* Add a visually hidden heading for screen readers and SEO */}
          <h2 className="visually-hidden">Główna Nawigacja</h2>

          <ul>
            {/* Render each navigation item using the `ListItem` component */}
            {mainNavigationList.map((element) => {
              const onClickFunction =
                element === "Produkty"
                  ? () => openModalByType({ type: "products-menu" })
                  : element === "Pomieszczenia"
                    ? () => openModalByType({ type: "rooms-menu" })
                    : undefined; // If the navigation item is "Produkty" or "Pomieszczenia", set the `onClickFunction` to open the corresponding modal

              return (
                <ListItem
                  key={element}
                  link="#"
                  as={
                    element === "Produkty" || element === "Pomieszczenia"
                      ? "button"
                      : "a"
                  } // If the navigation item is "Produkty" or "Pomieszczenia", render it as a button
                  onClickFunction={onClickFunction} // If the navigation item is "Produkty" or "Pomieszczenia", set the `onClickFunction` to open the corresponding modal
                >
                  {element}
                </ListItem>
              );
            })}
          </ul>
        </nav>
      )}

      {/* Render the postal code and shop selection buttons */}
      <div className="navigation-bar__btns-container">
        <button
          className="navigation-bar__btn-wrapper"
          onClick={() => openModalByType({ type: "postal-code" })} // Open the postal code modal on click
          data-testid="postal-code-btn"
        >
          <TruckIcon />
          {/* If the postal code is set, render it, otherwise render a placeholder */}
          <span>
            {state.postalCode !== "" ? state.postalCode : "Wpisz kod pocztowy"}
          </span>
        </button>

        <button
          className="navigation-bar__btn-wrapper"
          onClick={() =>
            openModalByType(
              state.chosenShop
                ? { type: "chosen-shop" }
                : { type: "choose-shop" },
            )
          } // If the shop is chosen, open the chosen shop modal, otherwise open the choose shop modal
          data-testid="choose-shop-btn"
        >
          <ShopIcon />
          {/* If the shop is chosen, render its name, otherwise render a placeholder */}
          <span>
            {state.chosenShop
              ? state.chosenShop.name.split("IKEA")
              : "Wybierz sklep"}
          </span>
        </button>
      </div>
    </div>
  );
}
