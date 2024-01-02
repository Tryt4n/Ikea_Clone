// Import React dependencies
import { AnchorHTMLAttributes } from "react";
// Import icons
import GlobeIcon from "../../../Icons/GlobeIcon";
// Import styles
import "./index.scss";

// Define the type for the ChangeCountry props
type ChangeCountryPropsType = AnchorHTMLAttributes<HTMLAnchorElement>; // Include all standard anchor attributes

/**
 * ChangeCountry component
 *
 * This component displays a link that allows the user to change their country.
 *
 * @param props - Any additional props to pass to the anchor element.
 *
 * @returns An anchor element with a GlobeIcon, a "Zmień kraj" label, and any additional props.
 */
export default function ChangeCountry({ ...props }: ChangeCountryPropsType) {
  return (
    <a
      className="change-country"
      {...props} // Spread the rest of the props
    >
      <GlobeIcon />
      <span>Zmień kraj</span>
    </a>
  );
}
