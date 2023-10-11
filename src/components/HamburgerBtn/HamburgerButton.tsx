import HamburgerIcon from "../../Icons/HamburgerIcon";
import { useSideMenu } from "../../hooks/useSideMenu";
import "./index.scss";

export default function HamburgerButton() {
  const { isMenuOpen, toggleOpenState, sideMenuId } = useSideMenu();

  return (
    <button
      className="hamburger-btn"
      aria-controls={sideMenuId}
      aria-expanded={isMenuOpen}
      aria-label="Otwórz Menu"
      onClick={toggleOpenState}
      disabled={isMenuOpen}
    >
      <div className="hamburger-btn__svg-wrapper">
        <HamburgerIcon />
      </div>
      Menu
    </button>
  );
}
