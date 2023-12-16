// date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import pl from "date-fns/locale/pl";
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

              {/* //! */}
              <time dateTime={product.addedDate.toString()}>
                <br />
                <strong>
                  Zaktualizowano&nbsp;
                  {formatDistanceToNow(new Date(product.addedDate), {
                    addSuffix: true,
                    locale: pl,
                  })}
                </strong>
              </time>
              <br />
              <br />
              <hr />
              {/* //! */}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
