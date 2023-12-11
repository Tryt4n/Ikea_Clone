// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
// date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import pl from "date-fns/locale/pl";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Components
import Btn from "../../../../components/Btn/Btn";
// Icons
import HeartIcon from "../../../../Icons/HeartIcon";
// Constants
import { productLink } from "../../../../constants/links";
// Types
import type { FavouritesListType } from "../../../../context/AppContext";
// Style
import "./index.scss";

export default function SelectList() {
  const { state } = useApp();
  const { modalData, setModalData } = useModal();

  function createNewList() {
    startViewTransition(() => {
      setModalData({
        type: "create-list",
        product: modalData && modalData.type === "select-list" ? modalData.product : undefined,
      });
    });
  }

  return (
    <div className="select-list-modal">
      {state.favouriteLists && (
        <ul className="select-list-modal__list">
          {state.favouriteLists.map((list) => (
            <List
              key={list.id}
              list={list}
            />
          ))}
        </ul>
      )}

      <Btn
        size="big"
        className="select-list-modal__create-new-list-btn"
        onClick={createNewList}
      >
        Stwórz listę
      </Btn>
    </div>
  );
}

function List({ list }: { list: FavouritesListType }) {
  const { dispatch } = useApp();
  const { modalData, closeModal } = useModal();

  const isProductAlreadyInAnyList =
    modalData &&
    modalData.type === "select-list" &&
    list.products &&
    list.products.some((product) => product.productNumber === modalData.product.productNumber);

  function handleListActions() {
    isProductAlreadyInAnyList ? removeFromList() : addToList();
  }

  function addToList() {
    if (modalData?.type === "select-list") {
      startViewTransition(() => {
        dispatch({
          type: "addToList",
          payload: {
            product: modalData.product,
            listId: list.id,
          },
        });
      });

      closeModal();
    }
  }

  function removeFromList() {
    console.log("should be removed");
  }

  const firstListProduct = list.products && list.products[0];
  const imgSrc =
    firstListProduct &&
    `${productLink}/${firstListProduct.collection}-${firstListProduct.name}-${firstListProduct.variant}__${firstListProduct.images.main}`;

  return (
    <li>
      <button
        className="select-list-modal__list-item"
        onClick={handleListActions}
      >
        {list.products && (
          <img
            alt="Jeden z produktów na liście"
            src={imgSrc}
            loading="lazy"
            className="select-list-modal__list-item-img"
          />
        )}
        <div className="select-list-modal__list-text-wrapper">
          <strong>{list.name}</strong>
          <time dateTime={list.lastEdit.toString()}>
            Zaktualizowano&nbsp;
            {formatDistanceToNow(new Date(list.lastEdit), {
              addSuffix: true,
              locale: pl,
            })}
          </time>
        </div>

        <HeartIcon className={isProductAlreadyInAnyList ? "active" : undefined} />
      </button>
    </li>
  );
}
