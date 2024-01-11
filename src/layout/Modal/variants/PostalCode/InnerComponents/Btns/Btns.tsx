// Import custom hooks
import useApp from "../../../../../../hooks/useApp/useApp";
import useModal from "../../../../../../hooks/useModal/useModal";
// Import components
import { Btn } from "../../../../../../components/ui/Btn/Btn";
// Import helpers functions
import { startViewTransition } from "../../../../../../utils/helpers";
// Import types
import type { FormEvent } from "react";
import type { PostalCodePropsType } from "../../PostalCode";

// Define the props type for the component
type BtnsProps = {
  type: PostalCodePropsType["modalType"]; // The type of the modal
  saveFunction: (e: FormEvent) => void; // A function to handle the save button click
  deleteFunction: () => void; // A function to handle the delete button click
};

/**
 * `Btns` is a React component that displays a set of buttons based on the `type` prop.
 * It uses several custom hooks (`useApp`, `useModal`) to manage state and actions.
 * It also uses the `Btn` component to create the buttons.
 * The component receives three props: `type` (the type of the modal), `saveFunction` (a function to handle the save button click), and `deleteFunction` (a function to handle the delete button click).
 *
 * @param {PostalCodePropsType["modalType"]} props.type - The type of the modal.
 * @param {(e: FormEvent) => void} props.saveFunction - A function to handle the save button click.
 * @param {() => void} props.deleteFunction - A function to handle the delete button click.
 * @returns {JSX.Element} The rendered `Btns` component.
 */

export function Btns({ type, saveFunction, deleteFunction }: BtnsProps) {
  const { state } = useApp(); // Get the app state from the useApp custom hook
  const { setModalData } = useModal(); // Get the modal data from the useModal custom hook

  function showShopsList() {
    startViewTransition(() => {
      setModalData({
        type: "preffered-shop",
      });
    });
  }

  return (
    <div className="postal-code-modal__btn-wrapper">
      <Btn onClick={saveFunction}>
        {
          // Display proper text based on the type
          type === "postal-code" ? "Zapisz" : "Znajdź preferowany sklep"
        }
      </Btn>

      {(type === "choose-shop" || (type === "postal-code" && state.postalCode)) && (
        <Btn
          variant="white-with-border"
          onClick={type === "postal-code" ? deleteFunction : showShopsList} // Handle the click based on the type
        >
          {
            // Display proper text based on the type
            type === "postal-code"
              ? "Nie wykorzystuj kodu pocztowego"
              : "Zobacz pełną listę sklepów"
          }
        </Btn>
      )}
    </div>
  );
}
