import React from "react";
// Intersection Observer
import { useInView } from "react-intersection-observer";
// Hooks
import useWindowSize from "../../hooks/useWindowSize";
// Layout
import Navbar from "./components/Navbar/Navbar";
import NavigationBar from "./components/NavigationBar/NavigationBar";
// Components
import HamburgerButton from "../../components/HamburgerBtn/HamburgerButton";
// Icons
import PhoneIcon from "../../Icons/PhoneIcon";
import TruckIcon from "../../Icons/TruckIcon";
// Style
import "./index.scss";

export default function Header() {
  const { width } = useWindowSize();

  const [messagesRef, inView] = useInView({
    triggerOnce: false,
  });

  return (
    <header>
      <h1 className="visually-hidden">IKEA</h1>
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
