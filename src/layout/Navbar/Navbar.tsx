// Intersection Observer
import { useInView } from "react-intersection-observer";
// Hooks
import useWindowSize from "../../hooks/useWindowSize";
// Style
import "./index.scss";
import IkeaLogo from "../../Icons/IkeaLogo";
import HamburgerButton from "../../components/HamburgerBtn/HamburgerButton";
import HeartIcon from "../../Icons/HeartIcon";
import ShoppingCartIcon from "../../Icons/ShoppingCartIcon";
import LoginBtn from "../../components/LoginBtn/LoginBtn";
import ShopIcon from "../../Icons/ShopIcon";
import TruckIcon from "../../Icons/TruckIcon";

export default function Navbar() {
  const { width } = useWindowSize();

  const [navbarRef, inView] = useInView({
    triggerOnce: false,
  });

  return (
    <div
      className="navbar"
      ref={navbarRef}
    >
      <div className="navbar__logo logo">
        <a
          href="/"
          aria-label="Idź na stronę główną."
        >
          <IkeaLogo />
          <span className="visually-hidden">Ikea</span>
        </a>
      </div>

      <label
        htmlFor="search-product"
        className="visually-hidden"
      >
        Czego szukasz?
      </label>
      <input
        type="search"
        name="search-product"
        id="search-product"
        className="searchbar"
      />

      <ul className="navbar__icons-list icons">
        <li className="btn-container">
          <LoginBtn
            className="btn-container__svg-wrapper"
            short
          />
        </li>
        <li className="btn-container">
          <a
            href="#"
            className="btn-container__svg-wrapper"
          >
            <HeartIcon />
            <span className="visually-hidden">Lista zakupowa</span>
          </a>
        </li>
        <li className="btn-container">
          <a
            href="#"
            className="btn-container__svg-wrapper"
          >
            <ShoppingCartIcon />
            <span className="visually-hidden">Koszyk</span>
          </a>
        </li>
        {width < 1200 && (
          <li>
            <HamburgerButton />
          </li>
        )}
      </ul>

      <div className="navbar__btn-wrapper btns">
        <button className="navbar__btn-wrapper--inner postal">
          <TruckIcon />
          <span>Wpisz kod pocztowy</span>
        </button>
        <button className="navbar__btn-wrapper--inner shop">
          <ShopIcon />
          <span>Wybierz sklep</span>
        </button>
      </div>
    </div>
  );
}
