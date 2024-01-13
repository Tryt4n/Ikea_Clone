// React
import { HTMLProps } from "react";
// Custom Hooks
import useWindowSize from "../../../hooks/useWindowSize/useWindowSize";
import useModal from "../../../hooks/useModal/useModal";
// Icons
import HamburgerIcon from "../../../Icons/HamburgerIcon";

type HamburgerBtnType = {
  className?: string; // Optional additional CSS classes
} & HTMLProps<HTMLButtonElement>; // Include all standard button attributes

/**
 * HamburgerButton component
 *
 * This component displays a hamburger button that opens a menu modal when clicked.
 *
 * @param className - Optional additional CSS classes.
 *
 * @returns A div element containing a button with a hamburger icon and a "Menu" label.
 */
export default function HamburgerButton({ className }: HamburgerBtnType) {
  // Use the useWindowSize hook to get the current window width
  const { width } = useWindowSize();
  // Use the useModal hook to get the setModalData function
  const { setModalData } = useModal();

  // Define a function to open the menu modal
  function openMenuModal() {
    // Set the modal data to indicate that the menu modal should be opened
    setModalData({ type: "menu" });
  }

  // Return the hamburger button
  return (
    <div className={`btn-container${className ? ` ${className}` : ""}`}>
      <button
        aria-label="Otwórz Menu" // Set the aria-label for accessibility
        onClick={openMenuModal} // Set the onClick handler to open the menu modal
      >
        <div className="btn-container__svg-wrapper">
          <HamburgerIcon />
        </div>

        {/* // Render the "Menu" label, hidden if the window width is less than 1200px */}
        <span className={width < 1200 ? "visually-hidden" : ""}>Menu</span>
      </button>
    </div>
  );
}
