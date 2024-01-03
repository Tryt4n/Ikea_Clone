// Import custom hooks
import useApp from "../../hooks/useApp";
// Import layout components
import { MainList } from "./layout/MainList/MainList";
import { OtherLists } from "./layout/OtherLists/OtherLists";
// Import styles
import "./index.scss";

/**
 * FavouriteLists is a functional component that renders the favourite lists page.
 *
 * It uses the custom hook useApp to access the global state of the application.
 *
 * The component renders a div element with a minimum height of 90vh to avoid high value of CLS on loading, containing a MainList component and, if there are more than one favourite lists in the state, an OtherLists component.
 *
 * @returns {JSX.Element} A div element with a MainList component and, if applicable, an OtherLists component.
 */

export default function FavouriteLists() {
  const { state } = useApp(); // Use the custom hook useApp to access the global state of the application

  return (
    <div style={{ minHeight: "90vh" }}>
      <MainList />

      {/* If there are more than one favourite lists in the state, render the OtherLists component */}
      {state.favouriteLists && state.favouriteLists.length > 1 && <OtherLists />}
    </div>
  );
}
