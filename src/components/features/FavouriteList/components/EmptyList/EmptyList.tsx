// Import custom hooks
import useWindowSize from "../../../../../hooks/useWindowSize/useWindowSize";
// Import icons
import HeartIcon from "../../../../../Icons/HeartIcon";

/**
 * EmptyList Component
 *
 * This component displays a message indicating that the list is empty.
 *
 * @param isMainList - A flag indicating if the list is the main list.
 *
 * @returns A div element with a class of "favourite-list__inner-wrapper", containing a div with a HeartIcon and a p element with a message. The p element is only displayed if the list is the main list or if the window width is greater than or equal to 600px.
 */
export function EmptyList({ isMainList }: { isMainList: boolean }) {
  const { width } = useWindowSize();

  return (
    <div className="favourite-list__inner-wrapper" data-testid="empty-list">
      <div>
        <HeartIcon />
        {(isMainList || (!isMainList && width >= 600)) && (
          <p>Ta lista potrzebuje odrobiny miłości</p>
        )}
      </div>
    </div>
  );
}
