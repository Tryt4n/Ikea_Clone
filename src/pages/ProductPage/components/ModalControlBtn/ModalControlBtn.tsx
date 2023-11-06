// Icons
import ChevronRightSmall from "../../../../Icons/ChevronRightSmall";
// Style
import "./index.scss";

type ModalControlBtnPropsType = {
  chooseText: "kolor" | "rozmiar";
  variant: string;
};

export default function ModalControlBtn({ chooseText, variant }: ModalControlBtnPropsType) {
  return (
    <button className="modal-control-btn">
      <div className="modal-control-btn__text-wrapper">
        <span>Wybierz {chooseText}</span>
        <span>{variant}</span>
      </div>
      <ChevronRightSmall />
    </button>
  );
}
