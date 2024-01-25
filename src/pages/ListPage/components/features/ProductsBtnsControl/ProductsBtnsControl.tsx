// Import react dependencies
import { useCallback, useEffect } from "react";
// Import custom hooks
import useApp from "../../../../../hooks/useApp/useApp";
import useList from "../../../hooks/useList";
import useModal from "../../../../../hooks/useModal/useModal";
// Import helpers functions
import { startViewTransition } from "../../../../../utils/helpers";
// Import components
import { Btn } from "../../../../../components/ui/Btn/Btn";

/**
 * ProductsBtnsControl is a functional component that uses the useApp, useList, and useModal custom hooks to manage the application state, list state, and modal state respectively.
 * It defines a clearManageProductsList function to clear the list of managed products and start a view transition.
 * It defines an openManageProductsModal function to open a modal for managing products in the list.
 * It uses an effect to reset the list of managed products when some products are moved to another list.
 * It renders a div with two buttons for managing products and clearing all products.
 *
 * @returns {JSX.Element} A div with two buttons for managing products and clearing all products.
 */

export function ProductsBtnsControl() {
  const { state } = useApp(); // Destructure the state variable from the useApp custom hook.
  const { setModalData } = useModal(); // Destructure the setModalData variable from the useModal custom hook.
  const { listState, managedProducts, setManagedProducts } = useList(); // Destructure the listState, managedProducts, and setManagedProducts variables from the useList custom hook.

  // Define a clearManageProductsList function to clear the list of managed products and start a view transition. `useCallback` hook is used to prevent unnecessary re-renders.
  const clearManageProductsList = useCallback(() => {
    startViewTransition(() => {
      setManagedProducts([]);
    });
  }, [setManagedProducts]);

  // Define an openManageProductsModal function to open a modal for managing products in the list.
  function openManageProductsModal() {
    setModalData({
      type: "manage-products-in-list",
      products: managedProducts,
    });
  }

  // Reset managedProducts when some products are moved to another list
  useEffect(() => {
    if (state.editingList?.products?.length !== listState?.products?.length) {
      clearManageProductsList();
    }
  }, [
    clearManageProductsList,
    listState?.products?.length,
    state.editingList?.products?.length,
  ]);

  return (
    <div className="manage-products__btns-control">
      <Btn onClick={openManageProductsModal}>Zarządzaj</Btn>

      <Btn variant="light" onClick={clearManageProductsList}>
        Wyczyść wszystko
      </Btn>
    </div>
  );
}
