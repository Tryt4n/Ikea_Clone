// React
import { Suspense, lazy } from "react";
// Context
import { ProductProvider } from "./context/ProductContext";
// Layout
const ProductPageLayout = lazy(
  () => import("./layout/ProductPageLayout/ProductPageLayout"),
);
// Components
import PageLoadingSpinner from "../../components/ui/LazyLoadPageLoadingSpinner/PageLoadingSpinner";

export default function ProductPage() {
  return (
    <ProductProvider>
      <Suspense fallback={<PageLoadingSpinner />}>
        <ProductPageLayout />
      </Suspense>
    </ProductProvider>
  );
}
