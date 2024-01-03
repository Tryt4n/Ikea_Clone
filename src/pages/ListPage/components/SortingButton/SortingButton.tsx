// Import custom hooks
import useList from "../../context/useList";
// Import helpers function
import { startViewTransition } from "../../../../utils/helpers";
// Import components
import { Btn } from "../../../../components/ui/Btn/Btn";
// Import types
import type { ReducerActionsType, SortingTypes } from "../../context/ListContext";

// Define the SortingButtonProps type
type SortingButtonProps = {
  variant: SortingTypes; // The variant of the button
  dispatchAction: ReducerActionsType; // The action to dispatch when the button is clicked
  children: string; // The text to display on the button
};

/**
 * SortingButton is a component that renders a button for sorting a list.
 *
 * It uses the useList custom hook to get the list state and dispatch function.
 *
 * The button's variant and onClick handler depend on the current sorting of the list.
 *
 * @component
 * @example
 * return (
 *   <SortingButton variant="newest" dispatchAction={{ type: "sortByDate", payload: "newest" }} children="Sort by newest" />
 * )
 *
 * @param {Object} props - The props that define the SortingButton component.
 * @param {string} props.variant - The variant of the button.
 * @param {Object} props.dispatchAction - The action to dispatch when the button is clicked.
 * @param {string} props.children - The text to display on the button.
 */

export function SortingButton({ variant, dispatchAction, children }: SortingButtonProps) {
  const { listState, listDispatch } = useList(); // Use the useList hook to get the list state and dispatch function

  return (
    <>
      {listState && (
        <Btn
          variant={listState.listSorting === variant ? "light-with-border" : "gray"} // Set the variant of the button based on the current sorting of the list
          onClick={() =>
            // Start a view transition and dispatch the appropriate action based on the current sorting of the list
            startViewTransition(() => {
              listState.listSorting === variant
                ? listDispatch({ type: "sortByDate", payload: "oldest" })
                : listDispatch(dispatchAction);
            })
          }
        >
          {children}
        </Btn>
      )}
    </>
  );
}
