// React
import { useState } from "react";
// Intersection Observer
import { useInView } from "react-intersection-observer";
// Hooks
import useWindowSize from "../../hooks/useWindowSize";
// Components
import HamburgerButton from "../../components/HamburgerBtn/HamburgerButton";
import LoginBtn from "../../components/LoginBtn/LoginBtn";
// Icons
import IkeaLogo from "../../Icons/IkeaLogo";
import HeartIcon from "../../Icons/HeartIcon";
import ShoppingCartIcon from "../../Icons/ShoppingCartIcon";
import MagnifierIcon from "../../Icons/MagnifierIcon";
// Style
import "./index.scss";
import useEventListener from "../../hooks/useEventListener";
import useSideMenu from "../../hooks/useSideMenu";

export default function Navbar() {
  const { width } = useWindowSize();
  const { isMenuOpen } = useSideMenu();
  const isDesktop = !("ontouchstart" in window);

  const [navbarRef, inView] = useInView({
    triggerOnce: false,
  });

  const [isScrolledToTop, setIsScrolledToTop] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("none");

  function handleScroll() {
    if (!isDesktop) return;

    const currentScrollY = window.scrollY;
    const isTop = currentScrollY === 0;
    if (!isTop && currentScrollY < prevScrollY) {
      setIsScrolledToTop(true);
    } else {
      setIsScrolledToTop(false);
    }
    setPrevScrollY(currentScrollY);

    if (currentScrollY > prevScrollY) {
      setScrollDirection("down");
    } else if (currentScrollY < prevScrollY) {
      setScrollDirection("up");
    }
  }

  useEventListener<Event>("scroll", handleScroll);

  const navbarInnerClasses = `navbar__inner${!inView ? " scrolled" : ""}${
    !isMenuOpen && !inView && isScrolledToTop && scrollDirection !== "down" ? " slideDown" : ""
  }${!isMenuOpen && !inView && !isScrolledToTop && scrollDirection === "down" ? " slideUp" : ""}${
    isDesktop && isMenuOpen && !inView ? " slideUp" : ""
  }${!isDesktop ? " mobile" : ""}`;

  return (
    <div
      className="main-layout navbar"
      ref={navbarRef}
    >
      <div className={navbarInnerClasses}>
        <div className="navbar__inner-container">
          <div className="navbar__logo logo">
            <a
              href="/"
              aria-label="Idź na stronę główną."
            >
              <IkeaLogo />
              <span className="visually-hidden">Ikea</span>
            </a>
          </div>
          {(inView || width >= 700) && <SearchBar />}
          <ul className="navbar__icons-list icons">
            {!inView && width < 700 && (
              <li className="btn-container">
                <button className="btn-container__svg-wrapper">
                  <MagnifierIcon />
                </button>
              </li>
            )}
            <li className={`btn-container${width >= 1200 ? " self-align" : ""}`}>
              <LoginBtn
                className="btn-container__svg-wrapper"
                short={width < 1200}
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
        </div>
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="navbar__searchbar-wrapper searchbar">
      <label
        htmlFor="search-product"
        className="visually-hidden"
      >
        Czego szukasz?
      </label>
      <div className="navbar__searchbar-icon">
        <MagnifierIcon />
      </div>
      <input
        type="search"
        name="search-product"
        id="search-product"
        className="navbar__searchbar"
        placeholder="Czego szukasz?"
      />
    </div>
  );
}
