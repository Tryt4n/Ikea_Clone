// Hooks
import React, { HTMLProps } from "react";
import useSideMenu from "../../hooks/useSideMenu";
import useWindowSize from "../../hooks/useWindowSize";
// Icons
import HamburgerIcon from "../../Icons/HamburgerIcon";

type HamburgerBtnType = {
  className?: string;
} & HTMLProps<HTMLButtonElement>;

export default function HamburgerButton({ className }: HamburgerBtnType) {
  const { isMenuOpen, toggleOpenState, sideMenuId } = useSideMenu();
  const { width } = useWindowSize();

  return (
    <div className={`btn-container${className ? ` ${className}` : ""}`}>
      <button
        aria-controls={sideMenuId}
        aria-expanded={isMenuOpen}
        aria-label="Otwórz Menu"
        onClick={toggleOpenState}
        disabled={isMenuOpen}
      >
        <div className="btn-container__svg-wrapper">
          <HamburgerIcon />
        </div>
        <span className={width < 1200 ? "visually-hidden" : undefined}>Menu</span>
      </button>
    </div>
  );
}
