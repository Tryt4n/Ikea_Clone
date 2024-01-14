// Import react dependencies
import {
  forwardRef,
  useState,
  useEffect,
  type ForwardedRef,
  type ChangeEvent,
  type InputHTMLAttributes,
} from "react";
// Import custom hooks
import useApp from "../../../../hooks/useApp/useApp";
// Import components
import Input from "../../../../components/features/Input/Input";
import ErrorMessage from "../../../../components/ui/ErrorMessage/ErrorMessage";
// Import styles
import "./index.scss";

/**
 * PostalCodeInput is a React component that renders an input field for the user to enter their postal code.
 * The input field has a label, a pattern for the postal code, and an error message that is displayed when the postal code is invalid.
 * The component uses the useApp custom hook to get the current state of the app.
 *
 * @param {InputHTMLAttributes<HTMLInputElement>} props - The properties that define the additional attributes of the input field.
 * @param {ForwardedRef<HTMLInputElement>} ref - The ref that is forwarded to the input field.
 *
 * @example
 * <PostalCodeInput {...props} ref={ref} />
 */

function InnerComponent(
  { ...props }: InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { state } = useApp(); // Use the useApp custom hook to get the current state of the app.
  const [inputTextValue, setInputTextValue] = useState(""); // The state for the value of the input field.

  const {
    postalCode,
    isPostalCodeErrorMessageVisible,
    postalCodeErrorMessage,
  } = state; // Destructure the state of the app.

  useEffect(() => {
    // When the postal code changes, set the value of the input field to the postal code from the state of the app.
    if (postalCode !== "") {
      setInputTextValue(postalCode); // Set the value of the input field to the postal code from the state of the app.
    }
  }, [postalCode]);

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputTextValue(e.target.value); // When the value of the input field changes, set the state for the value of the input field to the new value.
  }

  return (
    <div className="postal-code-input">
      <Input
        type="text"
        id="postal-code"
        label="Wprowadź kod pocztowy"
        inputProps={{
          ref: ref, // The ref that is forwarded to the input field.
          className: "postal-code-input__input",
          required: true, // The input field is required.
          autoComplete: "off", // Disable autocomplete to prevent the browser from suggesting values based on earlier submitted values.
          pattern: `\\d{2}-\\d{3}`, // The pattern for the postal code.
          title: "Wprowadź poprawny kod pocztowy (np. 12-345)", // The title of the input field for error info in case the postal code is invalid.
          "aria-describedby": !postalCodeErrorMessage
            ? "postal-code-example"
            : undefined, // The id of the element that describes the input field.
          "aria-errormessage": postalCodeErrorMessage
            ? "postal-code-errormessage"
            : undefined, // The id of the element that describes the error message.
          "aria-invalid": isPostalCodeErrorMessageVisible, // The state for the visibility of the error message.
          value: inputTextValue, // The value of the input field.
          onChange: onInputChange, // The function to call when the value of the input field changes.
          ...props, // The additional attributes of the input field.
        }}
      />

      {/* If the postal code is valid, render the example postal code. */}
      {!postalCodeErrorMessage && (
        <small
          id="postal-code-example"
          className="postal-code-input__example tx-gray"
          aria-hidden={isPostalCodeErrorMessageVisible}
        >
          np. 12-345
        </small>
      )}

      {/* If the postal code is invalid, render the error message. */}
      {postalCodeErrorMessage && (
        <ErrorMessage
          id="postal-code-errormessage"
          errorMessage={postalCodeErrorMessage}
          errorVisibility={!isPostalCodeErrorMessageVisible}
        />
      )}
    </div>
  );
}

// Export the PostalCodeInput component as a forwardRef component.
export const PostalCodeInput = forwardRef(InnerComponent);
