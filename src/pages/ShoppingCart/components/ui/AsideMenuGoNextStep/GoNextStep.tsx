// Import custom hooks
import useModal from "../../../../../hooks/useModal/useModal";
import useWindowSize from "../../../../../hooks/useWindowSize/useWindowSize";
// Import components
import { Btn } from "../../../../../components/ui/Btn/Btn";
// Import icons
import ArrowRightIcon from "../../../../../Icons/ArrowRightIcon";

/**
 * GoNextStep is a functional component that renders a "Go to Next Step" button.
 * When the button is clicked, it opens a modal for the next step.
 * The button also includes an arrow icon if the window width is greater than or equal to 900px.
 *
 * @returns {JSX.Element} A button that opens the next step modal when clicked.
 */

export function GoNextStep() {
  const { setModalData } = useModal(); // useModal hook is used to manage the state of the modal
  const { width } = useWindowSize(); // useWindowSize hook is used to get the current window size

  // The openNexStepModal function sets the modal data.
  function openNexStepModal() {
    setModalData({
      type: "next-step",
    });
  }

  return (
    <Btn
      type="button"
      variant="blue"
      className="shopping-cart-menu__next-btn"
      onClick={openNexStepModal}
    >
      <span>Dalej</span>

      {/* If the window width is greater than or equal to 900px, the button includes an arrow icon */}
      {width >= 900 && (
        <span className="shopping-cart-menu__next-btn-svg-wrapper">
          <ArrowRightIcon />
        </span>
      )}
    </Btn>
  );
}
