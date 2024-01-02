// Import custom hooks
import useWindowSize from "../../../hooks/useWindowSize";
// Import components
import { ListItemTag } from "../components/CollectionListItemTag/ListItemTag";
// Import icons
import ArrowRightIcon from "../../../Icons/ArrowRightIcon";
import ChevronRightIcon from "../../../Icons/ChevronRightIcon";

// Define the type for the CollectionNameContainer props
type CollectionNameContainerPropsType = {
  collectionName: string; // The name of the collection
  collectionLink: string; // The link to the collection
  isNew?: boolean; // Optional boolean that determines whether the collection is new
};

/**
 * CollectionNameContainer component
 *
 * This component renders a link to a collection.
 * If isNew is true, it will also render a ListItemTag with an "orange" variant and the text "Nowość".
 * Depending on the window width, it will render either an ArrowRightIcon or a ChevronRightIcon.
 *
 * @param collectionName - The name of the collection.
 * @param collectionLink - The link to the collection.
 * @param isNew - Optional boolean that determines whether the collection is new.
 *
 * @returns A link component with the specified collection link, a "collection-name" class, a ListItemTag if isNew is true, the text "Kolekcja {collectionName}", and either an ArrowRightIcon or a ChevronRightIcon depending on the window width.
 */

export default function CollectionNameContainer({
  collectionName,
  collectionLink,
  isNew,
}: CollectionNameContainerPropsType) {
  const { width } = useWindowSize(); // Get the current window width from the useWindowSize hook

  return (
    <a
      href={collectionLink} // Set the href to the collection link
      className="collection-name" // Set the class to "collection-name"
    >
      <div className="collection-name__inner-wrapper">
        {/* If isNew is true, render a ListItemTag with an "orange" variant and the text "Nowość" */}
        {isNew && <ListItemTag variant="orange">Nowość</ListItemTag>}

        <strong>Kolekcja {collectionName}</strong>
      </div>

      {/* Render either an ArrowRightIcon or a ChevronRightIcon depending on the window width */}
      {width >= 600 ? <ArrowRightIcon /> : <ChevronRightIcon />}
    </a>
  );
}
