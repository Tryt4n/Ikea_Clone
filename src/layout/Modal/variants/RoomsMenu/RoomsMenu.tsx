// Import components
import ListItem from "../../../../components/ui/ListItem/ListItem";
// Import constants
import { roomsNavigationList } from "../../../../constants/navigationLists";
// Import types
import type { ModalRoomsMenuType } from "../../types/ModalTypes";
// Import styles
import "./index.scss";

/**
 * `RoomsMenu` is a React component that displays a navigation menu with room categories.
 * Each category is represented by a list item with an image and a title.
 * It uses the `ListItem` component to create the list items.
 * The component receives a `className` prop to style the component.
 * It uses the `roomsNavigationList` constant array to populate the list items.
 *
 * @param {ModalRoomsMenuType["type"]} props.className - The class name for the component.
 * @returns {JSX.Element} The rendered `RoomsMenu` component.
 */

export default function RoomsMenu({
  className,
}: {
  className: ModalRoomsMenuType["type"];
}) {
  return (
    <nav className={className}>
      <ul className="rooms-menu__list">
        {/* Map over the rooms navigation list and create a list item for each element */}
        {roomsNavigationList.map((element) => {
          const { title, img } = element; // Destructure the element object

          return (
            <ListItem key={title}>
              <figure>
                <img src={img} alt="" />
                <figcaption>{title}</figcaption>
              </figure>
            </ListItem>
          );
        })}
      </ul>
    </nav>
  );
}
