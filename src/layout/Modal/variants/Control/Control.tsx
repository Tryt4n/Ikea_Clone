// Import inner components
import { CartControl } from "./InnerComponents/features/CartControl/CartControl";
import { ProductControl } from "./InnerComponents/features/ProductControl/ProductControl";
import { ListControl } from "./InnerComponents/features/ListControl/ListControl";
import { ProductInListControl } from "./InnerComponents/features/ProductInListControl/ProductInListControl";
// Import types
import type {
  FavouriteListControlModal,
  MoreOptionsForProductInListModal,
  ShoppingCartControlModal,
  ShoppingCartProductControlModal,
} from "../../types/ModalTypes";
// Import styles
import "./index.scss";

// Define the type of props that `Control` component receives.
type ControlPropsType = {
  type:
    | ShoppingCartControlModal["type"]
    | ShoppingCartProductControlModal["type"]
    | FavouriteListControlModal["type"]
    | MoreOptionsForProductInListModal["type"];
};

/**
 * `Control` is a React component that provides a control interface based on the `type` prop.
 * It uses several inner components (`CartControl`, `ProductControl`, `ListControl`, `ProductInListControl`) to provide different control interfaces.
 *
 * @param {string} props.type - The type of control interface. It can be one of the following: "shopping-cart-control", "product-control", "list-control", "more-options-for-product-in-list".
 * @returns {JSX.Element} The rendered `Control` component.
 */

export default function Control({ type }: ControlPropsType) {
  // Map of control components. The key is the type of control interface, and the value is the corresponding component.
  const controlComponentMap = {
    "shopping-cart-control": <CartControl />,
    "product-control": <ProductControl />,
    "list-control": <ListControl />,
    "more-options-for-product-in-list": <ProductInListControl />,
  };

  // Render the control component based on the type prop.
  return <ul className="product-control">{controlComponentMap[type]}</ul>;
}
