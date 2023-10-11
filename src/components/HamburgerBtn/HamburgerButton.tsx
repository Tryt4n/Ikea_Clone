import HamburgerIcon from "../../Icons/HamburgerIcon";
import useSideMenu from "../../hooks/useSideMenu";

export default function HamburgerButton() {
  const { isMenuOpen, toggleOpenState, sideMenuId } = useSideMenu();

  return (
    <button
      className="btn-container"
      aria-controls={sideMenuId}
      aria-expanded={isMenuOpen}
      aria-label="Otwórz Menu"
      onClick={toggleOpenState}
      disabled={isMenuOpen}
    >
      <div className="btn-container__svg-wrapper">
        <HamburgerIcon />
      </div>
      Menu
    </button>
  );
}
