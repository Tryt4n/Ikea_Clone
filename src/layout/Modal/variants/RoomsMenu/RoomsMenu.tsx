// Components
import ListItem from "../../../../components/ui/ListItem/ListItem";
// Constants
import { roomsNavigationList } from "../../../../constants/navigationLists";
// Types
import type { ModalRoomsMenuType } from "../../../../pages/ProductPage/types/ModalTypes";
// Style
import "./index.scss";

export default function RoomsMenu({ className }: { className: ModalRoomsMenuType["type"] }) {
  return (
    <nav className={className}>
      <ul className="rooms-menu__list">
        {roomsNavigationList.map((element) => {
          const { title, img } = element;

          return (
            <ListItem key={title}>
              <figure>
                <img
                  src={img}
                  alt=""
                />
                <figcaption>{title}</figcaption>
              </figure>
            </ListItem>
          );
        })}
      </ul>
    </nav>
  );
}
