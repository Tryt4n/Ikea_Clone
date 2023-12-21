// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
// Components
import AddToWishListBtn from "../../../../components/ui/AddToWishListBtn/AddToWishListBtn";
// Types
import type { ProductDataType } from "../../types/ProductDataType";
import type { ShoppingCartType } from "../../../../context/AppContext";
// Style
import "./index.scss";

export default function Header({ data }: { data: ProductDataType }) {
  const { state, dispatch } = useApp();
  const { setModalData } = useModal();

  const {
    collection,
    nameToDisplay,
    variantName,
    size,
    images,
    name,
    price,
    productNumber,
    variant,
    oldPriceTag,
    newTag,
    rating,
  } = data;

  const product: ShoppingCartType = {
    collection,
    images,
    name,
    nameToDisplay,
    price,
    productNumber,
    size,
    variant,
    variantName,
    oldPrice: oldPriceTag,
    quantity: 1,
    productLink: `/products/${collection}/${name}/${variant}/${productNumber.replace(/\./g, "")}`,
    newTag,
    addedDate: new Date(),
    rating: rating,
  };

  function addProductToList() {
    if (!state.favouriteLists || state.favouriteLists.length === 0) {
      // if (!state.favouriteLists) {
      dispatch({
        type: "addToList",
        payload: {
          product: product,
        },
      });
    } else {
      openSelectListModal();
    }
  }

  function openSelectListModal() {
    setModalData({
      type: "select-list",
      product: product,
    });
  }

  const isProductAlreadyInAnyList =
    state.favouriteLists &&
    state.favouriteLists.some(
      (list) =>
        list.products && list.products.some((product) => product.productNumber === productNumber)
    );

  return (
    <header className="product-header">
      <h3>
        <strong>{collection}</strong>
        <span>
          {" "}
          {nameToDisplay}, {variantName}
          {size !== "universal" && (
            <>
              , &nbsp;
              <button>{size}</button>
            </>
          )}
        </span>
      </h3>

      <AddToWishListBtn
        variant="light"
        onClick={addProductToList}
        active={isProductAlreadyInAnyList}
      />
    </header>
  );
}
