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
import Input from "../../../../components/Input/Input";
// Icons
import HeartIcon from "../../../../Icons/HeartIcon";
import NoImageIcon from "../../../../Icons/NoImageIcon";
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

  const isProductAlreadyInAnyList =
    modalData &&
    modalData.type === "select-list" &&
    state.favouriteLists &&
    state.favouriteLists.some(
      (list) =>
        list.products &&
        list.products.some((product) => product.productNumber === modalData.product.productNumber)
    );

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

      <div className="select-list-modal__btns-wrapper">
        {isProductAlreadyInAnyList && <Btn size="big">Aktualizuj</Btn>}
        <Btn
          size="big"
          variant={isProductAlreadyInAnyList ? "white-with-border" : "dark"}
          onClick={createNewList}
        >
          Stwórz listę
        </Btn>
      </div>
    </div>
  );
}

function List({ list }: { list: FavouritesListType }) {
  const { state, dispatch } = useApp();
  const { modalData, closeModal } = useModal();

  const isProductAlreadyInAnyList =
    modalData &&
    modalData.type === "select-list" &&
    state.favouriteLists &&
    state.favouriteLists.some(
      (list) =>
        list.products &&
        list.products.some((product) => product.productNumber === modalData.product.productNumber)
    );

  const isProductAlreadyInCurrentList =
    modalData &&
    modalData.type === "select-list" &&
    list.products &&
    list.products.some((product) => product.productNumber === modalData.product.productNumber);

  function handleListActions() {
    isProductAlreadyInCurrentList ? removeFromList() : addToList();
    !isProductAlreadyInAnyList && closeModal();
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

      // closeModal();
    }
  }

  function removeFromList() {
    if (modalData?.type === "select-list") {
      dispatch({
        type: "deleteProductFromList",
        payload: {
          productNumber: modalData.product.productNumber,
          listId: list.id,
        },
      });

      // closeModal();
    }
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
        <div className="select-list-modal__list-wrapper">
          {list.products && list.products.length > 0 && (
            <img
              alt="Jeden z produktów na liście"
              src={imgSrc}
              loading="lazy"
              className="select-list-modal__list-item-img"
            />
          )}

          {list.products && list.products.length === 0 && isProductAlreadyInAnyList && (
            <div className="select-list-modal__list-item-img">
              <NoImageIcon />
            </div>
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
        </div>

        {!isProductAlreadyInAnyList ? (
          <HeartIcon className={isProductAlreadyInAnyList ? "active" : undefined} />
        ) : (
          <div className="select-list-modal__input-wrapper">
            <Input
              type="checkbox"
              id={list.id}
              label={`Naciśnij aby ${
                isProductAlreadyInCurrentList ? "usunąć produkt z" : "dodać produkt do"
              } listy "${list.name}"`}
              inputProps={{
                checked: isProductAlreadyInCurrentList,
                onChange: removeFromList,
              }}
              labelProps={{
                className: "visually-hidden",
              }}
            />
          </div>
        )}
      </button>
    </li>
  );
}
