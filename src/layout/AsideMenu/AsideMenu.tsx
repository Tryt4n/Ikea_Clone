// Hooks
import useSideMenu from "../../hooks/useSideMenu";
import useWindowSize from "../../hooks/useWindowSize";
// Components
import ChangeCountry from "../../components/ChangeCountryBtn/ChangeCountry";
// Logos
import CloseIcon from "../../Icons/CloseIcon";
import IkeaLogo from "../../Icons/IkeaLogo";

import "./index.scss";
import LoginBtn from "../../components/LoginBtn/LoginBtn";

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
        >
          <div className=" btn-container__svg-wrapper">
            <CloseIcon />
          </div>
          <span className="visually-hidden">Zamknij Menu</span>
        </button>
        <div className="aside-menu__container aside-menu__svg-wrapper">
          <a href="/">
            <IkeaLogo />
          </a>
        </div>
      </div>

      {width < 1200 && (
        <div className="aside-menu__container aside-menu__login">
          <LoginBtn />
        </div>
      )}

      <nav
        className="aside-menu__container aside-menu__navigation"
        aria-label="Nawigacja menu pobocznego"
      >
        <ul className="aside-menu__navigation--top">
          <li>
            <a
              href="#"
              autoFocus
            >
              Produkty
            </a>
          </li>
          <li>
            <a href="#">Pomieszczenia</a>
          </li>
          <li>
            <a href="#">Oferty</a>
          </li>
          <li>
            <a href="#">Nowości</a>
          </li>
          <li>
            <a href="#">Przechowywanie w całym domu</a>
          </li>
          <li>
            <a
              href="#"
              className="aside-menu__fs-sm"
            >
              Sezon na domowanie z IKEA
            </a>
          </li>
          <li>
            <a
              href="#"
              className="aside-menu__fs-sm"
            >
              Inspiracje i pomysły
            </a>
          </li>
          <li>
            <a
              href="#"
              className="aside-menu__fs-sm"
            >
              Usługi projektowania
            </a>
          </li>
          <li>
            <a
              href="#"
              className="aside-menu__fs-sm"
            >
              Wypróbuj IKEA Kreativ
            </a>
          </li>
          <li>
            <a
              href="#"
              className="aside-menu__fs-sm"
            >
              Obsługa klienta
            </a>
          </li>
        </ul>

        <ul className="aside-menu__navigation--bottom">
          <li>
            <a href="#">Sklepy</a>
          </li>
          <li>
            <a href="#">Restauracja</a>
          </li>
          <li>
            <a href="#">IKEA Family</a>
          </li>
          <li>
            <a href="#">IKEA dla Firm</a>
          </li>
          <li>
            <a href="#">Oddaj i Zyskaj</a>
          </li>
          <li>
            <a href="#">Produkty drugiej szansy</a>
          </li>
        </ul>

        <div className="aside-menu__change-country">
          <ChangeCountry />
        </div>
      </nav>
    </aside>
  );
}
