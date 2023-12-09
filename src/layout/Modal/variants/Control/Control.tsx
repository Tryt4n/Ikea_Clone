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
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Types
import type {
  FavouriteListControlModal,
  ShoppingCartControlModal,
  ShoppingCartProductControlModal,
} from "../../../../pages/ProductPage/types/ModalTypes";
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
  const { modalData, closeModal } = useModal();

  function removeProduct() {
    if (modalData)
      dispatch({
        type: "removeProductFromShoppingCart",
        payload: (modalData as ShoppingCartProductControlModal).productNumber,
      });

    closeModal();
  }

  return (
    <>
      <ListItem>
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
  const { openModal, setModalData } = useModal();

  function openChangeListNameModal() {
    startViewTransition(() => {
      openModal();
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

  return (
    <>
      <ListItem onClick={openChangeListNameModal}>
        <EditIcon />
        Zmień nazwę listy
      </ListItem>

      <ListItem>
        <ShareIcon />
        Udostępnij
      </ListItem>

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
