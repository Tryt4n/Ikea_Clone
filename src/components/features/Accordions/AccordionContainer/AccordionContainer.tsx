// Import React dependencies
import { ReactElement } from "react";
// Import context
import { AccordionContextProvider } from "../context/AccordionContext";
// Import components
import AccordionElement from "../AccordionElement/AccordionElement";
// Import styles
import "../index.scss";

// Define the type for the AccordionContainer props
export interface AccordionContainerPropsType {
  children:
    | ReactElement<typeof AccordionElement>[]
    | ReactElement<typeof AccordionElement>; // The children of the AccordionContainer, which should be one or more AccordionElement components
}

/**
 * AccordionContainer component
 *
 * This component provides an AccordionContextProvider and a list container for AccordionElement components.
 *
 * @param children - The children of the AccordionContainer, which should be one or more AccordionElement components.
 *
 * @returns An AccordionContextProvider component containing a ul element with a "accordions-container" class and the specified children.
 */

export default function AccordionContainer({
  children,
}: AccordionContainerPropsType) {
  return (
    <AccordionContextProvider>
      <ul className="accordions-container">{children}</ul>
    </AccordionContextProvider>
  );
}
