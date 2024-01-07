// Import react dependencies
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
// Import custom hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
import useToast from "../../../../hooks/useToast";
// Import helpers functions
import { startViewTransition } from "../../../../utils/helpers";
// Import components
import Input from "../../../../components/features/Input/Input";
import { Btn } from "../../../../components/ui/Btn/Btn";
import ErrorMessage from "../../../../components/ui/ErrorMessage/ErrorMessage";
// Import types
import type {
  ChangeListNameModal,
  CreateListModal,
  CreateListModalWithProducts,
} from "../../types/ModalTypes";
import type { FavouritesListType } from "../../../../context/AppContext/types/FavouritesListType";
// Import styles
import "./index.scss";

// Define types for component props
type CreateTypePropsType = {
  type: CreateListModal["type"] | ChangeListNameModal["type"] | CreateListModalWithProducts["type"];
};

/**
 * `NameList` is a React component that allows the user to create a new list or change the name of an existing list.
 * It uses several custom hooks to interact with the application state, modals, and toast notifications.
 * It also uses a form with an input field for the list name and a submit button.
 * The component handles form submission, input change, and checks if a list name already exists.
 *
 * @param {string} props.type - The type of operation, can be "create-list", "change-list-name", or "create-list-with-products".
 * @returns {JSX.Element} The rendered `NameList` component.
 */

export default function NameList({ type }: CreateTypePropsType) {
  const { state, dispatch } = useApp(); // Get app state and dispatch from AppContext

  const { modalData, closeModal } = useModal(); // Get modalData and closeModal from ModalContext

  const { setToastData } = useToast(); // Get setToastData from ToastContext

  const [inputValue, setInputValue] = useState(
    type === "change-list-name" && state.editingList ? state.editingList.name : ""
  ); // Set initial input value based on the type of operation and the currently editing list

  const [errorMessageVisibility, setErrorMessageVisibility] = useState(false); // Set initial error message visibility to false

  const inputRef = useRef<HTMLInputElement | null>(null); // Create ref for input

  // Handle form submission
  function onSubmit(e: FormEvent<HTMLFormElement | HTMLButtonElement>) {
    e.preventDefault(); // Prevent default form submit

    // Check if the list name already exists
    const isNameExist = checkIsNameAlreadyExist();

    // If the name exists, show the error message and return
    if (isNameExist) {
      setErrorMessageVisibility(true);
      return;
    }

    // Start view transition and create or update the list
    startViewTransition(() => {
      // Create a new list object
      const list: FavouritesListType = {
        id: crypto.randomUUID(), // Generate a random id
        name: inputValue, // Set the list name to the input value
        lastEdit: new Date(), // Set the last edit date to the current date
        products: undefined, // Set the products to undefined (will be added later) if creating a list with a product
      };

      // If creating a list with a product, add the product to the list
      if (type === "create-list" && modalData) {
        list.products =
          modalData.type === type && modalData.product ? [modalData.product] : undefined;
      } else if (type === "create-list-with-products" && modalData) {
        // If creating a list with multiple products, add the products to the list
        list.products =
          modalData.type === type && modalData.products ? modalData.products : undefined;
      }

      // Dispatch the appropriate action based on the type of operation
      if (type === "create-list" || type === "create-list-with-products") {
        dispatch({
          type: "createNewList",
          payload: {
            list,
            oldListId: type === "create-list-with-products" ? state.editingList?.id : undefined, // If creating a list with a product, set the old list id to the currently editing list id
          },
        });

        // Show a toast notification for successful list creation
        setToastData({
          open: true,
          text: `Pomyślnie utworzono listę ${list.name}${
            type === "create-list-with-products" &&
            modalData &&
            modalData.type === "create-list-with-products"
              ? ` dla (${modalData.products.length}) artykułów`
              : ""
          }.`, // If creating a list with multiple products, add the number of products to the toast notification
        });
      } else if (type === "change-list-name" && state.editingList) {
        // If changing the list name, dispatch the changeListName action
        dispatch({
          type: "changeListName",
          payload: {
            ...state.editingList, // Pass the currently editing list
            name: inputValue, // Update the list name to the input value
          },
        });

        // Show a toast notification for successful list name change
        setToastData({
          open: true,
          text: `Pomyślnie zmieniono nazwę listy na ${inputValue}.`,
        });
      }
    });

    // Close the modal after the operation
    closeModal();
  }

  // Handle input change
  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value); // Set the input value to the input value
    setErrorMessageVisibility(false); // Hide the error message
  }

  // Check if a list name already exists
  function checkIsNameAlreadyExist() {
    if (!state.favouriteLists) return false; // If there are no lists, return false

    return state.favouriteLists.some((list) => list.name === inputValue);
  }

  return (
    <form
      className="create-list-modal"
      onSubmit={onSubmit} // Handle form submission
    >
      <div>
        <Input
          id="new-list-name"
          label="Wprowadź nazwę listy"
          type="text"
          inputProps={{
            ref: inputRef, // Set the input ref
            autoComplete: "off", // Disable autocomplete for the input
            required: true, // Set the input as required
            maxLength: 50, // Set the max length of the input to 50
            value: inputValue, // Set the input value to the input value
            "aria-errormessage": "list-error-message", // Set the error message id
            "aria-invalid": errorMessageVisibility, // Set the error message visibility
            onChange: onInputChange, // Handle input change
          }}
        />
        <ErrorMessage
          id="list-error-message" // Set the error message id
          errorMessage="Taka nazwa już istnieje" // Set the error message text
          errorVisibility={!errorMessageVisibility} // Set the error message visibility
        />
      </div>

      <Btn
        type="submit"
        size="big"
      >
        {/* Set the button text based on the type of operation */}
        {type === ("create-list" || "create-list-with-products") ? "Stwórz listę" : "Zapisz"}
      </Btn>
    </form>
  );
}
