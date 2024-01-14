// Import custom hooks
import useModal from "../../../../hooks/useModal/useModal";
// Import components
import ListItem from "../../../../components/ui/ListItem/ListItem";
import { Btn } from "../../../../components/ui/Btn/Btn";
// Import helpers functions
import { startViewTransition } from "../../../../utils/helpers";
// Import constants
import {
  mainNavigationList,
  mainNavigationSubList,
  secondaryNavigationList,
} from "../../../../constants/navigationLists";
// Import icons
import GlobeIcon from "../../../../Icons/GlobeIcon";
// Import styles
import "./index.scss";

/**
 * MainMenu is a React component that renders the main menu of the application.
 * The main menu includes a main list and a secondary list of navigation items, and a button to change the country.
 * The navigation items are defined in the mainNavigationList, mainNavigationSubList, and secondaryNavigationList constants.
 * The component uses the useModal custom hook, the ListItem and Btn components, and the GlobeIcon icon.
 *
 * @returns {JSX.Element} - The component that displays the main menu of the application.
 */

export default function MainMenu() {
  const { setModalData } = useModal(); // Use the useModal custom hook to get the setModalData function.

  // Change the modal data to display the products menu or the rooms menu.
  function changeMenu(label: "Produkty" | "Pomieszczenia") {
    startViewTransition(() => {
      setModalData({
        type: label === "Produkty" ? "products-menu" : "rooms-menu",
      });
    });
  }

  return (
    <nav className="main-menu">
      {/* visually-hidden is a class that hides the element from the screen, but not from the screen reader. */}
      <h3 className="visually-hidden">Nawigacja Menu Pobocznego</h3>

      <ul className="main-menu__list main-menu__main-list">
        {/* Map the mainNavigationList array to a list of ListItem components. */}
        {mainNavigationList.map((element) => (
          <ListItem
            key={element}
            className="main-menu__main-list-item"
            link="#"
            as={
              element === "Produkty" || element === "Pomieszczenia"
                ? "button"
                : "a"
            } // If the element is "Produkty" or "Pomieszczenia", render it as a button, otherwise render it as a link.
            onClickFunction={
              element === "Produkty" || element === "Pomieszczenia"
                ? () => changeMenu(element)
                : undefined
            } // If the element is "Produkty" or "Pomieszczenia", change the menu to display the products menu or the rooms menu when the user clicks on the element. Otherwise, do nothing.
          >
            {element}
          </ListItem>
        ))}

        {/* Map the mainNavigationSubList array to a list of ListItem components. */}
        {mainNavigationSubList.map((element) => (
          <ListItem key={element} link="#">
            {element}
          </ListItem>
        ))}
      </ul>

      <ul className="main-menu__list main-menu__secondary-list">
        {/* Map the secondaryNavigationList array to a list of ListItem components. */}
        {secondaryNavigationList.map((element) => (
          <ListItem key={element} link="#">
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
