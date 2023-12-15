// React
import { useCallback, useEffect } from "react";
// react-router-dom
import { useNavigate, useParams } from "react-router-dom";
// Custom Hooks
import useApp from "../../hooks/useApp";
// Layout
import EmptyList from "./layout/EmptyList/EmptyList";
import ListWithProducts from "./layout/ListWithProducts/ListWithProducts";
// Style
import "./index.scss";

export default function ListPage() {
  const { state } = useApp();
  const params = useParams();
  const navigate = useNavigate();

  const findListById = useCallback(() => {
    return state.favouriteLists?.find((list) => list.id === params.listId);
  }, [state.favouriteLists, params]);

  //? Check if list exists in state and if not, navigate to lists page
  useEffect(() => {
    async function checkIfListExists() {
      const checkedList = findListById();
      return checkedList ? true : false;
    }

    const checkingList = async () => {
      const listExists = await checkIfListExists();

      if (state.favouriteLists && listExists === false) {
        navigate("/favourites");
      }
    };

    checkingList();
  }, [state.favouriteLists, params, navigate, findListById]);

  const list = findListById();

  return (
    <>
      {list && (
        <article className="list-page">
          <h2 className="list-page__header">{list.name}</h2>

          {list.products && list.products.length > 0 ? (
            <ListWithProducts />
          ) : (
            <EmptyList list={list} />
          )}
        </article>
      )}
    </>
  );
}
