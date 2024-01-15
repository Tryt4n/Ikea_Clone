// Import Btn and its type from the Btn component
import { Btn, type BtnPropsType } from "../../../../components/ui/Btn/Btn";
// Import icons
import ArrowRightIcon from "../../../../Icons/ArrowRightIcon";

// Define the type for the CardBtn props
type CardBtnPropsType = Omit<BtnPropsType, "children" | "shape">; // This allows the component to accept all properties that Btn would accept, except for "children" and "shape"

/**
 * CardBtn component
 *
 * This component renders a button with a light variant, a circle shape, and an ArrowRightIcon.
 * It accepts all properties that Btn would accept, except for "children" and "shape".
 *
 * @param props - Any additional props to pass to the Btn component.
 *
 * @returns A Btn component with a light variant, a circle shape, an ArrowRightIcon, and the provided props.
 */

export function CardBtn(props: CardBtnPropsType) {
  return (
    <Btn
      variant="light" // Set the variant to "light"
      shape="circle" // Set the shape to "circle"
      {...props} // Spread the rest of the props
      aria-hidden="true" // Set aria-hidden to "true" to hide the button from screen readers
      tabIndex={-1} // Set tabIndex to -1 to remove the button from the tab order
      className="card__btn"
      data-testid="card-btn"
    >
      <ArrowRightIcon />
    </Btn>
  );
}
