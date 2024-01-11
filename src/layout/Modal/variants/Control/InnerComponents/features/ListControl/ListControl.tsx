// Import custom hooks
import useApp from "../../../../../../../hooks/useApp/useApp";
import useModal from "../../../../../../../hooks/useModal/useModal";
// Import components
import { ListItem } from "../../ui/ListItem/ListItem";
// Import helpers functions
import { startViewTransition } from "../../../../../../../utils/helpers";
// Import icons
import ArrowRightIcon from "../../../../../../../Icons/ArrowRightIcon";
import EditIcon from "../../../../../../../Icons/EditIcon";
import PrinterIcon from "../../../../../../../Icons/PrinterIcon";
import ShareIcon from "../../../../../../../Icons/ShareIcon";
import TrashIcon from "../../../../../../../Icons/TrashIcon";
// Import types
import type { FavouritesListType } from "../../../../../../../context/AppContext/types/FavouritesListType";

/**
 * `ListControl` is a React component that provides controls for a list.
 * It uses several custom hooks (`useApp`, `useModal`) to manage state and actions.
 * It also uses the `ListItem` component to create the list items.
 * The component does not receive any props.
 *
 * @component
 * @returns {JSX.Element} The rendered `ListControl` component.
 */

export function ListControl() {
  const { state } = useApp(); // Get state from useApp hook
  const { setModalData } = useModal(); // Get setModalData from useModal hook

  // Get the current location's pathname and check if it matches the list page pattern
  const { pathname } = location;
  const isListPage = /^\/favourites\/[a-zA-Z0-9-]+\/?$/.test(pathname); // Check if the pathname matches the list page pattern. Example: /favourites/52759559-c5f4-4a82-813b-f073aa7f44d3 (list Id)

  // Open the modal for changing the list name
  function openChangeListNameModal() {
    startViewTransition(() => {
      setModalData({
        type: "change-list-name",
      });
    });
  }

  // Open the modal for deleting the list
  function openDeleteListModal() {
    startViewTransition(() => {
      setModalData({
        type: "delete-list-confirmation",
      });
    });
  }

  // Open the modal for moving all products from list to another list
  function openMoveToOtherListModal() {
    if (!state.editingList) return; // Return if there is no editing list

    const list: FavouritesListType = state.editingList;
    startViewTransition(() => {
      setModalData({
        type: "move-to-other-list",
        list: list,
      });
    });
  }

  return (
    <>
      <ListItem onClick={openChangeListNameModal}>
        <EditIcon />
        Zmień nazwę listy
      </ListItem>

      {
        // If the list is not empty and list exist render element
        state.editingList?.products?.length && state.favouriteLists ? (
          // <ListItem onClick={openMoveToOtherListModal}>
          <ListItem
            onClick={() => {
              openMoveToOtherListModal();
            }}
          >
            <ArrowRightIcon />
            Przenieś do innej listy
          </ListItem>
        ) : null
      }

      <ListItem>
        <ShareIcon />
        Udostępnij
      </ListItem>

      {
        // If the list is not empty and the user is on the list page render element
        state.editingList?.products?.length && isListPage ? (
          <ListItem>
            <PrinterIcon />
            Drukuj listę zakupów
          </ListItem>
        ) : null
      }

      <ListItem onClick={openDeleteListModal}>
        <TrashIcon />
        Usuń swoją listę
      </ListItem>
    </>
  );
}
