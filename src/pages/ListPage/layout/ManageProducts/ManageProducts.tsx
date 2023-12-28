// React
import { useCallback, useEffect } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
import useList from "../../context/useList";
// Components
import { Btn } from "../../../../components/ui/Btn/Btn";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Utils
import { productLink } from "../../../../constants/links";
// Style
import "./index.scss";

export default function ManageProducts() {
  return (
    <div className="manage-products">
      <ProductsList />

      <ProductsBtnsControl />
    </div>
  );
}

function ProductsList() {
  const { managedProducts } = useList();

  return (
    <ul
      className="manage-products__list scrollbar-style scrollbar-style--thin"
      tabIndex={0}
    >
      {managedProducts.map((product) => {
        const imgSrc = `${productLink}/${product.collection}-${product.name}-${product.variant}__${product.images.main}`;
        const imgAlt = `${product.collection} ${product.nameToDisplay} ${product.variantName} ${
          product.size !== "universal" ? product.size : ""
        }`;

        return (
          <li
            key={product.productNumber}
            className="manage-products__list-item"
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

function ProductsBtnsControl() {
  const { state } = useApp();
  const { setModalData } = useModal();
  const { listState, managedProducts, setManagedProducts } = useList();

  const clearManageProductsList = useCallback(() => {
    startViewTransition(() => {
      setManagedProducts([]);
    });
  }, [setManagedProducts]);

  function openManageProductsModal() {
    setModalData({
      type: "manage-products-in-list",
      products: managedProducts,
    });
  }

  //? Reset managedProducts when some products are moved to another list
  useEffect(() => {
    if (state.editingList?.products?.length !== listState?.products?.length) {
      clearManageProductsList();
    }
  }, [clearManageProductsList, listState?.products?.length, state.editingList?.products?.length]);

  return (
    <div className="manage-products__btns-control">
      <Btn onClick={openManageProductsModal}>Zarządzaj</Btn>

      <Btn
        variant="light"
        onClick={clearManageProductsList}
      >
        Wyczyść wszystko
      </Btn>
    </div>
  );
}
