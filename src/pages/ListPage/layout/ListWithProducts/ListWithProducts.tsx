// Layout
import ProductFilters from "../ProductFilters/ProductFilters";
import ProductsGrid from "../ProductsGrid/ProductsGrid";
// Components
import BuySwitch from "../../components/BuySwitch/BuySwitch";

export default function ListWithProducts() {
  return (
    <>
      <BuySwitch />

      <ProductFilters />

      <ProductsGrid />
    </>
  );
}
