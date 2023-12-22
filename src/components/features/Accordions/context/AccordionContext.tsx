import { ReactNode, createContext, useState } from "react";

type AccordionContextType = {
  openedAccordion?: string;
  toggleAccordion: (id: string) => void;
};

export const AccordionContext = createContext<AccordionContextType | null>(null);

export function AccordionContextProvider({ children }: { children: ReactNode }) {
  const [openedAccordion, setOpenedAccordion] = useState<undefined | string>();

  function toggleAccordion(id: string) {
    if (openedAccordion !== id) {
      setOpenedAccordion(id);
    } else {
      setOpenedAccordion(undefined);
    }
  }

  const contextValue = {
    openedAccordion,
    toggleAccordion,
  };

  return <AccordionContext.Provider value={contextValue}>{children}</AccordionContext.Provider>;
}
