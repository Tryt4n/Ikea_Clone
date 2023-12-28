// Custom Hooks
import useList from "../../context/useList";
// Components
import { Btn } from "../../../../components/ui/Btn/Btn";
// Utils
import { productLink } from "../../../../constants/links";
// Style
import "./index.scss";
import { startViewTransition } from "../../../../utils/helpers";

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
    <ul className="manage-products__list scrollbar-style scrollbar-style--thin">
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
  const { setManagedProducts } = useList();

  function openManageProductsModal() {
    // TODO
  }

  function clearManageProductsList() {
    startViewTransition(() => {
      setManagedProducts([]);
    });
  }

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
