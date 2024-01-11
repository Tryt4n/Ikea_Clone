// Import react dependencies
import {
  forwardRef,
  type KeyboardEvent,
  type MouseEvent,
  type ForwardedRef,
  type FormEvent,
  type InputHTMLAttributes,
} from "react";
// Import custom hooks
import useApp from "../../../../hooks/useApp/useApp";
// Import components
import Input from "../../../../components/features/Input/Input";

/**
 * PostalCodeRememberCheckbox is a React component that renders a checkbox for the user to choose whether to remember their postal code.
 * The checkbox has a label and can be controlled by clicking on the label or pressing the Enter or Space key.
 * The component uses the useApp custom hook to get and set the current state of the app.
 *
 * @param {InputHTMLAttributes<HTMLInputElement>} props - The properties that define the additional attributes of the checkbox.
 * @param {ForwardedRef<HTMLInputElement>} ref - The ref that is forwarded to the checkbox.
 *
 * @example
 * <PostalCodeRememberCheckbox {...props} ref={ref} />
 */
function InnerComponent(
  { ...props }: InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { state, dispatch } = useApp(); // Use the useApp custom hook to get and set the current state of the app.

  /**
   * changeCheckboxStatus is a function that toggles the status of the checkbox in the state of the app.
   */
  function changeCheckboxStatus() {
    dispatch({
      type: "togglePostalCodeCheckbox",
      payload: !state.rememberPostalCodeCheckboxStatus,
    });
  }

  /**
   * inputOnChangeFunction is a function that prevents the default action of the event and calls the changeCheckboxStatus function.
   *
   * @param {FormEvent<HTMLInputElement> | MouseEvent<HTMLLabelElement>} e - The event that triggers the function.
   */
  function inputOnChangeFunction(e: FormEvent<HTMLInputElement> | MouseEvent<HTMLLabelElement>) {
    e.preventDefault(); // Prevent the default action of the event.
    changeCheckboxStatus();
  }

  /**
   * inputOnKeyDownFunction is a function that prevents the default action of the event if the key code is not 9 (Tab key) and calls the changeCheckboxStatus function if the key code is 13 (Enter key) or 32 (Space key).
   *
   * @param {KeyboardEvent<HTMLInputElement>} e - The event that triggers the function.
   */
  function inputOnKeyDownFunction(e: KeyboardEvent<HTMLInputElement>) {
    // Prevent the default action of the event if the key code is not 9 (Tab key).
    if (e.keyCode !== 9) {
      e.preventDefault();
    }

    // Call the changeCheckboxStatus function if the key code is 13 (Enter key) or 32 (Space key).
    if (e.keyCode === 13 || e.keyCode === 32) {
      changeCheckboxStatus();
    }
  }

  return (
    <Input
      type="checkbox"
      id="postal-code-checkbox"
      label="Zapamiętaj mój kod pocztowy do dostawy oraz informacji o dostępności i stanie magazynowym."
      labelProps={{
        onClick: inputOnChangeFunction, // The function to call when the label is clicked.
      }}
      inputProps={{
        ref: ref, // The ref that is forwarded to the checkbox.
        checked: state.rememberPostalCodeCheckboxStatus, // The status of the checkbox.
        onChange: inputOnChangeFunction, // The function to call when the status of the checkbox changes.
        onKeyDown: inputOnKeyDownFunction, // The function to call when a key is pressed down in the checkbox.
        ...props, // The additional attributes of the checkbox.
      }}
    />
  );
}

// Export the PostalCodeRememberCheckbox component as a forwardRef component.
export const PostalCodeRememberCheckbox = forwardRef(InnerComponent);
