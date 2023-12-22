// React
import { ReactNode, useCallback, useEffect, useState } from "react";
// Context
import useAccordion from "../context/useAccordion";
// Icons
import ChevronRightSmall from "../../../../Icons/ChevronRightSmall";
import ChevronRightIcon from "../../../../Icons/ChevronRightIcon";

type AccordionElementPropsType = {
  children: ReactNode;
  label: string;
  id: string;
  className?: string;
  defaultOpened?: boolean;
  chevronSmall?: boolean;
};

export default function AccordionElement({
  children,
  label,
  id,
  className,
  defaultOpened,
  chevronSmall,
}: AccordionElementPropsType) {
  const { openedAccordion, toggleAccordion } = useAccordion();
  const [hasBeenToggled, setHasBeenToggled] = useState(false);

  const memoizedToggleAccordion = useCallback(() => toggleAccordion(id), [id, toggleAccordion]);

  useEffect(() => {
    if (defaultOpened && !hasBeenToggled) {
      memoizedToggleAccordion();
      setHasBeenToggled(true);
    }
  }, [defaultOpened, memoizedToggleAccordion, hasBeenToggled]);

  return (
    <li className={`accordion${className ? ` ${className}` : ""}`}>
      <button
        className="accordion__btn"
        aria-controls={`accordion-${id + 1}-content`}
        aria-expanded={openedAccordion === id.toString()}
        onClick={() => toggleAccordion(id)}
      >
        <h3 className="accordion__label">{label}</h3>
        {chevronSmall ? <ChevronRightSmall /> : <ChevronRightIcon />}
      </button>

      <div
        id={`accordion-${id + 1}-content`}
        className="accordion__content"
        role="region"
        aria-hidden={openedAccordion !== id.toString()}
      >
        {children}
      </div>
    </li>
  );
}
