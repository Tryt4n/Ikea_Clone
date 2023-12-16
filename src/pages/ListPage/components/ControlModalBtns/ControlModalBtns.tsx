// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
import useList from "../../context/useList";
// Components
import { Btn } from "../../../../components/Btn/Btn";
// Icons
import PrinterIcon from "../../../../Icons/PrinterIcon";
import ShareIcon from "../../../../Icons/ShareIcon";
import TripleDotsMenuIcon from "../../../../Icons/TripleDotsMenuIcon";
// Style
import "./index.scss";

export default function ControlModalBtns() {
  const { dispatch } = useApp();
  const { setModalData } = useModal();
  const { listState } = useList();

  function openListMenuModal() {
    if (!listState) return;

    dispatch({ type: "setEditingList", payload: listState });

    setModalData({ type: "list-control" });
  }

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
        onClick={openListMenuModal}
      >
        <span className="visually-hidden">Otwórz menu listy</span>
        <TripleDotsMenuIcon />
      </Btn>
    </div>
  );
}
