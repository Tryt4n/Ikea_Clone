// Import react dependencies
import { useRef, type FormEvent, type RefObject } from "react";
// Import components
import { PostalCodeInput } from "../../../../components/PostalCodeInput/PostalCodeInput";
import { PostalCodeRememberCheckbox } from "../../../../components/PostalCodeRememberCheckbox/PostalCodeRememberCheckbox";
import LocationBtn from "../../../../components/LocationBtn/LocationBtn";
// Import types
import type { PostalCodePropsType } from "../../PostalCode";

// Define the props type for the component
type FormProps = {
  type: PostalCodePropsType["modalType"]; // The type of the modal
  postalCodeRef: RefObject<HTMLInputElement>; // A ref to the postal code input
  saveFunction: (e: FormEvent) => void; // A function to handle form submission
};

/**
 * `Form` is a React component that displays a form for entering a postal code.
 * It uses the `PostalCodeInput`, `PostalCodeRememberCheckbox`, and `LocationBtn` components to create the form.
 * The component receives three props: `type` (the type of the modal), `postalCodeRef` (a ref to the postal code input), and `saveFunction` (a function to handle form submission).
 *
 * @param {PostalCodePropsType["modalType"]} props.type - The type of the modal.
 * @param {RefObject<HTMLInputElement>} props.postalCodeRef - A ref to the postal code input.
 * @param {(e: FormEvent) => void} props.saveFunction - A function to handle form submission.
 * @returns {JSX.Element} The rendered `Form` component.
 */

export function Form({ type, postalCodeRef, saveFunction }: FormProps) {
  const postalCodeCheckboxRef = useRef<HTMLInputElement>(null); // Create a ref for the postal code checkbox

  return (
    <form
      className="postal-code-modal__form"
      onSubmit={saveFunction} // Handle form submission
    >
      <PostalCodeInput
        ref={postalCodeRef} // Pass the postal code ref to the input
      />
      {/* // If the type is "choose-shop", display the postal code checkbox and the location button */}
      {type === "choose-shop" && (
        <>
          <PostalCodeRememberCheckbox
            ref={postalCodeCheckboxRef} // Pass the postal code checkbox ref to the checkbox
          />

          <LocationBtn className="postal-code-modal__location-btn" />
        </>
      )}
    </form>
  );
}
