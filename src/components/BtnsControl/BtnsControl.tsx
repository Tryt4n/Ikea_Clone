// React
import { ReactNode, useEffect, useRef, useState } from "react";
// Components
import Btn from "../Btn/Btn";
// Style
import "./index.scss";

type BtnsControlPropsType = {
  children: ReactNode;
};

export default function BtnsControl({ children }: BtnsControlPropsType) {
  const [canScrollBackward, setCanScrollBackward] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);

  function handleScroll(direction: "prev" | "next") {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const additionalSpacing = 150;

    const isEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth;
    const isBeginning = container.scrollLeft === 0;

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

    function handleResize() {
      if (container) {
        const isEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth;
        const isBeginning = container.scrollLeft === 0;

        setCanScrollBackward(!isBeginning);
        setCanScrollForward(!isEnd);
      }
    }

    if (container) {
      container.addEventListener("scroll", handleResize);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleResize);
      }
    };
  }, []);

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
      </Btn>
    </div>
  );
}
