// Import components
import { Btn } from "../Btn/Btn";
// Import types
import type { BtnPropsType } from "../Btn/Btn";
// Import icons
import HeartIcon from "../../../Icons/HeartIcon";

// Define the type for the AddToWishListBtn props
type AddToWishListBtnPropsType = {
  active?: boolean; // Whether the button is active, defaults to false
} & Omit<BtnPropsType, "children">; // Include all standard button attributes except "children"

/**
 * AddToWishListBtn component
 *
 * This component displays an add to wishlist button with a heart icon.
 *
 * @param active - Whether the button is active.
 * @param props - Any additional props to pass to the Btn component.
 *
 * @returns A Btn component with a "circle" shape, a visually hidden "Dodaj do ulubionych" label, and a HeartIcon with the specified active state.
 */

export default function AddToWishListBtn({
  active,
  ...props
}: AddToWishListBtnPropsType) {
  return (
    <Btn
      {...props} // Spread the rest of the props
      shape="circle" // Set the shape to "circle"
      data-testid="add-to-wishlist-btn"
    >
      {/* // Render a visually hidden "Dodaj do ulubionych" label for accessibility */}
      <span className="visually-hidden">Dodaj do ulubionych</span>

      <HeartIcon
        active={active} // Render the HeartIcon with the specified active state
      />
    </Btn>
  );
}
