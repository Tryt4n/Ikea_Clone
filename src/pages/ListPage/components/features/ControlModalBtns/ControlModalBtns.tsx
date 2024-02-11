// Import custom hooks
import useApp from "../../../../../hooks/useApp/useApp";
import useModal from "../../../../../hooks/useModal/useModal";
import useList from "../../../hooks/useList";
// Import components
import { Btn } from "../../../../../components/ui/Btn/Btn";
// Import icons
import PrinterIcon from "../../../../../Icons/PrinterIcon";
import ShareIcon from "../../../../../Icons/ShareIcon";
import TripleDotsMenuIcon from "../../../../../Icons/TripleDotsMenuIcon";
// Import styles
import "./index.scss";

/**
 * ControlModalBtns is a component that renders a set of control buttons for a modal.
 *
 * It uses the useApp, useModal, and useList custom hooks to get the necessary state and functions.
 *
 * The control buttons include a share button, a print button, and a button to open the list menu modal.
 *
 * @returns A div element with the control buttons.
 */

export default function ControlModalBtns() {
  const { dispatch } = useApp(); // Use the useApp hook to get the dispatch function
  const { setModalData } = useModal(); // Use the useModal hook to get the setModalData function
  const { listState } = useList(); // Use the useList hook to get the list state

  // Define the function to open the list menu modal
  function openListMenuModal() {
    if (!listState) return; // If there is no list state, return

    // Dispatch the "setEditingList" action with the list state as the payload
    dispatch({ type: "setEditingList", payload: listState });

    // Set the modal data to "list-control"
    setModalData({ type: "list-control" });
  }

  return (
    <div className="control-modal-btns">
      <Btn shape="circle" variant="light">
        <span className="visually-hidden">Udostępnij</span>
        <ShareIcon />
      </Btn>
      <Btn shape="circle" variant="light">
        <span className="visually-hidden">Drukuj listę</span>
        <PrinterIcon />
      </Btn>
      <Btn
        shape="circle"
        variant="light"
        onClick={openListMenuModal}
        data-testid="open-list-menu-modal"
      >
        <span className="visually-hidden">Otwórz menu listy</span>
        <TripleDotsMenuIcon />
      </Btn>
    </div>
  );
}
