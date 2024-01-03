// Import custom hooks
import useList from "../../context/useList";
// Import components
import ProductSortingFilters from "../../components/features/ProductSortingFilters/ProductSortingFilters";
import ControlModalBtns from "../../components/features/ControlModalBtns/ControlModalBtns";
import ManageProducts from "../ManageProducts/ManageProducts";
// Import styles
import "./index.scss";

/**
 * ProductFilters is a functional component that uses the useList custom hook to get the list of managed products.
 * It renders a div containing two components:
 * - ProductSortingFilters: A component that provides various sorting filters for the list of products.
 * - ControlModalBtns: A component that provides buttons for controlling the modal.
 * If there are any managed products, it also renders the ManageProducts component.
 *
 * @returns {JSX.Element} A div containing the ProductSortingFilters and ControlModalBtns components, and the ManageProducts component if there are any managed products.
 */

export default function ProductFilters() {
  const { managedProducts } = useList(); // Get the list of managed products from the useList custom hook.

  return (
    <div>
      <div className="product-filters">
        <ProductSortingFilters />

        <ControlModalBtns />
      </div>

      {/* If there are any managed products, render the ManageProducts component. */}
      {managedProducts && managedProducts.length > 0 && <ManageProducts />}
    </div>
  );
}
