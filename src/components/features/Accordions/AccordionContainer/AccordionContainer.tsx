// Import React dependencies
import { ReactElement, type HTMLProps } from "react";
// Import context
import { AccordionContextProvider } from "../context/AccordionContext";
// Import components
import AccordionElement from "../AccordionElement/AccordionElement";
// Import styles
import "../index.scss";

// Define the type for the AccordionContainer props
export type AccordionContainerPropsType = {
  children:
    | ReactElement<typeof AccordionElement>[]
    | ReactElement<typeof AccordionElement>; // The children of the AccordionContainer, which should be one or more AccordionElement components
} & HTMLProps<HTMLUListElement>; // The props for the ul element

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
  ...props
}: AccordionContainerPropsType) {
  return (
    <AccordionContextProvider>
      <ul className="accordions-container" {...props}>
        {children}
      </ul>
    </AccordionContextProvider>
  );
}
