// Custom Hooks
import useList from "../../context/useList";
// Styles
import "./index.scss";

export default function ProductsGrid() {
  const { listState: list } = useList();

  return (
    <>
      {list && list.products && (
        <ul>
          {list.products.map((product) => (
            <li key={product.productNumber}>
              <section>
                <header>
                  <h3>{product.collection}</h3>
                </header>

                <p>
                  {product.nameToDisplay}, {product.variantName}
                  {product.size !== "universal" ? `, ${product.size}` : ""}
                </p>

                <strong>
                  {product.price.integer},{product.price.decimal}
                </strong>
              </section>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
