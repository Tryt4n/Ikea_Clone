// Components
import Btn from "../../../../components/Btn/Btn";
// Types
import { ProductDataType } from "../../types/ProductDataType";
// Icons
import HeartIcon from "../../../../Icons/HeartIcon";
// Style
import "./index.scss";

export default function Header({ data }: { data: ProductDataType }) {
  const { collection, nameToDisplay, variantName, size } = data;

  return (
    <div className="product-header">
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

      <Btn
        variant="light"
        shape="circle"
      >
        <span className="visually-hidden">Dodaj do ulubionych</span>
        <HeartIcon />
      </Btn>
    </div>
  );
}
