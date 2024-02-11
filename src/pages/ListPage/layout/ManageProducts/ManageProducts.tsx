// Import components
import { ProductsBtnsControl } from "../../components/features/ProductsBtnsControl/ProductsBtnsControl";
import { ProductsList } from "../../components/ui/ProductsList/ProductsList";
// Import styles
import "./index.scss";

/**
 * ManageProducts is a functional component that renders a div containing two components:
 * - ProductsList: A component that displays a list of products.
 * - ProductsBtnsControl: A component that provides buttons for managing the list of products.
 *
 * @returns {JSX.Element} A div containing the ProductsList and ProductsBtnsControl components.
 */

export default function ManageProducts() {
  return (
    <div
      className="manage-products"
      data-testid="list-manage-selected-products"
    >
      <ProductsList />

      <ProductsBtnsControl />
    </div>
  );
}
