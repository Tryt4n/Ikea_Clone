/**
 * ShowMoreBtn Component
 *
 * This is a React functional component. It displays a button that toggles between showing more and showing less content. The state of the button is controlled by the `showMore` prop, and the state is updated by the `setShowMore` function.
 *
 * @param {boolean} props.showMore - The current state of the button.
 * @param {(value: boolean) => void} props.setShowMore - The function to update the state of the button.
 *
 * @example
 * <ShowMoreBtn showMore={showMore} setShowMore={setShowMore} />
 *
 * @returns A JSX element that consists of a `div` with the class name `additional-info__btn-wrapper`. Inside this `div`, it renders a `button` element. The `button` element has an `onClick` event handler that toggles the `showMore` state. The `aria-label` attribute of the `button` element and the text inside the `button` element change depending on the `showMore` state.
 */

export function ShowMoreBtn({
  showMore,
  setShowMore,
}: {
  showMore: boolean; // The current state of the button.
  setShowMore: (value: boolean) => void; // The function to update the state of the button.
}) {
  return (
    <div className="additional-info__btn-wrapper">
      <button
        className="additional-info__btn"
        onClick={() => setShowMore(!showMore)} // Toggle the showMore state when the button is clicked.
        aria-label={showMore ? "Naciśnij aby schować" : "Naciśnij aby pokazać więcej"} // Change the aria-label depending on the showMore state.
      >
        {/* Change the text inside the button depending on the showMore state. */}
        {showMore ? "Pokaż mniej" : "Dowiedz się więcej"}
      </button>
    </div>
  );
}
