// Import intersection observer hook
import { useInView } from "react-intersection-observer";
// Import styles
import "./index.scss";

/**
 * SustainableDevelopment Component
 *
 * This is a React functional component. It displays a sustainability message with a series of decorative circles with animations. The component uses the Intersection Observer API to apply a CSS class when the component is in the viewport.
 *
 * @returns A JSX element that consists of a `div` with the class name `sustainability`. This `div` is given a reference for the Intersection Observer API to track. Inside this `div`, it renders another `div` that displays a sustainability message, and five `div` elements that serve as decorative circles. The `div` with the sustainability message includes a `strong` element that contains a `small` element and a text node. The `small` element displays the text "Zrównoważony rozwój", and the text node displays the text "Dla ludzi + planety".
 */

export default function SustainableDevelopment() {
  // Use the Intersection Observer API to track when the component is in the viewport.
  const [sustainabilityRef, inView] = useInView({
    triggerOnce: false,
  });

  return (
    <div
      ref={sustainabilityRef}
      className={`sustainability${inView ? ` sustainability--inView` : ""}`}
      data-testid="product-page-sustainability"
    >
      <div className="sustainability__circle sustainability__circle--1">
        <strong className="sustainability__header">
          <small>Zrównoważony rozwój</small>
          Dla ludzi + planety
        </strong>
      </div>

      {/* Add decorative circles elements */}
      <div
        role="presentation" // The decorative circles are purely decorative and do not add any semantic value to the page
        aria-hidden="true" // Hide the decorative circles from screen readers
        className="sustainability__circle sustainability__circle--2"
      />
      <div
        role="presentation" // The decorative circles are purely decorative and do not add any semantic value to the page
        aria-hidden="true" // Hide the decorative circles from screen readers
        className="sustainability__circle sustainability__circle--3"
      />
      <div
        role="presentation" // The decorative circles are purely decorative and do not add any semantic value to the page
        aria-hidden="true" // Hide the decorative circles from screen readers
        className="sustainability__circle sustainability__circle--4"
      />
      <div
        role="presentation" // The decorative circles are purely decorative and do not add any semantic value to the page
        aria-hidden="true" // Hide the decorative circles from screen readers
        className="sustainability__circle sustainability__circle--5"
      />
    </div>
  );
}
