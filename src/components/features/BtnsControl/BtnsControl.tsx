// React
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
// Custom Hooks
import useWindowSize from "../../../hooks/useWindowSize";
// Components
import { Btn } from "../../ui/Btn/Btn";
// Style
import "./index.scss";

type BtnsControlPropsType = {
  children: ReactNode;
};

export default function BtnsControl({ children }: BtnsControlPropsType) {
  const { width } = useWindowSize();

  const [canScrollBackward, setCanScrollBackward] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const btnsEndAndBeginning = useCallback(() => {
    const container = containerRef.current;
    const spacingSafeGuard = 5;

    if (!container) return { isBeginning: false, isEnd: false };

    const isEnd =
      container.scrollLeft + container.clientWidth + spacingSafeGuard >= container.scrollWidth;
    const isBeginning = container.scrollLeft === 0;

    return { isEnd, isBeginning };
  }, []);

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
