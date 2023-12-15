// Components
import { Btn } from "../../../../components/Btn/Btn";
// Icons
import PrinterIcon from "../../../../Icons/PrinterIcon";
import ShareIcon from "../../../../Icons/ShareIcon";
import TripleDotsMenuIcon from "../../../../Icons/TripleDotsMenuIcon";
// Style
import "./index.scss";

export default function ControlModalBtns() {
  return (
    <div className="control-modal-btns">
      <Btn
        shape="circle"
        variant="light"
      >
        <span className="visually-hidden">Udostępnij</span>
        <ShareIcon />
      </Btn>
      <Btn
        shape="circle"
        variant="light"
      >
        <span className="visually-hidden">Drukuj listę</span>
        <PrinterIcon />
      </Btn>
      <Btn
        shape="circle"
        variant="light"
      >
        <span className="visually-hidden">Otwórz menu listy</span>
        <TripleDotsMenuIcon />
      </Btn>
    </div>
  );
}
