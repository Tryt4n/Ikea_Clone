// Import types
import type { ButtonHTMLAttributes } from "react";
// Import styles
import "./index.scss";

// Define LocationBtnPropsType type
type LocationBtnPropsType = {
  className?: string; // The additional CSS classes of the button.
} & ButtonHTMLAttributes<HTMLButtonElement>; // The HTML button element attributes.

/**
 * LocationBtn is a React component that renders a button which allows the user to use their current location.
 * The button can have additional CSS classes passed as a prop.
 *
 * @param {string} props.className - The additional CSS classes of the button.
 *
 * @example
 * <LocationBtn className="my-custom-class" />
 */

export default function LocationBtn({ className }: LocationBtnPropsType) {
  return (
    <button
      type="button"
      className={`current-location-btn${className ? ` ${className}` : ""}`}
    >
      Użyj obecnej lokalizacji
    </button>
  );
}
