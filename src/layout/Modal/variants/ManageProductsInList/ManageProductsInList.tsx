// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
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
  const { state } = useApp();
  const { modalData, setModalData } = useModal();

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
    console.log(products);
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
