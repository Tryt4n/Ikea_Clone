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
  const { state } = useApp();
  const { setList, list: newList } = useList();
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
        console.log(list);
        setList({
          ...list,
          products: list.products && list.products.reverse(),
        });
      }

      if (state.favouriteLists && listExists === false) {
        navigate("/favourites");
      }
    };

    checkingList();
  }, [state.favouriteLists, params, navigate, findListById, list, setList]);

  return (
    <>
      {newList && (
        <article className="list-page">
          <h2 className="list-page__header">{newList.name}</h2>

          {newList.products && newList.products.length > 0 ? <ListWithProducts /> : <EmptyList />}
        </article>
      )}
    </>
  );
}
