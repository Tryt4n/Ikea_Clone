// Import react router dom dependencies
import { createPortal } from "react-dom";
// Import Icons
import InfoIcon from "../../../../../Icons/InfoIcon";

/**
 * InfoMessage is a functional component that renders a div with a "delivery-options__info" class.
 * Inside this div, it renders:
 * - An InfoIcon SVG component.
 * - A p element with a message.
 * The div is rendered inside a container with the id "info-message-container" using the createPortal function from react-dom.
 * If the container does not exist, the component does not render anything.
 *
 * @returns {JSX.Element | null} A div with a "delivery-options__info" class rendered inside a container with the id "info-message-container", or null if the container does not exist.
 */

export function InfoMessage() {
  // Get the container with the id "info-message-container".
  const container = document.getElementById("info-message-container");

  // If the container exists, render the div inside it using the createPortal function from react-dom.
  if (container)
    return createPortal(
      <div
        className="delivery-options__info"
        data-testid="shopping-cart-delivery-message"
      >
        <InfoIcon />
        <p>Przejdź dalej, aby sprawdzić dostępność opcji odbioru</p>
      </div>,
      container,
    );
}
