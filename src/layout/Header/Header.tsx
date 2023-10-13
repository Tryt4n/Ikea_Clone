// Intersection Observer
import { useInView } from "react-intersection-observer";
// Hooks
import useWindowSize from "../../hooks/useWindowSize";
// Components
import HamburgerButton from "../../components/HamburgerBtn/HamburgerButton";
import Navbar from "../Navbar/Navbar";
// Icons
import PhoneIcon from "../../Icons/PhoneIcon";
import TruckIcon from "../../Icons/TruckIcon";
// Style
import "./index.scss";
import NavigationBar from "../NavigationBar/NavigationBar";

export default function Header() {
  const { width } = useWindowSize();

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
        {width >= 1200 && (
          <HamburgerButton className={`header__hamburger-btn${!inView ? " fixed" : ""}`} />
        )}
        <Navbar />
      </div>
      <NavigationBar />
    </header>
  );
}
