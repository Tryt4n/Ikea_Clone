// Components
import GlobeIcon from "../../../../Icons/GlobeIcon";
import Btn from "../../../../components/Btn/Btn";
// Constants
import {
  mainNavigationList,
  mainNavigationSubList,
  secondaryNavigationList,
} from "../../../../constants/navigationLists";

export default function MainMenu() {
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

type ListItemPropsType = {
  as?: "a" | "button";
  link: string;
  children: string;
  className?: string;
};

function ListItem({ as = "a", link, children, className }: ListItemPropsType) {
  const Element = as;

  return (
    <li className={className ? className : undefined}>
      <Element href={as === "a" ? link : undefined}>{children}</Element>
    </li>
  );
}
