// React
import { ReactNode } from "react";
// Context
import useAccordion from "../context/useAccordion";
// Icons
import ChevronRightIcon from "../../../Icons/ChevronRightIcon";

type AccordionElementPropsType = {
  children: ReactNode;
  label: string;
  index: number;
};

export default function AccordionElement({ children, label, index }: AccordionElementPropsType) {
  const { openedAccordion, toggleAccordion } = useAccordion();

  return (
    <li className="accordion">
      <button
        className="accordion__btn"
        aria-controls={`accordion-${index + 1}-content`}
        aria-expanded={openedAccordion === index.toString()}
        onClick={() => toggleAccordion(index)}
      >
        <h3 className="accordion__label">{label}</h3>
        <ChevronRightIcon />
      </button>

      <div
        id={`accordion-${index + 1}-content`}
        className="accordion__content"
        role="region"
        aria-hidden={openedAccordion !== index.toString()}
      >
        {children}
      </div>
    </li>
  );
}
