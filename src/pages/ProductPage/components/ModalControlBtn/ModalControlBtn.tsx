// React
import { ButtonHTMLAttributes } from "react";
// Icons
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
        <span aria-label={`Aktualnie wybrany ${chooseText}`}>{variant}</span>
      </div>
      <ChevronRightSmall />
    </button>
  );
}
