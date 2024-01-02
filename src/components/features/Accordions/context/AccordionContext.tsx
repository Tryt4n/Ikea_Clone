// Import React dependencies
import { ReactNode, createContext, useState } from "react";

// Define the type for the AccordionContext
type AccordionContextType = {
  openedAccordion?: string; // The ID of the currently opened accordion, if any
  toggleAccordion: (id: string) => void; // A function to toggle the open state of an accordion
};

// Create the AccordionContext with a default value of null
export const AccordionContext = createContext<AccordionContextType | null>(null);

/**
 * AccordionContextProvider component
 *
 * This component provides the AccordionContext to its children.
 *
 * @param children - The children to render inside the AccordionContextProvider.
 *
 * @returns An AccordionContext.Provider component with the current context value and the specified children.
 */
export function AccordionContextProvider({ children }: { children: ReactNode }) {
  // Initialize the state for the currently opened accordion
  const [openedAccordion, setOpenedAccordion] = useState<undefined | string>();

  /**
   * toggleAccordion function
   *
   * This function toggles the open state of an accordion.
   *
   * @param id - The ID of the accordion to toggle.
   */
  function toggleAccordion(id: string) {
    // If the specified accordion is not currently open, open it
    if (openedAccordion !== id) {
      setOpenedAccordion(id);
    } else {
      // If the specified accordion is currently open, close it
      setOpenedAccordion(undefined);
    }
  }

  // Define the context value
  const contextValue = {
    openedAccordion,
    toggleAccordion,
  };

  return <AccordionContext.Provider value={contextValue}>{children}</AccordionContext.Provider>;
}
