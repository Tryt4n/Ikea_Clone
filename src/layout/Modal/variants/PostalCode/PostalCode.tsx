// Import react dependencies
import { useRef, type FormEvent } from "react";
// Import custom hooks
import useApp from "../../../../hooks/useApp/useApp";
import useModal from "../../../../hooks/useModal/useModal";
import useToast from "../../../../hooks/useToast/useToast";
// Import inner components
import { Form } from "./InnerComponents/Form/Form";
import { Btns } from "./InnerComponents/Btns/Btns";
import { SubDescription } from "./InnerComponents/SubDescription/SubDescription";
// Import types
import type {
  ModalChooseShopType,
  ModalPostalCodeType,
} from "../../types/ModalTypes";
// Import styles
import "./index.scss";

// Define the props type for the component and export them to use in inner components
export type PostalCodePropsType = {
  modalType: ModalPostalCodeType["type"] | ModalChooseShopType["type"];
};

/**
 * `PostalCode` is a React component that displays a modal for entering a postal code.
 * It uses several custom hooks (`useApp`, `useModal`, `useToast`) to manage state and actions.
 * It also uses the `Form`, `Btns`, and `SubDescription` components to create the modal.
 * The component receives one prop: `modalType` (the type of the modal).
 *
 * @param {PostalCodePropsType["modalType"]} props.modalType - The type of the modal.
 * @returns {JSX.Element} The rendered `PostalCode` component.
 */

export default function PostalCode({ modalType }: PostalCodePropsType) {
  const { state, dispatch } = useApp(); // Get state and dispatch from useApp custom hook
  const { closeModal } = useModal(); // Get closeModal from useModal custom hook
  const { setToastData } = useToast(); // Get setToastData from useToast custom hook

  const postalCodeRef = useRef<HTMLInputElement>(null); // Create a ref for the postal code input

  /**
   * `handleFormSubmit` is a function that handles the form submission.
   * It validates the postal code and dispatches actions based on the validation result.
   * It also sets the toast notification after a successful submission.
   */
  function handleFormSubmit(e: FormEvent) {
    e.preventDefault(); // Prevent the default form submission

    const zipCodeValue = postalCodeRef.current?.value || ""; // Get the postal code value from the input or set it to an empty string
    const zipCodeRegex = /^\d{2}-\d{3}$/; // Create a regex for the postal code

    if (zipCodeValue && state.postalCode === zipCodeValue) {
      // If the postal code is the same as the one in the state
      dispatchErrorMessage("Wprowadzona wartość jest taka sama");
    } else if (!zipCodeValue) {
      // If the postal code is empty
      dispatchErrorMessage("Wprowadź kod pocztowy");
    } else if (!zipCodeRegex.test(zipCodeValue)) {
      // If the postal code is not valid
      dispatchErrorMessage(
        "Wprowadzony kod pocztowy jest nieprawidłowy. Spróbuj ponownie.",
      );
    } else {
      dispatchErrorMessage(""); // Clear the error message

      // Dispatch the setPostalCode action with the postal code value
      dispatch({
        type: "setPostalCode",
        payload: zipCodeValue,
      });
      closeModal(); // Close the modal

      // Set the toast notification
      setToastData({
        open: true,
        text: `Wybrany przez ciebie kod pocztowy to: ${zipCodeValue}`,
      });
    }
  }

  function dispatchErrorMessage(message: string) {
    dispatch({
      type: "showErrorMessage",
      payload: message,
    });
  }

  function deletePostalCode() {
    dispatch({ type: "deletePostalCode" });
    closeModal();
  }

  return (
    <div className="postal-code-modal">
      <p>
        {
          // Display proper text based on the type
          modalType === "postal-code"
            ? "Uzyskaj aktualne informacje o dostawie produktów i dostępności produktów w twojej okolicy."
            : "Znajdź swój preferowany sklep, aby uzyskać informacje o jego godzinach otwarcia, dostępności asortymentu i aktualnych ofertach."
        }
      </p>

      <Form
        type={modalType}
        postalCodeRef={postalCodeRef} // Pass the postal code ref to the form
        saveFunction={handleFormSubmit} // Pass the handleFormSubmit function to the form
      />

      <SubDescription type={modalType} />

      <Btns
        type={modalType}
        saveFunction={handleFormSubmit} // Pass the handleFormSubmit function to the buttons
        deleteFunction={deletePostalCode} // Pass the deletePostalCode function to the buttons
      />
    </div>
  );
}
