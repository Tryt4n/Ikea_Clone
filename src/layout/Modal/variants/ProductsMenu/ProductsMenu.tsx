// Import components
import ListItem from "../../../../components/ui/ListItem/ListItem";
// Import constants
import {
  mainProductsNavigationList,
  secondaryProductsNavigationList,
} from "../../../../constants/navigationLists";
// Import types
import type { ModalProductsMenuType } from "../../types/ModalTypes";
// Import styles
import "./index.scss";

/**
 * `ProductsMenu` is a React component that displays a navigation menu with product categories.
 * It uses the `ListItem` component to create the list items.
 * The component receives a `className` prop to style the component.
 * It uses two constant arrays, `mainProductsNavigationList` and `secondaryProductsNavigationList`, to populate the list items.
 *
 * @param {ModalProductsMenuType["type"]} props.className - The class name for the component.
 * @returns {JSX.Element} The rendered `ProductsMenu` component with a navigation menu with product categories.
 */

export default function ProductsMenu({
  className,
}: {
  className: ModalProductsMenuType["type"];
}) {
  return (
    <nav className={className}>
      <ul>
        {/* Map over the main products navigation list and create a list item for each element */}
        {mainProductsNavigationList.map((element) => (
          <ListItem
            key={element}
            className="products-menu__link products-menu__link--bold"
          >
            {element}
          </ListItem>
        ))}

        {/* // Map over the secondary products navigation list and create a list item for each element */}
        {/* // The first list item has an additional class for extra spacing */}
        {secondaryProductsNavigationList.map((element, index) => (
          <ListItem
            key={element}
            className={`products-menu__link${
              index === 0 ? ` products-menu__link--additional-space` : ""
            }`}
          >
            {element}
          </ListItem>
        ))}
      </ul>
    </nav>
  );
}
