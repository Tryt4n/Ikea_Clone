// React
import { ButtonHTMLAttributes } from "react";
// Custom Hooks
import useModal from "../../../hooks/useModal/useModal";
// Types
import type { BtnShapesType } from "../../../types/btnTypes";
// Components
import { Btn } from "../Btn/Btn";
// Icons
import AvatarIcon from "../../../Icons/AvatarIcon";
// Style
import "./index.scss";

// Define the type for the LoginBtn props
type LoginBtnPropsType = {
  className?: string; // Optional additional CSS classes
  short?: boolean; // Whether to hide the button text, defaults to false
  shape?: BtnShapesType; // The shape of the button, defaults to "oval"
} & ButtonHTMLAttributes<HTMLButtonElement>; // Include all standard button attributes

/**
 * LoginBtn component
 *
 * This component displays a login button that opens a login modal when clicked.
 *
 * @param className - Optional additional CSS classes.
 * @param short - Whether to hide the button text.
 * @param shape - The shape of the button.
 * @param props - Any additional props to pass to the Btn component.
 *
 * @returns A Btn component with an AvatarIcon, optional "Hej! Zaloguj się" text, and an onClick handler that opens the login modal.
 */
export default function LoginBtn({
  className,
  short,
  shape = "oval",
  ...props
}: LoginBtnPropsType) {
  // Use the useModal hook to get the setModalData function
  const { setModalData } = useModal();

  // Define a function to open the login modal
  function openLoginModal() {
    // Set the modal data to indicate that the login modal should be opened
    setModalData({
      type: "log-in",
    });
  }

  // Return the login button
  return (
    <Btn
      variant="light" // Set the variant to "light"
      shape={shape} // Set the shape
      onClick={openLoginModal} // Set the onClick handler to open the login modal
      className={`login-btn${className ? ` ${className}` : ""}`} // Construct the className from the "login-btn" class and any additional classes
      {...props} // Spread the rest of the props
    >
      <AvatarIcon />

      {/* // Render the "Hej! Zaloguj się" text, hidden if the 'short' prop is true */}
      <span className={short ? "visually-hidden" : undefined}>
        Hej! Zaloguj się
      </span>
    </Btn>
  );
}
