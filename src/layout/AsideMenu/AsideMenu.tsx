// Hooks
import useSideMenu from "../../hooks/useSideMenu";
import useWindowSize from "../../hooks/useWindowSize";
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

export default function AsideMenu() {
  const { isMenuOpen, sideMenuId, toggleOpenState } = useSideMenu();
  const { width } = useWindowSize();

  return (
    <aside
      id={sideMenuId}
      className="aside-menu"
      aria-hidden={!isMenuOpen}
    >
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
