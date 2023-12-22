// React
import { ReactElement } from "react";
// Context
import { AccordionContextProvider } from "../context/AccordionContext";
// Components
import AccordionElement from "../AccordionElement/AccordionElement";
// Style
import "../index.scss";

interface AccordionContainerPropsType {
  children: ReactElement<typeof AccordionElement>[] | ReactElement<typeof AccordionElement>;
}

export default function AccordionContainer({ children }: AccordionContainerPropsType) {
  return (
    <AccordionContextProvider>
      <ul className="accordions-container">{children}</ul>
    </AccordionContextProvider>
  );
}
