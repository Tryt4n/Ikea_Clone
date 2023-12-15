// Layout
import ProductFilters from "../ProductFilters/ProductFilters";
// Components
import BuySwitch from "../../components/BuySwitch/BuySwitch";

export default function ListWithProducts() {
  return (
    <>
      <BuySwitch />

      <ProductFilters />
    </>
  );
}
