// React
import { ChangeEvent, FormEvent, useRef, useState } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Components
import Input from "../../../../components/Input/Input";
import Btn from "../../../../components/Btn/Btn";
// Types
import type {
  ChangeListNameModal,
  CreateListModal,
} from "../../../../pages/ProductPage/types/ModalTypes";
// Styles
import "./index.scss";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";

type CreateTypePropsType = { type: CreateListModal["type"] | ChangeListNameModal["type"] };

export default function NameList({ type }: CreateTypePropsType) {
  const { state, dispatch } = useApp();
  const { closeModal } = useModal();

  const [inputValue, setInputValue] = useState(
    type === "change-list-name" && state.editingList ? state.editingList.name : ""
  );
  const [errorMessageVisibility, setErrorMessageVisibility] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement | HTMLButtonElement>) {
    e.preventDefault();

    const isNameExist = checkIsNameAlreadyExist();

    if (isNameExist) {
      setErrorMessageVisibility(true);
      return;
    }

    startViewTransition(() => {
      if (type === "create-list") {
        dispatch({
          type: "createNewList",
          payload: {
            id: crypto.randomUUID(),
            name: inputValue,
            lastEdit: new Date(),
          },
        });
      } else if (type === "change-list-name" && state.editingList) {
        dispatch({
          type: "changeListName",
          payload: {
            ...state.editingList,
            name: inputValue,
          },
        });
      }
    });

    closeModal();
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    setErrorMessageVisibility(false);
  }

  function checkIsNameAlreadyExist() {
    if (!state.favouriteLists) return false;

    return state.favouriteLists.some((list) => list.name === inputValue);
  }

  return (
    <form
      className="create-list-modal"
      onSubmit={onSubmit}
    >
      <div>
        <Input
          id="new-list-name"
          label="Wprowadź nazwę listy"
          type="text"
          inputProps={{
            ref: inputRef,
            className: "",
            autoComplete: "off",
            required: true,
            value: inputValue,
            "aria-errormessage": "list-error-message",
            "aria-invalid": errorMessageVisibility,
            onChange: onInputChange,
          }}
        />
        <ErrorMessage
          id="list-error-message"
          errorMessage="Taka nazwa już istnieje"
          errorVisibility={!errorMessageVisibility}
        />
      </div>

      <Btn
        type="submit"
        size="big"
      >
        {type === "create-list" ? "Stwórz listę" : "Zapisz"}
      </Btn>
    </form>
  );
}
