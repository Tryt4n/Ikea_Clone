// Import layout components
import ProductFilters from "../ProductFilters/ProductFilters";
import ProductsGrid from "../ProductsGrid/ProductsGrid";
import ListProductsSummary from "../ListProductsSummary/ListProductsSummary";
// Import feature components
import BuySwitch from "../../components/features/BuySwitch/BuySwitch";

/**
 * ListWithProducts is a functional component that renders a fragment containing four components:
 * - `<BuySwitch>`: A switch component that allows users to toggle between buying options.
 * - `<ProductFilters>`: A component that provides various filters for the list of products.
 * - `<ProductsGrid>`: A component that displays the list of products in a grid layout.
 * - `<ListProductsSummary>`: A component that displays a summary of the products in the list, including the total price and discount.
 *
 * @returns {JSX.Element} A fragment containing the BuySwitch, ProductFilters, ProductsGrid, and ListProductsSummary components.
 */

export default function ListWithProducts() {
  return (
    <>
      <BuySwitch />

      <ProductFilters />

      <ProductsGrid />

      <ListProductsSummary />
    </>
  );
}
