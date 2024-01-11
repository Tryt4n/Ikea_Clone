// Import React dependencies
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
// Import custom hooks
import useWindowSize from "../../../hooks/useWindowSize/useWindowSize";
// Import components
import { Btn } from "../../ui/Btn/Btn";
// Import styles
import "./index.scss";

/**
 * BtnsControl Component
 *
 * This component displays a control with buttons for scrolling children left and right.
 *
 * @param children - Children of the BtnsControl component.
 *
 * @returns A div element with a class of "btns-control", containing two buttons for scrolling children left and right, and a div for containing children.
 */
export default function BtnsControl({ children }: { children: ReactNode }) {
  const { width } = useWindowSize(); // Get the window width

  // Initialize state for the ability to scroll children backwards and forwards
  const [canScrollBackward, setCanScrollBackward] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  // Initialize ref for the children container
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Define a function to check if children are at the beginning or end of scrolling
  const btnsEndAndBeginning = useCallback(() => {
    const container = containerRef.current;
    const spacingSafeGuard = 5;

    if (!container) return { isBeginning: false, isEnd: false };

    const isEnd =
      container.scrollLeft + container.clientWidth + spacingSafeGuard >= container.scrollWidth;
    const isBeginning = container.scrollLeft === 0;

    return { isEnd, isBeginning };
  }, []);

  // Define a function to scroll children
  function handleScroll(direction: "prev" | "next") {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const additionalSpacing = 150;

    const { isEnd, isBeginning } = btnsEndAndBeginning();

    setCanScrollBackward(!isBeginning);
    setCanScrollForward(!isEnd);

    const scrollAmount =
      direction === "prev"
        ? -container.clientWidth + additionalSpacing
        : container.clientWidth - additionalSpacing;
    container.scrollTo({
      left: container.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  }

  // Use effect to update scrolling state when the container is scrolled
  useEffect(() => {
    const container = containerRef.current;

    function handleStatesOnScrolling() {
      const { isEnd, isBeginning } = btnsEndAndBeginning();

      setCanScrollBackward(!isBeginning);
      setCanScrollForward(!isEnd);
    }

    if (container) {
      container.addEventListener("scroll", handleStatesOnScrolling);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleStatesOnScrolling);
      }
    };
  }, [btnsEndAndBeginning]);

  // Use effect to update scrolling state when the window width changes
  useEffect(() => {
    const { isEnd, isBeginning } = btnsEndAndBeginning();

    isEnd ? setCanScrollForward(false) : setCanScrollForward(true);
    isBeginning ? setCanScrollBackward(false) : setCanScrollBackward(true);
  }, [width, btnsEndAndBeginning]);

  return (
    <div className="btns-control">
      <Btn
        variant="light"
        shape="circle"
        className="btns-control__btn-navigation btns-control__btn-navigation--prev"
        onClick={() => handleScroll("prev")}
        aria-hidden={!canScrollBackward}
        disabled={!canScrollBackward}
      >
        <span className="visually-hidden">Przewiń do tyłu</span>
        <ArrowLeft />
      </Btn>

      <div
        className="btns-control__inner-wrapper"
        ref={containerRef}
      >
        {children}
      </div>

      <Btn
        variant="light"
        shape="circle"
        className="btns-control__btn-navigation btns-control__btn-navigation--next"
        onClick={() => handleScroll("next")}
        aria-hidden={!canScrollForward}
        disabled={!canScrollForward}
      >
        <span className="visually-hidden">Przewiń do przodu</span>
        <ArrowRight />
      </Btn>
    </div>
  );
}

// Arrow left icon with size only used in this component
function ArrowLeft() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m8.4004 12.0007 5.785 5.7857 1.4143-1.4141-4.3711-4.3716 4.3711-4.3717-1.4143-1.4142-5.785 5.7859z"
      ></path>
    </svg>
  );
}

// Arrow right icon with size only used in this component
function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m15.5996 12.0007-5.785 5.7857-1.4143-1.4141 4.3711-4.3716L8.4003 7.629l1.4143-1.4142 5.785 5.7859z"
      ></path>
    </svg>
  );
}
