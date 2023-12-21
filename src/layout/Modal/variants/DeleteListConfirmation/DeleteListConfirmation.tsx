// React
import { KeyboardEvent, FormEvent, MouseEvent, useRef, useState } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Components
import { Btn } from "../../../../components/ui/Btn/Btn";
import Input from "../../../../components/features/Input/Input";
import ErrorMessage from "../../../../components/ui/ErrorMessage/ErrorMessage";
// Icons
import WarningIcon from "../../../../Icons/WarningIcon";
// Style
import "./index.scss";

export default function DeleteListConfirmation() {
  const { state, dispatch } = useApp();
  const { closeModal } = useModal();

  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [isErrorMessageVisible, setErrorMessageVisible] = useState(false);

  const checkboxRef = useRef<HTMLInputElement | null>(null);

  function changeCheckboxStatus() {
    if (!checkboxRef.current) return;

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

  function inputOnChangeFunction(e: FormEvent<HTMLInputElement> | MouseEvent<HTMLLabelElement>) {
    e.preventDefault();
    changeCheckboxStatus();
  }

  function inputOnKeyDownFunction(e: KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode !== 9) {
      e.preventDefault();
    }

    if (e.keyCode === 13 || e.keyCode === 32) {
      changeCheckboxStatus();
    }
  }

  function deleteList() {
    const editingList = state.editingList;
    if (!editingList) return;

    if (checkboxStatus) {
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
          e.preventDefault();
          deleteList();
        }}
      >
        <div className="delete-list-confirmation-modal__input-wrapper">
          <Input
            type="checkbox"
            id="delete-list-checkbox"
            label="Potwierdzam, że chcę usunąć tę listę wraz z jej zawartością"
            labelProps={{
              onClick: inputOnChangeFunction,
            }}
            inputProps={{
              ref: checkboxRef,
              className: "accent",
              checked: checkboxStatus,
              onChange: inputOnChangeFunction,
              onKeyDown: inputOnKeyDownFunction,
            }}
          />

          <ErrorMessage
            id="delete-list-checkbox"
            errorMessage="Potwierdź, że chcesz usunąć tę listę."
            errorVisibility={!isErrorMessageVisible}
            aria-live="polite"
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
