// React
import { ChangeEvent, FormEvent, useRef, useState } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Components
import Input from "../../../../components/Input/Input";
import { Btn } from "../../../../components/Btn/Btn";
// Types
import type {
  ChangeListNameModal,
  CreateListModal,
  CreateListModalWithProducts,
} from "../../../../pages/ProductPage/types/ModalTypes";
// Styles
import "./index.scss";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";

type CreateTypePropsType = {
  type: CreateListModal["type"] | ChangeListNameModal["type"] | CreateListModalWithProducts["type"];
};

export default function NameList({ type }: CreateTypePropsType) {
  const { state, dispatch } = useApp();
  const { modalData, closeModal } = useModal();

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
            products:
              // modalData?.type === "create-list" && modalData.product
              modalData?.type === "create-list" && modalData.product
                ? [modalData.product]
                : undefined,
          },
        });
        //!
      } else if (type === "create-list-with-products") {
        dispatch({
          type: "createNewList",
          payload: {
            id: crypto.randomUUID(),
            name: inputValue,
            lastEdit: new Date(),
            products:
              modalData?.type === "create-list-with-products" && modalData.products
                ? modalData.products
                : undefined,
          },
        });
      }
      //!
      else if (type === "change-list-name" && state.editingList) {
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
            maxLength: 50,
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
        {/* {type === "create-list" ? "Stwórz listę" : "Zapisz"} */}
        {type === ("create-list" || "create-list-with-products") ? "Stwórz listę" : "Zapisz"}
      </Btn>
    </form>
  );
}
