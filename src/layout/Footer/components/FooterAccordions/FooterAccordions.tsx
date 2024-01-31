/**
 * FooterAccordions.tsx
 *
 * This file contains the definition of the FooterAccordions component. This component serves as the accordion
 * for the footer of the application and is responsible for rendering the accordion elements or lists based on the window size.
 *
 * The FooterAccordions component uses the `useWindowSize` custom hook to get the current window size.
 *
 * The component uses several child components, including `AccordionContainer`, `AccordionElement`, and `InnerLists`.
 * It also uses the `AccordionContextProvider` context provider and the `useAccordion` custom hook.
 *
 * The `footerLists` constant is used to provide the data for the accordion elements or lists.
 */

// Import react dependencies
import type { ReactNode } from "react";
// Import custom hooks
import useWindowSize from "../../../../hooks/useWindowSize/useWindowSize";
// Import accordion components
import AccordionContainer from "../../../../components/features/Accordions/AccordionContainer/AccordionContainer";
import AccordionElement from "../../../../components/features/Accordions/AccordionElement/AccordionElement";
// Import accordion context
import { AccordionContextProvider } from "../../../../components/features/Accordions/context/AccordionContext";
import useAccordion from "../../../../components/features/Accordions/hooks/useAccordion";
// Import constants
import { footerLists } from "../../../../constants/footerLists";
// Import styles
import "./index.scss";

/**
 * FooterAccordions
 *
 * Component that serves as the accordion for the footer of the application. It renders the accordion elements or lists based on the window size.
 *
 * @returns {JSX.Element} The FooterAccordions component.
 */
export function FooterAccordions() {
  const { width } = useWindowSize();

  // Render the accordion elements or lists based on the window size
  return <>{width < 900 ? <Accordions /> : <Lists />}</>;
}

/**
 * Accordions
 *
 * Component that renders the accordion elements.
 *
 * @returns {JSX.Element} The Accordions component.
 */
function Accordions() {
  return (
    <AccordionContainer>
      {/* Map through the `footerLists` constant and render the lists */}
      {footerLists.map((list, index) => (
        <AccordionElement key={index} label={list.name} id={index.toString()}>
          <InnerLists list={list} index={index} />
        </AccordionElement>
      ))}
    </AccordionContainer>
  );
}

/**
 * Lists
 *
 * Component that renders the lists.
 *
 * @returns {JSX.Element} The Lists component.
 */
function Lists() {
  return (
    <ul className="lists-wrapper" data-testid="footer-lists-wrapper">
      {/* Map through the `footerLists` constant and render the lists */}
      {footerLists.map((list, index) => (
        <li key={index}>
          <h3>{list.name}</h3>

          <InnerListsWrapper>
            <InnerLists list={list} index={index} />
          </InnerListsWrapper>
        </li>
      ))}
    </ul>
  );
}

// Define the type for the InnerLists component props
type InnerListsPropsType = {
  list: {
    name: string; // The name of the list
    list: string[]; // The list data
  }; // The list data for the component
  index: number; // The index of the list
};

/**
 * InnerLists
 *
 * Component that renders the inner lists of the accordion elements or lists.
 *
 * @param {Object} props.list - The list data for the component.
 * @param {number} props.index - The index of the list.
 * @returns {JSX.Element} The InnerLists component.
 */
function InnerLists({ list, index }: InnerListsPropsType) {
  const { openedAccordion } = useAccordion();
  const { width } = useWindowSize();

  return (
    <ul className="accordion-inner-list">
      {list.list.map((element) => (
        <li key={element}>
          <a
            href="#"
            tabIndex={
              width < 900
                ? openedAccordion === index.toString()
                  ? 0
                  : -1
                : undefined
            } // If the accordion is enabled (width less than 900px), set the `tabIndex` attribute to 0 if the accordion element is opened, otherwise set it to -1
          >
            {element}
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * InnerListsWrapper
 *
 * Component that serves as a wrapper for the InnerLists component. It provides the AccordionContext to its children.
 *
 * @param {ReactNode} props.children - The children of the component.
 * @returns {JSX.Element} The InnerListsWrapper component.
 */
function InnerListsWrapper({ children }: { children: ReactNode }) {
  return <AccordionContextProvider>{children}</AccordionContextProvider>;
}
