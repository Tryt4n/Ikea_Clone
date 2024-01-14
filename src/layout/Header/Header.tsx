// Import react intersection observer hook
import { useInView } from "react-intersection-observer";
// Import custom hooks
import useWindowSize from "../../hooks/useWindowSize/useWindowSize";
// Import layout components
import Navbar from "./components/Navbar/Navbar";
import NavigationBar from "./components/NavigationBar/NavigationBar";
// Import components
import HamburgerButton from "../../components/ui/HamburgerBtn/HamburgerButton";
// Import icons
import PhoneIcon from "../../Icons/PhoneIcon";
import TruckIcon from "../../Icons/TruckIcon";
// Import styles
import "./index.scss";

/**
 * Header
 *
 * Component that serves as the header for the application. It renders the header messages, hamburger button, navbar, and navigation bar.
 *
 * The component uses the `useInView` hook from `react-intersection-observer` to determine whether the header messages are in view.
 * It also uses the `useWindowSize` custom hook to get the current window size.
 *
 * The `messagesRef` is used to reference the header messages element, and the `inView` state is used to determine whether the header messages are in view.
 *
 * @returns {JSX.Element} The Header component.
 */

export default function Header() {
  const { width } = useWindowSize();

  const [messagesRef, inView] = useInView({
    triggerOnce: false,
  });

  return (
    <header>
      <h1 className="visually-hidden">IKEA</h1>
      <div className="header__messages" ref={messagesRef}>
        {width >= 900 && (
          <a href="#">
            <TruckIcon />
            Odbiór w paczkomatach InPost od 1,-
          </a>
        )}
        <a href="#">
          <PhoneIcon />
          Zakupy przez telefon lub czat
        </a>
      </div>

      <div className="page-container">
        {/* Render the hamburger button separately for desktop and mobile devices. In this case, the hamburger button is only rendered for desktop devices. For mobile devices, the hamburger button is rendered in the `NavigationBar` component. */}
        {width >= 1200 && (
          <HamburgerButton
            className={`header__hamburger-btn${!inView ? " fixed" : ""}`}
          /> // If the header messages are not in view, add the `fixed` class to the hamburger button to fix it to the top of the page
        )}

        <Navbar />
      </div>

      <NavigationBar />
    </header>
  );
}
