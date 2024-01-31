// Import Context
import { useContext } from "react";
import { AccordionContext } from "../context/AccordionContext";

/**
 * Custom React Hook that provides access to the AccordionContext.
 *
 * This hook is a shortcut to useContext(AccordionContext) with additional error checking.
 * It ensures that the hook is used within components wrapped by AccordionContextProvider.
 * If not, it throws an error.
 *
 * @returns {object} The context value exposed by AccordionContextProvider.
 *
 * @throws {Error} If the hook is used outside of the AccordionContextProvider.
 *
 * @example
 * const accordionContext = useAccordion();
 */

export default function useAccordion() {
  const accordion = useContext(AccordionContext);

  if (accordion == null) {
    throw new Error(
      "useAccordion must be used within AccordionContextProvider",
    );
  }

  return accordion;
}
