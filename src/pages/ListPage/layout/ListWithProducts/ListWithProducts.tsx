// Layout
import ProductFilters from "../ProductFilters/ProductFilters";
import ProductsGrid from "../ProductsGrid/ProductsGrid";
import ListProductsSummary from "../ListProductsSummary/ListProductsSummary";
// Components
import BuySwitch from "../../components/BuySwitch/BuySwitch";

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
