// React
import { useEffect } from "react";
// react-router-dom
import { useNavigate, useParams } from "react-router-dom";
// Custom Hooks
import useApp from "../../hooks/useApp";
import useModal from "../../hooks/useModal";
// Components
import Btn from "../../components/Btn/Btn";
// Icons
import EditIcon from "../../Icons/EditIcon";
import TripleDotsMenuIcon from "../../Icons/TripleDotsMenuIcon";
// Style
import "./index.scss";

export default function ListPage() {
  const { state, dispatch } = useApp();
  const { setModalData } = useModal();
  const params = useParams();
  const navigate = useNavigate();

  const list =
    state.favouriteLists && state.favouriteLists.find((list) => list.id === params.listId);

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

  useEffect(() => {
    if (!list) {
      navigate("/favourites");
    }
  }, [list, navigate]);

  return (
    <article className="list-page">
      <h2 className="list-page__header">{list?.name}</h2>

      <div className="list-page__btns-container">
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
          className="list-page__btn-menu"
          onClick={openListControlMenu}
        >
          <span className="visually-hidden">Otwórz menu listy</span>
          <TripleDotsMenuIcon />
        </Btn>
      </div>

      <div className="list-page__text-wrapper">
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
    </article>
  );
}
