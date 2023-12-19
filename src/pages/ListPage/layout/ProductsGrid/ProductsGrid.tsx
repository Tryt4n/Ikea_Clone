// Custom Hooks
import useList from "../../context/useList";
// Components
import ListProduct from "../../components/ListProduct/ListProduct";
import JoinIkeaFamily from "../../components/JoinIkeaFamily/JoinIkeaFamily";
// Styles
import "./index.scss";

export default function ProductsGrid() {
  const { listState: list } = useList();

  return (
    <>
      {list && list.products && (
        <ul className="products-grid">
          <JoinIkeaFamily />

          {list.products.map((product) => (
            <ListProduct
              key={product.productNumber}
              product={product}
            />
          ))}
        </ul>
      )}
    </>
  );
}
