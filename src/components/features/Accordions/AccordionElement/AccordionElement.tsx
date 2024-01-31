// Import React dependencies
import { ReactNode, useCallback, useEffect, useState } from "react";
// Import context
import useAccordion from "../hooks/useAccordion";
// Import icons
import ChevronRightSmall from "../../../../Icons/ChevronRightSmall";
import ChevronRightIcon from "../../../../Icons/ChevronRightIcon";

// Define the type for the AccordionElement props
type AccordionElementPropsType = {
  children: ReactNode; // The children of the AccordionElement
  label: string; // The label for the AccordionElement
  id: string; // The ID for the AccordionElement
  className?: string; // An optional class name for the AccordionElement
  defaultOpened?: boolean; // Whether the AccordionElement should be opened by default
  chevronSmall?: boolean; // Whether to use the small chevron icon
};

/**
 * AccordionElement component
 *
 * This component displays an accordion element with a specified label and children.
 *
 * @param children - The children of the AccordionElement.
 * @param label - The label for the AccordionElement.
 * @param id - The ID for the AccordionElement.
 * @param className - An optional class name for the AccordionElement.
 * @param defaultOpened - Whether the AccordionElement should be opened by default.
 * @param chevronSmall - Whether to use the small chevron icon.
 *
 * @returns An li element with a "accordion" class (and any specified class name), containing a button that toggles the open state of the accordion, and a div that displays the children when the accordion is open.
 */

export default function AccordionElement({
  children,
  label,
  id,
  className,
  defaultOpened,
  chevronSmall,
}: AccordionElementPropsType) {
  // Get the currently opened accordion and the function to toggle an accordion from the AccordionContext
  const { openedAccordion, toggleAccordion } = useAccordion();
  // Initialize the state for whether this accordion has been toggled
  const [hasBeenToggled, setHasBeenToggled] = useState(false);

  // Define a memoized version of the toggleAccordion function that only changes when the id or toggleAccordion function changes
  const memoizedToggleAccordion = useCallback(
    () => toggleAccordion(id),
    [id, toggleAccordion],
  );

  // Use an effect to open the accordion by default if it hasn't been toggled yet
  useEffect(() => {
    if (defaultOpened && !hasBeenToggled) {
      memoizedToggleAccordion();
      setHasBeenToggled(true);
    }
  }, [defaultOpened, memoizedToggleAccordion, hasBeenToggled]);

  return (
    <li className={`accordion${className ? ` ${className}` : ""}`}>
      <button
        className="accordion__btn"
        aria-controls={`accordion-${id + 1}-content`}
        aria-expanded={openedAccordion === id.toString()}
        onClick={() => toggleAccordion(id)}
      >
        <h3 className="accordion__label">{label}</h3>
        {chevronSmall ? <ChevronRightSmall /> : <ChevronRightIcon />}
      </button>

      <div
        id={`accordion-${id + 1}-content`}
        className="accordion__content"
        role="region"
        aria-hidden={openedAccordion !== id.toString()}
      >
        {children}
      </div>
    </li>
  );
}
