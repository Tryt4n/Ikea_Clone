// React
import { useCallback, useEffect, useRef } from "react";
// react-router-dom
import { ScrollRestoration, useNavigate, useParams } from "react-router-dom";
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
  const listStateRef = useRef(listState); //? useRef to avoid invoking an infinity loop

  const findListById = useCallback(() => {
    return state.favouriteLists?.find((list) => list.id === params.listId);
  }, [state.favouriteLists, params]);

  const sortList = useCallback(() => {
    const currentListState = listStateRef.current;

    if (currentListState && currentListState.listSorting) {
      const { listSorting } = currentListState;

      switch (listSorting) {
        case "name":
          listDispatch({ type: "sortByName" });
          break;

        case "priceAscending":
        case "priceDescending":
          listDispatch({ type: "sortByPrice", payload: listSorting });
          break;

        case "recent":
        case "oldest":
          listDispatch({ type: "sortByDate", payload: listSorting });
          break;
      }
    }
  }, [listDispatch]);

  const list = findListById(); //? search for list

  //? Check if list exists in state and if not, navigate to "/favourites"
  useEffect(() => {
    async function checkIfListExists() {
      const checkedList = findListById();
      return checkedList ? true : false;
    }

    const checkingList = async () => {
      const listExists = await checkIfListExists();

      if (list) {
        listDispatch({ type: "initList", payload: list });

        sortList();
      }

      if (state.favouriteLists && listExists === false) {
        navigate("/favourites");
      }
    };

    checkingList();
  }, [findListById, list, listDispatch, navigate, state, sortList]);

  //? Set editingList in AppContext
  useEffect(() => {
    if (list) {
      dispatch({ type: "setEditingList", payload: list });
    }
  }, [list, dispatch]);

  //? Update listStateRef
  useEffect(() => {
    listStateRef.current = listState;
  }, [listState]);

  return (
    <>
      {listState && (
        <article className="list-page">
          <ScrollRestoration />

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
