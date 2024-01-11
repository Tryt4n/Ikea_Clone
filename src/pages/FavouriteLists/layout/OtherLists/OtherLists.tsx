// Import custom hooks
import useApp from "../../../../hooks/useApp/useApp";
// Import layout components
import FavouriteList from "../../../../components/features/FavouriteList/FavouriteList";

/**
 * OtherLists is a functional component that renders a list of favourite lists.
 *
 * It uses the custom hook useApp to access the global state of the application.
 *
 * If there are favourite lists in the state, it renders an article element containing a list of FavouriteList components.
 * Each FavouriteList component is passed a list from the state as a prop.
 *
 * The first list in the state is skipped and not rendered.
 *
 * @returns {JSX.Element} A fragment containing an article element with a list of FavouriteList components, or null if there are no favourite lists in the state.
 */

export function OtherLists() {
  const { state } = useApp(); // Use the custom hook useApp to access the global state of the application

  return (
    <>
      {/* If there are favourite lists in the state, render an article element */}
      {state.favouriteLists && (
        <article>
          {/* This heading is visually hidden and is used for accessibility and SEO purposes */}
          <h2 className="visually-hidden">Twoje listy</h2>

          {/* Render a list of FavouriteList components */}
          <ul className="favourite-lists__list">
            {state.favouriteLists.map((list, index) => {
              // Skip the first list in the state, because it is rendered in the MainList component
              if (index === 0) return null;

              return (
                // For each list in the state, render a FavouriteList component and pass the list as a prop
                <li key={list.name + list.lastEdit}>
                  {index > 0 && <FavouriteList list={list} />}
                </li>
              );
            })}
          </ul>
        </article>
      )}
    </>
  );
}
