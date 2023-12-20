// React
import { useCallback, useEffect } from "react";
// react-router-dom
import { useNavigate, useParams } from "react-router-dom";
// Context
import { ListContextProvider } from "./context/ListContext";
// Custom Hooks
import useApp from "../../hooks/useApp";
import useList from "./context/useList";
// Layout
import EmptyList from "./layout/EmptyList/EmptyList";
import ListWithProducts from "./layout/ListWithProducts/ListWithProducts";
// Style
import "./index.scss";

export default function ListPage() {
  return (
    <ListContextProvider>
      <InnerComponent />
    </ListContextProvider>
  );
}

function InnerComponent() {
  const { state, dispatch } = useApp();
  const { listState, listDispatch } = useList();
  const params = useParams();
  const navigate = useNavigate();

  const findListById = useCallback(() => {
    return state.favouriteLists?.find((list) => list.id === params.listId);
  }, [state.favouriteLists, params]);

  const list = findListById();

  //? Check if list exists in state and if not, navigate to lists page
  useEffect(() => {
    async function checkIfListExists() {
      const checkedList = findListById();
      return checkedList ? true : false;
    }

    const checkingList = async () => {
      const listExists = await checkIfListExists();

      if (list) {
        listDispatch({ type: "initList", payload: list });
      }

      if (state.favouriteLists && listExists === false) {
        navigate("/favourites");
      }
    };

    checkingList();
  }, [findListById, list, listDispatch, navigate, state]);

  useEffect(() => {
    if (list) {
      dispatch({ type: "setEditingList", payload: list });
    }
  }, [list, dispatch]);

  return (
    <>
      {listState && (
        <article className="list-page">
          <h2 className="list-page__header">{listState.name}</h2>

          {listState.products && listState.products.length > 0 ? (
            <ListWithProducts />
          ) : (
            <EmptyList />
          )}
        </article>
      )}
    </>
  );
}
