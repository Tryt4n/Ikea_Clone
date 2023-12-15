// Components
import ControlModalBtns from "../../components/ControlModalBtns/ControlModalBtns";
import ProductSortingFilters from "../../components/ProductSortingFilters/ProductSortingFilters";
// Style
import "./index.scss";

export default function ProductFilters() {
  return (
    <div className="product-filters">
      <ProductSortingFilters />

      <ControlModalBtns />
    </div>
  );
}
