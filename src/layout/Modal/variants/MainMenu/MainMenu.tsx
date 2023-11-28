// Custom Hooks
import useModal from "../../../../hooks/useModal";
// Components
import ListItem from "../../../../components/ListItem/ListItem";
import Btn from "../../../../components/Btn/Btn";
// Constants
import {
  mainNavigationList,
  mainNavigationSubList,
  secondaryNavigationList,
} from "../../../../constants/navigationLists";
// Icons
import GlobeIcon from "../../../../Icons/GlobeIcon";
// Style
import "./index.scss";

export default function MainMenu() {
  const { setModalData } = useModal();

  function changeMenu(label: "Produkty" | "Pomieszczenia") {
    setModalData({ type: label === "Produkty" ? "products-menu" : "rooms-menu" });
  }

  return (
    <nav className="main-menu scrollbar-style">
      <h3 className="visually-hidden">Nawigacja Menu Pobocznego</h3>

      <ul className="main-menu__list main-menu__main-list">
        {mainNavigationList.map((element) => (
          <ListItem
            key={element}
            className="main-menu__main-list-item"
            link="#"
            as={element === "Produkty" || element === "Pomieszczenia" ? "button" : "a"}
            onClickFunction={
              element === "Produkty" || element === "Pomieszczenia"
                ? () => changeMenu(element)
                : undefined
            }
          >
            {element}
          </ListItem>
        ))}

        {mainNavigationSubList.map((element) => (
          <ListItem
            key={element}
            link="#"
          >
            {element}
          </ListItem>
        ))}
      </ul>

      <ul className="main-menu__list main-menu__secondary-list">
        {secondaryNavigationList.map((element) => (
          <ListItem
            key={element}
            link="#"
          >
            {element}
          </ListItem>
        ))}
      </ul>

      <Btn
        variant="white-with-border"
        className="main-menu__change-country-btn"
      >
        <GlobeIcon />
        <span>Zmień kraj</span>
      </Btn>
    </nav>
  );
}
