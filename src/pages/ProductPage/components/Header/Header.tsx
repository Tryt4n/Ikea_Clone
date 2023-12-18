// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
// Components
import AddToWishListBtn from "../../../../components/AddToWishListBtn/AddToWishListBtn";
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
  } = data;

  const product: ShoppingCartType = {
    collection: collection,
    images: images,
    name: name,
    nameToDisplay: nameToDisplay,
    price: price,
    productNumber: productNumber,
    size: size,
    variant: variant,
    variantName: variantName,
    oldPrice: oldPriceTag,
    quantity: 1,
    productLink: `/products/${collection}/${name}/${variant}/${productNumber.replace(/\./g, "")}`,
    newTag: newTag,
    addedDate: new Date(),
  };

  function addProductToList() {
    if (!state.favouriteLists || state.favouriteLists.length === 0) {
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
