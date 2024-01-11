// Import react-router-dom for routing
import { Link } from "react-router-dom";
// Import locale components
import { EmptyList } from "./components/EmptyList/EmptyList";
import { ImagesListWithProducts } from "./components/ImagesListWithProducts/ImagesListWithProducts";
import { ListDescription } from "./components/ListDescription/ListDescription";
// Import types
import type { FavouritesListType } from "../../../context/AppContext/types/FavouritesListType";
// Import styles
import "./index.scss";

// Defining the type for the list props
type ListPropsType = {
  list: FavouritesListType; // The list of favourite items
  isMainList?: boolean; // A flag indicating if the list is the main list
};

/**
 * FavouriteList Component
 *
 * This component displays a list of favourite items.
 *
 * @param list - The list of favourite items.
 * @param isMainList - A flag indicating if the list is the main list.
 *
 * @returns A section element with a class of "favourite-list", containing a link to the list of favourite items, and either an ImagesListWithProducts component if there are products in the list, or an EmptyList component if the list is empty.
 */

export default function FavouriteList({
  list,
  isMainList = false,
}: ListPropsType) {
  const { id, products } = list;

  return (
    <section className="favourite-list">
      <Link to={`/favourites/${id}`} className="favourite-list__container-link">
        {/* If there are products in the list, display the ImagesListWithProducts component, otherwise display the EmptyList component */}
        {products && products.length > 0 ? (
          <ImagesListWithProducts products={products} />
        ) : (
          <EmptyList isMainList={isMainList} />
        )}

        <ListDescription list={list} isMainList={isMainList} />
      </Link>
    </section>
  );
}
