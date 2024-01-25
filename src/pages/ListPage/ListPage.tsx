// Import React dependencies
import { useCallback, useEffect, useRef } from "react";
// Import React Router dependencies
import { useNavigate, useParams } from "react-router-dom";
// Import Context Provider
import { ListContextProvider } from "./context/ListContext";
// Import custom hooks
import useApp from "../../hooks/useApp/useApp";
import useList from "./hooks/useList";
// Import components
import EmptyList from "./layout/EmptyList/EmptyList";
import ListWithProducts from "./layout/ListWithProducts/ListWithProducts";
import PageLoadingSpinner from "../../components/ui/LazyLoadPageLoadingSpinner/PageLoadingSpinner";
// Import styles
import "./index.scss";

/**
 * ListPage is a functional component that renders the list page of the application.
 *
 * It uses the ListContextProvider to provide list context to its children.
 *
 * The component renders an InnerComponent, which is defined below.
 *
 * @returns {JSX.Element} A ListContextProvider with an InnerComponent as its child.
 */
export default function ListPage() {
  return (
    <ListContextProvider>
      <InnerComponent />
    </ListContextProvider>
  );
}

/**
 * InnerComponent is a functional component that renders the inner part of the list page.
 *
 * It uses several hooks to get and manipulate state, including useApp, useList, useParams, and useNavigate.
 *
 * The component defines several functions and effects to handle list sorting and navigation.
 *
 * It renders an article element with a header and either a ListWithProducts or EmptyList component, depending on whether there are any products in the list.
 * If the list state is not yet available, it renders a PageLoadingSpinner.
 *
 * @returns {JSX.Element} An article element with a header and either a ListWithProducts or EmptyList component, or a PageLoadingSpinner.
 */
function InnerComponent() {
  const { state, dispatch } = useApp();
  const { listState, listDispatch } = useList();
  const params = useParams();
  const navigate = useNavigate();
  const listStateRef = useRef(listState); // useRef to avoid invoking an infinity loop

  // Function to find a list by its ID
  const findListById = useCallback(() => {
    return state.favouriteLists?.find((list) => list.id === params.listId);
  }, [state.favouriteLists, params]);

  // Function to sort the list based on the current list sorting state
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

  const list = findListById(); // Search for list

  // Effect to check if the list exists in the state and navigate to "/favourites" if it does not
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

  // Effect to set the editingList in the AppContext
  useEffect(() => {
    if (list) {
      dispatch({ type: "setEditingList", payload: list });
    }
  }, [list, dispatch]);

  // Effect to update listStateRef when listState changes
  useEffect(() => {
    listStateRef.current = listState;
  }, [listState]);

  return (
    <>
      <article className="list-page">
        {listState ? (
          <>
            <h2 className="list-page__header">{listState.name}</h2>

            {listState.products && listState.products.length > 0 ? (
              <ListWithProducts />
            ) : (
              <EmptyList />
            )}
          </>
        ) : (
          <PageLoadingSpinner />
        )}
      </article>
    </>
  );
}
