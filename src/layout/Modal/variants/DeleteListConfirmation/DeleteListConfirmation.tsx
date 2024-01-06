// Import react dependencies
import { useRef, useState, type KeyboardEvent, type FormEvent, type MouseEvent } from "react";
// Import custom hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
import useToast from "../../../../hooks/useToast";
// Import helpers functions
import { startViewTransition } from "../../../../utils/helpers";
// Import components
import { Btn } from "../../../../components/ui/Btn/Btn";
import Input from "../../../../components/features/Input/Input";
import ErrorMessage from "../../../../components/ui/ErrorMessage/ErrorMessage";
// Import icons
import WarningIcon from "../../../../Icons/WarningIcon";
// Import styles
import "./index.scss";

/**
 * DeleteListConfirmation is a React component that renders a confirmation modal for deleting a list.
 * The modal includes a checkbox for the user to confirm the deletion, an error message if the user tries to delete the list without confirming, and a button to delete the list.
 * The component uses the useApp, useModal, and useToast custom hooks, and the startViewTransition utility function.
 *
 * @returns {JSX.Element} - The component that displays a confirmation modal for deleting a list.
 */

export default function DeleteListConfirmation() {
  const { state, dispatch } = useApp(); // Use the useApp custom hook to get the state and dispatch of the app.
  const { closeModal } = useModal(); // Use the useModal custom hook to get the closeModal function.
  const { setToastData } = useToast(); // Use the useToast custom hook to get the setToastData function.

  const [checkboxStatus, setCheckboxStatus] = useState(false); // The status of the checkbox.
  const [isErrorMessageVisible, setErrorMessageVisible] = useState(false); // The visibility of the error message.

  const checkboxRef = useRef<HTMLInputElement | null>(null); // The ref of the checkbox.

  // Change the status of the checkbox.
  function changeCheckboxStatus() {
    if (!checkboxRef.current) return; // If the checkbox ref is not available, return.

    // If the checkbox is checked, uncheck it. Otherwise, check it and hide the error message.
    if (checkboxStatus) {
      setCheckboxStatus(false);
      startViewTransition(() => {
        setErrorMessageVisible(true);
      });
    } else {
      setCheckboxStatus(true);
      startViewTransition(() => {
        setErrorMessageVisible(false);
      });
    }
  }

  // Handle the change of the checkbox.
  function inputOnChangeFunction(e: FormEvent<HTMLInputElement> | MouseEvent<HTMLLabelElement>) {
    e.preventDefault();
    changeCheckboxStatus();
  }

  function inputOnKeyDownFunction(e: KeyboardEvent<HTMLInputElement>) {
    // Prevent the default behavior of the tab key.
    if (e.keyCode !== 9) {
      e.preventDefault();
    }

    // If the user presses the space or enter key, change the status of the checkbox.
    if (e.keyCode === 13 || e.keyCode === 32) {
      changeCheckboxStatus();
    }
  }

  // Handle the deletion of the list.
  function deleteList() {
    const editingList = state.editingList;
    if (!editingList) return; // If the editingList is not available, return.

    // If the checkbox is checked, delete the list and close the modal. Otherwise, show the error message. Show a toast message if the list is deleted successfully.
    if (checkboxStatus) {
      setToastData({
        open: true,
        text: `Pomyślnie usunięto ${editingList.name}.`,
      });

      startViewTransition(() => {
        dispatch({ type: "deleteList", payload: editingList.id });
        closeModal();
      });
    } else {
      setErrorMessageVisible(true);
    }
  }

  return (
    <div className="delete-list-confirmation-modal">
      <p>
        Usunie to wszystkie informacje i treści związane z tą listą. Bez obaw, pozostałe listy
        pozostaną nietknięte.
      </p>

      <form
        className="delete-list-confirmation-modal__form"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent the default submit behavior.
          deleteList();
        }}
      >
        <div className="delete-list-confirmation-modal__input-wrapper">
          <Input
            type="checkbox"
            id="delete-list-checkbox"
            label="Potwierdzam, że chcę usunąć tę listę wraz z jej zawartością"
            labelProps={{
              onClick: inputOnChangeFunction, // Change the status of the checkbox when the label is clicked.
            }}
            inputProps={{
              ref: checkboxRef, // Assign the checkbox ref to the input element.
              className: "accent",
              checked: checkboxStatus, // Assign the checkbox status to the checked attribute.
              onChange: inputOnChangeFunction, // Change the status of the checkbox when the input is changed.
              onKeyDown: inputOnKeyDownFunction, // Change the status of the checkbox when the input is focused and the user presses the space or enter key.
            }}
          />

          <ErrorMessage
            id="delete-list-checkbox"
            errorMessage="Potwierdź, że chcesz usunąć tę listę."
            errorVisibility={!isErrorMessageVisible} // Hide the error message if the checkbox is checked.
            aria-live="polite" // Announce the error message when it changes.
          />
        </div>

        <Btn
          type="submit"
          variant="warn"
          size="big"
          className="delete-list-confirmation-modal__btn"
        >
          <WarningIcon />
          Usuń listę
        </Btn>
      </form>
    </div>
  );
}
