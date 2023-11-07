// Icons
import { ButtonHTMLAttributes } from "react";
import ChevronRightSmall from "../../../../Icons/ChevronRightSmall";
// Style
import "./index.scss";

type ModalControlBtnPropsType = {
  chooseText: "kolor" | "rozmiar";
  variant: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function ModalControlBtn({
  chooseText,
  variant,
  ...props
}: ModalControlBtnPropsType) {
  return (
    <button
      className="modal-control-btn"
      {...props}
    >
      <div className="modal-control-btn__text-wrapper">
        <span>Wybierz {chooseText}</span>
        <span>{variant}</span>
      </div>
      <ChevronRightSmall />
    </button>
  );
}
