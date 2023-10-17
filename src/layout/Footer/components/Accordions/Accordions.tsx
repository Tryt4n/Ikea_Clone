// React
import { useState } from "react";
// Hooks
import useWindowSize from "../../../../hooks/useWindowSize";
// Constants
import { footerLists } from "../../../../constants/footerLists";
// Icons
import ChevronRightIcon from "../../../../Icons/ChevronRightIcon";
// Style
import "./index.scss";

export function Accordions() {
  const { width } = useWindowSize();
  const [openedAccordion, setOpenedAccordion] = useState<undefined | string>();

  return (
    <ul className="accordions-list">
      {footerLists.map((list, index) => (
        <li
          className="accordions-list__list-element"
          key={list.name}
        >
          <button
            className="accordion-btn"
            aria-controls={`accordion-${index + 1}-content`}
            aria-expanded={openedAccordion === index.toString()}
            onClick={() => {
              if (openedAccordion !== `${index}`) {
                setOpenedAccordion(`${index}`);
              } else {
                setOpenedAccordion(undefined);
              }
            }}
          >
            <span>{list.name}</span>
            {width < 900 && <ChevronRightIcon />}
          </button>

          <div
            id={`accordion-${index + 1}-content`}
            className="accordion"
            role="region"
            aria-hidden={openedAccordion !== index.toString()}
          >
            <ul className="accordion-inner-list">
              {list.list.map((element) => (
                <li key={element}>
                  <a
                    href="#"
                    tabIndex={openedAccordion === index.toString() ? 0 : -1}
                  >
                    {element}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
