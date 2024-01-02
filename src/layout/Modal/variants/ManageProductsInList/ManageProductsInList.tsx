// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
import useToast from "../../../../hooks/useToast";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Utils
import { productLink } from "../../../../constants/links";
// Types
import type { ShoppingCartType } from "../../../../context/AppContext";
// Icons
import ArrowRightIcon from "../../../../Icons/ArrowRightIcon";
import TrashIcon from "../../../../Icons/TrashIcon";
// Styles
import "./index.scss";

export default function ManageProductsInList() {
  const { modalData } = useModal();

  return (
    <>
      {modalData && modalData.type === "manage-products-in-list" && (
        <div className="manage-products-modal">
          <ProductsList products={modalData.products} />

          <BtnsControl products={modalData.products} />
        </div>
      )}
    </>
  );
}

function ProductsList({ products }: { products: ShoppingCartType[] }) {
  return (
    <ul
      className="manage-products-modal__list scrollbar-style scrollbar-style--thin"
      tabIndex={0}
    >
      {products.map((product) => {
        const imgSrc = `${productLink}/${product.collection}-${product.name}-${product.variant}__${product.images.main}`;
        const imgAlt = `${product.collection} ${product.nameToDisplay} ${product.variantName} ${
          product.size !== "universal" ? product.size : ""
        }`;

        return (
          <li
            key={product.productNumber}
            className="manage-products-modal__list-item"
          >
            <img
              src={imgSrc}
              alt={imgAlt}
              loading="lazy"
            />
          </li>
        );
      })}
    </ul>
  );
}

function BtnsControl({ products }: { products: ShoppingCartType[] }) {
  const { state, dispatch } = useApp();
  const { modalData, setModalData, closeModal } = useModal();
  const { setToastData } = useToast();

  function openSelectListModal() {
    startViewTransition(() => {
      if (!state.editingList) return;

      setModalData({
        type: "move-product-from-one-list-to-another",
        products: products,
        previousModal: modalData,
        originalListId: state.editingList.id,
      });
    });
  }

  function deleteProductsFromList() {
    setToastData({
      open: true,
      text:
        products.length > 1
          ? `Usunięto (${products.length}) artykuły z twojej listy.`
          : `${products[0].collection} został usunięty z twojej listy.`,
      prevState: () =>
        startViewTransition(() => {
          if (!state.editingList) return;

          dispatch({
            type: "addProductsToList",
            payload: {
              listId: state.editingList.id,
              products: [...products],
            },
          });
        }),
    });

    startViewTransition(() => {
      if (!state.editingList) return;

      dispatch({
        type: "deleteProductsFromList",
        payload: {
          listId: state.editingList.id,
          productNumbers: [...products.map((product) => product.productNumber)],
        },
      });
    });

    closeModal();
  }

  return (
    <div className="manage-products-modal__btns-wrapper">
      <button
        type="button"
        className="manage-products-modal__btn"
        onClick={openSelectListModal}
      >
        <ArrowRightIcon />
        <span>Przenieś do innej listy</span>
      </button>

      <button
        type="button"
        className="manage-products-modal__btn"
        onClick={deleteProductsFromList}
      >
        <TrashIcon />
        <span>Usuń z listy</span>
      </button>
    </div>
  );
}