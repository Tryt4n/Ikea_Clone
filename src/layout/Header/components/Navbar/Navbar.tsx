/**
 * Navbar.tsx
 *
 * This file contains the definition of the Navbar component. This component serves as the navigation bar
 * for the application and is responsible for rendering the navigation links, search bar, and other UI elements.
 *
 * The Navbar component uses several custom hooks to manage its state and behavior, including `useApp`, `useModal`, `useWindowSize`, and `useEventListener`.
 * It also uses the `useInView` hook from `react-intersection-observer` to determine whether the navbar is in view.
 *
 * The component uses several child components, including `HamburgerButton`, `LoginBtn`, `SearchBar`, `ListElement`, and `ShoppingCart`.
 * It also uses several icons, including `IkeaLogo`, `HeartIcon`, and `MagnifierIcon`.
 */

// Import react dependencies
import { useState } from "react";
// Import react-intersection-observer hook
import { useInView } from "react-intersection-observer";
// Import custom hooks
import useApp from "../../../../hooks/useApp/useApp";
import useModal from "../../../../hooks/useModal/useModal";
import useWindowSize from "../../../../hooks/useWindowSize/useWindowSize";
import useEventListener from "../../../../hooks/useEventListener/useEventListener";
// Import components
import HamburgerButton from "../../../../components/ui/HamburgerBtn/HamburgerButton";
import LoginBtn from "../../../../components/ui/LoginBtn/LoginBtn";
import { SearchBar } from "./InnerComponents/SearchBar/SearchBar";
import { ListElement } from "./InnerComponents/ListElement/LinkElement";
import { ShoppingCart } from "./InnerComponents/ShoppingCart/ShoppingCart";
// Import icons
import IkeaLogo from "../../../../Icons/IkeaLogo";
import HeartIcon from "../../../../Icons/HeartIcon";
import MagnifierIcon from "../../../../Icons/MagnifierIcon";
// Import styles
import "./index.scss";

/**
 * Navbar
 *
 * Component that serves as the navigation bar for the application. It renders the navigation links, search bar, and other UI elements.
 *
 * The component uses several custom hooks to manage its state and behavior, including `useApp`, `useModal`, `useWindowSize`, and `useEventListener`.
 * It also uses the `useInView` hook from `react-intersection-observer` to determine whether the navbar is in view.
 *
 * The `handleScroll` function is used to handle the scroll event and update the state of the component accordingly.
 *
 * @returns {JSX.Element} The Navbar component.
 */

export default function Navbar() {
  const { isDesktop } = useApp(); // Get the `isDesktop` property from the application context
  const { modalData } = useModal(); // Get the modal data from the modal context
  const { width } = useWindowSize(); // Get the window size from the window size context

  const [navbarRef, inView] = useInView({
    triggerOnce: false,
  }); // Get the navbar reference and whether the navbar is in view from the `useInView` hook

  const [isScrolledToTop, setIsScrolledToTop] = useState(true); // State to determine whether the navbar is scrolled to the top of the page
  const [prevScrollY, setPrevScrollY] = useState(0); // State to store the previous scroll position
  const [scrollDirection, setScrollDirection] = useState("none"); // State to store the scroll direction

  function handleScroll() {
    if (!isDesktop) return; // If the device is not a desktop, return

    const currentScrollY = window.scrollY; // Get the current scroll position
    const isTop = currentScrollY === 0; // Determine whether the navbar is at the top of the page

    // If the navbar is not at the top of the page and the user is scrolling up, set the `isScrolledToTop` state to `true` to hide the navbar and the `scrollDirection` state to "up" to indicate that the user is scrolling up the page
    if (!isTop && currentScrollY < prevScrollY) {
      setIsScrolledToTop(true);
    } else {
      // Otherwise, set the `isScrolledToTop` state to `false` to show the navbar and the `scrollDirection` state to "down" to indicate that the user is scrolling down the page
      setIsScrolledToTop(false);
    }
    setPrevScrollY(currentScrollY); // Set the previous scroll position to the current scroll position

    // If the user is scrolling down the page, set the `scrollDirection` state to "down" to indicate that the user is scrolling down the page
    if (currentScrollY > prevScrollY) {
      setScrollDirection("down");
    } else if (currentScrollY < prevScrollY) {
      // Otherwise, set the `scrollDirection` state to "up" to indicate that the user is scrolling up the page
      setScrollDirection("up");
    }
  }

  useEventListener<Event>("scroll", handleScroll); // Add a scroll event listener to the window to handle the scroll event and update the state of the component accordingly

  // Define the classes for the navbar
  const navbarInnerClasses = `navbar__inner${!inView ? " scrolled" : ""}${
    !modalData?.type && !inView && isScrolledToTop && scrollDirection !== "down"
      ? " slideDown"
      : ""
  }${
    !modalData?.type &&
    !inView &&
    !isScrolledToTop &&
    scrollDirection === "down"
      ? " slideUp"
      : ""
  }${modalData?.type && !inView ? " slideUp" : ""}${!isDesktop ? " mobile" : ""}`;

  return (
    <div
      className="main-layout navbar"
      ref={navbarRef} // Set the reference for the navbar
    >
      <div className={navbarInnerClasses} data-testid="navbar-wrapper">
        <div className="navbar__inner-container">
          <div className="navbar__logo logo">
            <a
              href="/"
              aria-label="Idź na stronę główną."
              data-testid="home-page-link"
            >
              <IkeaLogo />
              {/* The `visually-hidden` class is used to hide the text from the screen, but it is still available to screen readers */}
              <span className="visually-hidden">Strona głowna</span>
            </a>
          </div>

          {/* If the navbar is in view or the window width is greater than or equal to 700px, render the search bar */}
          {(inView || width >= 700) && <SearchBar />}

          <ul className="navbar__icons-list icons">
            {/* // If the navbar is not in view and the window width is less than 700px, render the search bar icons instead of full size searchbar */}
            {!inView && width < 700 && (
              <ListElement as="button">
                <MagnifierIcon />
                <span className="visually-hidden">Wyszukaj produkty</span>
              </ListElement>
            )}

            <ListElement className={`${width >= 1200 ? "self-align" : ""}`}>
              <LoginBtn
                className="btn-container__svg-wrapper"
                shape={width < 1200 ? "circle" : "oval"} // If the window width is less than 1200px, render the login button with a circular shape
                short={width < 1200} // If the window width is less than 1200px, render the login button with a short width
              />
            </ListElement>

            <ListElement
              as="link"
              href="/favourites"
              data-testid="lists-page-link"
            >
              <HeartIcon />
              {/* The `visually-hidden` class is used to hide the text from the screen, but it is still available to screen readers */}
              <span className="visually-hidden">Lista zakupowa</span>
            </ListElement>

            <ListElement
              as="link"
              href="/shoppingcart"
              className="navbar__shopping-cart"
              data-testid="shopping-cart-link"
            >
              <ShoppingCart />
            </ListElement>

            {/* If the window width is less than 1200px, render the hamburger button */}
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
