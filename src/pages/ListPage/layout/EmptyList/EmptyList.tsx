// Import dependencies from react-router-dom
import { useNavigate } from "react-router-dom";
// Import custom hooks
import useApp from "../../../../hooks/useApp/useApp";
import useList from "../../context/useList";
import useModal from "../../../../hooks/useModal/useModal";
// Import components
import { Btn } from "../../../../components/ui/Btn/Btn";
// Import icons
import EditIcon from "../../../../Icons/EditIcon";
import TripleDotsMenuIcon from "../../../../Icons/TripleDotsMenuIcon";
// Import styles
import "./index.scss";

/**
 * EmptyList is a functional component that uses the useApp, useList, and useModal custom hooks to manage the application state, list state, and modal state respectively.
 * It defines a navigate function using the useNavigate hook from react-router-dom.
 * It defines two functions openNameEditModal and openListControlMenu to open the name edit modal and list control menu respectively.
 * It renders a div with two buttons to open the name edit modal and list control menu, a text wrapper with a strong tag and a paragraph, and a button to navigate to the home page.
 *
 * @returns {JSX.Element} A div with two buttons to open the name edit modal and list control menu, a text wrapper with a strong tag and a paragraph, and a button to navigate to the home page.
 */

export default function EmptyList() {
  const { dispatch } = useApp(); // Destructure the dispatch variable from the useApp custom hook.
  const { setModalData } = useModal(); // Destructure the setModalData variable from the useModal custom hook.
  const { listState: list } = useList(); // Destructure the listState variable from the useList custom hook.
  const navigate = useNavigate(); // Define a navigate function using the useNavigate hook from react-router-dom.

  // Define functions to open the name edit modal menu.
  function openNameEditModal() {
    if (!list) return; // if there is no list, return

    dispatch({ type: "setEditingList", payload: list });

    setModalData({ type: "change-list-name" });
  }

  // Define functions to open the list control menu.
  function openListControlMenu() {
    if (!list) return; // if there is no list, return

    dispatch({ type: "setEditingList", payload: list });

    setModalData({ type: "list-control" });
  }

  return (
    <div className="empty-list">
      <div className="empty-list__btns-container">
        {/* Button to open the name edit modal menu. */}
        <Btn
          shape="circle"
          variant="light"
          onClick={openNameEditModal}
        >
          <span className="visually-hidden">Edytuj listę</span>
          <EditIcon />
        </Btn>

        {/* Button to open the list control menu. */}
        <Btn
          shape="circle"
          variant="light"
          className="empty-list__btn-menu"
          onClick={openListControlMenu}
        >
          <span className="visually-hidden">Otwórz menu listy</span>
          <TripleDotsMenuIcon />
        </Btn>
      </div>

      <div className="empty-list__text-wrapper">
        <strong>Ta lista potrzebuje odrobiny miłości</strong>
        <p>Zaznacz wszystkie produkty, które chcesz dodać do tej listy.</p>
      </div>

      {/* Button to navigate to the home page. */}
      <Btn
        role="link"
        aria-label="Przejdź do strony głównej"
        onClick={() => navigate("/")}
      >
        Odkrywaj więcej
      </Btn>
    </div>
  );
}
