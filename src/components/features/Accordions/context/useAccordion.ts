import { useContext } from "react";
import { AccordionContext } from "./AccordionContext";

export default function useAccordion() {
  const accordion = useContext(AccordionContext);

  if (accordion == null) {
    throw new Error("useAccordion must be used within AccordionContextProvider");
  }

  return accordion;
}
