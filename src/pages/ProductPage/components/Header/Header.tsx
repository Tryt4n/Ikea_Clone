// Components
import AddToWishListBtn from "../../../../components/AddToWishListBtn/AddToWishListBtn";
// Types
import { ProductDataType } from "../../types/ProductDataType";
// Style
import "./index.scss";

export default function Header({ data }: { data: ProductDataType }) {
  const { collection, nameToDisplay, variantName, size } = data;

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

      <AddToWishListBtn variant="light" />
    </header>
  );
}
