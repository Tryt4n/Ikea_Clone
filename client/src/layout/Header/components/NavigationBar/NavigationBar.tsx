import React from "react";
// Hooks
import useSideMenu from "../../../../hooks/useSideMenu";
import useWindowSize from "../../../../hooks/useWindowSize";
// Components
import { ListElement } from "../../../../components/NavigationListElement/ListElement";
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
          tabIndex={isMenuOpen ? -1 : 0}
        >
          <TruckIcon />
          <span>Wpisz kod pocztowy</span>
        </button>
        <button
          className="navigation-bar__btn-wrapper"
          tabIndex={isMenuOpen ? -1 : 0}
        >
          <ShopIcon />
          <span>Wybierz sklep</span>
        </button>
      </div>
    </div>
  );
}
