// Hooks
import { useRef } from "react";
import useSideMenu from "../../hooks/useSideMenu";
import useWindowSize from "../../hooks/useWindowSize";
import useLayoutEventListener from "../../hooks/useLayoutEventListener";
// Components
import ChangeCountry from "../../components/ChangeCountryBtn/ChangeCountry";
import LoginBtn from "../../components/LoginBtn/LoginBtn";
import { ListElement } from "../../components/NavigationListElement/ListElement";
// Constants
import {
  mainNavigationList,
  mainNavigationSubList,
  secondaryNavigationList,
} from "../../constants/navigationLists";
// Logos
import CloseIcon from "../../Icons/CloseIcon";
import IkeaLogo from "../../Icons/IkeaLogo";
// Style
import "./index.scss";

export default function SideMenu() {
  const { isMenuOpen, sideMenuId, toggleOpenState } = useSideMenu();
  const { width } = useWindowSize();
  const sideMenuRef = useRef<null | HTMLElement>(null);

  function handleBlockTabbingOutsideOfMenu(e: KeyboardEvent) {
    if (!isMenuOpen || sideMenuRef.current == null) return;

    if (e.key === "Tab") {
      const focusableMenuElements = sideMenuRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableMenuElements[0];
      const lastElement = focusableMenuElements[focusableMenuElements.length - 1];

      if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        (firstElement as HTMLElement).focus();
      } else if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        (lastElement as HTMLElement).focus();
      }
    }
  }

  useLayoutEventListener("keydown", handleBlockTabbingOutsideOfMenu);

  return (
    <aside
      id={sideMenuId}
      className="aside-menu"
      ref={sideMenuRef}
      aria-hidden={!isMenuOpen}
    >
      <h2 className="visually-hidden">Menu Poboczne</h2>
      <div className="aside-menu__top">
        <button
          className="btn-container"
          disabled={!isMenuOpen}
          onClick={toggleOpenState}
          tabIndex={isMenuOpen ? 0 : -1}
        >
          <div className=" btn-container__svg-wrapper">
            <CloseIcon />
          </div>
          <span className="visually-hidden">Zamknij Menu</span>
        </button>
        <div className="aside-menu__container aside-menu__svg-wrapper">
          <a
            href="/"
            tabIndex={isMenuOpen ? 0 : -1}
          >
            <IkeaLogo />
          </a>
        </div>
      </div>

      {width < 1200 && (
        <div className="aside-menu__container aside-menu__login">
          <LoginBtn tabIndex={isMenuOpen ? 0 : -1} />
        </div>
      )}

      <nav
        className="aside-menu__container aside-menu__navigation"
        aria-label="Nawigacja menu pobocznego"
      >
        <h3 className="visually-hidden">Nawigacja Menu Pobocznego</h3>
        <ul className="aside-menu__navigation--top">
          {mainNavigationList.map((element) => (
            <ListElement
              key={element}
              text={element}
              menuOpen={false}
            />
          ))}

          {mainNavigationSubList.map((element) => (
            <ListElement
              key={element}
              text={element}
              className="aside-menu__fs-sm"
              menuOpen={false}
            />
          ))}
        </ul>

        <ul className="aside-menu__navigation--bottom">
          {secondaryNavigationList.map((element) => (
            <ListElement
              key={element}
              text={element}
              menuOpen={false}
            />
          ))}
        </ul>

        <div className="aside-menu__change-country">
          <ChangeCountry tabIndex={isMenuOpen ? 0 : -1} />
        </div>
      </nav>
    </aside>
  );
}
