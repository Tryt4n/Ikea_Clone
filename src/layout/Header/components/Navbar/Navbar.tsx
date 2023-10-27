// React
import React, { HTMLProps, ReactNode, useState } from "react";
// Intersection Observer
import { useInView } from "react-intersection-observer";
// Hooks
import useWindowSize from "../../../../hooks/useWindowSize";
import useEventListener from "../../../../hooks/useEventListener";
import useSideMenu from "../../../../hooks/useSideMenu";
// Components
import HamburgerButton from "../../../../components/HamburgerBtn/HamburgerButton";
import LoginBtn from "../../../../components/LoginBtn/LoginBtn";
// Icons
import IkeaLogo from "../../../../Icons/IkeaLogo";
import HeartIcon from "../../../../Icons/HeartIcon";
import ShoppingCartIcon from "../../../../Icons/ShoppingCartIcon";
import MagnifierIcon from "../../../../Icons/MagnifierIcon";
// Style
import "./index.scss";

export default function Navbar() {
  const { width } = useWindowSize();
  const { isMenuOpen, isDesktop } = useSideMenu();

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
    isMenuOpen && !inView ? " slideUp" : ""
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
              tabIndex={isMenuOpen ? -1 : 0}
              aria-label="Idź na stronę główną."
            >
              <IkeaLogo />
              <span className="visually-hidden">Strona głowna</span>
            </a>
          </div>

          {(inView || width >= 700) && <SearchBar isMenuOpen={isMenuOpen} />}

          <ul className="navbar__icons-list icons">
            {!inView && width < 700 && (
              <ListElement
                as="button"
                isMenuOpen={isMenuOpen}
              >
                <MagnifierIcon />
                <span className="visually-hidden">Wyszukaj produkty</span>
              </ListElement>
            )}

            <ListElement className={`${width >= 1200 ? "self-align" : ""}`}>
              <LoginBtn
                className="btn-container__svg-wrapper"
                short={width < 1200}
                tabIndex={isMenuOpen ? -1 : 0}
              />
            </ListElement>

            <ListElement
              as="link"
              isMenuOpen={isMenuOpen}
            >
              <HeartIcon />
              <span className="visually-hidden">Lista zakupowa</span>
            </ListElement>

            <ListElement
              as="link"
              isMenuOpen={isMenuOpen}
            >
              <ShoppingCartIcon />
              <span className="visually-hidden">Koszyk</span>
            </ListElement>

            {width < 1200 && (
              <ListElement container="false">
                <HamburgerButton />
              </ListElement>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SearchBar({ isMenuOpen }: { isMenuOpen: boolean }) {
  return (
    <form
      className="navbar__searchbar-wrapper searchbar"
      autoComplete="off"
      onSubmit={(e) => e.preventDefault()}
    >
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
        tabIndex={isMenuOpen ? -1 : 0}
      />
    </form>
  );
}

type ButtonProps = {
  children: ReactNode;
  as?: "button";
  className?: string;
  isMenuOpen?: boolean;
  container?: "true" | "false";
};

type LinkProps = {
  children: ReactNode;
  as: "link";
  className?: string;
  isMenuOpen?: boolean;
  link?: string;
  container?: "true" | "false";
};

type ListElementPropsType =
  | (ButtonProps & HTMLProps<HTMLButtonElement>)
  | (LinkProps & HTMLProps<HTMLAnchorElement>);

function ListElement({
  children,
  as,
  className,
  isMenuOpen,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  link = "#",
  container = "true",
  ...props
}: ListElementPropsType) {
  const Element = !as ? React.Fragment : as === "button" ? "button" : "a";

  return (
    <li
      className={`${container === "true" ? "btn-container" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      {Element === React.Fragment ? (
        <>{children}</>
      ) : (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Element
          href={as === "link" ? link : undefined}
          tabIndex={isMenuOpen ? -1 : 0}
          className="btn-container__svg-wrapper"
          {...props}
        >
          {children}
        </Element>
      )}
    </li>
  );
}
