// Import custom hooks
import useApp from "../../../../hooks/useApp/useApp";
// Import layout components
import FavouriteList from "../../../../components/features/FavouriteList/FavouriteList";
// Import components
import { ListCreation } from "../../components/ListCreation/ListCreation";

/**
 * MainList is a functional component that renders the main list of favourite lists.
 *
 * It uses the custom hook useApp to access the global state of the application.
 *
 * The component renders an article element containing a header, a ListCreation component, and the first favourite list from the state.
 *
 * If there are favourite lists in the state, it renders a FavouriteList component and passes the first list from the state as a prop.
 *
 * @returns {JSX.Element} An article element with a header, a ListCreation component, and a FavouriteList component (if there are favourite lists in the state).
 */

export function MainList() {
  const { state } = useApp(); // Use the custom hook useApp to access the global state of the application

  return (
    <article className="favourite-lists">
      <hgroup className="favourite-lists__header">
        <h2>Hej!</h2>
        <p>Zacznij organizować swoją wymarzoną przestrzeń.</p>
      </hgroup>

      <div
        className="favourite-lists__container"
        data-testid="favourite-lists-container"
      >
        <ListCreation />

        {/* If there are favourite lists in the state, render the first one which would be the main list */}
        {state.favouriteLists && state.favouriteLists.length > 0 && (
          <FavouriteList
            // Pass the first list from the state as a prop
            list={state.favouriteLists[0]}
            isMainList
          />
        )}
      </div>
    </article>
  );
}
