// Custom Hooks
import useList from "../../context/useList";
// Components
import { Btn } from "../../../../components/Btn/Btn";
import Input from "../../../../components/Input/Input";
import Tag from "../../../../components/Tag/Tag";
// Utils
import { calculatePrice } from "../../../../utils/calculatePrice";
// Styles
import "./index.scss";

export default function ProductsGrid() {
  const { listState: list } = useList();

  return (
    <>
      {list && list.products && (
        <ul className="products-grid">
          <JoinIkeaFamily />

          {list.products.map((product) => {
            const {
              collection,
              nameToDisplay,
              newTag,
              price,
              productNumber,
              quantity,
              size,
              variantName,
              oldPrice,
              productLink,
            } = product;

            return (
              <li key={productNumber}>
                <section className="">
                  <Input
                    id={list.id}
                    label="Wybierz aby dodać do listy zarządzania produktami"
                    type="checkbox"
                    labelProps={{
                      className: "visually-hidden",
                    }}
                    inputProps={{}}
                  />

                  <header>
                    {newTag && <Tag variant={newTag.variant}>Nowość</Tag>}
                    {oldPrice && <Tag variant={oldPrice.variant}>Nowa niższa cena</Tag>}

                    <h3>
                      <a href={productLink.toLowerCase()}>{collection}</a>
                    </h3>
                  </header>

                  <p>
                    {nameToDisplay}, {variantName}
                    {(size !== "universal" || quantity > 1) && ","}
                    {price.quantity && ` ${price.quantity} szt./opak.,`}
                    {size !== "universal" && ` ${size}`}
                  </p>

                  {quantity > 1 && (
                    <p className="fs-sm">
                      {price.integer},{price.decimal ? price.decimal : "-"}/szt.
                    </p>
                  )}

                  <strong>{calculatePrice(1, price.integer, price.decimal)}</strong>

                  {oldPrice && (
                    <p className="fs-sm">
                      Najniższa cena z ostatnich 30 dni: {oldPrice.integer},
                      {oldPrice.decimal ? oldPrice.decimal : "-"}
                    </p>
                  )}

                  {/* //TODO Rating */}

                  {/* //TODO Quantity Input */}

                  {/* //TODO Add to cart and delete btns */}
                </section>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

function JoinIkeaFamily() {
  return (
    <li>
      <section className="join-family">
        <h3 className="tx-blue">Zapisz swoje postępy i korzystaj ze zniżek IKEA Family</h3>

        <p>
          Twoje listy są tylko tymczasowe. Zaloguj się, aby skorzystać ze zniżek członkowskich i
          upewnić się, że Twoje listy nadal tu są, gdy wrócisz.
        </p>

        <Btn variant="blue">Dołącz lub zaloguj się</Btn>
      </section>
    </li>
  );
}
