// Constants
import { productLink } from "../../../../constants/links";
// Types
import type { ShoppingCartType } from "../../../../context/AppContext";
// Style
import "./index.scss";

export default function ProductItem({ product }: { product: ShoppingCartType }) {
  console.log(product);

  return (
    <li className="shopping-cart-product-item">
      <div className="shopping-cart-product-item__img-wrapper">
        <button>
          <span className="visually-hidden">Naciśnij aby zobaczyć galerię zdjęć produktu</span>
          <img
            src={`${productLink}/${product.collection.toLowerCase()}-${product.name}-${
              product.variant
            }__${product.images.main}`}
            alt=""
            loading="lazy"
          />
        </button>

        <small>
          <span className="visually-hidden">Numer produktu:</span>
          {product.productNumber}
        </small>
      </div>

      <section>
        <header>
          <h3>{product.collection}</h3>
          {/* //TODO ADD PROPER PRICE */}
          <strong>{product.price.decimal}</strong>
        </header>
        <div>
          <p>
            {product.nameToDisplay}, {product.variantName}
          </p>
          <p>{product.size}</p>
        </div>
      </section>
    </li>
  );
}
