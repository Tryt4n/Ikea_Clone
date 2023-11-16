import { ReactNode, createContext, useState } from "react";

type AccordionContextType = {
  openedAccordion?: string;
  toggleAccordion: (index: number) => void;
};

export const AccordionContext = createContext<AccordionContextType | null>(null);

export function AccordionContextProvider({ children }: { children: ReactNode }) {
  const [openedAccordion, setOpenedAccordion] = useState<undefined | string>();

  function toggleAccordion(index: number) {
    if (openedAccordion !== `${index}`) {
      setOpenedAccordion(`${index}`);
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
