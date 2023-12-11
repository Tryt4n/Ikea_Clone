// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
// Components
import AddToWishListBtn from "../../../../components/AddToWishListBtn/AddToWishListBtn";
// Types
import type { ProductDataType } from "../../types/ProductDataType";
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
  } = data;

  const product = {
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
  };

  function addProductToList() {
    if (!state.favouriteLists) {
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
    console.log("select list");
    setModalData({ type: "select-list" });
  }

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
      />
    </header>
  );
}
