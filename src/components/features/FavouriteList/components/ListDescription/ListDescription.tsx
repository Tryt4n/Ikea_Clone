// Import React dependencies
import { MouseEvent } from "react";
// Import custom hooks
import useApp from "../../../../../hooks/useApp";
import useModal from "../../../../../hooks/useModal";
import useWindowSize from "../../../../../hooks/useWindowSize";
// Import date-fns for date formatting
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import pl from "date-fns/locale/pl";
// Import components
import { Btn } from "../../../../ui/Btn/Btn";
// Import types
import type { FavouritesListType } from "../../../../../context/AppContext/types/FavouritesListType";
// Import icons
import TripleDotsMenuIcon from "../../../../../Icons/TripleDotsMenuIcon";
import ArrowRightIcon from "../../../../../Icons/ArrowRightIcon";

/**
 * ListDescription Component
 *
 * This component displays the description of a list.
 *
 * @param list - The list.
 * @param isMainList - A flag indicating if the list is the main list.
 *
 * @returns A div element with a class of "favourite-list__description", containing a h3 element with the list name, a time element with the last edit time of the list, and either a div with buttons for viewing the list and opening the list control menu if the list is the main list, or a button for going to the list if the list is not the main list and the window width is greater than or equal to 900px.
 */

export function ListDescription({
  list,
  isMainList,
}: {
  list: FavouritesListType;
  isMainList: boolean;
}) {
  const { dispatch } = useApp(); // Get the dispatch function from the App context
  const { setModalData } = useModal(); // Get the setModalData function from the Modal context
  const { width } = useWindowSize(); // Get the window width

  const { lastEdit, name } = list; // Destructure the last edit time and name from the list

  // Define a function to open the list control menu
  function openListControlMenu(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation(); // Stop the event from propagating up the DOM tree
    e.preventDefault(); // Prevent the default action of the event

    dispatch({ type: "setEditingList", payload: list }); // Dispatch an action to set the editing list in the App context

    setModalData({ type: "list-control" }); // Set the modal data in the Modal context
  }

  return (
    <div className="favourite-list__description">
      <div>
        <h3 className="favourite-list__header">{name}</h3>
        <time
          dateTime={lastEdit.toString()}
          className={`favourite-list__time${
            !isMainList ? " favourite-list__time--break-word" : ""
          }`}
        >
          Zaktualizowano&nbsp;
          {formatDistanceToNow(new Date(lastEdit), {
            addSuffix: true,
            locale: pl,
          })}
        </time>
      </div>

      {isMainList && (
        <div className="favourite-list__btns-wrapper">
          <Btn tabIndex={-1}>Zobacz</Btn>
          <Btn
            shape="circle"
            variant="gray"
            className="favourite-list__btn-menu"
            onClick={openListControlMenu}
          >
            <span className="visually-hidden">Otwórz menu listy</span>
            <TripleDotsMenuIcon />
          </Btn>
        </div>
      )}

      {!isMainList && width >= 900 && (
        <Btn
          shape="circle"
          variant="gray"
          tabIndex={-1}
        >
          <span className="visually-hidden">Przejdź do listy {name}</span>
          <ArrowRightIcon />
        </Btn>
      )}
    </div>
  );
}
