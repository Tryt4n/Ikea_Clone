// Intersection Observer
import { useInView } from "react-intersection-observer";
// Hooks
import useWindowSize from "../../hooks/useWindowSize";
// Layout
import Navbar from "../Navbar/Navbar";
// Components
import HamburgerButton from "../../components/HamburgerBtn/HamburgerButton";
// Icons
import PhoneIcon from "../../Icons/PhoneIcon";
import TruckIcon from "../../Icons/TruckIcon";
// Style
import "./index.scss";
import NavigationBar from "../NavigationBar/NavigationBar";
import useSideMenu from "../../hooks/useSideMenu";

export default function Header() {
  const { width } = useWindowSize();
  const { isMenuOpen } = useSideMenu();

  const [messagesRef, inView] = useInView({
    triggerOnce: false,
  });

  return (
    <header>
      <div
        className="header__messages"
        ref={messagesRef}
      >
        {width >= 900 && (
          <a
            href="#"
            tabIndex={isMenuOpen ? -1 : 0}
          >
            <TruckIcon />
            Odbiór w paczkomatach InPost od 1,-
          </a>
        )}
        <a
          href="#"
          tabIndex={isMenuOpen ? -1 : 0}
        >
          <PhoneIcon />
          Zakupy przez telefon lub czat
        </a>
      </div>

      <div className="page-container">
        {width >= 1200 && (
          <HamburgerButton className={`header__hamburger-btn${!inView ? " fixed" : ""}`} />
        )}
        <Navbar />
      </div>
      <NavigationBar />
    </header>
  );
}
