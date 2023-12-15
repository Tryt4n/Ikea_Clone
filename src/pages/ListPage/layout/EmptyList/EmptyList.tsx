// react-router-dom
import { useNavigate } from "react-router-dom";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useList from "../../context/useList";
import useModal from "../../../../hooks/useModal";
// Components
import { Btn } from "../../../../components/Btn/Btn";
// Icons
import EditIcon from "../../../../Icons/EditIcon";
import TripleDotsMenuIcon from "../../../../Icons/TripleDotsMenuIcon";
// Style
import "./index.scss";

export default function EmptyList() {
  const { dispatch } = useApp();
  const { setModalData } = useModal();
  const { list } = useList();
  const navigate = useNavigate();

  function openNameEditModal() {
    if (!list) return;

    dispatch({
      type: "setEditingList",
      payload: list,
    });

    setModalData({
      type: "change-list-name",
    });
  }

  function openListControlMenu() {
    if (!list) return;

    dispatch({ type: "setEditingList", payload: list });

    setModalData({
      type: "list-control",
    });
  }

  return (
    <div className="empty-list">
      <div className="empty-list__btns-container">
        <Btn
          shape="circle"
          variant="light"
          onClick={openNameEditModal}
        >
          <span className="visually-hidden">Edytuj listę</span>
          <EditIcon />
        </Btn>

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
