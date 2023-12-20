// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
// date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import pl from "date-fns/locale/pl";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Components
import { Btn } from "../../../../components/Btn/Btn";
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
      if (modalData && modalData.type === "select-list") {
        setModalData({
          type: "create-list",
          product: modalData.product,
        });
      }

      if (
        modalData &&
        modalData.type === "move-to-other-list" &&
        state.editingList &&
        state.editingList.products
      ) {
        setModalData({
          type: "create-list-with-products",
          products: state.editingList.products,
        });
      }
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

  const Element = isProductAlreadyInAnyList ? "form" : "div";

  return (
    <Element className="select-list-modal">
      {modalData &&
        (modalData.type === "move-to-other-list" ||
          modalData.type === "move-product-from-one-list-to-another") && (
          <p className="select-list-modal__other-list-text">
            Wybierz listę, na którą chcesz przenieść{" "}
            {modalData.type === "move-product-from-one-list-to-another"
              ? "ten produkt"
              : "te produkty"}
            .
          </p>
        )}

      {state.favouriteLists && (
        <ul className="select-list-modal__list">
          {state.favouriteLists.map((list) => (
            <List
              key={list.id}
              list={list}
              isProductAlreadyInAnyList={isProductAlreadyInAnyList}
            />
          ))}
        </ul>
      )}

      <div className="select-list-modal__btns-wrapper">
        <Btn
          size="big"
          type="button"
          variant={isProductAlreadyInAnyList ? "white-with-border" : "dark"}
          onClick={createNewList}
        >
          {modalData?.type === "move-to-other-list" ? "Utwórz nową listę" : "Stwórz listę"}
        </Btn>
      </div>
    </Element>
  );
}

type ListPropsType = {
  list: FavouritesListType;
  isProductAlreadyInAnyList?: boolean;
};

function List({ list, isProductAlreadyInAnyList }: ListPropsType) {
  const { state, dispatch } = useApp();
  const { modalData, closeModal } = useModal();

  const isProductAlreadyInCurrentList =
    modalData &&
    modalData.type === "select-list" &&
    list.products &&
    list.products.some((product) => product.productNumber === modalData.product.productNumber);

  function handleListActions() {
    startViewTransition(() => {
      if (modalData) {
        switch (modalData.type) {
          case "move-to-other-list":
            if (!state.editingList) break;

            dispatch({
              type: "moveProductsToOtherList",
              payload: { originalListId: state.editingList.id, sourceListId: list.id },
            });

            closeModal();
            break;

          case "select-list":
            isProductAlreadyInCurrentList ? removeFromList() : addToList();
            break;

          case "move-product-from-one-list-to-another":
            dispatch({
              type: "moveProductFromOneListToAnother",
              payload: {
                product: modalData.payload.product,
                originalListId: modalData.payload.originalListId,
                listWhereProductIsMovedID: list.id,
              },
            });

            closeModal();
            break;

          default:
            break;
        }
      }
    });
  }

  function addToList() {
    if (modalData?.type === "select-list") {
      dispatch({
        type: "addToList",
        payload: {
          product: modalData.product,
          listId: list.id,
        },
      });
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
    }
  }

  const firstListProduct = list.products && list.products[0];
  const imgSrc =
    firstListProduct &&
    `${productLink}/${firstListProduct.collection}-${firstListProduct.name}-${firstListProduct.variant}__${firstListProduct.images.main}`;

  return (
    <>
      {modalData &&
        (modalData.type === "select-list" ||
          ((modalData.type === "move-to-other-list" ||
            modalData.type === "move-product-from-one-list-to-another") &&
            list.id !== state.editingList?.id)) && (
          <li>
            <button
              className="select-list-modal__list-item"
              onClick={handleListActions}
              type="button"
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

                {modalData &&
                  modalData.type !== "move-to-other-list" &&
                  list.products &&
                  list.products.length === 0 &&
                  isProductAlreadyInAnyList && (
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

              {modalData && modalData.type !== "move-to-other-list" && (
                <>
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
                          onChange: handleListActions,
                          tabIndex: -1,
                        }}
                        labelProps={{
                          className: "visually-hidden",
                        }}
                      />
                    </div>
                  )}
                </>
              )}
            </button>
          </li>
        )}
    </>
  );
}
