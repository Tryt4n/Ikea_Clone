// React
import { ButtonHTMLAttributes, ReactNode } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
// Icons
import ArrowRightIcon from "../../../../Icons/ArrowRightIcon";
import HeartIcon from "../../../../Icons/HeartIcon";
import ShareIcon from "../../../../Icons/ShareIcon";
import ShoppingCartAddIcon from "../../../../Icons/ShoppingCartAddIcon";
import TrashIcon from "../../../../Icons/TrashIcon";
import EditIcon from "../../../../Icons/EditIcon";
import PrinterIcon from "../../../../Icons/PrinterIcon";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Types
import type {
  FavouriteListControlModal,
  ShoppingCartControlModal,
  ShoppingCartProductControlModal,
} from "../../../../pages/ProductPage/types/ModalTypes";
import type { FavouritesListType } from "../../../../context/AppContext";
// Style
import "./index.scss";

type ControlPropsType = {
  type:
    | ShoppingCartControlModal["type"]
    | ShoppingCartProductControlModal["type"]
    | FavouriteListControlModal["type"];
};

export default function Control({ type }: ControlPropsType) {
  const controlComponentMap = {
    "shopping-cart-control": <CartControl />,
    "product-control": <ProductControl />,
    "list-control": <ListControl />,
  };

  return <ul className="product-control">{controlComponentMap[type]}</ul>;
}

function CartControl() {
  const { state, dispatch } = useApp();
  const { setModalData } = useModal();

  const productsQuantity = state.shoppingCart?.length;

  function openAddProductByNumberModal() {
    startViewTransition(() => {
      setModalData({ type: "add-product-by-number" });
    });
  }

  function clearShoppingCart() {
    dispatch({ type: "clearShoppingCart" });
  }

  return (
    <>
      <ListItem onClick={openAddProductByNumberModal}>
        <ShoppingCartAddIcon />
        Dodaj produkt, wpisując jego numer
      </ListItem>

      {productsQuantity && productsQuantity > 0 ? (
        <>
          <ListItem>
            <HeartIcon />
            Dodaj ({productsQuantity}) {productsQuantity === 1 ? "produkt" : "produktów"} do listy
            zakupowej
          </ListItem>

          <ListItem onClick={clearShoppingCart}>
            <TrashIcon />
            Usuń wszystkie produkty z koszyka
          </ListItem>

          <ListItem>
            <ShareIcon />
            Udostępnij
          </ListItem>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

function ProductControl() {
  const { dispatch } = useApp();
  const { modalData, closeModal, setModalData } = useModal();

  function addToShoppingList() {
    if (modalData && modalData.type === "product-control") {
      startViewTransition(() => {
        setModalData({
          type: "select-list",
          product: modalData.product,
        });
      });
    }
  }

  function removeProduct() {
    if (modalData)
      dispatch({
        type: "removeProductFromShoppingCart",
        payload: (modalData as ShoppingCartProductControlModal).product.productNumber,
      });

    closeModal();
  }

  return (
    <>
      <ListItem onClick={addToShoppingList}>
        <ArrowRightIcon />
        Przenieś do listy zakupów
      </ListItem>

      <ListItem onClick={removeProduct}>
        <TrashIcon />
        Usuń produkt
      </ListItem>
    </>
  );
}

function ListControl() {
  const { state } = useApp();
  const { setModalData } = useModal();

  const { pathname } = location;
  const isListPage = /^\/favourites\/[a-zA-Z0-9-]+\/?$/.test(pathname);

  function openChangeListNameModal() {
    startViewTransition(() => {
      setModalData({
        type: "change-list-name",
      });
    });
  }

  function openDeleteListModal() {
    startViewTransition(() => {
      setModalData({
        type: "delete-list-confirmation",
      });
    });
  }

  function openMoveToOtherListModal() {
    if (!state.editingList) return;

    const list: FavouritesListType = state.editingList;
    startViewTransition(() => {
      setModalData({
        type: "move-to-other-list",
        list: list,
      });
    });
  }

  return (
    <>
      <ListItem onClick={openChangeListNameModal}>
        <EditIcon />
        Zmień nazwę listy
      </ListItem>

      {state.editingList?.products?.length &&
        state.favouriteLists &&
        state.favouriteLists?.length > 1 && (
          <ListItem onClick={openMoveToOtherListModal}>
            <ArrowRightIcon />
            Przenieś do innej listy
          </ListItem>
        )}

      <ListItem>
        <ShareIcon />
        Udostępnij
      </ListItem>

      {state.editingList?.products?.length && isListPage && (
        <ListItem>
          <PrinterIcon />
          Drukuj listę zakupów
        </ListItem>
      )}

      <ListItem onClick={openDeleteListModal}>
        <TrashIcon />
        Usuń swoją listę
      </ListItem>
    </>
  );
}

type ListItemPropsType = { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>;

function ListItem({ children, ...props }: ListItemPropsType) {
  return (
    <li>
      <button
        type="button"
        {...props}
      >
        {children}
      </button>
    </li>
  );
}
