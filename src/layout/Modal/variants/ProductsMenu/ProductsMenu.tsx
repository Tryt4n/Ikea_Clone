// Components
import ListItem from "../../../../components/ListItem/ListItem";
// Constants
import {
  mainProductsNavigationList,
  secondaryProductsNavigationList,
} from "../../../../constants/navigationLists";
// Types
import type { ModalProductsMenuType } from "../../../../pages/ProductPage/types/ModalTypes";
// Style
import "./index.scss";

export default function ProductsMenu({ className }: { className: ModalProductsMenuType["type"] }) {
  return (
    <nav className={className}>
      <ul>
        {mainProductsNavigationList.map((element) => (
          <ListItem
            key={element}
            className="products-menu__link products-menu__link--bold"
          >
            {element}
          </ListItem>
        ))}

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
