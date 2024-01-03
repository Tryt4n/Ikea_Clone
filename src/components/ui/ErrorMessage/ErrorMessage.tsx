import { HTMLProps } from "react";
import "./index.scss";

// Define the type for the ErrorMessage props
type ErrorMessagePropsType = {
  errorVisibility: boolean; // Whether the error message should be visible
  id: string; // The ID of the error message element
  errorMessage: string; // The error message text
} & HTMLProps<HTMLParagraphElement>; // Include all standard paragraph element props

/**
 * ErrorMessage component
 *
 * This component displays an error message.
 *
 * @param errorVisibility - Whether the error message should be visible.
 * @param id - The ID of the error message element.
 * @param errorMessage - The error message text.
 * @param props - Any additional props to pass to the paragraph element.
 *
 * @returns A paragraph element with the error message.
 */
export default function ErrorMessage({
  errorVisibility,
  id,
  errorMessage,
  ...props
}: ErrorMessagePropsType) {
  return (
    <small
      id={id}
      className="error-message"
      aria-hidden={errorVisibility}
      {...props}
    >
      {errorMessage}
    </small>
  );
}
