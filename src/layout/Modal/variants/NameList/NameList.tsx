// React
import { ChangeEvent, FormEvent, useRef, useState } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
import useToast from "../../../../hooks/useToast";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Components
import Input from "../../../../components/features/Input/Input";
import { Btn } from "../../../../components/ui/Btn/Btn";
import ErrorMessage from "../../../../components/ui/ErrorMessage/ErrorMessage";
// Types
import type {
  ChangeListNameModal,
  CreateListModal,
  CreateListModalWithProducts,
} from "../../../../pages/ProductPage/types/ModalTypes";
import type { FavouritesListType } from "../../../../context/AppContext";
// Styles
import "./index.scss";

type CreateTypePropsType = {
  type: CreateListModal["type"] | ChangeListNameModal["type"] | CreateListModalWithProducts["type"];
};

export default function NameList({ type }: CreateTypePropsType) {
  const { state, dispatch } = useApp();
  const { modalData, closeModal } = useModal();
  const { setToastData } = useToast();

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
      const list: FavouritesListType = {
        id: crypto.randomUUID(),
        name: inputValue,
        lastEdit: new Date(),
        products: undefined,
      };

      if (type === "create-list" && modalData) {
        list.products =
          modalData.type === type && modalData.product ? [modalData.product] : undefined;
      } else if (type === "create-list-with-products" && modalData) {
        list.products =
          modalData.type === type && modalData.products ? modalData.products : undefined;
      }

      if (type === "create-list" || type === "create-list-with-products") {
        dispatch({
          type: "createNewList",
          payload: {
            list,
            oldListId: type === "create-list-with-products" ? state.editingList?.id : undefined,
          },
        });

        setToastData({
          open: true,
          text: `Pomyślnie utworzono listę ${list.name}${
            type === "create-list-with-products" &&
            modalData &&
            modalData.type === "create-list-with-products"
              ? ` dla (${modalData.products.length}) artykułów`
              : ""
          }.`,
        });
      } else if (type === "change-list-name" && state.editingList) {
        dispatch({
          type: "changeListName",
          payload: {
            ...state.editingList,
            name: inputValue,
          },
        });

        setToastData({
          open: true,
          text: `Pomyślnie zmieniono nazwę listy na ${inputValue}.`,
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
        {type === ("create-list" || "create-list-with-products") ? "Stwórz listę" : "Zapisz"}
      </Btn>
    </form>
  );
}
