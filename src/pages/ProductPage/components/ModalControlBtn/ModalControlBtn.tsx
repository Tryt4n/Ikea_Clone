// Import react dependencies
import type { ButtonHTMLAttributes } from "react";
// Import icons
import ChevronRightSmall from "../../../../Icons/ChevronRightSmall";
// Import styles
import "./index.scss";

// Define the prop types for the component
type ModalControlBtnPropsType = {
  chooseText: "kolor" | "rozmiar"; // The text to be displayed in the button, indicating what type of variant the user can choose ("kolor" for color or "rozmiar" for size).
  variant: string; // The currently selected variant.
} & ButtonHTMLAttributes<HTMLButtonElement>; // Include all standard button attributes

/**
 * ModalControlBtn Component
 *
 * This is a React functional component. It displays a button that allows the user to choose a variant (color or size) for a product. The button includes the currently selected variant and an icon indicating that more options are available if they are not enough space to display all options.
 *
 * @component
 * @param {string} chooseText - The text to be displayed in the button, indicating what type of variant the user can choose ("kolor" for color or "rozmiar" for size).
 * @param {string} props.variant - The currently selected variant.
 * @param {ButtonHTMLAttributes<HTMLButtonElement>} props.props - Any other standard button attributes.
 *
 * @example
 * <ModalControlBtn chooseText="kolor" variant="Czerwony" onClick={handleClick} />
 *
 * @returns A JSX element that consists of a `button` with the class name `modal-control-btn`. Inside this `button`, it renders a `div` containing two `span` elements that display the `chooseText` and `variant` props, and a `ChevronRightSmall` icon to indicate that more options are available.
 */

export default function ModalControlBtn({
  chooseText,
  variant,
  ...props // Destructure the props object to get the standard button attributes
}: ModalControlBtnPropsType) {
  return (
    <button
      className="modal-control-btn"
      {...props}
    >
      <div className="modal-control-btn__text-wrapper">
        <span>Wybierz {chooseText}</span>
        <span aria-label={`Aktualnie wybrany ${chooseText}`}>{variant}</span>
      </div>

      <ChevronRightSmall />
    </button>
  );
}
