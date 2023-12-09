// React
import { ChangeEvent, MouseEvent, FormEvent, useRef, useState } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
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

type CreateTypePropsType = { type: CreateListModal["type"] | ChangeListNameModal["type"] };

export default function NameList({ type }: CreateTypePropsType) {
  const { state, dispatch } = useApp();
  const { closeModal } = useModal();

  // const [inputValue, setInputValue] = useState("");
  const [inputValue, setInputValue] = useState(
    type === "change-list-name" && state.editingList ? state.editingList.name : ""
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement | HTMLButtonElement>) {
    e.preventDefault();

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

    closeModal();
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function labelOnClickFunction(e: MouseEvent<HTMLLabelElement>) {
    e.preventDefault();

    if (inputRef.current) inputRef.current.focus();
  }

  return (
    <form
      className="create-list-modal"
      onSubmit={onSubmit}
    >
      <Input
        id="new-list-name"
        label="Wprowadź nazwę listy"
        type="text"
        labelProps={{
          onClick: labelOnClickFunction,
        }}
        inputProps={{
          ref: inputRef,
          className: "",
          autoComplete: "off",
          required: true,
          value: inputValue,
          onChange: onInputChange,
        }}
      />

      <Btn type="submit">{type === "create-list" ? "Stwórz listę" : "Zapisz"}</Btn>
    </form>
  );
}
