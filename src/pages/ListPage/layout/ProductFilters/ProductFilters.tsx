// Custom Hooks
import useList from "../../context/useList";
// Components
import ProductSortingFilters from "../../components/ProductSortingFilters/ProductSortingFilters";
import ControlModalBtns from "../../components/ControlModalBtns/ControlModalBtns";
import ManageProducts from "../ManageProducts/ManageProducts";
// Style
import "./index.scss";

export default function ProductFilters() {
  const { managedProducts } = useList();

  return (
    <div>
      <div className="product-filters">
        <ProductSortingFilters />

        <ControlModalBtns />
      </div>

      {managedProducts && managedProducts.length > 0 && <ManageProducts />}
    </div>
  );
}
