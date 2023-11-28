// React
import React, { HTMLProps, ReactNode, useState } from "react";
// Intersection Observer
import { useInView } from "react-intersection-observer";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
import useWindowSize from "../../../../hooks/useWindowSize";
import useEventListener from "../../../../hooks/useEventListener";
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
  //!
  const { isModalOpen } = useModal();
  const { isDesktop } = useApp();
  //!

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
    !isModalOpen && !inView && isScrolledToTop && scrollDirection !== "down" ? " slideDown" : ""
  }${!isModalOpen && !inView && !isScrolledToTop && scrollDirection === "down" ? " slideUp" : ""}${
    isModalOpen && !inView ? " slideUp" : ""
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
              <span className="visually-hidden">Strona głowna</span>
            </a>
          </div>

          {(inView || width >= 700) && <SearchBar />}

          <ul className="navbar__icons-list icons">
            {!inView && width < 700 && (
              <ListElement as="button">
                <MagnifierIcon />
                <span className="visually-hidden">Wyszukaj produkty</span>
              </ListElement>
            )}

            <ListElement className={`${width >= 1200 ? "self-align" : ""}`}>
              <LoginBtn
                className="btn-container__svg-wrapper"
                short={width < 1200}
              />
            </ListElement>

            <ListElement as="link">
              <HeartIcon />
              <span className="visually-hidden">Lista zakupowa</span>
            </ListElement>

            <ListElement as="link">
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

function SearchBar() {
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
      />
    </form>
  );
}

type ButtonProps = {
  children: ReactNode;
  as?: "button";
  className?: string;
  container?: "true" | "false";
};

type LinkProps = {
  children: ReactNode;
  as: "link";
  className?: string;
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
          className="btn-container__svg-wrapper"
          {...props}
        >
          {children}
        </Element>
      )}
    </li>
  );
}
