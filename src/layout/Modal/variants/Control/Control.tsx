// React
import { ButtonHTMLAttributes, ReactNode } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
import useToast from "../../../../hooks/useToast";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Icons
import ArrowRightIcon from "../../../../Icons/ArrowRightIcon";
import HeartIcon from "../../../../Icons/HeartIcon";
import ShareIcon from "../../../../Icons/ShareIcon";
import ShoppingCartAddIcon from "../../../../Icons/ShoppingCartAddIcon";
import TrashIcon from "../../../../Icons/TrashIcon";
import EditIcon from "../../../../Icons/EditIcon";
import PrinterIcon from "../../../../Icons/PrinterIcon";
import MagnifierIcon from "../../../../Icons/MagnifierIcon";
// Types
import type {
  FavouriteListControlModal,
  MoreOptionsForProductInListModal,
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
    | FavouriteListControlModal["type"]
    | MoreOptionsForProductInListModal["type"];
};

export default function Control({ type }: ControlPropsType) {
  const controlComponentMap = {
    "shopping-cart-control": <CartControl />,
    "product-control": <ProductControl />,
    "list-control": <ListControl />,
    "more-options-for-product-in-list": <ProductInListControl />,
  };

  return <ul className="product-control">{controlComponentMap[type]}</ul>;
}

function CartControl() {
  const { state, dispatch } = useApp();
  const { modalData, setModalData, closeModal } = useModal();
  const { setToastData } = useToast();

  const productsQuantity = state.shoppingCart?.length;

  function openAddProductByNumberModal() {
    startViewTransition(() => {
      setModalData({ type: "add-product-by-number" });
    });
  }

  function moveAllProductsToList() {
    const products = state.shoppingCart;

    if (products && products.length > 0) {
      startViewTransition(() => {
        setModalData({
          type: "select-list-with-products",
          products: products,
          previousModal: modalData,
        });
      });
    }
  }

  function clearShoppingCart() {
    setToastData({
      open: true,
      text: `Liczba usuniętych artykułów: ${productsQuantity}`,
      prevState: () =>
        startViewTransition(() => {
          dispatch({ type: "restoreShoppingCart", payload: state.shoppingCart! });
        }),
    });

    startViewTransition(() => {
      dispatch({ type: "clearShoppingCart" });
    });

    closeModal();
  }

  return (
    <>
      <ListItem onClick={openAddProductByNumberModal}>
        <ShoppingCartAddIcon />
        Dodaj produkt, wpisując jego numer
      </ListItem>

      {productsQuantity && productsQuantity > 0 ? (
        <>
          <ListItem onClick={moveAllProductsToList}>
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
      ) : null}
    </>
  );
}

function ProductControl() {
  const { state, dispatch } = useApp();
  const { modalData, closeModal, setModalData } = useModal();
  const { setToastData } = useToast();

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
    if (modalData && modalData.type === "product-control") {
      setToastData({
        open: true,
        text: `${modalData.product.collection} został usunięty z twojego koszyka.`,
        prevState: () =>
          startViewTransition(() => {
            dispatch({ type: "restoreShoppingCart", payload: state.shoppingCart! });
          }),
      });

      dispatch({
        type: "removeProductFromShoppingCart",
        payload: modalData.product.productNumber,
      });

      closeModal();
    }
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

      {state.editingList?.products?.length && state.favouriteLists ? (
        <ListItem onClick={openMoveToOtherListModal}>
          <ArrowRightIcon />
          Przenieś do innej listy
        </ListItem>
      ) : null}
      <ListItem>
        <ShareIcon />
        Udostępnij
      </ListItem>

      {state.editingList?.products?.length && isListPage ? (
        <ListItem>
          <PrinterIcon />
          Drukuj listę zakupów
        </ListItem>
      ) : null}

      <ListItem onClick={openDeleteListModal}>
        <TrashIcon />
        Usuń swoją listę
      </ListItem>
    </>
  );
}

function ProductInListControl() {
  const { dispatch } = useApp();
  const { modalData, setModalData, closeModal } = useModal();
  const { setToastData } = useToast();

  const { pathname } = location;
  const listId = pathname.split("/favourites/")[1];

  function moveProductToOtherList() {
    if (modalData && modalData.type === "more-options-for-product-in-list") {
      startViewTransition(() => {
        setModalData({
          type: "move-product-from-one-list-to-another",
          payload: {
            product: modalData.product,
            originalListId: listId,
          },
        });
      });
    }
  }

  function removeProduct() {
    if (modalData && modalData.type === "more-options-for-product-in-list") {
      setToastData({
        open: true,
        text: `Usunięto ${modalData.product.collection} z twojej listy.`,
        prevState: () =>
          startViewTransition(() => {
            dispatch({
              type: "addToList",
              payload: { listId: listId, product: modalData.product },
            });
          }),
      });

      startViewTransition(() => {
        dispatch({
          type: "deleteProductFromList",
          payload: { listId: listId, productNumber: modalData.product.productNumber },
        });
      });

      closeModal();
    }
  }

  return (
    <>
      <ListItem onClick={moveProductToOtherList}>
        <ArrowRightIcon />
        Przenieś do innej listy
      </ListItem>

      <ListItem onClick={removeProduct}>
        <TrashIcon />
        Usuń z listy
      </ListItem>

      {modalData && modalData.type === "more-options-for-product-in-list" && (
        <ListItem>
          <MagnifierIcon />
          Produkt podobny do {modalData.product.collection}
        </ListItem>
      )}
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
