// React
import { useCallback, useEffect, useRef, useState } from "react";
// Components
import Btn from "../Btn/Btn";
// Const
import { btnsControlList } from "../../constants/btnsControlList";
// Style
import "./index.scss";

type BtnsControlPropsType = {
  onClickFunction?: () => void;
};

export default function BtnsControl({ onClickFunction }: BtnsControlPropsType) {
  const [pressedBtn, setPressedBtn] = useState("Wszystkie");
  const [canScrollBackward, setCanScrollBackward] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);

  const btnsWrapperRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback((direction: "prev" | "next") => {
    if (btnsWrapperRef.current) {
      const container = btnsWrapperRef.current;
      const isEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth;
      const isBeginning = container.scrollLeft === 0;

      setCanScrollBackward(!isBeginning);
      setCanScrollForward(!isEnd);

      const scrollAmount = direction === "prev" ? -container.clientWidth : container.clientWidth;
      container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      if (btnsWrapperRef.current) {
        const container = btnsWrapperRef.current;
        const isEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth;
        const isBeginning = container.scrollLeft === 0;

        setCanScrollBackward(!isBeginning);
        setCanScrollForward(!isEnd);
      }
    }

    if (btnsWrapperRef.current) {
      btnsWrapperRef.current.addEventListener("scroll", handleResize);
    }

    return () => {
      if (btnsWrapperRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        btnsWrapperRef.current.removeEventListener("scroll", handleResize);
      }
    };
  }, []);

  function btnPressed(index: number) {
    setPressedBtn(btnsControlList[index]);

    if (onClickFunction) {
      onClickFunction();
    }
  }

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
        ref={btnsWrapperRef}
        className="btns-control__container"
      >
        {btnsControlList.map((btn, index) => {
          return (
            <Btn
              key={btn}
              variant="gray"
              aria-pressed={btn === pressedBtn}
              disabled={btn === pressedBtn}
              onClick={() => btnPressed(index)}
            >
              {btn}
            </Btn>
          );
        })}
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
