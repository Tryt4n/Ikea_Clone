// React
import { ReactNode } from "react";
// Hooks
import useWindowSize from "../../../../hooks/useWindowSize";
// Accordions
import AccordionContainer from "../../../../components/Accordions/AccordionContainer/AccordionContainer";
import AccordionElement from "../../../../components/Accordions/AccordionElement/AccordionElement";
// Context
import { AccordionContextProvider } from "../../../../components/Accordions/context/AccordionContext";
import useAccordion from "../../../../components/Accordions/context/useAccordion";
// Constants
import { footerLists } from "../../../../constants/footerLists";
// Style
import "./index.scss";

export function FooterAccordions() {
  const { width } = useWindowSize();

  return <>{width < 900 ? <Accordions /> : <Lists />}</>;
}

function Accordions() {
  return (
    <AccordionContainer>
      {footerLists.map((list, index) => (
        <AccordionElement
          key={index}
          label={list.name}
          index={index}
        >
          <InnerLists
            list={list}
            index={index}
          />
        </AccordionElement>
      ))}
    </AccordionContainer>
  );
}

function Lists() {
  return (
    <ul className="lists-wrapper">
      {footerLists.map((list, index) => (
        <li key={index}>
          <h3>{list.name}</h3>
          <ul className="accordion-inner-list">
            <InnerListsWrapper>
              <InnerLists
                list={list}
                index={index}
              />
            </InnerListsWrapper>
          </ul>
        </li>
      ))}
    </ul>
  );
}

type InnerListsPropsType = {
  list: {
    name: string;
    list: string[];
  };
  index: number;
};

function InnerLists({ list, index }: InnerListsPropsType) {
  const { openedAccordion } = useAccordion();
  const { width } = useWindowSize();

  return (
    <ul className="accordion-inner-list">
      {list.list.map((element) => (
        <li key={element}>
          <a
            href="#"
            tabIndex={width < 900 ? (openedAccordion === index.toString() ? 0 : -1) : undefined}
          >
            {element}
          </a>
        </li>
      ))}
    </ul>
  );
}

function InnerListsWrapper({ children }: { children: ReactNode }) {
  return <AccordionContextProvider>{children}</AccordionContextProvider>;
}
