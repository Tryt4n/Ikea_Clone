// React
import { HTMLProps } from "react";
// Hooks
import useWindowSize from "../../hooks/useWindowSize";
import useModal from "../../hooks/useModal";
// Icons
import HamburgerIcon from "../../Icons/HamburgerIcon";

type HamburgerBtnType = {
  className?: string;
} & HTMLProps<HTMLButtonElement>;

export default function HamburgerButton({ className }: HamburgerBtnType) {
  const { width } = useWindowSize();
  const { setModalData } = useModal();

  function openMenuModal() {
    setModalData({ type: "menu" });
  }

  return (
    <div className={`btn-container${className ? ` ${className}` : ""}`}>
      <button
        aria-label="Otwórz Menu"
        onClick={openMenuModal}
      >
        <div className="btn-container__svg-wrapper">
          <HamburgerIcon />
        </div>
        <span className={width < 1200 ? "visually-hidden" : undefined}>Menu</span>
      </button>
    </div>
  );
}
